const formatCommandVariants = {
   bold: {
      default: 'textbf',
      variants: [
         {
            id: 'textbf',
            label: '\\textbf{...}',
            description: 'Commande standard',
            package: null,
            mathMode: '\\symbf{$1}$0',
            textMode: '\\textbf{$1}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'symbf',
            label: '\\symbf{...}',
            description: 'Commande mathématiques',
            package: null,
            mathMode: '\\symbf{$1}$0',
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
            textMode: '{\\bfseries $1}$0',
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
            mathMode: '\\mathit{$1}$0',
            textMode: '\\textit{$1}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'itshape',
            label: '{\\itshape ...}',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '{\\itshape $1}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   emphasis: {
      default: 'emph',
      variants: [
         {
            id: 'emph',
            label: '\\emph{...}',
            description: 'Emphase standard',
            package: null,
            mathMode: null,
            textMode: '\\emph{$1}$0',
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
            textMode: '\\textsl{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'slshape',
            label: '{\\slshape ...}',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '{\\slshape $1}$0',
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
            textMode: '\\texttt{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'ttshape',
            label: '{\\ttshape ...}',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '{\\ttshape $1}$0',
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
            mathMode: '\\uline{$1}$0',
            textMode: '\\uline{$1}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'uuline',
            label: '\\uuline{...}',
            description: 'Double souligné',
            package: 'ulem',
            mathMode: null,
            textMode: '\\uuline{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'uwave',
            label: '\\uwave{...}',
            description: 'Souligné en vague',
            package: 'ulem',
            mathMode: null,
            textMode: '\\uwave{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'dashuline',
            label: '\\dashuline{...}',
            description: 'Souligné par des traits',
            package: 'ulem',
            mathMode: null,
            textMode: '\\dashuline{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'dotuline',
            label: '\\dotuline{...}',
            description: 'Souligné par des points',
            package: 'ulem',
            mathMode: null,
            textMode: '\\dotuline{$1}$0',
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
            textMode: '\\textsc{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'scshape',
            label: '{\\scshape ...}',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '{\\scshape $1}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   highlight: {
      default: 'hl',
      variants: [
         {
            id: 'hl',
            label: '\\hl{...}',
            description: 'Surlignage avec package soul',
            package: 'soul',
            mathMode: '\\hl{$1} $0',
            textMode: '\\hl{$1} $0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'highlight',
            label: '\\SurlignerTexte/Formule{...}',
            description: 'Surlignage automatique',
            package: 'ProfLycee',
            mathMode: '\\SurlignerFormule{$1} $0',
            textMode: '\\SurlignerTexte{$1} $0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   mathbb: {
      default: 'mathbb', 
      variants: [
         {
            id: 'mathbb',
            label: '\\mathbb{...}',
            description: 'Lettres grasses creuses',
            package: 'amsfonts',
            mathMode: '\\mathbb{$1}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   mathcal: {
      default: 'mathcal',
      variants: [
         {
            id: 'mathcal',
            label: '\\mathcal{...}',
            description: 'Lettres calligraphiques',
            package: null,
            mathMode: '\\mathcal{$1}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   superscript: {
      default: 'superscript',
      variants: [
         {
            id: 'superscript',
            label: '^{...} / \\textsuperscript{...}',
            description: 'Exposant',
            package: null,
            mathMode: '^{$1}$0',
            textMode: '\\textsuperscript{$1}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   subscript: {
      default: 'subscript',
      variants: [
         {
            id: 'subscript',
            label: '_{...} / \\textsubscript{...}',
            description: 'Indice',
            package: null,
            mathMode: '_{$1}$0',
            textMode: '\\textsubscript{$1}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   // Tailles de police
   tiny: {
      default: 'command',
      variants: [
         {
            id: 'command',
            label: '\\tiny',
            description: 'Commande de déclaration',
            package: null,
            mathMode: null,
            textMode: '\\tiny ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{tiny}...\\end{tiny}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{tiny}\n$1\n\\end{tiny}$0',
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
            textMode: '\\scriptsize ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{scriptsize}...\\end{scriptsize}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{scriptsize}\n$1\n\\end{scriptsize}$0',
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
            textMode: '\\footnotesize ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{footnotesize}...\\end{footnotesize}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{footnotesize}\n$1\n\\end{footnotesize}$0',
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
            textMode: '\\small ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{small}...\\end{small}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{small}\n$1\n\\end{small}$0',
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
            textMode: '\\normalsize ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{normalsize}...\\end{normalsize}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{normalsize}\n$1\n\\end{normalsize}$0',
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
            textMode: '\\large ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{large}...\\end{large}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{large}\n$1\n\\end{large}$0',
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
            textMode: '\\Large ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{Large}...\\end{Large}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{Large}\n$1\n\\end{Large}$0',
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
            textMode: '\\LARGE ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{LARGE}...\\end{LARGE}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{LARGE}\n$1\n\\end{LARGE}$0',
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
            textMode: '\\huge ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{huge}...\\end{huge}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{huge}\n$1\n\\end{huge}$0',
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
            textMode: '\\Huge ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{Huge}...\\end{Huge}',
            description: 'Environnement',
            package: null,
            mathMode: null,
            textMode: '\\begin{Huge}\n$1\n\\end{Huge}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   // Transformations de texte
   uppercase: {
      default: 'uppercase',
      variants: [
         {
            id: 'uppercase',
            label: 'MAJUSCULES',
            description: 'Transformation en majuscules',
            package: null,
            mathMode: null,
            textMode: 'UPPERCASE_TRANSFORM',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   lowercase: {
      default: 'lowercase',
      variants: [
         {
            id: 'lowercase',
            label: 'minuscules',
            description: 'Transformation en minuscules',
            package: null,
            mathMode: null,
            textMode: 'LOWERCASE_TRANSFORM',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   capitalize: {
      default: 'capitalize',
      variants: [
         {
            id: 'capitalize',
            label: 'Première majuscule',
            description: 'Première lettre en majuscule',
            package: null,
            mathMode: null,
            textMode: 'CAPITALIZE_TRANSFORM',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   // Alignement
   center: {
      default: 'centering',
      variants: [
         {
            id: 'centering',
            label: '\\centering',
            description: 'Commande de déclaration standard',
            package: null,
            mathMode: null,
            textMode: '\\centering ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{center}...\\end{center}',
            description: 'Environnement standard',
            package: null,
            mathMode: null,
            textMode: '\\begin{center}\n$1\n\\end{center}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'custom',
            label: '\\hfg ... \\hfd',
            description: 'Version personnalisée',  
            package: 'perso',
            mathMode: null,
            textMode: '\\hfg $1 \\hfd$0',
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
            textMode: '\\raggedright ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{flushleft}...\\end{flushleft}',
            description: 'Environnement standard',
            package: null,
            mathMode: null,
            textMode: '\\begin{flushleft}\n$1\n\\end{flushleft}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'custom',
            label: '\\hfd',
            description: 'Version personnalisée',
            package: 'perso',
            mathMode: null,
            textMode: '\\hfd ',
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
            textMode: '\\raggedleft ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'environment',
            label: '\\begin{flushright}...\\end{flushright}',
            description: 'Environnement standard',
            package: null,
            mathMode: null,
            textMode: '\\begin{flushright}\n$1\n\\end{flushright}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'custom',
            label: '\\hfg',
            description: 'Version personnalisée',
            package: 'perso',
            mathMode: null,
            textMode: '\\hfg ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   // Espacement horizontal
   quad: {
      default: 'quad',
      variants: [
         {
            id: 'quad',
            label: '\\quad',
            description: 'Espacement de 1em',
            package: null,
            mathMode: '\\quad ',
            textMode: '\\quad ',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   qquad: {
      default: 'qquad',
      variants: [
         {
            id: 'qquad',
            label: '\\qquad',
            description: 'Espacement de 2em',
            package: null,
            mathMode: '\\qquad ',
            textMode: '\\qquad ',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   noindent: {
      default: 'noindent',
      variants: [
         {
            id: 'noindent',
            label: '\\noindent',
            description: 'Supprimer l\'indentation',
            package: null,
            mathMode: null,
            textMode: '\\noindent ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   hspace: {
      default: 'hspace',
      variants: [
         {
            id: 'hspace',
            label: '\\hspace{...}',
            description: 'Espacement horizontal personnalisé',
            package: null,
            mathMode: '\\hspace{$1}$0',
            textMode: '\\hspace{$1}$0',
            supportsMath: true,
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
            textMode: '\\hfill ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'hfg',
            label: '\\hfg',
            description: 'Le texte de droite est poussé au bout de la ligne',
            package: 'perso',
            mathMode: null,
            textMode: '\\hfg ',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'hfd',
            label: '\\hfd',
            description: 'Le texte de gauche est poussé au début du bloc précédent',
            package: 'perso',
            mathMode: null,
            textMode: '\\hfd ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   hbox: {
      default: 'hbox',
      variants: [
         {
            id: 'hbox',
            label: '\\hbox{...}',
            description: 'Boîte horizontale',
            package: null,
            mathMode: '\\hbox{$1}$0',
            textMode: '\\hbox{$1}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   // Espacement vertical
   smallskip: {
      default: 'smallskip',
      variants: [
         {
            id: 'smallskip',
            label: '\\smallskip',
            description: 'Petit saut vertical',
            package: null,
            mathMode: null,
            textMode: '\\smallskip ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   medskip: {
      default: 'medskip',
      variants: [
         {
            id: 'medskip',
            label: '\\medskip',
            description: 'Saut vertical moyen',
            package: null,
            mathMode: null,
            textMode: '\\medskip ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   bigskip: {
      default: 'bigskip',
      variants: [
         {
            id: 'bigskip',
            label: '\\bigskip',
            description: 'Grand saut vertical',
            package: null,
            mathMode: null,
            textMode: '\\bigskip ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   itemsep: {
      default: 'itemsep',
      variants: [
         {
            id: 'itemsep',
            label: '\\itemsep',
            description: 'Espacement entre items',
            package: null,
            mathMode: null,
            textMode: '\\itemsep ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   baselineskip: {
      default: 'baselineskip',
      variants: [
         {
            id: 'baselineskip',
            label: '\\baselineskip',
            description: 'Espacement entre les lignes',
            package: null,
            mathMode: null,
            textMode: '\\baselineskip ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   parskip: {
      default: 'parskip',
      variants: [
         {
            id: 'parskip',
            label: '\\parskip',
            description: 'Espacement entre paragraphes',
            package: null,
            mathMode: null,
            textMode: '\\parskip ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   vspace: {
      default: 'vspace',
      variants: [
         {
            id: 'vspace',
            label: '\\vspace{...}',
            description: 'Espacement vertical personnalisé',
            package: null,
            mathMode: null,
            textMode: '\\vspace{$1}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   vfill: {
      default: 'vfill',
      variants: [
         {
            id: 'vfill',
            label: '\\vfill',
            description: 'Remplissage vertical',
            package: null,
            mathMode: null,
            textMode: '\\vfill ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   newpage: {
      default: 'newpage',
      variants: [
         {
            id: 'newpage',
            label: '\\newpage',
            description: 'Nouvelle page',
            package: null,
            mathMode: null,
            textMode: '\\newpage ',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   // Sectionnement
   chapitres: {
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
            textMode: '\\part{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'chapter',
            label: '\\chapter{...}',
            description: 'Chapitre',
            package: null,
            mathMode: null,
            textMode: '\\chapter{$1}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   sections: {
      default: 'section',
      variants: [
         {
            id: 'section',
            label: '\\section{...}',
            description: 'Section',
            package: null,
            mathMode: null,
            textMode: '\\section{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'subsection',
            label: '\\subsection{...}',
            description: 'Sous-section',
            package: null,
            mathMode: null,
            textMode: '\\subsection{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'subsubsection',
            label: '\\subsubsection{...}',
            description: 'Sous-sous-section',
            package: null,
            mathMode: null,
            textMode: '\\subsubsection{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'subsubsubsection',
            label: '\\subsubsubsection{...}',
            description: 'Sous-sous-sous-section',
            package: null,
            mathMode: null,
            textMode: '\\subsubsubsection{$1}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   paragraphe: {
      default: 'paragraph',
      variants: [
         {
            id: 'paragraph',
            label: '\\paragraph{...}',
            description: 'Paragraphe',
            package: null,
            mathMode: null,
            textMode: '\\paragraph{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'subparagraph',
            label: '\\subparagraph{...}',
            description: 'Sous-paragraphe',
            package: null,
            mathMode: null,
            textMode: '\\subparagraph{$1}$0',
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
   // Compteurs et étiquettes
   setlength: {
      default: 'setlength',
      variants: [
         {
            id: 'setlength',
            label: '\\setlength{...}{...}',
            description: 'Définir la longueur d\'une commande',
            package: null,
            mathMode: null,
            textMode: '\\setlength{$1}{$0}',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   setcounter: {
      default: 'setcounter',
      variants: [
         {
            id: 'setcounter',
            label: '\\setcounter{...}',
            description: 'Définir la valeur d\'un compteur',
            package: null,
            mathMode: null,
            textMode: '\\setcounter{$1}{$0}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'stepcounter',
            label: '\\stepcounter{...}',
            description: 'Incrémenter un compteur',
            package: null,
            mathMode: null,
            textMode: '\\stepcounter{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'refstepcounter',
            label: '\\refstepcounter{...}',
            description: 'Incrémenter un compteur et permettre les références',
            package: null,
            mathMode: null,
            textMode: '\\refstepcounter{$1}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'addtocounter',
            label: '\\addtocounter{...}{...}',
            description: 'Ajouter une valeur à un compteur',
            package: null,
            mathMode: null,
            textMode: '\\addtocounter{$1}{$0}',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'value',
            label: '\\value{...}',
            description: 'Utiliser la valeur d\'un compteur',
            package: null,
            mathMode: null,
            textMode: '\\value{$1}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   label: {
      default: 'label',
      variants: [
         {
            id: 'label',
            label: '\\label{...}',
            description: 'Étiquette pour référence',
            package: null,
            mathMode: '\\label{$1}$0',
            textMode: '\\label{$1}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'ref',
            label: '\\ref{...}',
            description: 'Référence à une étiquette',
            package: null,
            mathMode: '\\ref{$1}$0',
            textMode: '\\ref{$1}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'eqref',
            label: '\\eqref{...}',
            description: 'Référence à une équation',
            package: 'amsmath',
            mathMode: '\\eqref{$1}$0',
            textMode: '\\eqref{$1}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'cref',
            label: '\\cref{...}',
            description: 'Référence contextuelle (cleveref)',
            package: 'cleveref',
            mathMode: '\\cref{$1}$0',
            textMode: '\\cref{$1}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'Cref',
            label: '\\Cref{...}',
            description: 'Référence contextuelle avec majuscule',
            package: 'cleveref',
            mathMode: '\\Cref{$1}$0',
            textMode: '\\Cref{$1}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'vref',
            label: '\\vref{...}',
            description: 'Référence avec information de page',
            package: 'varioref',
            mathMode: '\\vref{$1}$0',
            textMode: '\\vref{$1}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   // Environnements - Listes
   enumerate: {
      default: 'enumerate',
      variants: [
         {
            id: 'enumerate',
            label: '\\begin{enumerate}..\\end{enumerate}',
            description: 'Liste numérotée standard',
            package: null,
            mathMode: null,
            textMode: '\\begin{enumerate}\n\\item $1\n\\end{enumerate}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'tasks',
            label: '\\begin{tasks}[style=enumerate]..\\end{tasks}',
            description: 'Liste avec package tasks (style enumerate)',
            package: 'tasks',
            mathMode: null,
            textMode: '\\begin{tasks}[style=enumerate]\n\\task $1\n\\end{tasks}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'tasks_columns',
            label: '\\begin{tasks}[style=enumerate](2)..\\end{tasks}',
            description: 'Liste tasks sur 2 colonnes (style enumerate)',
            package: 'tasks',
            mathMode: null,
            textMode: '\\begin{tasks}[style=enumerate](2)\n\\task $1\n\\end{tasks}$0',
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
            textMode: '\\begin{itemize}\n\\item $1\n\\end{itemize}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'tasks_itemize',
            label: '\\begin{tasks}[style=itemize]..\\end{tasks}',
            description: 'Liste tasks (style itemize)',
            package: 'tasks',
            mathMode: null,
            textMode: '\\begin{tasks}[style=itemize]\n\\task $1\n\\end{tasks}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'tasks_bullet',
            label: '\\begin{tasks}[label=$\\star$](3)..\\end{tasks}',
            description: 'Liste tasks avec étoiles sur 3 colonnes',
            package: 'tasks',
            mathMode: null,
            textMode: '\\begin{tasks}[label=$\\star$](3)\n\\task $1\n\\end{tasks}$0',
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
            textMode: '\\item $1$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'task',
            label: '\\task',
            description: 'Élément avec package tasks',
            package: 'tasks',
            mathMode: null,
            textMode: '\\task $1$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'task_star',
            label: '\\task*',
            description: 'Élément task étoilé : occupe le reste de la ligne',
            package: 'tasks',
            mathMode: null,
            textMode: '\\task* $1$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'task_star_columns',
            label: '\\task*(2)',
            description: 'Élément task étoilé sur 2 colonnes',
            package: 'tasks',
            mathMode: null,
            textMode: '\\task*(2) $1$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   // Environnements - Mise en page
   minipage: {
      default: 'minipage',
      variants: [
         {
            id: 'minipage',
            label: '\\begin{minipage}..\\end{minipage}',
            description: 'Mini-page',
            package: null,
            mathMode: null,
            textMode: '\\begin{minipage}{0.4\\textwidth}\n$1\n\\end{minipage}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   multicols: {
      default: 'multicols',
      variants: [
         {
            id: 'multicols',
            label: '\\begin{multicols}..\\end{multicols}',
            description: 'Environnement multicolonnes',
            package: 'multicol',
            mathMode: null,
            textMode: '\\begin{multicols}{2}\n$1\n\\end{multicols}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   tabbing: {
      default: 'tabbing',
      variants: [
         {
            id: 'tabbing',
            label: '\\begin{tabbing}..\\end{tabbing}',
            description: 'Environnement de tabulation',
            package: null,
            mathMode: null,
            textMode: '\\begin{tabbing}\n$1\n\\end{tabbing}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   // Environnements - Figures
   figure: {
      default: 'figure',
      variants: [
         {
            id: 'figure',
            label: '\\begin{figure}..\\end{figure}',
            description: 'Figure flottante',
            package: null,
            mathMode: null,
            textMode: '\\begin{figure}[htbp]\n\\centering\n\\includegraphics[width=0.25\\textwidth]{$1}\n\\caption{Ma légende}\n\\end{figure}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   wrapfig: {
      default: 'wrapfig',
      variants: [
         {
            id: 'wrapfig',
            label: '\\begin{wrapfigure}..\\end{wrapfigure}',
            description: 'Figure avec habillage de texte',
            package: 'wrapfig',
            mathMode: null,
            textMode: '\\begin{wrapfigure}{r}{0.25\\textwidth} % {alignement}{largeur}\n\\centering\n\\includegraphics[width=0.25\\textwidth]{$1}\n\\caption{Ma légende}\n\\end{wrapfigure}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   includegraphics: {
      default: 'includegraphics',
      variants: [
         {
            id: 'includegraphics',
            label: '\\includegraphics{...}',
            description: 'Inclusion d\'image',
            package: 'graphicx',
            mathMode: null,
            textMode: '\\includegraphics[width=0.25\\textwidth]{$1}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   // Environnements - Dessin et code
   tikzpicture: {
      default: 'tikzpicture',
      variants: [
         {
            id: 'tikzpicture',
            label: '\\begin{tikzpicture}..\\end{tikzpicture}',
            description: 'Dessin TikZ',
            package: 'tikz',
            mathMode: null,
            textMode: '\\begin{tikzpicture}[baseline=(current bounding box.base), yshift=1ex]\n$1\n\\end{tikzpicture}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   tcolorbox: {
      default: 'tcolorbox',
      variants: [
         {
            id: 'tcolorbox',
            label: '\\begin{tcolorbox}..\\end{tcolorbox}',
            description: 'Boîte colorée',
            package: 'tcolorbox',
            mathMode: null,
            textMode: '\\begin{tcolorbox}[enhanced, colframe=red, colback=white,\narc=4mm, boxrule=1pt]\n$1\n\\end{tcolorbox}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   listing: {
      default: 'listing',
      variants: [
         {
            id: 'listing',
            label: '\\begin{lstlisting}..\\end{lstlisting}',
            description: 'Code source',
            package: 'listings',
            mathMode: null,
            textMode: '\\begin{lstlisting}[language=Python]\n$1\n\\end{lstlisting}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   // Environnements - Tableaux
   table: {
      default: 'table',
      variants: [
         {
            id: 'table',
            label: '\\begin{table}..\\end{table}',
            description: 'Tableau flottant',
            package: null,
            mathMode: null,
            textMode: '\\begin{table}[htbp]\n\\centering\n\\begin{tabular}{|c|c|}\n$1\n\\end{tabular}\n\\caption{Ma légende}\n\\end{table}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   tabular: {
      default: 'tabular',
      variants: [
         {
            id: 'tabular',
            label: '\\begin{tabular}..\\end{tabular}',
            description: 'Tableau simple',
            package: null,
            mathMode: null,
            textMode: '\\begin{tabular}{|c|c|}\n$1\n\\end{tabular}$0',
            supportsMath: false,
            supportsText: true
         }
      ]
   },
   tabularray: {
      default: 'tabularray',
      variants: [
         {
            id: 'tabularray',
            label: '\\begin{tblr}..\\end{tblr}',
            description: 'Tableau simple avec template',
            package: 'tabularray',
            mathMode: null,
            textMode: '\\begin{tblr}{%\n          width=\\textwidth,%\n          hlines,%\n          vlines,%\n          rows={1.2\\baselineskip},%\n          colspec={X[1,c,m]X[2,c,m]}%\n        }\n  $1\n\\end{tblr}\n$0',
            supportsMath: false,
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

// Garder les fonctions existantes pour tabularray et matrix
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
   wrapWithTabularray
};