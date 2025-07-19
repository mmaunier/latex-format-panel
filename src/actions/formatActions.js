const vscode = require('vscode');
const { getFormatCommandVariants, getDefaultFormatVariant } = require('../config/commandFormatVariants');

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
    'table', 'tabular', 'tabularray'
  ];
}

function handleFormatCommand(cmd, editor, selection, text, isMathMode, variantId = null) {
  // Si une variante spécifique est demandée pour une commande qui en a
  if (variantId) {
    const result = handleFormatVariant(cmd, variantId, editor, selection, text, isMathMode);
    if (result) return result;
  }

  // Sinon, utiliser le comportement par défaut ou la variante par défaut
  const variants = getFormatCommandVariants(cmd);
  if (variants) {
    const defaultVariant = getDefaultFormatVariant(cmd);
    if (defaultVariant) {
      return handleFormatVariant(cmd, defaultVariant.id, editor, selection, text, isMathMode);
    }
  }

  // Fallback pour les commandes sans variantes
  return handleLegacyFormatCommand(cmd, editor, selection, text, isMathMode);
}

function handleFormatVariant(command, variantId, editor, selection, text, isMathMode) {
  const variants = getFormatCommandVariants(command);
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

  return processVariantTemplate(template, selection, text, editor);
}

function processVariantTemplate(template, selection, text, editor) {
  let replaced = '';
  let newSelection = null;

  // Traitement selon le type de template
  if (template.includes('\\begin{') && template.includes('\\end{')) {
    // Environnement (enumerate, itemize, tasks)
    if (template.includes('\\begin{enumerate}')) {
      if (text) {
        replaced = `\\begin{enumerate}\n\\item ${text}\n\\end{enumerate}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length + 6));
      } else {
        replaced = `\\begin{enumerate}\n\\item \n\\end{enumerate}`;
        const cursorPos = selection.start.translate(1, 6); // Position après \item 
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    } else if (template.includes('\\begin{itemize}')) {
      if (text) {
        replaced = `\\begin{itemize}\n\\item ${text}\n\\end{itemize}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length + 6));
      } else {
        replaced = `\\begin{itemize}\n\\item \n\\end{itemize}`;
        const cursorPos = selection.start.translate(1, 6); // Position après \item 
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    } else if (template.includes('\\begin{tasks}')) {
      // Traitement spécial pour les environnements tasks
      if (text) {
        replaced = template.replace('\\task ', `\\task ${text}`);
        // Trouver la position du curseur après le texte
        const taskPos = replaced.indexOf('\\task ') + 6;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(1, taskPos + text.length));
      } else {
        replaced = template;
        // Positionner le curseur après \task 
        const lines = replaced.split('\n');
        const taskLineIndex = lines.findIndex(line => line.includes('\\task '));
        if (taskLineIndex !== -1) {
          const taskPos = lines[taskLineIndex].indexOf('\\task ') + 6;
          const cursorPos = selection.start.translate(taskLineIndex, taskPos);
          newSelection = new vscode.Selection(cursorPos, cursorPos);
        }
      }
    } else {
      // Environnement générique
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
    }
  } else if (template.includes('\\hfg ... \\hfd')) {
    // Commande personnalisée pour centrer
    if (text) {
      replaced = `\\hfg ${text} \\hfd`;
      newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
    } else {
      replaced = `\\hfg  \\hfd`;
      const cursorPos = selection.start.translate(0, 5); // Position entre \hfg et \hfd
      newSelection = new vscode.Selection(cursorPos, cursorPos);
    }
  } else if (template.includes('{\\') && template.includes(' ...}')) {
    // Commande de déclaration type {\\bfseries ...}
    const cmdMatch = template.match(/\{\\([^}]+) \.\.\.\}/);
    if (cmdMatch) {
      const cmdName = cmdMatch[1];
      if (text) {
        replaced = `{\\${cmdName} ${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `{\\${cmdName} }`;
        const cursorPos = selection.start.translate(0, cmdName.length + 3);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    }
  } else if (template.includes('{...}')) {
    // Commande standard type \\textbf{...}
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
  } else if (template.includes('{...}{...}')) {
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
  } else if (template.match(/^\\[a-zA-Z*]+(\([0-9]+\))?\s*$/)) {
    // Commandes simples type \\item, \\task, \\task*, \\task*(2)
    const cmdMatch = template.match(/^\\([a-zA-Z*]+)(\([0-9]+\))?\s*$/);
    if (cmdMatch) {
      const cmdName = cmdMatch[1];
      const params = cmdMatch[2] || '';
      if (text) {
        replaced = `\\${cmdName}${params} ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\${cmdName}${params} `;
        const cursorPos = selection.start.translate(0, replaced.length);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    }
  } else if (template.match(/^\\[a-zA-Z]+$/)) {
    // Commande de déclaration simple type \\tiny, \\large, \\centering, \\raggedright, etc.
    const cmdName = template.substring(1); // Enlever le backslash
    if (text) {
      // Avec sélection : entourer avec des accolades
      replaced = `{\\${cmdName} ${text}}`;
      newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
    } else {
      // Sans sélection : insérer la commande avec un espace
      const nextChar = editor.document.getText(new vscode.Range(selection.start, selection.start.translate(0, 1)));
      const needsSpace = nextChar !== '' && nextChar !== ' ' && nextChar !== '\n';
      replaced = `\\${cmdName}${needsSpace ? ' ' : ''}`;
      const cursorPos = selection.start.translate(0, replaced.length);
      newSelection = new vscode.Selection(cursorPos, cursorPos);
    }
  } else if (template.includes('$1') && template.includes('$0')) {
    // Gestion des templates avec marqueurs $1 et $0
    const cmdMatch = template.match(/\\([a-zA-Z]+)\{/);
    if (cmdMatch) {
      const cmdName = cmdMatch[1];
      if (text) {
        replaced = template.replace('$1', text).replace('$0', '');
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\${cmdName}{}`;
        const cursorPos = selection.start.translate(0, cmdName.length + 2);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
    }
  }

  return { replaced, newSelection };
}

function handleLegacyFormatCommand(cmd, editor, selection, text, isMathMode) {
  let replaced = '';
  let newSelection = null;

  switch (cmd) {
    case 'emphasis':
      if (text) {
        replaced = `\\emph{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\emph{}`;
        const cursorPos = selection.start.translate(0, 6);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'slanted':
      if (text) {
        replaced = `\\textsl{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\textsl{}`;
        const cursorPos = selection.start.translate(0, 8);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'tt':
      if (text) {
        replaced = `\\texttt{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\texttt{}`;
        const cursorPos = selection.start.translate(0, 8);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'underline':
      if (text) {
        replaced = `\\underline{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\underline{}`;
        const cursorPos = selection.start.translate(0, 11);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'smallcaps':
      if (text) {
        replaced = `\\textsc{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\textsc{}`;
        const cursorPos = selection.start.translate(0, 8);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'highlight':
      if (text) {
        replaced = isMathMode ? `\\SurlignerFormule{${text}}` : `\\SurlignerTexte{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = isMathMode ? `\\SurlignerFormule{}` : `\\SurlignerTexte{}`;
        const cursorPos = selection.start.translate(0, isMathMode ? 18 : 16);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'mathbb':
      if (!isMathMode) return { replaced: '', newSelection: null };
      if (text) {
        replaced = `\\mathbb{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\mathbb{}`;
        const cursorPos = selection.start.translate(0, 8);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'mathcal':
      if (!isMathMode) return { replaced: '', newSelection: null };
      if (text) {
        replaced = `\\mathcal{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\mathcal{}`;
        const cursorPos = selection.start.translate(0, 9);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'uppercase':
      replaced = text.toUpperCase();
      if (text) {
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      }
      break;
    case 'lowercase':
      replaced = text.toLowerCase();
      if (text) {
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      }
      break;
    case 'capitalize':
      replaced = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      if (text) {
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      }
      break;
    case 'superscript':
      if (isMathMode) {
        if (text) {
          replaced = `^{${text}}`;
          newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
        } else {
          replaced = `^{}`;
          const cursorPos = selection.start.translate(0, 2);
          newSelection = new vscode.Selection(cursorPos, cursorPos);
        }
      } else {
        if (text) {
          replaced = `\\textsuperscript{${text}}`;
          newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
        } else {
          replaced = `\\textsuperscript{}`;
          const cursorPos = selection.start.translate(0, 16);
          newSelection = new vscode.Selection(cursorPos, cursorPos);
        }
      }
      break;
    case 'subscript':
      if (isMathMode) {
        if (text) {
          replaced = `_{${text}}`;
          newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
        } else {
          replaced = `_{}`;
          const cursorPos = selection.start.translate(0, 2);
          newSelection = new vscode.Selection(cursorPos, cursorPos);
        }
      } else {
        if (text) {
          replaced = `\\textsubscript{${text}}`;
          newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
        } else {
          replaced = `\\textsubscript{}`;
          const cursorPos = selection.start.translate(0, 15);
          newSelection = new vscode.Selection(cursorPos, cursorPos);
        }
      }
      break;
    case 'footnotesize':
    case 'normalsize':
    case 'tiny':
    case 'scriptsize':
    case 'small':
    case 'large':
    case 'Large':
    case 'LARGE':
    case 'huge':
    case 'Huge':
      if (text) {
        replaced = `\\begin{${cmd}}\n${text}\n\\end{${cmd}}`;
      } else {
        const nextChar = editor.document.getText(new vscode.Range(selection.start, selection.start.translate(0, 1)));
        const needsSpace = nextChar !== '' && nextChar !== ' ' && nextChar !== '\n';
        replaced = `\\${cmd}${needsSpace ? ' ' : ''}`;
        const cursorPos = selection.start.translate(0, replaced.length);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'center':
      if (text) {
        replaced = `\\begin{center}\n${text}\n\\end{center}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length));
      } else {
        replaced = `\\centering `;
        const cursorPos = selection.start.translate(0, 11);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'flushleft':
      if (text) {
        replaced = `\\begin{flushleft}\n${text}\n\\end{flushleft}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length));
      } else {
        replaced = `\\raggedright `;
        const cursorPos = selection.start.translate(0, 13);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'flushright':
      if (text) {
        replaced = `\\begin{flushright}\n${text}\n\\end{flushright}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length));
      } else {
        replaced = `\\raggedleft `;
        const cursorPos = selection.start.translate(0, 12);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    // Bloc 1 : Mise en page
    case 'minipage':
      if (text) {
        replaced = `\\begin{minipage}{0.4\\textwidth}\n${text}\n\\end{minipage}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length));
      } else {
        replaced = `\\begin{minipage}{0.4\\textwidth}\n\n\\end{minipage}`;
        const cursorPos = selection.start.translate(1, 0);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'multicols':
      if (text) {
        replaced = `\\begin{multicols}{2}\n${text}\n\\end{multicols}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length));
      } else {
        replaced = `\\begin{multicols}{2}\n\n\\end{multicols}`;
        const cursorPos = selection.start.translate(1, 0);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'tabbing':
      if (text) {
        replaced = `\\begin{tabbing}\n${text}\n\\end{tabbing}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length));
      } else {
        replaced = `\\begin{tabbing}\n\n\\end{tabbing}`;
        const cursorPos = selection.start.translate(1, 0);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    // Bloc 2 : Figures
    case 'figure':
      if (text) {
        replaced = `\\begin{figure}[htbp]\n\\centering\n\\includegraphics[width=0.25\\textwidth]{${text}}\n\\caption{Ma légende}\n\\end{figure}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(4, text.length + 50));
      } else {
        replaced = `\\begin{figure}[htbp]\n\\centering\n\\includegraphics[width=0.25\\textwidth]{}\n\\caption{Ma légende}\n\\end{figure}`;
        const cursorPos = selection.start.translate(2, 43); // Position dans {}
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'wrapfig':
      if (text) {
        replaced = `\\begin{wrapfigure}{r}{0.25\\textwidth} % {alignement}{largeur}\n\\centering\n\\includegraphics[width=0.25\\textwidth]{${text}}\n\\caption{Ma légende}\n\\end{wrapfigure}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(4, text.length + 50));
      } else {
        replaced = `\\begin{wrapfigure}{r}{0.25\\textwidth} % {alignement}{largeur}\n\\centering\n\\includegraphics[width=0.25\\textwidth]{}\n\\caption{Ma légende}\n\\end{wrapfigure}`;
        const cursorPos = selection.start.translate(2, 43); // Position dans {}
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'includegraphics':
      if (text) {
        replaced = `\\includegraphics[width=0.25\\textwidth]{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = `\\includegraphics[width=0.25\\textwidth]{}`;
        const cursorPos = selection.start.translate(0, 39); // Position dans {}
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    // Bloc 3 : Dessin et code
    case 'tikzpicture':
      if (text) {
        replaced = `\\begin{tikzpicture}[baseline=(current bounding box.base), yshift=1ex]\n${text}\n\\end{tikzpicture}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length));
      } else {
        replaced = `\\begin{tikzpicture}[baseline=(current bounding box.base), yshift=1ex]\n\n\\end{tikzpicture}`;
        const cursorPos = selection.start.translate(1, 0);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'tcolorbox':
      if (text) {
        replaced = `\\begin{tcolorbox}[enhanced, colframe=red, colback=white,\narc=4mm, boxrule=1pt]\n${text}\n\\end{tcolorbox}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(3, text.length));
      } else {
        replaced = `\\begin{tcolorbox}[enhanced, colframe=red, colback=white,\narc=4mm, boxrule=1pt]\n\n\\end{tcolorbox}`;
        const cursorPos = selection.start.translate(2, 0);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'listing':
      if (text) {
        replaced = `\\begin{lstlisting}[language=Python]\n${text}\n\\end{lstlisting}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length));
      } else {
        replaced = `\\begin{lstlisting}[language=Python]\n\n\\end{lstlisting}`;
        const cursorPos = selection.start.translate(1, 0);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    // Bloc 4 : Tableaux
    case 'table':
      if (text) {
        replaced = `\\begin{table}[htbp]\n\\centering\n\\begin{tabular}{|c|c|}\n${text}\n\\end{tabular}\n\\caption{Ma légende}\n\\end{table}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(6, text.length));
      } else {
        replaced = `\\begin{table}[htbp]\n\\centering\n\\begin{tabular}{|c|c|}\n\n\\end{tabular}\n\\caption{Ma légende}\n\\end{table}`;
        const cursorPos = selection.start.translate(3, 0);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'tabular':
      if (text) {
        replaced = `\\begin{tabular}{|c|c|}\n${text}\n\\end{tabular}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(2, text.length));
      } else {
        replaced = `\\begin{tabular}{|c|c|}\n\n\\end{tabular}`;
        const cursorPos = selection.start.translate(1, 0);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    case 'tabularray':
      if (text) {
        replaced = `\\begin{tblr}{%\nwidth=\\textwidth,%\nhlines,%\nvlines,%\nrows={1.6\\baselineskip},%\nvline{1}={2-8}{solid},%\nrow{8-10}={blue!20},%\nrow{1}={gristclair, font=\\bfseries, c},%\ncolspec={X[1,c,m]X[2,c,m]}%\n}\n\\cline{2-3}\n${text}\n\\end{tblr}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(12, text.length));
      } else {
        replaced = `\\begin{tblr}{%\nwidth=\\textwidth,%\nhlines,%\nvlines,%\nrows={1.6\\baselineskip},%\nvline{1}={2-8}{solid},%\nrow{8-10}={blue!20},%\nrow{1}={gristclair, font=\\bfseries, c},%\ncolspec={X[1,c,m]X[2,c,m]}%\n}\n\\cline{2-3}\n\n\\end{tblr}`;
        const cursorPos = selection.start.translate(11, 0);
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
    
    case 'quad':
      if (text) {
        replaced = `\\quad ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\quad ';
        const cursorPos = selection.start.translate(0, 6); // Position après \quad
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'qquad':
      if (text) {
        replaced = `\\qquad ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\qquad ';
        const cursorPos = selection.start.translate(0, 7); // Position après \qquad
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'noindent':
      if (text) {
        replaced = `\\noindent ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\noindent ';
        const cursorPos = selection.start.translate(0, 10); // Position après \noindent
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'hspace':
      if (text) {
        replaced = `\\hspace{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\hspace{}';
        const cursorPos = selection.start.translate(0, 8); // Position entre les accolades
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'hfill':
      if (text) {
        replaced = `\\hfill ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\hfill ';
        const cursorPos = selection.start.translate(0, 7); // Position après \hfill
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'hbox':
      if (text) {
        replaced = `\\hbox{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\hbox{}';
        const cursorPos = selection.start.translate(0, 6); // Position entre les accolades
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'smallskip':
      if (text) {
        replaced = `\\smallskip ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\smallskip ';  // Ajout d'un espace après la commande
        const cursorPos = selection.start.translate(0, 11); // Position après \smallskip et l'espace
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'medskip':
      if (text) {
        replaced = `\\medskip ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\medskip ';  // Ajout d'un espace après la commande
        const cursorPos = selection.start.translate(0, 9); // Position après \medskip et l'espace
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'bigskip':
      if (text) {
        replaced = `\\bigskip ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\bigskip ';  // Ajout d'un espace après la commande
        const cursorPos = selection.start.translate(0, 9); // Position après \bigskip et l'espace
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'itemsep':
      if (text) {
        replaced = `\\itemsep ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\itemsep ';  // Ajout d'un espace après la commande
        const cursorPos = selection.start.translate(0, 9); // Position après \itemsep et l'espace
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'baselineskip':
      if (text) {
        replaced = `\\baselineskip ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\baselineskip ';  // Ajout d'un espace après la commande
        const cursorPos = selection.start.translate(0, 13); // Position après \baselineskip et l'espace
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'parskip':
      if (text) {
        replaced = `\\parskip ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\parskip ';  // Ajout d'un espace après la commande
        const cursorPos = selection.start.translate(0, 9); // Position après \parskip et l'espace
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'vspace':
      if (text) {
        replaced = `\\vspace{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\vspace{}';
        const cursorPos = selection.start.translate(0, 8); // Position entre les accolades
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'vfill':
      if (text) {
        replaced = `\\vfill ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\vfill ';  // Ajout d'un espace après la commande
        const cursorPos = selection.start.translate(0, 7); // Position après \vfill et l'espace
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'newpage':
      if (text) {
        replaced = `\\newpage ${text}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\newpage ';  // Ajout d'un espace après la commande
        const cursorPos = selection.start.translate(0, 9); // Position après \newpage et l'espace
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;
      
    // Gestionnaire pour Chapitres
    case 'chapitres':
      if (text) {
        replaced = `\\chapter{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\chapter{}';
        const cursorPos = selection.start.translate(0, 9); // Position entre les accolades
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    // Gestionnaire pour Sections
    case 'sections':
      if (text) {
        replaced = `\\section{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\section{}';
        const cursorPos = selection.start.translate(0, 9); // Position entre les accolades
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    // Gestionnaire pour Paragraphe
    case 'paragraphe':
      if (text) {
        replaced = `\\paragraph{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\paragraph{}';
        const cursorPos = selection.start.translate(0, 11); // Position entre les accolades
        newSelection = new vscode.Selection(cursorPos, cursorPos);
      }
      break;

    case 'setlength':
      if (text) {
        replaced = `\\setlength{${text}}{}`;  // Premier paramètre: nom de la longueur, second: valeur
        const cursorPosSetLength = selection.start.translate(0, replaced.length - 1);
        newSelection = new vscode.Selection(cursorPosSetLength, cursorPosSetLength);
      } else {
        replaced = '\\setlength{}{}';  // Deux paramètres: {nom}{valeur}
        const cursorPosSetLength = selection.start.translate(0, 11); // Position dans les premières accolades
        newSelection = new vscode.Selection(cursorPosSetLength, cursorPosSetLength);
      }
      break;

    case 'setcounter':
      if (text) {
        replaced = `\\setcounter{${text}}{}`;
        const cursorPosSetCounter = selection.start.translate(0, replaced.length - 1);
        newSelection = new vscode.Selection(cursorPosSetCounter, cursorPosSetCounter);
      } else {
        replaced = '\\setcounter{}{}';
        const cursorPosSetCounter = selection.start.translate(0, 12); // Position entre les premières accolades
        newSelection = new vscode.Selection(cursorPosSetCounter, cursorPosSetCounter);
      }
      break;

    case 'label':
      if (text) {
        replaced = `\\label{${text}}`;
        newSelection = new vscode.Selection(selection.start, selection.start.translate(0, replaced.length));
      } else {
        replaced = '\\label{}';
        const cursorPosLabel = selection.start.translate(0, 7); // Position entre les accolades
        newSelection = new vscode.Selection(cursorPosLabel, cursorPosLabel);
      }
      break;
  }

  return { replaced, newSelection };
}

module.exports = { handleFormatCommand, getFormatCommands };