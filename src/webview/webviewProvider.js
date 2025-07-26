const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { getFormatCommands } = require('../actions/formatActions');
const { getMathCommands } = require('../actions/mathActions');
const { getPersoCommands } = require('../actions/persoActions');
const { getFormatCommandVariants } = require('../config/commandFormatVariants');
const { getMathCommandVariants } = require('../config/commandMathVariants');

function getHtmlTemplate(extensionUri) {
  const templatePath = path.join(extensionUri.fsPath, 'src', 'webview', 'template.html');
  const cssPath = path.join(extensionUri.fsPath, 'src', 'webview', 'styles.css');
  const formatHtmlPath = path.join(extensionUri.fsPath, 'src', 'webview', 'format.html');
  const mathHtmlPath = path.join(extensionUri.fsPath, 'src', 'webview', 'math.html');
  
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const formatHtml = fs.readFileSync(formatHtmlPath, 'utf8');
  const mathHtml = fs.readFileSync(mathHtmlPath, 'utf8');
  const persoHtml = generatePersoHtml();
  
  // Construire les variants pour le JavaScript
  const variants = {};
  
  // Ajouter les variantes de format
  const formatCommands = getFormatCommands();
  formatCommands.forEach(cmd => {
    const cmdVariants = getFormatCommandVariants(cmd);
    if (cmdVariants) {
      variants[cmd] = cmdVariants;
    }
  });
  
  // Ajouter les variantes de math
  const mathCommands = getMathCommands();
  mathCommands.forEach(cmd => {
    const cmdVariants = getMathCommandVariants(cmd);
    if (cmdVariants) {
      variants[cmd] = cmdVariants;
    }
  });
  
  // Remplacer les placeholders
  return templateContent
    .replace('{{CSS_CONTENT}}', cssContent)
    .replace('{{FORMAT_HTML}}', formatHtml)
    .replace('{{MATH_HTML}}', mathHtml)
    .replace('{{PERSO_HTML}}', persoHtml)
    .replace('{{COMMAND_VARIANTS}}', JSON.stringify(variants));
}

class LatexSidebarProvider {
  constructor(extensionUri) {
    this.extensionUri = extensionUri;
  }

  resolveWebviewView(webviewView, context, _token) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri]
    };

    webviewView.webview.html = getHtmlTemplate(this.extensionUri);

    webviewView.webview.onDidReceiveMessage(message => {
      console.log('Received message:', message);
      
      const allCommands = [
        ...getFormatCommands(),
        ...getMathCommands(),
        ...getPersoCommands()
      ];
      
      if (allCommands.includes(message.command)) {
        if (message.variant === 'custom' && message.params) {
          // Commande avec paramètres personnalisés (pour modal)
          console.log('Executing custom command with params:', message.command, message.params);
          vscode.commands.executeCommand('latexFormat.wrapWithCustomParams', message.command, message.params);
        } else if (message.variant) {
          // Commande avec variante spécifique
          console.log('Executing command with variant:', message.command, message.variant);
          vscode.commands.executeCommand('latexFormat.wrapWithVariant', message.command, message.variant);
        } else {
          // Commande par défaut
          console.log('Executing default command:', message.command);
          vscode.commands.executeCommand('latexFormat.wrapWith', message.command);
        }
      } else if (message.command === 'comment') {
        vscode.commands.executeCommand('latexFormat.commentLatex');
      } else if (message.command === 'uncomment') {
        vscode.commands.executeCommand('latexFormat.uncommentLatex');
      } else {
        console.log('Unknown command received:', message.command);
      }
    });
  }
}

function generatePersoHtml() {
  const vscode = require('vscode');
  const config = vscode.workspace.getConfiguration('latexFormatPanel');
  const buttons = config.get('persoButtons', []);
  
  let html = '<div id="perso-tab" class="tab-content">\n\n';
  let currentGroup = '';
  let buttonCount = 0;
  
  buttons.forEach(item => {
    if (item.type === 'title') {
      // Fermer le groupe précédent s'il existe
      if (currentGroup) {
        html += '</div>\n\n';
      }
      // Ajouter le titre et ouvrir un nouveau groupe - CHANGER h4 en h3
      html += `<h3>${item.label}</h3>\n`;
      html += '<div class="button-group">\n';
      currentGroup = item.label;
      buttonCount = 0;
    } else if (item.type === 'button') {
      const cmdId = item.label.toLowerCase().replace(/\s+/g, '_');
      html += `   <button class="format-button" onclick="sendCommand('${cmdId}')">${item.label}</button>\n`;
      buttonCount++;
      
      // Créer un nouveau groupe tous les 3 boutons
      if (buttonCount === 3) {
        html += '</div>\n\n<div class="button-group">\n';
        buttonCount = 0;
      }
    }
  });
  
  // Fermer le dernier groupe
  if (currentGroup) {
    html += '</div>\n';
  }
  
  html += '\n</div>';
  return html;
}

module.exports = { LatexSidebarProvider };