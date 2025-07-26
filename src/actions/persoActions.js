const vscode = require('vscode');

function getPersoCommands() {
  const config = vscode.workspace.getConfiguration('latexFormatPanel');
  const buttons = config.get('persoButtons', []);
  
  return buttons
    .filter(item => item.type === 'button')
    .map(item => item.label.toLowerCase().replace(/\s+/g, '_'));
}

function handlePersoCommand(cmd, editor, selection, text, isMathMode) {
  const config = vscode.workspace.getConfiguration('latexFormatPanel');
  const buttons = config.get('persoButtons', []);
  
  const button = buttons.find(item => 
    item.type === 'button' && 
    item.label.toLowerCase().replace(/\s+/g, '_') === cmd
  );
  
  if (!button) {
    return { replaced: '', newSelection: null };
  }
  
  let replaced = '';
  let newSelection = null;
  const command = button.command;
  
  // Système avec $1 et $0
  if (command.includes('$1') || command.includes('$0')) {
    if (text) {
      // Avec sélection : remplacer tous les $1 par le texte sélectionné
      replaced = command.replace(/\$1/g, text);
      
      // Placer le curseur à la position $0
      if (replaced.includes('$0')) {
        const cursorOffset = replaced.indexOf('$0');
        replaced = replaced.replace('$0', '');
        const cursorPos = selection.start.translate(0, cursorOffset);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      } else {
        // Pas de $0, curseur à la fin
        const cursorPos = selection.start.translate(0, replaced.length);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    } else {
      // Sans sélection : placer le curseur à la position du premier $1
      if (command.includes('$1')) {
        const cursorOffset = command.indexOf('$1');
        replaced = command.replace(/\$1/g, '').replace('$0', '');
        const cursorPos = selection.start.translate(0, cursorOffset);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      } else if (command.includes('$0')) {
        // Seulement $0, placer le curseur là
        const cursorOffset = command.indexOf('$0');
        replaced = command.replace('$0', '');
        const cursorPos = selection.start.translate(0, cursorOffset);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    }
    
    // Traiter les retours à la ligne
    replaced = replaced.replace(/\\n/g, '\n');
  } else {
    // Commande simple sans marqueurs
    replaced = text ? `${command} ${text}` : `${command} `;
    const cursorPos = selection.start.translate(0, replaced.length);
    newSelection = new vscode.Selection(cursorPos, cursorPos);
  }
  
  return { replaced, newSelection };
}

module.exports = {
  getPersoCommands,
  handlePersoCommand
};