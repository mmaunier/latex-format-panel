const vscode = require('vscode');

/**
 * Vérifie si le curseur est en mode mathématique
 */
function isInMathMode(document, position) {
   console.log('🔍 isInMathMode called at position:', position.line, position.character);
   const textBeforeCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
   
   // Supprimer les commentaires pour éviter les faux positifs
   let textWithoutComments = textBeforeCursor.replace(/([^\\]|^)%.*$/gm, '$1');

   // Supprimer uniquement les variables shell connues (HOME, PATH, USER, SHELL, PWD, LOGNAME, LANG, TERM, DISPLAY, MAIL, EDITOR, HOSTNAME, etc.)
   // Supprimer les variables shell (version plus permissive)
   textWithoutComments = textWithoutComments.replace(/\$(HOME|PATH|USER|SHELL|PWD|LOGNAME|LANG|TERM|DISPLAY|MAIL|EDITOR|HOSTNAME)(?!\w)/g, '');
   console.log('Text contains $HOME:', textWithoutComments.includes('$HOME'));

   // Compter les délimiteurs math
   const dollarCount = (textWithoutComments.match(/(?<!\\)\$/g) || []).length;
   const doubleDollarCount = (textWithoutComments.match(/(?<!\\)\$\$/g) || []).length;

   // Vérifier les délimiteurs \[ et \]
   const displayMathOpenCount = (textWithoutComments.match(/(?<!\\)\\\[/g) || []).length;
   const displayMathCloseCount = (textWithoutComments.match(/(?<!\\)\\\]/g) || []).length;
   const inDisplayMathBrackets = (displayMathOpenCount > displayMathCloseCount);

   // Vérifier les environnements math
   const mathEnvs = ['equation', 'align', 'gather', 'multline', 'flalign', 'alignat'];
   let inMathEnv = false;

   for (const env of mathEnvs) {
      const beginCount = (textWithoutComments.match(new RegExp(`\\\\begin\\{${env}\\*?\\}`, 'g')) || []).length;
      const endCount = (textWithoutComments.match(new RegExp(`\\\\end\\{${env}\\*?\\}`, 'g')) || []).length;
      if (beginCount > endCount) {
         inMathEnv = true;
         break;
      }
   }

   // Mode math si nombre impair de $ (moins les $$) ou dans un environnement math ou entre \[ et \]
   const singleDollarCount = dollarCount - (doubleDollarCount * 2);
   const inInlineMath = (singleDollarCount % 2 === 1);
   const inDisplayMath = (doubleDollarCount % 2 === 1);

   return inInlineMath || inDisplayMath || inMathEnv || inDisplayMathBrackets;
}

/**
 * Calcule la position correcte avec gestion des retours à la ligne
 */
function calculatePosition(basePosition, content, offset) {
  const lines = content.substring(0, offset).split('\n');
  const lineOffset = lines.length - 1;
  const columnOffset = lines[lines.length - 1].length;
  
  if (lineOffset === 0) {
    // Même ligne
    return basePosition.translate(0, columnOffset);
  } else {
    // Nouvelle ligne
    return basePosition.translate(lineOffset, columnOffset);
  }
}

/**
 * Traite un template avec marqueurs $1 et $0
 * @param {string} command - La commande avec les marqueurs $1 et $0
 * @param {string} text - Le texte sélectionné (peut être vide)
 * @param {vscode.Selection} selection - La sélection actuelle
 * @returns {Object} - {replaced: string, newSelection: vscode.Selection|null}
 */
function processTemplate(command, text, selection) {
  let replaced = '';
  let newSelection = null;
  
  // Système avec $1 et $0
  if (command.includes('$1') || command.includes('$0')) {
    // Traiter les retours à la ligne D'ABORD
    const processedCommand = command.replace(/\\n/g, '\n');
    
    if (text) {
      // AVEC SÉLECTION : remplacer $1 par le texte, curseur à $0 ou à la fin
      replaced = processedCommand.replace(/\$1/g, text);
      
      // Placer le curseur à la position $0
      if (replaced.includes('$0')) {
        const cursorOffset = replaced.indexOf('$0');
        replaced = replaced.replace('$0', '');
        const cursorPos = calculatePosition(selection.start, replaced, cursorOffset);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      } else {
        // Pas de $0, curseur à la fin
        const cursorPos = calculatePosition(selection.start, replaced, replaced.length);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    } else {
      // SANS SÉLECTION : priorité à $1 pour placement du curseur
      if (processedCommand.includes('$1')) {
        const cursorOffset = processedCommand.indexOf('$1');
        
        // Supprimer tous les marqueurs
        replaced = processedCommand.replace(/\$1/g, '').replace(/\$0/g, '');
        
        const cursorPos = calculatePosition(selection.start, replaced, cursorOffset);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      } else if (processedCommand.includes('$0')) {
        // Seulement $0, placer le curseur là
        const cursorOffset = processedCommand.indexOf('$0');
        replaced = processedCommand.replace('$0', '');
        const cursorPos = calculatePosition(selection.start, replaced, cursorOffset);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    }
  } else {
    // Commande simple sans marqueurs
    if (text) {
      if (command.includes('{}')) {
        // Remplacer {} par {text}
        replaced = command.replace(/\{\}/g, `{${text}}`);
        const cursorPos = calculatePosition(selection.start, replaced, replaced.length);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      } else if (command.includes('{')) {
        // Commande avec accolades : insérer le texte dedans
        replaced = command.replace(/\{([^}]*)\}/, `{${text}}`);
        const cursorPos = calculatePosition(selection.start, replaced, replaced.length);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      } else {
        // Commande autonome : ignorer la sélection et juste insérer la commande
        replaced = command;
        const cursorPos = calculatePosition(selection.start, replaced, replaced.length);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    } else {
      // Sans sélection : insérer la commande telle quelle
      replaced = command;
      const cursorPos = calculatePosition(selection.start, replaced, replaced.length);
      newSelection = new vscode.Selection(cursorPos, cursorPos);
    }
  }
  
  return { replaced, newSelection };
}

module.exports = {
  isInMathMode,
  calculatePosition,
  processTemplate
};