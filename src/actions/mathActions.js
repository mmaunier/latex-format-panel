const vscode = require('vscode');
const { isInMathMode, processTemplate } = require('../../utils/utils');
const { getMathCommandVariants, getDefaultMathVariant, getMathSimpleCommand } = require('../config/commandMathVariants');

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
  console.log('🔍 handleMathCommand called with:', cmd, 'variantId:', variantId, 'isMathMode:', isMathMode);

  // 1. Vérifier si c'est une commande avec variantes
  if (variantId) {
    const result = handleMathVariant(cmd, variantId, editor, selection, text, isMathMode);
    if (result) return result;
  }

  // 2. Vérifier si c'est une commande avec variantes (utiliser la variante par défaut)
  const variants = getMathCommandVariants(cmd);
  if (variants) {
    const defaultVariant = getDefaultMathVariant(cmd);
    if (defaultVariant) {
      return handleMathVariant(cmd, defaultVariant.id, editor, selection, text, isMathMode);
    }
  }

  // 3. Vérifier si c'est une commande simple
  const simpleCommand = getMathSimpleCommand(cmd);
  if (simpleCommand) {
    return handleMathSimpleCommand(cmd, simpleCommand, editor, selection, text, isMathMode);
  }

  console.log('❌ Unknown math command:', cmd);
  return { replaced: '', newSelection: null };
}

function handleMathVariant(command, variantId, editor, selection, text, isMathMode) {
  console.log('🎯 handleMathVariant called:', command, variantId);
  
  const variants = getMathCommandVariants(command);
  if (!variants) return null;

  const variant = variants.variants.find(v => v.id === variantId);
  if (!variant) return null;

  // Vérifier si la variante est supportée dans le mode actuel
  if (isMathMode && !variant.supportsMath) {
    console.log('❌ Variant not supported in math mode');
    return { replaced: '', newSelection: null };
  }
  if (!isMathMode && !variant.supportsText) {
    console.log('❌ Variant not supported in text mode');
    return { replaced: '', newSelection: null };
  }

  const template = isMathMode ? variant.mathMode : variant.textMode;
  if (!template) {
    console.log('❌ No template for current mode');
    return { replaced: '', newSelection: null };
  }

  console.log('✅ Using template:', template);
  return processTemplate(template, text, selection);
}

function handleMathSimpleCommand(command, simpleCommand, editor, selection, text, isMathMode) {
  console.log('🎯 handleMathSimpleCommand called:', command);

  // Vérifier si la commande est supportée dans le mode actuel
  if (isMathMode && !simpleCommand.supportsMath) {
    console.log('❌ Simple command not supported in math mode');
    return { replaced: '', newSelection: null };
  }
  if (!isMathMode && !simpleCommand.supportsText) {
    console.log('❌ Simple command not supported in text mode');
    return { replaced: '', newSelection: null };
  }

  const template = isMathMode ? simpleCommand.mathMode : simpleCommand.textMode;
  if (!template) {
    console.log('❌ No template for current mode');
    return { replaced: '', newSelection: null };
  }

  console.log('✅ Using simple template:', template);
  return processTemplate(template, text, selection);
}

module.exports = { handleMathCommand, getMathCommands };