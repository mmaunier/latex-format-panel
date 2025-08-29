const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// Imports des modules de configuration
const { wrapWithTabularray } = require('./config/commandFormatVariants');
const { wrapWithMatrix } = require('./config/commandMathVariants');

// Imports existants
const { isInMathMode } = require('../utils/utils');
const { getFormatCommands, handleFormatCommand, commentLatex, uncommentLatex } = require('./actions/formatActions');
const { getMathCommands, handleMathCommand } = require('./actions/mathActions');
const { getPersoCommands, handlePersoCommand } = require('./actions/persoActions');
const { LatexSidebarProvider } = require('./webview/webviewProvider');

// Extensions LaTeX supportées
const LATEX_EXTENSIONS = ['.tex', '.latex', '.sty', '.cls'];

/**
 * Vérifie si un document est un fichier LaTeX
 */
function isLatexFile(document) {
  const ext = path.extname(document.fileName).toLowerCase();
  return LATEX_EXTENSIONS.includes(ext);
}

/**
 * Met à jour le contexte latex-format-panel:enabled selon le fichier actuel
 */
function updateLatexContext() {
  const editor = vscode.window.activeTextEditor;
  const enabled = editor && isLatexFile(editor.document);
  
  // Définir le contexte pour contrôler la visibilité du panel
  vscode.commands.executeCommand('setContext', 'latex-format-panel:enabled', enabled);
  
  // Debug
  console.log('LaTeX Format Panel:', enabled ? 'enabled' : 'disabled', 
              editor ? `(${editor.document.fileName})` : '(no editor)');
}

/**
 * Fonction principale pour entourer le texte sélectionné
 */
function wrapWith(cmd, variantId = null, customParams = null) {
  console.log('🚀 wrapWith called with cmd:', cmd, 'variantId:', variantId, 'customParams:', customParams);

  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const { document, selections } = editor;
  let newSelections = [];
  let hasValidActions = false;

  editor.edit(editBuilder => {
    selections.forEach(selection => {
      const text = document.getText(selection);
      const position = selection.active;
      const isMathMode = isInMathMode(document, position);
      
      console.log('📍 Processing selection - isMathMode:', isMathMode, 'text:', text.substring(0, 20) + '...');
      
      let result;
      
      // Gestion spéciale pour matrix avec paramètres personnalisés
      if (cmd === 'matrix' && customParams) {
        console.log('🎯 Matrix with custom params:', customParams);
        const { wrapWithMatrix } = require('./config/commandMathVariants');
        result = wrapWithMatrix(customParams, text, selection);
      } else if (getFormatCommands().includes(cmd)) {
        result = handleFormatCommand(cmd, editor, selection, text, isMathMode, variantId);
      } else if (getMathCommands().includes(cmd)) {
        result = handleMathCommand(cmd, editor, selection, text, isMathMode, variantId);
      } else if (getPersoCommands().includes(cmd)) {
        result = handlePersoCommand(cmd, editor, selection, text, isMathMode, variantId);
      } else {
        console.log('❌ Unknown command:', cmd);
        return;
      }

      // 🔑 POINT CLÉ : Si result est null, l'action est annulée
      if (result === null) {
        console.log('⚠️ Action CANCELLED for selection:', text.substring(0, 20));
        return; // Ne pas effectuer de remplacement, garder la sélection intacte
      }

      if (result && result.replaced !== undefined) {
        console.log('✅ Action EXECUTED - replacing with:', result.replaced.substring(0, 30) + '...');
        editBuilder.replace(selection, result.replaced);
        hasValidActions = true;
        
        if (result.newSelection) {
          newSelections.push(result.newSelection);
        }
      }
    });
  }).then(() => {
    console.log('📝 Edit completed - hasValidActions:', hasValidActions);
    
    if (hasValidActions && newSelections.length > 0) {
      editor.selections = newSelections;
    }
    // Redonner le focus à l'éditeur après la modification
    vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
  });
}

// Supprimer l'ancienne fonction processTemplate si elle existe
// Elle est maintenant dans utils/utils.js

/**
 * Fonction d'activation de l'extension
 */
function activate(context) {
  console.log('🚀 LaTeX Format Panel: Activating extension...');

  
  // 1. Créer le provider pour le webview
  const provider = new LatexSidebarProvider(context.extensionUri);
  
  // 2. Enregistrer le provider du webview
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('latexFormatPanel', provider)
  );
  
  // 3. Initialiser le contexte au démarrage
  updateLatexContext();
  
  // 4. Écouter les changements d'éditeur actif
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => {
      updateLatexContext();
    })
  );
  
  // 5. Écouter l'ouverture/fermeture de documents
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(() => {
      updateLatexContext();
    })
  );
  
  context.subscriptions.push(
    vscode.workspace.onDidCloseTextDocument(() => {
      updateLatexContext();
    })
  );
  
  // 6. Enregistrer les commandes principales
  context.subscriptions.push(
    vscode.commands.registerCommand('latexFormat.wrapWith', wrapWith)
  );
  
  context.subscriptions.push(
    vscode.commands.registerCommand('latexFormat.wrapWithVariant', (cmd, variantId) => wrapWith(cmd, variantId))
  );
  
  // 7. Enregistrer toutes les commandes de formatage
  const formatCommands = getFormatCommands();
  formatCommands.forEach(cmd => {
    context.subscriptions.push(
      vscode.commands.registerCommand(`latexFormat.${cmd}`, () => wrapWith(cmd))
    );
  });
  
  // 8. Enregistrer toutes les commandes mathématiques
  const mathCommands = getMathCommands();
  mathCommands.forEach(cmd => {
    context.subscriptions.push(
      vscode.commands.registerCommand(`latexMath.${cmd}`, () => wrapWith(cmd))
    );
  });
  
  // 9. UNE SEULE commande pour tous les perso (au lieu d'une par bouton)
  context.subscriptions.push(
    vscode.commands.registerCommand('latexFormat.wrapWithPerso', (cmd, variantId = null) => {
      console.log('🚀 wrapWithPerso called with cmd:', cmd, 'variantId:', variantId);
      wrapWith(cmd, variantId);
    })
  );
  
  context.subscriptions.push(
    vscode.commands.registerCommand('latexFormat.wrapWithCustomParams', (cmd, params) => {
      if (cmd === 'tabularray') {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        
        // Générer le tableau avec la fonction importée
        const replaced = wrapWithTabularray(params);
        
        // Insérer dans l'éditeur
        const selection = editor.selection;
        editor.edit(editBuilder => {
          editBuilder.replace(selection, replaced);
        }).then(() => {
          // Positionner le curseur dans la première cellule du tableau
          if (selection.isEmpty) {
            // Trouver la position du premier saut de ligne (juste après \begin{tblr}{options})
            const beginLine = replaced.indexOf('\n');
            if (beginLine !== -1) {
              // Calculer la position après le saut de ligne (première cellule)
              const startOffset = beginLine + 1;
              const newPos = selection.start.translate(0, startOffset);
              editor.selection = new vscode.Selection(newPos, newPos);
            } else {
              // Fallback si structure inattendue
              const pos = selection.start.translate(1, 0);
              editor.selection = new vscode.Selection(pos, pos);
            }
          } else {
            // Si texte sélectionné, garder le comportement actuel
            const pos = selection.start.translate(0, replaced.length);
            editor.selection = new vscode.Selection(pos, pos);
          }
          vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
        });
      } else if (cmd === 'matrix') {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        
        // Générer la matrice
        const replaced = wrapWithMatrix(params);
        
        // Insérer dans l'éditeur
        const selection = editor.selection;
        editor.edit(editBuilder => {
          editBuilder.replace(selection, replaced);
        }).then(() => {
          // Si pas de sélection, positionner le curseur dans la première cellule
          // sinon, placer le curseur après l'insertion
          const pos = selection.isEmpty ? 
                     selection.start.translate(1, 0) : 
                     selection.start.translate(0, replaced.length);
          editor.selection = new vscode.Selection(pos, pos);
          vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
        });
      }
      // Ajouter d'autres commandes personnalisées si nécessaire
    })
  );
  
  context.subscriptions.push(
    vscode.commands.registerCommand('latexFormat.commentLatex', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) commentLatex(editor, editor.selections);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('latexFormat.uncommentLatex', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) uncommentLatex(editor, editor.selections);
    })
  );
  
  // Listener pour les changements de configuration
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration('latexFormatPanel.persoButtons')) {
        // Au lieu de recharger toute la fenêtre :
        // vscode.commands.executeCommand('workbench.action.reloadWindow');
        
        // Demander au provider de mettre à jour le webview
        provider.refresh();
      }
    })
  );
  
  console.log('LaTeX Format Panel: Extension activated successfully!');
}

/**
 * Fonction de désactivation
 */
function deactivate() {
  console.log('LaTeX Format Panel: Extension deactivated');
}

module.exports = {
  activate,
  deactivate
};