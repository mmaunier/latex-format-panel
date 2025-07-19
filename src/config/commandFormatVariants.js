const formatCommandVariants = {
   bold: {
      default: 'textbf',
      variants: [
         {
            id: 'textbf',
            label: '\\textbf{...}',
            description: 'Commande standard',
            package: null,
            mathMode: '\\symbf{...}',
            textMode: '\\textbf{...}',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'symbf',
            label: '\\symbf{...}',
            description: 'Commande mathématiques',
            package: null,
            mathMode: '\\symbf{...}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'bfseries',
            label: '{\\bfseries ...}',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '{\\bfseries ...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'bfseries_env',
            label: '\\begin{bfseries}...\\end{bfseries}',
            description: 'Environnement (non standard)',
            package: null,
            mathMode: null,
            textMode: '\\begin{bfseries}...\\end{bfseries}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   italic: {
      default: 'textit',
      variants: [
         {
            id: 'textit',
            label: '\\textit{...}',
            description: 'Commande standard',
            package: null,
            mathMode: '\\mathit{...}',
            textMode: '\\textit{...}',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'itshape',
            label: '{\\itshape ...}',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '{\\itshape ...}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   slanted: {
      default: 'textsl',
      variants: [
         {
            id: 'textsl',
            label: '\\textsl{...}',
            description: 'Commande standard',
            package: null,
            mathMode: null,
            textMode: '\\textsl{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'slshape',
            label: '{\\slshape ...}',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '{\\slshape ...}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   tt: {
      default: 'texttt',
      variants: [
         {
            id: 'texttt',
            label: '\\texttt{...}',
            description: 'Commande standard',
            package: null,
            mathMode: null,
            textMode: '\\texttt{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'ttshape',
            label: '{\\ttshape ...}',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '{\\ttshape ...}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   underline: {
      default: 'uline',
      variants: [
         {
            id: 'uline',
            label: '\\uline{...}',
            description: 'Souligné simple (≠ \\underline)',
            package: 'ulem',
            mathMode: '\\uline{...}',
            textMode: '\\uline{...}',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'uuline',
            label: '\\uuline{...}',
            description: 'Double souligné',
            package: 'ulem',
            mathMode: null,
            textMode: '\\uuline{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'uwave',
            label: '\\uwave{...}',
            description: 'Souligné en vague',
            package: 'ulem',
            mathMode: null,
            textMode: '\\uwave{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'dashuline',
            label: '\\dashuline{...}',
            description: 'Souligné par des traits',
            package: 'ulem',
            mathMode: null,
            textMode: '\\dashuline{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'dotuline',
            label: '\\dotuline{...}',
            description: 'Souligné par des points',
            package: 'ulem',
            mathMode: null,
            textMode: '\\dotuline{...}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   smallcaps: {
      default: 'textsc',
      variants: [
         {
            id: 'textsc',
            label: '\\textsc{...}',
            description: 'Commande standard',
            package: null,
            mathMode: null,
            textMode: '\\textsc{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'scshape',
            label: '{\\scshape ...}',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '{\\scshape ...}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   tiny: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\tiny',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\tiny',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{tiny}...\\end{tiny}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{tiny}...\\end{tiny}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   scriptsize: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\scriptsize',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\scriptsize',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{scriptsize}...\\end{scriptsize}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{scriptsize}...\\end{scriptsize}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   footnotesize: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\footnotesize',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\footnotesize',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{footnotesize}...\\end{footnotesize}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{footnotesize}...\\end{footnotesize}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   small: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\small',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\small',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{small}...\\end{small}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{small}...\\end{small}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   normalsize: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\normalsize',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\normalsize',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{normalsize}...\\end{normalsize}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{normalsize}...\\end{normalsize}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   large: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\large',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\large',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{large}...\\end{large}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{large}...\\end{large}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   Large: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\Large',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\Large',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{Large}...\\end{Large}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{Large}...\\end{Large}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   LARGE: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\LARGE',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\LARGE',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{LARGE}...\\end{LARGE}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{LARGE}...\\end{LARGE}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   huge: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\huge',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\huge',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{huge}...\\end{huge}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{huge}...\\end{huge}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   Huge: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\Huge',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\Huge',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{Huge}...\\end{Huge}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{Huge}...\\end{Huge}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   flushleft: {
      default: 'raggedright',
      variants: [
         {
            id: 'raggedright',
            label: '\\raggedright',
            description: 'Commande de déclaration standard',
            package: null,
            mathMode: null,
            textMode: '\\raggedright',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{flushleft}...\\end{flushleft}',
            description: 'Environnement standard',
            package: null,
            mathMode: null,
            textMode: '\\begin{flushleft}...\\end{flushleft}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'custom',
            label: '\\hfd',
            description: 'Version personnalisée',
            package: 'perso',
            mathMode: null,
            textMode: '\\hfd',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   center: {
      default: 'centering',
      variants: [
         {
            id: 'centering',
            label: '\\centering',
            description: 'Commande de déclaration standard',
            package: null,
            mathMode: null,
            textMode: '\\centering',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{center}...\\end{center}',
            description: 'Environnement standard',
            package: null,
            mathMode: null,
            textMode: '\\begin{center}...\\end{center}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'custom',
            label: '\\hfg ... \\hfd',
            description: 'Version personnalisée',
            package: 'perso',
            mathMode: null,
            textMode: '\\hfg ... \\hfd',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   flushright: {
      default: 'raggedleft',
      variants: [
         {
            id: 'raggedleft',
            label: '\\raggedleft',
            description: 'Commande de déclaration standard',
            package: null,
            mathMode: null,
            textMode: '\\raggedleft',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{flushright}...\\end{flushright}',
            description: 'Environnement standard',
            package: null,
            mathMode: null,
            textMode: '\\begin{flushright}...\\end{flushright}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'custom',
            label: '\\hfg',
            description: 'Version personnalisée',
            package: 'perso',
            mathMode: null,
            textMode: '\\hfg',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   enumerate: {
      default: 'enumerate',
      variants: [
         {
            id: 'enumerate',
            label: '\\begin{enumerate}..\\end{enumerate}',
            description: 'Liste numérotée standard',
            package: null,
            mathMode: null,
            textMode: '\\begin{enumerate}\n\\item \n\\end{enumerate}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'tasks',
            label: '\\begin{tasks}[style=enumerate]..\\end{tasks}',
            description: 'Liste avec package tasks (style enumerate)',
            package: 'tasks',
            mathMode: null,
            textMode: '\\begin{tasks}[style=enumerate]\n\\task \n\\end{tasks}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'tasks_columns',
            label: '\\begin{tasks}[style=enumerate](2)..\\end{tasks}',
            description: 'Liste tasks sur 2 colonnes (style enumerate)',
            package: 'tasks',
            mathMode: null,
            textMode: '\\begin{tasks}[style=enumerate](2)\n\\task \n\\end{tasks}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   itemize: {
      default: 'itemize',
      variants: [
         {
            id: 'itemize',
            label: '\\begin{itemize}..\\end{itemize}',
            description: 'Liste à puces standard',
            package: null,
            mathMode: null,
            textMode: '\\begin{itemize}\n\\item \n\\end{itemize}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'tasks_itemize',
            label: '\\begin{tasks}[style=itemize]..\\end{tasks}',
            description: 'Liste tasks (style itemize)',
            package: 'tasks',
            mathMode: null,
            textMode: '\\begin{tasks}[style=itemize]\n\\task \n\\end{tasks}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'tasks_bullet',
            label: '\\begin{tasks}[label=$\\star$](3)..\\end{tasks}',
            description: 'Liste tasks avec étoiles sur 3 colonnes',
            package: 'tasks',
            mathMode: null,
            textMode: '\\begin{tasks}[label=$\\star$](3)\n\\task \n\\end{tasks}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   item: {
      default: 'item',
      variants: [
         {
            id: 'item',
            label: '\\item',
            description: 'Élément de liste standard',
            package: null,
            mathMode: null,
            textMode: '\\item ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'task',
            label: '\\task',
            description: 'Élément avec package tasks',
            package: 'tasks',
            mathMode: null,
            textMode: '\\task ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'task_star',
            label: '\\task*',
            description: 'Élément task étoilé : occupe le reste de la ligne',
            package: 'tasks',
            mathMode: null,
            textMode: '\\task* ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'task_star_columns',
            label: '\\task*(2)',
            description: 'Élément task étoilé sur 2 colonnes',
            package: 'tasks',
            mathMode: null,
            textMode: '\\task*(2) ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   hfill: {
      default: 'hfill',
      variants: [
         {
            id: 'hfill',
            label: '\\hfill',
            description: 'Le texte de droite est poussé au bout de la ligne',
            package: null,
            mathMode: null,
            textMode: '\\hfill',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'hfg',
            label: '\\hfg',
            description: 'Le texte de droite est poussé au bout de la ligne',
            package: 'perso',
            mathMode: null,
            textMode: '\\hfg',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'hfd',
            label: '\\hfd',
            description: 'Le texte de gauche est poussé au début du bloc précédent',
            package: 'perso',
            mathMode: null,
            textMode: '\\hfd',
            supportsMath: false,
            supportsText: true
         }
      ]
   },

   // Variantes pour Chapitres
   'chapitres': {
      default: 'chapter',
      variants: [
         {
            id: 'tableofcontents',
            label: '\\tableofcontents',
            description: 'Table des matières',
            package: null,
            mathMode: null,
            textMode: '\\tableofcontents',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'abstract',
            label: '\\begin{abstract}',
            description: 'Résumé',
            package: null,
            mathMode: null,
            textMode: '\\begin{abstract}\n$1\n\\end{abstract}\n$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'part',
            label: '\\part{...}',
            description: 'Partie',
            package: null,
            mathMode: null,
            textMode: '\\part{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'chapter',
            label: '\\chapter{...}',
            description: 'Chapitre',
            package: null,
            mathMode: null,
            textMode: '\\chapter{...}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },

   // Variantes pour Sections
   'sections': {
      default: 'section',
      variants: [
         {
            id: 'section',
            label: '\\section{...}',
            description: 'Section',
            package: null,
            mathMode: null,
            textMode: '\\section{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'subsection',
            label: '\\subsection{...}',
            description: 'Sous-section',
            package: null,
            mathMode: null,
            textMode: '\\subsection{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'subsubsection',
            label: '\\subsubsection{...}',
            description: 'Sous-sous-section',
            package: null,
            mathMode: null,
            textMode: '\\subsubsection{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'subsubsubsection',
            label: '\\subsubsubsection{...}',
            description: 'Sous-sous-sous-section',
            package: null,
            mathMode: null,
            textMode: '\\subsubsubsection{...}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },

   // Variantes pour Paragraphe
   'paragraphe': {
      default: 'paragraph',
      variants: [
         {
            id: 'paragraph',
            label: '\\paragraph{...}',
            description: 'Paragraphe',
            package: null,
            mathMode: null,
            textMode: '\\paragraph{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'subparagraph',
            label: '\\subparagraph{...}',
            description: 'Sous-paragraphe',
            package: null,
            mathMode: null,
            textMode: '\\subparagraph{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'quotation',
            label: '\\begin{quotation}',
            description: 'Citation longue',
            package: null,
            mathMode: null,
            textMode: '\\begin{quotation}\n$1\n\\end{quotation}\n$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'subquotation',
            label: '\\begin{subquotation}',
            description: 'Sous-citation',
            package: null,
            mathMode: null,
            textMode: '\\begin{subquotation}\n$1\n\\end{subquotation}\n$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'quote',
            label: '\\begin{quote}',
            description: 'Citation courte',
            package: null,
            mathMode: null,
            textMode: '\\begin{quote}\n$1\n\\end{quote}\n$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'verse',
            label: '\\begin{verse}',
            description: 'Poésie',
            package: null,
            mathMode: null,
            textMode: '\\begin{verse}\n$1\n\\end{verse}\n$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },

   // Variante pour setlength
   'setlength': {
      default: 'setlength',
      variants: [
         {
            id: 'setlength',
            label: '\\setlength{...}{...}',
            description: 'Définir la longueur d\'une commande',
            package: null,
            mathMode: null,
            textMode: '\\setlength{...}{...}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },

   // Variantes pour setcounter
   'setcounter': {
      default: 'setcounter',
      variants: [
         {
            id: 'setcounter',
            label: '\\setcounter{...}',
            description: 'Définir la valeur d\'un compteur',
            package: null,
            mathMode: null,
            textMode: '\\setcounter{...}{}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'stepcounter',
            label: '\\stepcounter{...}',
            description: 'Incrémenter un compteur',
            package: null,
            mathMode: null,
            textMode: '\\stepcounter{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'refstepcounter',
            label: '\\refstepcounter{...}',
            description: 'Incrémenter un compteur et permettre les références',
            package: null,
            mathMode: null,
            textMode: '\\refstepcounter{...}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'addtocounter',
            label: '\\addtocounter{...}{...}',
            description: 'Ajouter une valeur à un compteur',
            package: null,
            mathMode: null,
            textMode: '\\addtocounter{...}{}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'value',
            label: '\\value{...}',
            description: 'Utiliser la valeur d\'un compteur',
            package: null,
            mathMode: null,
            textMode: '\\value{...}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },

   // Variantes pour label
   'label': {
      default: 'label',
      variants: [
         {
            id: 'label',
            label: '\\label{...}',
            description: 'Étiquette pour référence',
            package: null,
            mathMode: '\\label{...}',
            textMode: '\\label{...}',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'ref',
            label: '\\ref{...}',
            description: 'Référence à une étiquette',
            package: null,
            mathMode: '\\ref{...}',
            textMode: '\\ref{...}',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'eqref',
            label: '\\eqref{...}',
            description: 'Référence à une équation',
            package: 'amsmath',
            mathMode: '\\eqref{...}',
            textMode: '\\eqref{...}',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'cref',
            label: '\\cref{...}',
            description: 'Référence contextuelle (cleveref)',
            package: 'cleveref',
            mathMode: '\\cref{...}',
            textMode: '\\cref{...}',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'Cref',
            label: '\\Cref{...}',
            description: 'Référence contextuelle avec majuscule',
            package: 'cleveref',
            mathMode: '\\Cref{...}',
            textMode: '\\Cref{...}',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'vref',
            label: '\\vref{...}',
            description: 'Référence avec information de page',
            package: 'varioref',
            mathMode: '\\vref{...}',
            textMode: '\\vref{...}',
            supportsMath: true,
            supportsText: true
         }
      ]
   }
};



function getFormatCommandVariants(command) {
   return formatCommandVariants[command] || null;
}

function getDefaultFormatVariant(command) {
   const variants = getFormatCommandVariants(command);
   if (!variants) return null;

   const defaultId = variants.default;
   return variants.variants.find(v => v.id === defaultId);
}

/**
 * Fonction pour créer un tableau tabularray basé sur des paramètres
 * @param {Object} params - Les paramètres du tableau
 * @returns {string} - Le code LaTeX généré
 */
function wrapWithTabularray(params) {
  const { 
    tableWidth = '\\textwidth', 
    rowHeight = '1.2\\baselineskip', 
    rows = 3, 
    cols = 3, 
    header = true, 
    firstColHeader = false, 
    removeFirstCell = false, 
    style = 'hlines',
    alternateColors = false,
    colspec = '' 
  } = params;
  
  // Récupérer le texte sélectionné
  const editor = require('vscode').window.activeTextEditor;
  let selectedText = '';
  if (editor) {
    const selection = editor.selection;
    if (!selection.isEmpty) {
      selectedText = editor.document.getText(selection);
    }
  }
  
  // Construire le tableau
  let tableContent = '';
  
  // Toujours créer un tableau avec des cellules vides
  for (let i = 0; i < rows; i++) {
    const cells = [];
    for (let j = 0; j < cols; j++) {
      cells.push('');
    }
    tableContent += cells.join(' & ') + ' \\\\\n';
  }
  
  // Construire les options selon le style et autres paramètres
  let options = `width=${tableWidth},\nrows={${rowHeight}}`;
  
  // Gestion des styles et des lignes/colonnes selon les options
  if (style === 'simple') {
    // Pas de bordures
  } else if (style === 'hlines') {
    if (removeFirstCell) {
      options += ',\nhline{2-Z} = {solid},\nhline{1} = {2-Z}{solid}';
    } else {
      options += ',\nhlines';
    }
  } else if (style === 'vlines') {
    if (removeFirstCell) {
      options += ',\nvline{2-Z} = {solid},\nvline{1} = {2-Z}{solid}';
    } else {
      options += ',\nvlines';
    }
  } else if (style === 'grid') {
    if (removeFirstCell) {
      options += ',\nhline{2-Z} = {solid},\nhline{1} = {2-Z}{solid},\nvline{2-Z} = {solid},\nvline{1} = {2-Z}{solid}';
    } else {
      options += ',\nhlines, vlines';
    }
  }


  // Gestion des couleurs alternées (maintenant indépendante du style)
  if (alternateColors) {
     options += ',\nrow{even} = {bg=gristclair}';
  }
  
  // Gestion des en-têtes
  if (header) {
    if (removeFirstCell) {
      options += ',\ncell{1}{2-Z}={bleutclair, font=\\bfseries, c}';
    } else {
      options += ',\nrow{1}={bleutclair, font=\\bfseries, c}';
    }
  }
  
  if (firstColHeader) {
    if (removeFirstCell) {
      options += ',\ncell{2-Z}{1}={bleutclair, font=\\bfseries, c}';
    } else {
      options += ',\ncolumn{1}={bleutclair, font=\\bfseries, c}';
    }
  }
  
  // Ajouter les spécifications de colonnes
  if (colspec && colspec.trim() !== '') {
    // L'utilisateur a spécifié un colspec personnalisé
    if (!colspec.includes('{')) {
      options += ',\ncolspec={' + colspec + '}';
    } else {
      options += ',\n' + colspec;
    }
  } else {
    // Générer le colspec par défaut en fonction du nombre de colonnes
    let defaultColspec = '';
    for (let i = 0; i < cols; i++) {
      defaultColspec += 'X[1,c,m]';
    }
    options += ',\ncolspec={' + defaultColspec + '}';
  }
  
  // Construire le code complet
  let result = `\\begin{tblr}{${options}}\n${tableContent}\\end{tblr}`;
  
  // Si du texte est sélectionné, essayer de le placer dans le tableau
  if (selectedText && selectedText.trim() !== '') {
    // On place le texte sélectionné à l'intérieur du tableau, juste après \begin{tblr}{...}
    const beginPart = result.substring(0, result.indexOf('\n') + 1);
    const endPart = result.substring(result.indexOf('\n') + 1);
    
    result = beginPart + selectedText + '\n\\end{tblr}';
  }
  
  return result;
}

module.exports = {
   formatCommandVariants,
   getFormatCommandVariants,
   getDefaultFormatVariant,
   wrapWithTabularray  // Ajouter l'export de la fonction
};