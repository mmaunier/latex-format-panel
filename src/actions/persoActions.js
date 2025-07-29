const vscode = require('vscode');
const crypto = require('crypto');
const { processTemplate } = require('../../utils/utils');

// Fonction utilitaire pour générer un ID unique
function generatePersoId(item, index) {
  let contentToHash;
  
  if (item.type === 'bouton_variantes') {
    // Pour les bouton_variantes, inclure toutes les variantes dans le hash
    contentToHash = JSON.stringify({
      type: item.type,
      defaut: item.defaut,
      variantes: item.variantes
    });
  } else {
    // Pour les boutons normaux
    contentToHash = JSON.stringify({
      texte: item.texte, 
      commande: item.commande
    });
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
    return null; // Pas de variantes disponibles
  }
  
  // Construire l'objet variants - NUMÉROTATION À PARTIR DE 1 pour l'affichage
  const variants = targetButton.variantes.map((variante, index) => ({
    id: `variant_${index}`, // Garde l'indexation interne à partir de 0
    label: `${index + 1}. ${variante.texte}`, // Affichage numéroté à partir de 1
    description: variante.commande.replace(/\\/g, '\\').substring(0, 50) + '...'
  }));
  
  return {
    command: cmd,
    variants: variants
  };
}

function handlePersoCommand(cmd, editor, selection, text, isMathMode, variantId = null) {
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
    return { replaced: '', newSelection: null };
  }
  
  let command;
  
  if (targetButton.type === 'bouton_variantes') {
    if (variantId) {
      // Utiliser la variante spécifiée
      const variantIndex = parseInt(variantId.replace('variant_', ''), 10);
      if (variantIndex >= 0 && variantIndex < targetButton.variantes.length) {
        command = targetButton.variantes[variantIndex].commande;
      } else {
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
  
  // Utiliser la fonction centralisée
  return processTemplate(command, text, selection);
}

module.exports = {
  getPersoCommands,
  handlePersoCommand,
  generatePersoId,
  getPersoCommandVariants
};