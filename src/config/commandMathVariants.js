const mathCommandVariants = {
   frac: {
      default: 'frac',
      variants: [
         {
            id: 'frac',
            label: '\\frac{...}{...}',
            description: 'Fraction standard',
            package: null,
            mathMode: '\\frac{...}{...}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'dfrac',
            label: '\\dfrac{...}{...}',
            description: 'Fraction en mode display',
            package: 'amsmath',
            mathMode: '\\dfrac{...}{...}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'tfrac',
            label: '\\sfrac{...}{...}',
            description: 'Fraction en mode text',
            package: 'xfrac',
            mathMode: '\\sfrac{...}{...}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   sqrt: {
      default: 'sqrt',
      variants: [
         {
            id: 'sqrt',
            label: '\\sqrt{...}',
            description: 'Racine carrée',
            package: null,
            mathMode: '\\sqrt{...}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'sqrt_n',
            label: '\\sqrt[n]{...}',
            description: 'Racine n-ième',
            package: null,
            mathMode: '\\sqrt[n]{...}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour les flèches - Bloc 3
   'rightarrow': {
      variants: [
         {
            id: 'rightarrow',
            label: '\\rightarrow',
            description: 'Flèche droite',
            package: null,
            mathMode: '\\rightarrow ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'longrightarrow',
            label: '\\longrightarrow',
            description: 'Flèche droite longue',
            package: null,
            mathMode: '\\longrightarrow ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   'leftarrow': {
      variants: [
         {
            id: 'leftarrow',
            label: '\\leftarrow',
            description: 'Flèche gauche',
            package: null,
            mathMode: '\\leftarrow ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'longleftarrow',
            label: '\\longleftarrow',
            description: 'Flèche gauche longue',
            package: null,
            mathMode: '\\longleftarrow ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   'Rightarrow': {
      variants: [
         {
            id: 'Rightarrow',
            label: '\\Rightarrow',
            description: 'Implication droite',
            package: null,
            mathMode: '\\Rightarrow ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'Longrightarrow',
            label: '\\Longrightarrow',
            description: 'Implication droite longue',
            package: null,
            mathMode: '\\Longrightarrow ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   'Leftarrow': {
      variants: [
         {
            id: 'Leftarrow',
            label: '\\Leftarrow',
            description: 'Implication gauche',
            package: null,
            mathMode: '\\Leftarrow ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'Longleftarrow',
            label: '\\Longleftarrow',
            description: 'Implication gauche longue',
            package: null,
            mathMode: '\\Longleftarrow ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   'Leftrightarrow': {
      variants: [
         {
            id: 'Leftrightarrow',
            label: '\\Leftrightarrow',
            description: 'Équivalence',
            package: null,
            mathMode: '\\Leftrightarrow ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'Longleftrightarrow',
            label: '\\Longleftrightarrow',
            description: 'Équivalence longue',
            package: null,
            mathMode: '\\Longleftrightarrow ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   'mapsto': {
      variants: [
         {
            id: 'mapsto',
            label: '\\mapsto',
            description: 'Fonction (mapsto)',
            package: null,
            mathMode: '\\mapsto ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'longmapsto',
            label: '\\longmapsto',
            description: 'Fonction longue (longmapsto)',
            package: null,
            mathMode: '\\longmapsto ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour les vecteurs - Bloc 8
   'vec': {
      variants: [
         {
            id: 'vec',
            label: '\\vec{...}',
            description: 'Vecteur (flèche courte)',
            package: null,
            mathMode: '\\vec{...}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'overrightarrow',
            label: '\\overrightarrow{...}',
            description: 'Vecteur (flèche longue)',
            package: null,
            mathMode: '\\overrightarrow{...}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour le bouton appartient
   'in': {
      variants: [
         {
            id: 'in_default',
            label: '\\in',
            description: 'Appartient à',
            package: null,
            mathMode: '\\in ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'notin',
            label: '\\notin',
            description: 'N\'appartient pas à',
            package: null,
            mathMode: '\\notin ',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour le bouton matrice
   'matrix': {
      variants: [
         {
            id: 'pmatrix',
            label: '\\begin{pmatrix}',
            description: 'Matrice avec parenthèses',
            package: 'amsmath',
            mathMode: '\\begin{pmatrix}\n{...}\n\\end{pmatrix}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'bmatrix',
            label: '\\begin{bmatrix}',
            description: 'Matrice avec crochets',
            package: 'amsmath',
            mathMode: '\\begin{bmatrix}\n{...}\n\\end{bmatrix}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'vmatrix',
            label: '\\begin{vmatrix}',
            description: 'Matrice avec barre (déterminant)',
            package: 'amsmath',
            mathMode: '\\begin{vmatrix}\n{...}\n\\end{vmatrix}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'Vmatrix',
            label: '\\begin{Vmatrix}',
            description: 'Matrice avec double barre',
            package: 'amsmath',
            mathMode: '\\begin{Vmatrix}\n{...}\n\\end{Vmatrix}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'Bmatrix',
            label: '\\begin{Bmatrix}',
            description: 'Matrice avec accolades',
            package: 'amsmath',
            mathMode: '\\begin{Bmatrix}\n{...}\n\\end{Bmatrix}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'matrix_plain',
            label: '\\begin{matrix}',
            description: 'Matrice simple sans parenthèses',
            package: 'amsmath',
            mathMode: '\\begin{matrix}\n{...}\n\\end{matrix}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour les environnements d'équation
   'equation': {
      default: 'equation_star', // Changé de 'equation' à 'equation_star'
      variants: [
         {
            id: 'equation',
            label: '\\begin{equation}',
            description: 'Formule mathématique unique numérotée',
            package: 'amsmath',
            mathMode: '\\begin{equation}\n$1\n\\end{equation}$0',
            textMode: '\\begin{equation}\n$1\n\\end{equation}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'equation_star',
            label: '\\begin{equation*}',
            description: 'Formule mathématique sans numéro',
            package: 'amsmath',
            mathMode: '\\begin{equation*}\n$1\n\\end{equation*}$0',
            textMode: '\\begin{equation*}\n$1\n\\end{equation*}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   
   // Variantes pour align
   'align': {
      default: 'align_star', // Par défaut: align*
      variants: [
         {
            id: 'align',
            label: '\\begin{align}',
            description: 'Alignement sur des points (&), plusieurs lignes',
            package: 'amsmath',
            mathMode: '\\begin{align}\n$1\n\\end{align}$0',
            textMode: '\\begin{align}\n$1\n\\end{align}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'align_star',
            label: '\\begin{align*}',
            description: 'Idem align sans numérotation',
            package: 'amsmath',
            mathMode: '\\begin{align*}\n$1\n\\end{align*}$0',
            textMode: '\\begin{align*}\n$1\n\\end{align*}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'aligned',
            label: '\\begin{aligned}',
            description: 'Bloc aligné à insérer dans une équation',
            package: 'amsmath',
            mathMode: '\\begin{aligned}\n$1\n\\end{aligned}$0',
            textMode: '\\begin{aligned}\n$1\n\\end{aligned}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   
   // Variantes pour alignat
   'alignat': {
      default: 'alignat_star', // Par défaut: alignat*
      variants: [
         {
            id: 'alignat',
            label: '\\begin{alignat}',
            description: 'Alignement en colonnes avec espacement manuel',
            package: 'amsmath',
            mathMode: '\\begin{alignat}{2}\n$1\n\\end{alignat}$0',
            textMode: '\\begin{alignat}{2}\n$1\n\\end{alignat}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'alignat_star',
            label: '\\begin{alignat*}',
            description: 'Idem alignat sans numérotation',
            package: 'amsmath',
            mathMode: '\\begin{alignat*}{2}\n$1\n\\end{alignat*}$0',
            textMode: '\\begin{alignat*}{2}\n$1\n\\end{alignat*}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'alignedat',
            label: '\\begin{alignedat}',
            description: 'Idem alignat à insérer dans une équation',
            package: 'amsmath',
            mathMode: '\\begin{alignedat}{2}\n$1\n\\end{alignedat}$0',
            textMode: '\\begin{alignedat}{2}\n$1\n\\end{alignedat}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   
   // Variantes pour gather
   'gather': {
      default: 'gather_star', // Par défaut: gather*
      variants: [
         {
            id: 'gather',
            label: '\\begin{gather}',
            description: 'Équations centrées, sans alignement horizontal',
            package: 'amsmath',
            mathMode: null,
            textMode: '\\begin{gather}\n$1\n\\end{gather}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'gather_star',
            label: '\\begin{gather*}',
            description: 'Idem gather sans numérotation',
            package: 'amsmath',
            mathMode: null,
            textMode: '\\begin{gather*}\n$1\n\\end{gather*}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'flalign',
            label: '\\begin{flalign}',
            description: 'Alignement extrême gauche/droite',
            package: 'amsmath',
            mathMode: '\\begin{flalign}\n$1\n\\end{flalign}$0',
            textMode: '\\begin{flalign}\n$1\n\\end{flalign}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'flalign_star',
            label: '\\begin{flalign*}',
            description: 'Idem flalign sans numérotation',
            package: 'amsmath',
            mathMode: '\\begin{flalign*}\n$1\n\\end{flalign*}$0',
            textMode: '\\begin{flalign*}\n$1\n\\end{flalign*}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   
   // Variantes pour cases
   'cases': {
      default: 'cases',
      variants: [
         {
            id: 'cases',
            label: '\\begin{cases}',
            description: 'Fonctions définies par morceaux (inline style)',
            package: 'amsmath',
            mathMode: '\\begin{cases}\n$1\n\\end{cases}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'dcases',
            label: '\\begin{dcases}',
            description: 'Version display style (meilleure pour fractions)',
            package: 'mathtools',
            mathMode: '\\begin{dcases}\n$1\n\\end{dcases}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'dcases_star',
            label: '\\begin{dcases*}',
            description: 'Version inline style',
            package: 'mathtools',
            mathMode: '\\begin{dcases*}\n$1\n\\end{dcases*}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'rcases',
            label: '\\begin{rcases}',
            description: 'Accolade à droite',
            package: 'mathtools',
            mathMode: '\\begin{rcases}\n$1\n\\end{rcases}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Environnement systeme
   'systeme': {
      default: 'systeme',
      variants: [
         {
            id: 'systeme',
            label: '\\systeme{...}',
            description: 'Syntaxe simplifiée pour systèmes d\'équations',
            package: 'systeme',
            mathMode: '\\systeme{\n$1\n}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour multline
   'multline': {
      default: 'multline_star', // Par défaut sans numérotation
      variants: [
         {
            id: 'multline',
            label: '\\begin{multline}',
            description: 'Formule trop longue, première ligne alignée à gauche, dernière à droite',
            package: 'amsmath',
            mathMode: '\\begin{multline}\n$1\n\\end{multline}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'multline_star',
            label: '\\begin{multline*}',
            description: 'Idem sans numérotation',
            package: 'amsmath',
            mathMode: '\\begin{multline*}\n$1\n\\end{multline*}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Environnement split
   'split': {
      default: 'split',
      variants: [
         {
            id: 'split',
            label: '\\begin{split}',
            description: 'À insérer dans equation, permet des lignes alignées',
            package: 'amsmath',
            mathMode: '\\begin{split}\n$1\n\\end{split}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   }
};

const mathDefaultVariants = {
   frac: 'frac',
   sqrt: 'sqrt',
   rightarrow: 'rightarrow',
   leftarrow: 'leftarrow',
   Rightarrow: 'Rightarrow',
   Leftarrow: 'Leftarrow',
   Leftrightarrow: 'Leftrightarrow',
   mapsto: 'mapsto',
   vec: 'vec',
   'in': 'in_default',
   'matrix': 'pmatrix'
};

function getMathCommandVariants(command) {
   return mathCommandVariants[command] || null;
}

function getDefaultMathVariant(command) {
   const variants = getMathCommandVariants(command);
   if (!variants) return null;

   const defaultId = variants.default;
   return variants.variants.find(v => v.id === defaultId);
}

/**
 * Fonction pour créer une matrice basée sur des paramètres
 * @param {Object} params - Les paramètres de la matrice
 * @returns {string} - Le code LaTeX généré
 */
function wrapWithMatrix(params) {
  const { 
    rows = 2, 
    cols = 2, 
    matrixType = 'pmatrix'
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
  
  // Construire la matrice
  let matrixContent = '';
  
  // Si du texte est sélectionné, l'utiliser directement
  if (selectedText && selectedText.trim() !== '') {
    matrixContent = selectedText;
  } else {
    // Sinon créer une structure vide avec & et \\
    for (let i = 0; i < rows; i++) {
      const cells = [];
      for (let j = 0; j < cols; j++) {
        cells.push('');
      }
      matrixContent += cells.join(' & ');
      if (i < rows - 1) {
        matrixContent += ' \\\\\n';
      }
    }
  }
  
  // Construire le code complet
  return `\\begin{${matrixType}}\n${matrixContent}\n\\end{${matrixType}}`;
}

module.exports = {
   mathCommandVariants,
   getMathCommandVariants,
   getDefaultMathVariant,
   wrapWithMatrix
};