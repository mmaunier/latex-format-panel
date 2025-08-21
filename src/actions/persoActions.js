const vscode = require('vscode');
const crypto = require('crypto');
const { processTemplate } = require('../../utils/utils');

// Fonction utilitaire pour générer un ID unique
function generatePersoId(item, index) {
  let contentToHash;
  
  if (item.type === 'bouton_variantes') {
    // Pour les boutons à variantes, inclure toutes les commandes
    const variantCommands = item.variantes.map(v => v.commande).join('|');
    contentToHash = `${item.type}_${variantCommands}_${item.defaut || 1}`;
  } else {
    // Pour les boutons simples ou les titres
    contentToHash = `${item.type}_${item.commande || item.texte}`;
  }
  
  const contentHash = crypto.createHash('md5')
    .update(contentToHash)
    .digest('hex')
    .substring(0, 8);
  return `perso_${index}_${contentHash}`;
}

function getPersoCommands() {
  const config = vscode.workspace.getConfiguration('latexFormatPanel');
  const buttons = config.get('persoButtons', []);
  
  const commands = [];
  buttons.forEach((item, index) => {
    if (item.type === 'bouton' || item.type === 'bouton_variantes') {
      commands.push(generatePersoId(item, index));
    }
  });
  
  return commands;
}

function getPersoCommandVariants(cmd) {
  const config = vscode.workspace.getConfiguration('latexFormatPanel');
  const buttons = config.get('persoButtons', []);
  
  // Trouver le bouton correspondant
  let targetButton = null;
  buttons.forEach((item, index) => {
    if (item.type === 'bouton_variantes') {
      const uniqueId = generatePersoId(item, index);
      if (uniqueId === cmd) {
        targetButton = item;
      }
    }
  });
  
  if (!targetButton || !targetButton.variantes || targetButton.variantes.length <= 1) {
    return null;
  }
  
  // Construire l'objet variants - NUMÉROTATION À PARTIR DE 1 pour l'affichage
  const variants = {
    command: cmd,
    defaultVariant: `variant_${(targetButton.defaut || 1) - 1}`, // Convertir en 0-based pour l'ID
    variants: targetButton.variantes.map((variant, index) => ({
      id: `variant_${index}`, // ID 0-based
      name: variant.texte,
      displayNumber: index + 1 // Numérotation pour l'affichage (1-based)
    }))
  };
  
  return variants;
}

function handlePersoCommand(cmd, editor, selection, text, isMathMode, variantId = null) {
  console.log('🎯 handlePersoCommand called:', cmd, 'variantId:', variantId, 'isMathMode:', isMathMode, 'hasSelection:', !selection.isEmpty);

  const config = vscode.workspace.getConfiguration('latexFormatPanel');
  const buttons = config.get('persoButtons', []);
  
  // Retrouver le bouton correspondant à l'ID
  let targetButton = null;
  
  buttons.forEach((item, index) => {
    if (item.type === 'bouton' || item.type === 'bouton_variantes') {
      const uniqueId = generatePersoId(item, index);
      if (uniqueId === cmd) {
        targetButton = item;
      }
    }
  });
  
  if (!targetButton) {
    console.log('❌ Target button not found for perso command:', cmd);
    return null; // Annule l'action
  }
  
  let command;
  
  if (targetButton.type === 'bouton_variantes') {
    if (variantId) {
      // Utiliser la variante spécifiée
      const variantIndex = parseInt(variantId.replace('variant_', ''), 10);
      if (variantIndex >= 0 && variantIndex < targetButton.variantes.length) {
        command = targetButton.variantes[variantIndex].commande;
      } else {
        console.log('❌ Invalid variant index for perso command');
        command = targetButton.variantes[0].commande; // Fallback
      }
    } else {
      // Utiliser la variante par défaut - CORRECTION DE LA NUMÉROTATION
      let defaultIndex = targetButton.defaut || 1; // Défaut à 1 si non défini
      
      // Convertir la numérotation utilisateur (à partir de 1) en indexation interne (à partir de 0)
      if (defaultIndex <= 0) {
        defaultIndex = 1; // Si négatif ou 0, utiliser 1
      }
      if (defaultIndex > targetButton.variantes.length) {
        defaultIndex = 1; // Si supérieur au nombre de variantes, utiliser 1
      }
      
      // Convertir en index interne (0-based)
      const internalIndex = defaultIndex - 1;
      command = targetButton.variantes[internalIndex].commande;
    }
  } else {
    // Bouton simple
    command = targetButton.commande;
  }
  
  // Validation de sécurité supplémentaire
  if (!command || typeof command !== 'string') {
    console.log('❌ Invalid command for perso button - CANCELLING ACTION');
    return null; // Annule complètement l'action
  }
  
  // NOUVELLE LOGIQUE : Pour les commandes perso, on considère qu'elles supportent tout par défaut
  // MAIS on peut vérifier si c'est une commande purement mathématique
  const isMathCommand = command.includes('\\begin{align') || 
                       command.includes('\\begin{equation') || 
                       command.includes('\\begin{gather') ||
                       command.includes('\\begin{cases') ||
                       command.includes('$') ||
                       (command.match(/\\[a-zA-Z]+/) && !command.includes('\\section') && !command.includes('\\chapter'));
  
  // Si c'est une commande mathématique et qu'on n'est pas en mode math avec du texte sélectionné
  if (isMathCommand && !isMathMode && !selection.isEmpty) {
    console.log('❌ Math command used in text mode with selection - CANCELLING ACTION');
    return null; // Annule complètement l'action
  }
  
  // Utiliser la fonction centralisée processTemplate
  console.log('✅ Using perso command:', command);
  return processTemplate(command, text, selection);
}

module.exports = {
  getPersoCommands,
  handlePersoCommand,
  generatePersoId,
  getPersoCommandVariants
};