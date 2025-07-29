const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { getFormatCommands } = require('../actions/formatActions');
const { getMathCommands } = require('../actions/mathActions');
const { getPersoCommands, generatePersoId } = require('../actions/persoActions');
const { getFormatCommandVariants } = require('../config/commandFormatVariants');
const { getMathCommandVariants } = require('../config/commandMathVariants');
const { getPersoCommandVariants } = require('../actions/persoActions');

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
  
  // AJOUTER : Ajouter les variantes perso
  const persoCommands = getPersoCommands();
  persoCommands.forEach(cmd => {
    const cmdVariants = getPersoCommandVariants(cmd);
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
    this.webviewView = null;
  }

  resolveWebviewView(webviewView, context, _token) {
    this.webviewView = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri]
    };

    webviewView.webview.html = getHtmlTemplate(this.extensionUri);

    webviewView.webview.onDidReceiveMessage(message => {
      console.log('Received message:', message);
      
      // TRAITEMENT PERSO SÉPARÉ - Avant tout le reste
      if (message.command.startsWith('perso_')) {
        console.log('Executing perso command:', message.command, 'variant:', message.variant);
        // Toujours utiliser wrapWithPerso, mais passer la variante en paramètre
        vscode.commands.executeCommand('latexFormat.wrapWithPerso', message.command, message.variant);
        return; // Sortir immédiatement
      }
      
      // TRAITEMENT SPÉCIAL pour tabularray - AVANT le reste
      if (message.command === 'tabularray') {
        if (message.params) {
          // Ancienne interface avec params
          console.log('Executing tabularray with params:', message.params);
          vscode.commands.executeCommand('latexFormat.wrapWithCustomParams', 'tabularray', message.params);
        } else if (message.customParams) {
          // Nouvelle interface avec customParams
          console.log('Executing tabularray with customParams:', message.customParams);
          vscode.commands.executeCommand('latexFormat.wrapWithCustomParams', 'tabularray', message.customParams);
        } else if (message.variant) {
          // Variante spécifique
          console.log('Executing tabularray with variant:', message.variant);
          vscode.commands.executeCommand('latexFormat.wrapWithVariant', 'tabularray', message.variant);
        } else {
          // Défaut
          console.log('Executing default tabularray');
          vscode.commands.executeCommand('latexFormat.wrapWith', 'tabularray');
        }
        return; // Sortir immédiatement
      }
      
      // TRAITEMENT FORMAT ET MATH - Sans les perso
      const allCommands = [
        ...getFormatCommands(),
        ...getMathCommands()
        // Ne PLUS inclure getPersoCommands() ici
      ];
      
      if (allCommands.includes(message.command)) {
        if (message.customParams) {
          // Commande avec paramètres personnalisés (pour matrix modal)
          console.log('Executing custom command with params:', message.command, message.customParams);
          vscode.commands.executeCommand('latexFormat.wrapWith', message.command, message.variant, message.customParams);
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

  refresh() {
    if (this.webviewView) {
      this.webviewView.webview.html = getHtmlTemplate(this.extensionUri);
    }
  }
}

function generatePersoHtml() {
  const vscode = require('vscode');
  const config = vscode.workspace.getConfiguration('latexFormatPanel');
  const buttons = config.get('persoButtons', []);
  
  let html = '<div id="perso-tab" class="tab-content">\n\n';
  let currentGroup = '';
  let buttonCount = 0;
  
  buttons.forEach((item, index) => {
    if (item.type === 'titre') {
      // Fermer le groupe précédent s'il existe
      if (currentGroup) {
        html += '</div>\n\n';
      }
      // Ajouter le titre et ouvrir un nouveau groupe
      html += `<h3>${item.texte}</h3>\n`;
      html += '<div class="button-group">\n';
      currentGroup = item.texte;
      buttonCount = 0;
    } else if (item.type === 'bouton') {
      // Bouton simple avec classe perso-button
      const uniqueId = generatePersoId(item, index);
      html += `   <button class="perso-button" onclick="sendCommand('${uniqueId}')">${item.texte}</button>\n`;
      buttonCount++;
      
      if (buttonCount === 3) {
        html += '</div>\n\n<div class="button-group">\n';
        buttonCount = 0;
      }
    } else if (item.type === 'bouton_variantes') {
      // Bouton avec variantes avec classe perso-button
      const uniqueId = generatePersoId(item, index);
      
      // CORRECTION DE LA NUMÉROTATION - Conversion de la numérotation utilisateur vers l'indexation interne
      let defaultIndex = item.defaut || 1; // Défaut à 1 si non défini
      
      // Validation de la valeur par défaut
      if (defaultIndex <= 0) {
        defaultIndex = 1; // Si négatif ou 0, utiliser 1
      }
      if (defaultIndex > (item.variantes || []).length) {
        defaultIndex = 1; // Si supérieur au nombre de variantes, utiliser 1
      }
      
      // Convertir en index interne (0-based)
      const internalIndex = defaultIndex - 1;
      
      const defaultLabel = item.variantes && item.variantes[internalIndex] 
        ? item.variantes[internalIndex].texte 
        : 'Bouton';
      
      if (item.variantes && item.variantes.length > 1) {
        // Bouton avec menu contextuel
        html += `   <button class="perso-button" onclick="sendCommand('${uniqueId}')" oncontextmenu="showContextMenu(event, '${uniqueId}'); return false;">${defaultLabel}</button>\n`;
      } else {
        // Bouton simple si une seule variante
        html += `   <button class="perso-button" onclick="sendCommand('${uniqueId}')">${defaultLabel}</button>\n`;
      }
      
      buttonCount++;
      
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