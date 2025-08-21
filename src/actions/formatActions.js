const vscode = require('vscode');
const { getFormatCommandVariants, getDefaultFormatVariant } = require('../config/commandFormatVariants');
const { processTemplate } = require('../../utils/utils');

function getFormatCommands() {
  return [
    'bold', 'italic', 'emphasis', 'slanted', 'tt', 'underline', 'smallcaps', 'highlight',
    'mathbb', 'mathcal', 'uppercase', 'lowercase', 'capitalize', 'superscript', 'subscript',
    'footnotesize', 'normalsize', 'tiny', 'scriptsize', 'small', 'large', 'Large', 'LARGE', 'huge', 'Huge', 
    'center', 'flushleft', 'flushright',
    'quad', 'qquad', 'noindent', 'hspace', 'hfill', 'hbox',
    'smallskip', 'medskip', 'bigskip', 'itemsep', 'baselineskip', 'parskip', 'vspace', 'vfill', 'newpage',
    'chapitres', 'sections', 'paragraphe',
    'setlength', 'setcounter', 'label',
    'enumerate', 'itemize', 'item',
    'minipage', 'multicols', 'tabbing',
    'figure', 'wrapfig', 'includegraphics',
    'tikzpicture', 'tcolorbox', 'listing',
    'table', 'tabular', 'tabularray',
  ];
}

function handleFormatCommand(cmd, editor, selection, text, isMathMode, variantId = null) {
  console.log('🎯 handleFormatCommand called:', cmd, 'variantId:', variantId, 'isMathMode:', isMathMode, 'hasSelection:', !selection.isEmpty);

  // Cas spéciaux qui ont leur propre gestion
  if (cmd === 'tabularray' && variantId === 'custom') {
    console.log('🎯 Custom tabularray - will be handled by modal');
    return { replaced: '', newSelection: null };
  }

  // Chercher les variantes de la commande
  const variants = getFormatCommandVariants(cmd);
  if (!variants) {
    console.log('❌ No variants found for format command:', cmd);
    return null;
  }

  let variant;
  if (variantId) {
    // Utiliser la variante spécifiée
    variant = variants.variants.find(v => v.id === variantId);
    if (!variant) {
      console.log('❌ Variant not found:', variantId);
      return null;
    }
  } else {
    // Utiliser la variante par défaut
    const defaultVariant = getDefaultFormatVariant(cmd);
    variant = variants.variants.find(v => v.id === defaultVariant);
    if (!variant) {
      variant = variants.variants[0]; // Fallback sur la première variante
    }
  }

  return handleFormatVariant(cmd, variant, editor, selection, text, isMathMode);
}

function handleFormatVariant(command, variant, editor, selection, text, isMathMode) {
  console.log('🎯 handleFormatVariant called:', command, 'variant:', variant.id, 'isMathMode:', isMathMode, 'hasSelection:', !selection.isEmpty);

  // NOUVELLE LOGIQUE : Si pas en mode math ET bouton non supporté en mode texte
  if (!isMathMode && !variant.supportsText) {
    console.log('❌ Format variant not supported in text mode - CANCELLING ACTION');
    return null; // Annule complètement l'action
  }
  
  // NOUVELLE LOGIQUE : Si en mode math ET bouton non supporté en mode math
  if (isMathMode && !variant.supportsMath) {
    console.log('❌ Format variant not supported in math mode - CANCELLING ACTION');
    return null; // Annule complètement l'action
  }

  // Récupérer le template approprié
  let template = isMathMode ? variant.mathMode : variant.textMode;
  if (!template) {
    console.log('❌ No template for current mode - CANCELLING ACTION');
    return null; // Annule complètement l'action
  }

  // Cas spéciaux pour les transformations de texte
  if (template === 'UPPERCASE_TRANSFORM') {
    console.log('✅ Using uppercase transform');
    return { 
      replaced: text.toUpperCase(), 
      newSelection: text ? new vscode.Selection(selection.start, selection.start.translate(0, text.length)) : null 
    };
  }
  if (template === 'LOWERCASE_TRANSFORM') {
    console.log('✅ Using lowercase transform');
    return { 
      replaced: text.toLowerCase(), 
      newSelection: text ? new vscode.Selection(selection.start, selection.start.translate(0, text.length)) : null 
    };
  }
  if (template === 'CAPITALIZE_TRANSFORM') {
    console.log('✅ Using capitalize transform');
    const capitalized = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    return { 
      replaced: capitalized, 
      newSelection: text ? new vscode.Selection(selection.start, selection.start.translate(0, capitalized.length)) : null 
    };
  }

  // Cas spécial pour tabularray avec interface modale
  if (template === 'MODAL_INTERFACE') {
    console.log('✅ Using modal interface');
    // Sera géré par le système de modal dans extension.js
    return { replaced: '', newSelection: null };
  }

  // Utiliser processTemplate pour tous les autres cas
  console.log('✅ Using template:', template);
  return processTemplate(template, text, selection);
}

function commentLatex(editor, selections) {
  editor.edit(editBuilder => {
    selections.forEach(selection => {
      const startLine = selection.start.line;
      const endLine = selection.end.line;
      for (let line = startLine; line <= endLine; line++) {
        const lineText = editor.document.lineAt(line).text;
        const lineRange = editor.document.lineAt(line).range;
        const match = lineText.match(/^%+/);
        const percentCount = match ? match[0].length : 0;
        let newText;
        if (percentCount === 0) {
          newText = `% ${lineText}`;
        } else {
          newText = `%${lineText}`;
        }
        editBuilder.replace(lineRange, newText);
      }
    });
  });
}

function uncommentLatex(editor, selections) {
  editor.edit(editBuilder => {
    selections.forEach(selection => {
      const startLine = selection.start.line;
      const endLine = selection.end.line;
      for (let line = startLine; line <= endLine; line++) {
        const lineText = editor.document.lineAt(line).text;
        const lineRange = editor.document.lineAt(line).range;
        if (lineText.startsWith('%')) {
          let newText = lineText.replace(/^%+/, match => {
            if (match.length === 1) {
              return '';
            } else {
              return match.slice(1);
            }
          });
          newText = newText.replace(/^ /, '');
          editBuilder.replace(lineRange, newText);
        }
      }
    });
  });
}

module.exports = {
  handleFormatCommand,
  getFormatCommands,
  commentLatex,
  uncommentLatex
};