const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// Imports des modules de configuration
const { getFormatCommandVariants, getDefaultFormatVariant, wrapWithTabularray } = require('./config/commandFormatVariants');
const { getMathCommandVariants, getDefaultMathVariant, wrapWithMatrix } = require('./config/commandMathVariants');

// Imports existants
const { isInMathMode } = require('../utils/utils');
const { getFormatCommands, handleFormatCommand } = require('./actions/formatActions');
const { getMathCommands, handleMathCommand } = require('./actions/mathActions');
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
function wrapWith(cmd, variantId = null) {
  console.log('🚀 wrapWith called with cmd:', cmd, 'variantId:', variantId);

  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const { document, selections } = editor;
  let newSelections = [];

  editor.edit(editBuilder => {
    selections.forEach(selection => {
      const text = document.getText(selection);
      const isMath = isInMathMode(document, selection.start);
      
      // Utiliser le système de format/math selon la commande
      let result;
      const formatCommands = getFormatCommands();
      const mathCommands = getMathCommands();
      
      if (formatCommands.includes(cmd)) {
        result = handleFormatCommand(cmd, editor, selection, text, isMath, variantId);
      } else if (mathCommands.includes(cmd)) {
        result = handleMathCommand(cmd, editor, selection, text, isMath, variantId);
      }
      
      if (result && result.replaced) {
        editBuilder.replace(selection, result.replaced);
        if (result.newSelection) {
          newSelections.push(result.newSelection);
        }
      }
    });
  }).then(() => {
    if (newSelections.length > 0) {
      editor.selections = newSelections;
    }
    // Redonner le focus à l'éditeur après la modification
    vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
  });
}

/**
 * Traite un template avec $1 et $0
 */
function processTemplate(template, text, selection) {
  // Remplacer $1 par le texte sélectionné
  let result = template.replace('$1', text);
  
  // Calculer la nouvelle position du curseur ($0)
  const cursorIndex = result.indexOf('$0');
  if (cursorIndex !== -1) {
    result = result.replace('$0', '');
    const newCursorPos = selection.start.translate(0, cursorIndex);
    return {
      text: result,
      newSelection: new vscode.Selection(newCursorPos, newCursorPos)
    };
  }
  
  return {
    text: result,
    newSelection: new vscode.Selection(selection.start, selection.start.translate(0, result.length))
  };
}

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