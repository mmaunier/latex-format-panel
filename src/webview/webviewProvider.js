const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { getFormatCommands } = require('../actions/formatActions');
const { getMathCommands } = require('../actions/mathActions');
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
  
  console.log('Variants being injected:', JSON.stringify(variants, null, 2));
  
  // Remplacer les placeholders
  return templateContent
    .replace('{{CSS_CONTENT}}', cssContent)
    .replace('{{FORMAT_HTML}}', formatHtml)
    .replace('{{MATH_HTML}}', mathHtml)
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
      
      const allCommands = [...getFormatCommands(), ...getMathCommands()];
      
      if (allCommands.includes(message.command)) {
        if (message.variant === 'custom' && message.params) {
          // Commande avec paramètres personnalisés (pour modal)
          vscode.commands.executeCommand('latexFormat.wrapWithCustomParams', message.command, message.params);
        } else if (message.variant) {
          // Commande avec variante spécifique
          vscode.commands.executeCommand('latexFormat.wrapWithVariant', message.command, message.variant);
        } else {
          // Commande par défaut
          vscode.commands.executeCommand('latexFormat.wrapWith', message.command);
        }
      }
    });
  }
}

module.exports = { LatexSidebarProvider };