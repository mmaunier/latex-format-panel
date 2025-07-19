const vscode = require('vscode');
const { isInMathMode } = require('../../utils/utils');
const { getMathCommandVariants, getDefaultMathVariant } = require('../config/commandMathVariants');

function getMathCommands() {
  return [
    'frac', 'sqrt', 'sum', 'prod', 'int', 'lim', 'sup', 'inf', 'max', 'min', 'matrix', 'inline', 'display', 'superscript', 'subscript',
    'sin', 'cos', 'tan', 'ln', 'exp',
    'leq', 'geq', 'neq', 'approx', 'sim', 'equiv', 'rightarrow', 'leftarrow', 'Rightarrow', 'Leftarrow', 'Leftrightarrow', 'mapsto',
    'left_paren', 'left_bracket', 'left_brace', 'left_abs', 'left_norm',
    'mathbb_N', 'mathbb_Z', 'mathbb_D', 'mathbb_Q', 'mathbb_R', 'mathbb_C',
    'in', 'subset', 'cup', 'cap', 'forall', 'exists', 'cdot', 'dots', 'cdots', 'times', 'div', 'pm',
    'vec', 'widehat', 'underset', 'overset',
    // Environnements mathématiques
    'equation', 'subequations', 'displaystyle',
    // Environnements d'alignement
    'align', 'alignat', 'gather',
    // Nouveaux environnements d'équations spécifiques
    'cases', 'systeme', 'multline', 'split'
  ];
}

function handleMathCommand(cmd, editor, selection, text, isMathMode, variantId = null) {
  // Si une variante spécifique est demandée pour une commande qui en a
  if (variantId) {
    const result = handleMathVariant(cmd, variantId, editor, selection, text, isMathMode);
    if (result) return result;
  }

  // Sinon, utiliser le comportement par défaut ou la variante par défaut
  const variants = getMathCommandVariants(cmd);
  if (variants) {
    const defaultVariant = getDefaultMathVariant(cmd);
    if (defaultVariant) {
      return handleMathVariant(cmd, defaultVariant.id, editor, selection, text, isMathMode);
    }
  }

  // Fallback pour les commandes sans variantes
  return handleLegacyMathCommand(cmd, editor, selection, text, isMathMode);
}

function handleMathVariant(command, variantId, editor, selection, text, isMathMode) {
  const variants = getMathCommandVariants(command);
  if (!variants) return null;

  const variant = variants.variants.find(v => v.id === variantId);
  if (!variant) return null;

  // Vérifier si la variante est supportée dans le mode actuel
  if (isMathMode && !variant.supportsMath) {
    return { replaced: '', newSelection: null };
  }
  if (!isMathMode && !variant.supportsText) {
    return { replaced: '', newSelection: null };
  }

  const template = isMathMode ? variant.mathMode : variant.textMode;
  if (!template) return { replaced: '', newSelection: null };

  return processMathVariantTemplate(template, selection, text, editor);
}

function processMathVariantTemplate(template, selection, text, editor) {
  let replaced = '';
  let newSelection = null;

  // Si le template contient $1 et $0, traiter comme un template avec placeholders
  if (template.includes('$1') || template.includes('$0')) {
    // Remplacer $1 par le texte sélectionné
    replaced = template.replace('$1', text || '');
    
    // Calculer la nouvelle position du curseur
    const cursorIndex = replaced.indexOf('$0');
    if (cursorIndex !== -1) {
      replaced = replaced.replace('$0', '');
      const cursorPos = selection.start.translate(0, cursorIndex);
      newSelection = new vscode.Selection(cursorPos, cursorPos);
    } else {
      newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
    }
    return { replaced, newSelection };
  }

  // Traitement existant pour les autres formats de template
  if (template.includes('{...}{...}')) {
    // Commande avec deux paramètres type \\frac{...}{...}
    const cmdMatch = template.match(/\\([^{]+)\{/);
    if (cmdMatch) {
      const cmdName = cmdMatch[1];
      if (text) {
        replaced = `\\${cmdName}{${text}}{}`;
        const cursorPos = selection.start.translate(0, replaced.length - 1);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      } else {
        replaced = `\\${cmdName}{}{}`;
        const cursorPos = selection.start.translate(0, cmdName.length + 2);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    }
  } else if (template.includes('[n]{...}')) {
    // Commande avec paramètre optionnel type \\sqrt[n]{...}
    const cmdMatch = template.match(/\\([^[]+)\[/);
    if (cmdMatch) {
      const cmdName = cmdMatch[1];
      if (text) {
        replaced = `\\${cmdName}[]{${text}}`;
        const cursorPos = selection.start.translate(0, cmdName.length + 2);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      } else {
        replaced = `\\${cmdName}[]{}`;
        const cursorPos = selection.start.translate(0, cmdName.length + 2);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    }
  } else if (template.includes('{...}')) {
    // Commande standard type \\sqrt{...}
    const cmdMatch = template.match(/\\([^{]+)\{/);
    if (cmdMatch) {
      const cmdName = cmdMatch[1];
      if (text) {
        replaced = `\\${cmdName}{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\${cmdName}{}`;
        const cursorPos = selection.start.translate(0, cmdName.length + 2);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    }
  } else if (template.includes('\\begin{') && template.includes('}\n{...}\n\\end{')) {
    // Environnement matrice type \\begin{pmatrix}\n{...}\n\\end{pmatrix}
    const envMatch = template.match(/\\begin\{([^}]+)\}/);
    if (envMatch) {
      const envName = envMatch[1];
      if (text) {
        replaced = `\\begin{${envName}}\n${text}\n\\end{${envName}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length));
      } else {
        replaced = `\\begin{${envName}}\n\n\\end{${envName}}`;
        const cursorPos = selection.start.translate(1, 0);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    }
  } else if (template.includes(' ')) {
    // Commande simple avec espace type \\in , \\notin 
    const cmdMatch = template.match(/\\([^\s]+)\s/);
    if (cmdMatch) {
      const cmdName = cmdMatch[1];
      replaced = `\\${cmdName} `;
      const cursorPos = selection.start.translate(0, cmdName.length + 2);
      newSelection = new vscode.Selection(cursorPos, cursorPos);
    }
  }

  return { replaced, newSelection };
}

function handleLegacyMathCommand(cmd, editor, selection, text, isMathMode) {
  let replaced = '';
  let newSelection = null;

  switch (cmd) {
    case 'sin':
      replaced = text ? `\\sin(${text})` : `\\sin()`;
      const cursorPosSin = selection.start.translate(0, text ? replaced.length : 5);
      newSelection = new vscode.Selection(cursorPosSin, cursorPosSin);
      break;
    case 'cos':
      replaced = text ? `\\cos(${text})` : `\\cos()`;
      const cursorPosCos = selection.start.translate(0, text ? replaced.length : 5);
      newSelection = new vscode.Selection(cursorPosCos, cursorPosCos);
      break;
    case 'tan':
      replaced = text ? `\\tan(${text})` : `\\tan()`;
      const cursorPosTan = selection.start.translate(0, text ? replaced.length : 5);
      newSelection = new vscode.Selection(cursorPosTan, cursorPosTan);
      break;
    case 'ln':
      replaced = text ? `\\ln(${text})` : `\\ln()`;
      const cursorPosLn = selection.start.translate(0, text ? replaced.length : 4);
      newSelection = new vscode.Selection(cursorPosLn, cursorPosLn);
      break;
    case 'exp':
      replaced = text ? `\\exp(${text})` : `\\exp()`;
      const cursorPosExp = selection.start.translate(0, text ? replaced.length : 5);
      newSelection = new vscode.Selection(cursorPosExp, cursorPosExp);
      break;
    case 'superscript':
      if (isMathMode) {
        replaced = text ? `{${text}}^{}` : `^{}`;
        const cursorPos = selection.start.translate(0, text ? replaced.length - 1 : 2);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'subscript':
      if (isMathMode) {
        replaced = text ? `{${text}}_{}` : `_{}`;
        const cursorPos = selection.start.translate(0, text ? replaced.length - 1 : 2);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'sum':
      replaced = text ? `\\sum_{${text}}^{}` : `\\sum_{}^{}`;
      const cursorPos1 = selection.start.translate(0, text ? replaced.length - 1 : 6);
      newSelection = new vscode.Selection(cursorPos1, cursorPos1);
      break;
    case 'prod':
      replaced = text ? `\\prod_{${text}}^{}` : `\\prod_{}^{}`;
      const cursorPosProd = selection.start.translate(0, text ? replaced.length - 1 : 7);
      newSelection = new vscode.Selection(cursorPosProd, cursorPosProd);
      break;
    case 'int':
      replaced = text ? `\\int_{${text}}^{}` : `\\int_{}^{}`;
      const cursorPos2 = selection.start.translate(0, text ? replaced.length - 1 : 6);
      newSelection = new vscode.Selection(cursorPos2, cursorPos2);
      break;
    case 'lim':
      replaced = text ? `\\lim_{${text}}` : `\\lim_{}`;
      const cursorPos3 = selection.start.translate(0, text ? replaced.length : 6);
      newSelection = new vscode.Selection(cursorPos3, cursorPos3);
      break;
    case 'sup':
      replaced = text ? `\\sup_{${text}}` : `\\sup_{}`;
      const cursorPosSup = selection.start.translate(0, text ? replaced.length : 6);
      newSelection = new vscode.Selection(cursorPosSup, cursorPosSup);
      break;
    case 'inf':
      replaced = text ? `\\inf_{${text}}` : `\\inf_{}`;
      const cursorPosInf = selection.start.translate(0, text ? replaced.length : 6);
      newSelection = new vscode.Selection(cursorPosInf, cursorPosInf);
      break;
    case 'max':
      replaced = text ? `\\max_{${text}}` : `\\max_{}`;
      const cursorPosMax = selection.start.translate(0, text ? replaced.length : 6);
      newSelection = new vscode.Selection(cursorPosMax, cursorPosMax);
      break;
    case 'min':
      replaced = text ? `\\min_{${text}}` : `\\min_{}`;
      const cursorPosMin = selection.start.translate(0, text ? replaced.length : 6);
      newSelection = new vscode.Selection(cursorPosMin, cursorPosMin);
      break;
    // Bloc 6 : Parenthèses ajustables
    case 'left_paren':
      replaced = text ? `\\left(${text}\\right)` : `\\left(\\right)`;
      const cursorPosParen = selection.start.translate(0, text ? replaced.length : 6);
      newSelection = new vscode.Selection(cursorPosParen, cursorPosParen);
      break;
    case 'left_bracket':
      replaced = text ? `\\left[${text}\\right]` : `\\left[\\right]`;
      const cursorPosBracket = selection.start.translate(0, text ? replaced.length : 6);
      newSelection = new vscode.Selection(cursorPosBracket, cursorPosBracket);
      break;
    case 'left_brace':
      replaced = text ? `\\left\\{${text}\\right\\}` : `\\left\\{\\right\\}`;
      const cursorPosBrace = selection.start.translate(0, text ? replaced.length : 7);
      newSelection = new vscode.Selection(cursorPosBrace, cursorPosBrace);
      break;
    case 'left_abs':
      replaced = text ? `\\left|${text}\\right|` : `\\left|\\right|`;
      const cursorPosAbs = selection.start.translate(0, text ? replaced.length : 6);
      newSelection = new vscode.Selection(cursorPosAbs, cursorPosAbs);
      break;
    case 'left_norm':
      replaced = text ? `\\left\\|${text}\\right\\|` : `\\left\\|\\right\\|`;
      const cursorPosNorm = selection.start.translate(0, text ? replaced.length : 7);
      newSelection = new vscode.Selection(cursorPosNorm, cursorPosNorm);
      break;
    case 'matrix':
      replaced = `\\begin{pmatrix}\n${text || ''}\n\\end{pmatrix}`;
      const cursorPos4 = selection.start.translate(1, text ? text.length : 0);
      newSelection = new vscode.Selection(cursorPos4, cursorPos4);
      break;
    case 'inline':
      if (!isMathMode) {
        replaced = text ? `$${text}$` : `$$`;
        const cursorPos5 = selection.start.translate(0, text ? replaced.length : 1);
        newSelection = new vscode.Selection(cursorPos5, cursorPos5);
      }
      break;
    case 'display':
      if (!isMathMode) {
        replaced = text ? `\\[${text}\\]` : `\\[\n\n\\]`;
        const cursorPos6 = text ? 
          selection.start.translate(0, replaced.length) :
          selection.start.translate(1, 0);
        newSelection = new vscode.Selection(cursorPos6, cursorPos6);
      }
      break;
    case 'leq':
      replaced = '\\leq ';
      newSelection = new vscode.Selection(selection.start.translate(0, 5), selection.start.translate(0, 5));
      break;
    case 'geq':
      replaced = '\\geq ';
      newSelection = new vscode.Selection(selection.start.translate(0, 5), selection.start.translate(0, 5));
      break;
    case 'neq':
      replaced = '\\neq ';
      newSelection = new vscode.Selection(selection.start.translate(0, 5), selection.start.translate(0, 5));
      break;
    case 'approx':
      replaced = '\\approx ';
      newSelection = new vscode.Selection(selection.start.translate(0, 8), selection.start.translate(0, 8));
      break;
    case 'sim':
      replaced = '\\sim ';
      newSelection = new vscode.Selection(selection.start.translate(0, 5), selection.start.translate(0, 5));
      break;
    case 'equiv':
      replaced = '\\equiv ';
      newSelection = new vscode.Selection(selection.start.translate(0, 7), selection.start.translate(0, 7));
      break;
    case 'rightarrow':
      replaced = '\\rightarrow ';
      newSelection = new vscode.Selection(selection.start.translate(0, 12), selection.start.translate(0, 12));
      break;
    case 'leftarrow':
      replaced = '\\leftarrow ';
      newSelection = new vscode.Selection(selection.start.translate(0, 11), selection.start.translate(0, 11));
      break;
    case 'Rightarrow':
      replaced = '\\Rightarrow ';
      newSelection = new vscode.Selection(selection.start.translate(0, 12), selection.start.translate(0, 12));
      break;
    case 'Leftarrow':
      replaced = '\\Leftarrow ';
      newSelection = new vscode.Selection(selection.start.translate(0, 11), selection.start.translate(0, 11));
      break;
    case 'Leftrightarrow':
      replaced = '\\Leftrightarrow ';
      newSelection = new vscode.Selection(selection.start.translate(0, 16), selection.start.translate(0, 16));
      break;
    case 'mapsto':
      replaced = '\\mapsto ';
      newSelection = new vscode.Selection(selection.start.translate(0, 8), selection.start.translate(0, 8));
      break;
    // Bloc 7 : Ensembles de nombres
    case 'mathbb_N':
      replaced = '\\mathbb{N}';
      newSelection = new vscode.Selection(selection.start.translate(0, 10), selection.start.translate(0, 10));
      break;
    case 'mathbb_Z':
      replaced = '\\mathbb{Z}';
      newSelection = new vscode.Selection(selection.start.translate(0, 10), selection.start.translate(0, 10));
      break;
    case 'mathbb_D':
      replaced = '\\mathbb{D}';
      newSelection = new vscode.Selection(selection.start.translate(0, 10), selection.start.translate(0, 10));
      break;
    case 'mathbb_Q':
      replaced = '\\mathbb{Q}';
      newSelection = new vscode.Selection(selection.start.translate(0, 10), selection.start.translate(0, 10));
      break;
    case 'mathbb_R':
      replaced = '\\mathbb{R}';
      newSelection = new vscode.Selection(selection.start.translate(0, 10), selection.start.translate(0, 10));
      break;
    case 'mathbb_C':
      replaced = '\\mathbb{C}';
      newSelection = new vscode.Selection(selection.start.translate(0, 10), selection.start.translate(0, 10));
      break;
      
    // Bloc 8 : Symboles logiques et ensemblistes
    case 'in':
      replaced = '\\in ';
      newSelection = new vscode.Selection(selection.start.translate(0, 4), selection.start.translate(0, 4));
      break;
    case 'subset':
      replaced = '\\subset ';
      newSelection = new vscode.Selection(selection.start.translate(0, 8), selection.start.translate(0, 8));
      break;
    case 'cup':
      replaced = '\\cup ';
      newSelection = new vscode.Selection(selection.start.translate(0, 5), selection.start.translate(0, 5));
      break;
    case 'cap':
      replaced = '\\cap ';
      newSelection = new vscode.Selection(selection.start.translate(0, 5), selection.start.translate(0, 5));
      break;
    case 'forall':
      replaced = '\\forall ';
      newSelection = new vscode.Selection(selection.start.translate(0, 8), selection.start.translate(0, 8));
      break;
    case 'exists':
      replaced = '\\exists ';
      newSelection = new vscode.Selection(selection.start.translate(0, 8), selection.start.translate(0, 8));
      break;
    case 'cdot':
      replaced = '\\cdot ';
      newSelection = new vscode.Selection(selection.start.translate(0, 6), selection.start.translate(0, 6));
      break;
    case 'dots':
      replaced = '\\dots ';
      newSelection = new vscode.Selection(selection.start.translate(0, 6), selection.start.translate(0, 6));
      break;
    case 'cdots':
      replaced = '\\cdots ';
      newSelection = new vscode.Selection(selection.start.translate(0, 7), selection.start.translate(0, 7));
      break;
    case 'times':
      replaced = '\\times ';
      newSelection = new vscode.Selection(selection.start.translate(0, 7), selection.start.translate(0, 7));
      break;
    case 'div':
      replaced = '\\div ';
      newSelection = new vscode.Selection(selection.start.translate(0, 5), selection.start.translate(0, 5));
      break;
    case 'pm':
      replaced = '\\pm ';
      newSelection = new vscode.Selection(selection.start.translate(0, 4), selection.start.translate(0, 4));
      break;
    // Bloc 9 : Vecteurs et texte positionné
    case 'vec':
      replaced = text ? `\\vec{${text}}` : `\\vec{}`;
      const cursorPosVec = selection.start.translate(0, text ? replaced.length : 5);
      newSelection = new vscode.Selection(cursorPosVec, cursorPosVec);
      break;
    case 'widehat':
      replaced = text ? `\\widehat{${text}}` : `\\widehat{}`;
      const cursorPosWidehat = selection.start.translate(0, text ? replaced.length : 9);
      newSelection = new vscode.Selection(cursorPosWidehat, cursorPosWidehat);
      break;
    case 'underset':
      replaced = text ? `\\underset{}{${text}}` : `\\underset{}{}`;
      const cursorPosUnderset = selection.start.translate(0, 10);
      newSelection = new vscode.Selection(cursorPosUnderset, cursorPosUnderset);
      break;
    case 'overset':
      replaced = text ? `\\overset{}{${text}}` : `\\overset{}{}`;
      const cursorPosOverset = selection.start.translate(0, 9);
      newSelection = new vscode.Selection(cursorPosOverset, cursorPosOverset);
      break;
      
    // Nouveaux environnements mathématiques
    case 'equation':
      replaced = text ? `\\begin{equation}\n${text}\n\\end{equation}` : `\\begin{equation}\n$1\n\\end{equation}$0`;
      if (!text) {
        const template = processMathVariantTemplate(replaced, selection, '', editor);
        return template;
      }
      newSelection = new vscode.Selection(selection.start.translate(0, replaced.length), selection.start.translate(0, replaced.length));
      break;

    case 'subequations':
      replaced = text ? `\\begin{subequations}\n${text}\n\\end{subequations}` : `\\begin{subequations}\n$1\n\\end{subequations}$0`;
      if (!text) {
        const template = processMathVariantTemplate(replaced, selection, '', editor);
        return template;
      }
      newSelection = new vscode.Selection(selection.start.translate(0, replaced.length), selection.start.translate(0, replaced.length));
      break;

    case 'displaystyle':
      replaced = '\\displaystyle $0';
      const template = processMathVariantTemplate(replaced, selection, '', editor);
      return template;
      break;
  }

  return { replaced, newSelection };
}

module.exports = { handleMathCommand, getMathCommands };