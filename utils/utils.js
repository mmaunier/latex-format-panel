const vscode = require('vscode');

function isInMathMode(document, position) {
   console.log('🔍 isInMathMode called at position:', position.line, position.character);
   const textBeforeCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
   
   // Supprimer les commentaires pour éviter les faux positifs
   let textWithoutComments = textBeforeCursor.replace(/([^\\]|^)%.*$/gm, '$1');

   // Supprimer uniquement les variables shell connues (HOME, PATH, USER, SHELL, PWD, LOGNAME, LANG, TERM, DISPLAY, MAIL, EDITOR, HOSTNAME, etc.)
   // Supprimer les variables shell (version plus permissive)
   textWithoutComments = textWithoutComments.replace(/\$(HOME|PATH|USER|SHELL|PWD|LOGNAME|LANG|TERM|DISPLAY|MAIL|EDITOR|HOSTNAME)(?!\w)/g, '');
   console.log('Text contains $HOME:', textWithoutComments.includes('$HOME'));

   // Compter les délimiteurs math
   const dollarCount = (textWithoutComments.match(/(?<!\\)\$/g) || []).length;
   const doubleDollarCount = (textWithoutComments.match(/(?<!\\)\$\$/g) || []).length;

   // Vérifier les délimiteurs \[ et \]
   const displayMathOpenCount = (textWithoutComments.match(/(?<!\\)\\\[/g) || []).length;
   const displayMathCloseCount = (textWithoutComments.match(/(?<!\\)\\\]/g) || []).length;
   const inDisplayMathBrackets = (displayMathOpenCount > displayMathCloseCount);

   // Vérifier les environnements math
   const mathEnvs = ['equation', 'align', 'gather', 'multline', 'flalign', 'alignat'];
   let inMathEnv = false;

   for (const env of mathEnvs) {
      const beginCount = (textWithoutComments.match(new RegExp(`\\\\begin\\{${env}\\*?\\}`, 'g')) || []).length;
      const endCount = (textWithoutComments.match(new RegExp(`\\\\end\\{${env}\\*?\\}`, 'g')) || []).length;
      if (beginCount > endCount) {
         inMathEnv = true;
         break;
      }
   }

   // Mode math si nombre impair de $ (moins les $$) ou dans un environnement math ou entre \[ et \]
   const singleDollarCount = dollarCount - (doubleDollarCount * 2);
   const inInlineMath = (singleDollarCount % 2 === 1);
   const inDisplayMath = (doubleDollarCount % 2 === 1);

   return inInlineMath || inDisplayMath || inMathEnv || inDisplayMathBrackets;
}

module.exports = { isInMathMode };