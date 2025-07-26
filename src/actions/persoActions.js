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
  
  if (command.includes('{}')) {
    // Commande avec paramètre
    if (text) {
      replaced = command.replace('{}', `{${text}}`);
      newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
    } else {
      replaced = command;
      const cursorPos = selection.start.translate(0, command.indexOf('{}') + 1);
      newSelection = new vscode.Selection(cursorPos, cursorPos);
    }
  } else {
    // Commande simple
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