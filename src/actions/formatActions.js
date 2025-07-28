const vscode = require('vscode');
const { getFormatCommandVariants, getDefaultFormatVariant } = require('../config/commandFormatVariants');
const { processTemplate } = require('../../utils/utils');

function getFormatCommands() {
  return [
    'bold', 'italic', 'emphasis', 'slanted', 'tt', 'underline', 'smallcaps', 'highlight',
    'mathbb', 'mathcal', 'uppercase', 'lowercase', 'capitalize', 'superscript', 'subscript',
    'footnotesize', 'normalsize', 'tiny', 'scriptsize', 'small', 'large', 'Large', 'LARGE', 'huge', 'Huge', 
    'center', 'flushleft', 'flushright',
    // Commandes d'espacement horizontal
    'quad', 'qquad', 'noindent', 'hspace', 'hfill', 'hbox',
    // Commandes d'espacement vertical
    'smallskip', 'medskip', 'bigskip', 'itemsep', 'baselineskip', 'parskip', 'vspace', 'vfill', 'newpage',
    // Commandes de sections et chapitres
    'chapitres', 'sections', 'paragraphe',
    // Compteurs et étiquettes
    'setlength', 'setcounter', 'label',
    // Environnements
    'enumerate', 'itemize', 'item',
    'minipage', 'multicols', 'tabbing',
    'figure', 'wrapfig', 'includegraphics',
    'tikzpicture', 'tcolorbox', 'listing',
    'table', 'tabular', 'tabularray',
  ];
}

function handleFormatCommand(cmd, editor, selection, text, isMathMode, variantId = null) {
  // Cas spéciaux qui ont leur propre gestion
  if (cmd === 'tabularray' && variantId === 'custom') {
    // Géré par wrapWithCustomParams dans extension.js
    return { replaced: '', newSelection: null };
  }
  
  // Si une variante spécifique est demandée
  if (variantId) {
    const variants = getFormatCommandVariants(cmd);
    if (variants) {
      const variant = variants.variants.find(v => v.id === variantId);
      if (variant) {
        return handleFormatVariant(cmd, variant, editor, selection, text, isMathMode);
      }
    }
  }

  // Sinon, utiliser la variante par défaut
  const variants = getFormatCommandVariants(cmd);
  if (variants) {
    const defaultVariant = getDefaultFormatVariant(cmd);
    if (defaultVariant) {
      return handleFormatVariant(cmd, defaultVariant, editor, selection, text, isMathMode);
    }
  }

  // Fallback - ne devrait pas arriver avec la nouvelle structure
  console.log('⚠️ No variant found for command:', cmd);
  return { replaced: '', newSelection: null };
}

function handleFormatVariant(command, variant, editor, selection, text, isMathMode) {
  // Vérifier si la variante est supportée dans le mode actuel
  if (isMathMode && !variant.supportsMath) {
    return { replaced: '', newSelection: null };
  }
  if (!isMathMode && !variant.supportsText) {
    return { replaced: '', newSelection: null };
  }

  // Récupérer le template approprié
  let template = isMathMode ? variant.mathMode : variant.textMode;
  if (!template) {
    return { replaced: '', newSelection: null };
  }

  // Cas spéciaux pour les transformations de texte
  if (template === 'UPPERCASE_TRANSFORM') {
    return { 
      replaced: text.toUpperCase(), 
      newSelection: text ? new vscode.Selection(selection.start, selection.start.translate(0, text.length)) : null 
    };
  }
  if (template === 'LOWERCASE_TRANSFORM') {
    return { 
      replaced: text.toLowerCase(), 
      newSelection: text ? new vscode.Selection(selection.start, selection.start.translate(0, text.length)) : null 
    };
  }
  if (template === 'CAPITALIZE_TRANSFORM') {
    const capitalized = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    return { 
      replaced: capitalized, 
      newSelection: text ? new vscode.Selection(selection.start, selection.start.translate(0, capitalized.length)) : null 
    };
  }

  // Cas spécial pour tabularray avec interface modale
  if (template === 'MODAL_INTERFACE') {
    // Sera géré par le système de modal dans extension.js
    return { replaced: '', newSelection: null };
  }

  // Utiliser processTemplate pour tous les autres cas
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