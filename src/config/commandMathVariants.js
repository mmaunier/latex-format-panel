const mathCommandVariants = {
   frac: {
      default: 'frac',
      variants: [
         {
            id: 'frac',
            label: '\\frac{...}{...}',
            description: 'Fraction standard',
            package: null,
            mathMode: '\\frac{$1}{$0}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'dfrac',
            label: '\\dfrac{...}{...}',
            description: 'Fraction en mode display',
            package: 'amsmath',
            mathMode: '\\dfrac{$1}{$0}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'tfrac',
            label: '\\sfrac{...}{...}',
            description: 'Fraction en mode text',
            package: 'xfrac',
            mathMode: '\\sfrac{$1}{$0}',
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
            mathMode: '\\sqrt{$1}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'sqrt_n',
            label: '\\sqrt[n]{...}',
            description: 'Racine n-ième',
            package: null,
            mathMode: '\\sqrt[$1]{$0}',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour les flèches - Bloc 3
   'rightarrow': {
      default: 'rightarrow',
      variants: [
         {
            id: 'rightarrow',
            label: '\\rightarrow',
            description: 'Flèche droite',
            package: null,
            mathMode: '\\rightarrow $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'longrightarrow',
            label: '\\longrightarrow',
            description: 'Flèche droite longue',
            package: null,
            mathMode: '\\longrightarrow $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   'leftarrow': {
      default: 'leftarrow',
      variants: [
         {
            id: 'leftarrow',
            label: '\\leftarrow',
            description: 'Flèche gauche',
            package: null,
            mathMode: '\\leftarrow $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'longleftarrow',
            label: '\\longleftarrow',
            description: 'Flèche gauche longue',
            package: null,
            mathMode: '\\longleftarrow $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   'Rightarrow': {
      default: 'Rightarrow',
      variants: [
         {
            id: 'Rightarrow',
            label: '\\Rightarrow',
            description: 'Implication droite',
            package: null,
            mathMode: '\\Rightarrow $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'Longrightarrow',
            label: '\\Longrightarrow',
            description: 'Implication droite longue',
            package: null,
            mathMode: '\\Longrightarrow $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   'Leftarrow': {
      default: 'Leftarrow',
      variants: [
         {
            id: 'Leftarrow',
            label: '\\Leftarrow',
            description: 'Implication gauche',
            package: null,
            mathMode: '\\Leftarrow $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'Longleftarrow',
            label: '\\Longleftarrow',
            description: 'Implication gauche longue',
            package: null,
            mathMode: '\\Longleftarrow $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   'Leftrightarrow': {
      default: 'Leftrightarrow',
      variants: [
         {
            id: 'Leftrightarrow',
            label: '\\Leftrightarrow',
            description: 'Équivalence',
            package: null,
            mathMode: '\\Leftrightarrow $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'Longleftrightarrow',
            label: '\\Longleftrightarrow',
            description: 'Équivalence longue',
            package: null,
            mathMode: '\\Longleftrightarrow $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   'mapsto': {
      default: 'mapsto',
      variants: [
         {
            id: 'mapsto',
            label: '\\mapsto',
            description: 'Fonction (mapsto)',
            package: null,
            mathMode: '\\mapsto $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'longmapsto',
            label: '\\longmapsto',
            description: 'Fonction longue (longmapsto)',
            package: null,
            mathMode: '\\longmapsto $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour les vecteurs - Bloc 8
   'vec': {
      default: 'vec',
      variants: [
         {
            id: 'vec',
            label: '\\vec{...}',
            description: 'Vecteur (flèche courte)',
            package: null,
            mathMode: '\\vec{$1}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'overrightarrow',
            label: '\\overrightarrow{...}',
            description: 'Vecteur (flèche longue)',
            package: null,
            mathMode: '\\overrightarrow{$1}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour le bouton appartient
   'in': {
      default: 'in_default',
      variants: [
         {
            id: 'in_default',
            label: '\\in',
            description: 'Appartient à',
            package: null,
            mathMode: '\\in $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'notin',
            label: '\\notin',
            description: 'N\'appartient pas à',
            package: null,
            mathMode: '\\notin $0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour le bouton matrice
   'matrix': {
      default: 'pmatrix',
      variants: [
         {
            id: 'pmatrix',
            label: '\\begin{pmatrix}',
            description: 'Matrice avec parenthèses',
            package: 'amsmath',
            mathMode: '\\begin{pmatrix}\n$1\n\\end{pmatrix}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'bmatrix',
            label: '\\begin{bmatrix}',
            description: 'Matrice avec crochets',
            package: 'amsmath',
            mathMode: '\\begin{bmatrix}\n$1\n\\end{bmatrix}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'vmatrix',
            label: '\\begin{vmatrix}',
            description: 'Matrice avec barre (déterminant)',
            package: 'amsmath',
            mathMode: '\\begin{vmatrix}\n$1\n\\end{vmatrix}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'Vmatrix',
            label: '\\begin{Vmatrix}',
            description: 'Matrice avec double barre',
            package: 'amsmath',
            mathMode: '\\begin{Vmatrix}\n$1\n\\end{Vmatrix}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'Bmatrix',
            label: '\\begin{Bmatrix}',
            description: 'Matrice avec accolades',
            package: 'amsmath',
            mathMode: '\\begin{Bmatrix}\n$1\n\\end{Bmatrix}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'matrix_plain',
            label: '\\begin{matrix}',
            description: 'Matrice simple sans parenthèses',
            package: 'amsmath',
            mathMode: '\\begin{matrix}\n$1\n\\end{matrix}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour les environnements d'équation
   'equation': {
      default: 'equation_star',
      variants: [
         {
            id: 'equation',
            label: '\\begin{equation}',
            description: 'Formule mathématique unique numérotée',
            package: 'amsmath',
            mathMode: '\\begin{equation}\\n$1\\n\\end{equation}$0',
            textMode: '\\begin{equation}\\n$1\\n\\end{equation}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'equation_star',
            label: '\\begin{equation*}',
            description: 'Formule mathématique sans numéro',
            package: 'amsmath',
            mathMode: '\\begin{equation*}\\n$1\\n\\end{equation*}$0',
            textMode: '\\begin{equation*}\\n$1\\n\\end{equation*}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   // Variantes pour array
   'array': {
      default: 'array_1col',
      variants: [
         {
            id: 'array_1col',
            label: '\\begin{array}{c}',
            description: 'Tableau mathématique 1 colonne centré',
            package: 'array',
            mathMode: '\\begin{array}{c}\\n$1\\n\\end{array}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'array_2col',
            label: '\\begin{array}{cc}',
            description: 'Tableau mathématique 2 colonnes centré',
            package: 'array',
            mathMode: '\\begin{array}{cc}\\n$1\\n\\end{array}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'array_3col',
            label: '\\begin{array}{cc}',
            description: 'Tableau mathématique 3 colonnes centré',
            package: 'array',
            mathMode: '\\begin{array}{ccc}\\n$1\\n\\end{array}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   // Variantes pour align
   'align': {
      default: 'align_star',
      variants: [
         {
            id: 'align',
            label: '\\begin{align}',
            description: 'Alignement sur des points (&), plusieurs lignes',
            package: 'amsmath',
            mathMode: '\\begin{align}\\n$1\\n\\end{align}$0',
            textMode: '\\begin{align}\\n$1\\n\\end{align}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'align_star',
            label: '\\begin{align*}',
            description: 'Idem align sans numérotation',
            package: 'amsmath',
            mathMode: '\\begin{align*}\\n$1\\n\\end{align*}$0',
            textMode: '\\begin{align*}\\n$1\\n\\end{align*}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'aligned',
            label: '\\begin{aligned}',
            description: 'Bloc aligné à insérer dans une équation',
            package: 'amsmath',
            mathMode: '\\begin{aligned}\\n$1\\n\\end{aligned}$0',
            textMode: '\\begin{aligned}\\n$1\\n\\end{aligned}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   
   // Variantes pour alignat
   'alignat': {
      default: 'alignat_star',
      variants: [
         {
            id: 'alignat',
            label: '\\begin{alignat}',
            description: 'Alignement en colonnes avec espacement manuel',
            package: 'amsmath',
            mathMode: '\\begin{alignat}{2}\\n$1\\n\\end{alignat}$0',
            textMode: '\\begin{alignat}{2}\\n$1\\n\\end{alignat}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'alignat_star',
            label: '\\begin{alignat*}',
            description: 'Idem alignat sans numérotation',
            package: 'amsmath',
            mathMode: '\\begin{alignat*}{2}\\n$1\\n\\end{alignat*}$0',
            textMode: '\\begin{alignat*}{2}\\n$1\\n\\end{alignat*}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'alignedat',
            label: '\\begin{alignedat}',
            description: 'Idem alignat à insérer dans une équation',
            package: 'amsmath',
            mathMode: '\\begin{alignedat}{2}\\n$1\\n\\end{alignedat}$0',
            textMode: '\\begin{alignedat}{2}\\n$1\\n\\end{alignedat}$0',
            supportsMath: true,
            supportsText: true
         }
      ]
   },
   
   // Variantes pour gather
   'gather': {
      default: 'gather_star',
      variants: [
         {
            id: 'gather',
            label: '\\begin{gather}',
            description: 'Équations centrées, sans alignement horizontal',
            package: 'amsmath',
            mathMode: null,
            textMode: '\\begin{gather}\\n$1\\n\\end{gather}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'gather_star',
            label: '\\begin{gather*}',
            description: 'Idem gather sans numérotation',
            package: 'amsmath',
            mathMode: null,
            textMode: '\\begin{gather*}\\n$1\\n\\end{gather*}$0',
            supportsMath: false,
            supportsText: true
         },
         {
            id: 'flalign',
            label: '\\begin{flalign}',
            description: 'Alignement extrême gauche/droite',
            package: 'amsmath',
            mathMode: '\\begin{flalign}\\n$1\\n\\end{flalign}$0',
            textMode: '\\begin{flalign}\\n$1\\n\\end{flalign}$0',
            supportsMath: true,
            supportsText: true
         },
         {
            id: 'flalign_star',
            label: '\\begin{flalign*}',
            description: 'Idem flalign sans numérotation',
            package: 'amsmath',
            mathMode: '\\begin{flalign*}\\n$1\\n\\end{flalign*}$0',
            textMode: '\\begin{flalign*}\\n$1\\n\\end{flalign*}$0',
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
            mathMode: '\\begin{cases}\\n$1\\n\\end{cases}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'dcases',
            label: '\\begin{dcases}',
            description: 'Version display style (meilleure pour fractions)',
            package: 'mathtools',
            mathMode: '\\begin{dcases}\\n$1\\n\\end{dcases}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'dcases_star',
            label: '\\begin{dcases*}',
            description: 'Version inline style',
            package: 'mathtools',
            mathMode: '\\begin{dcases*}\\n$1\\n\\end{dcases*}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'rcases',
            label: '\\begin{rcases}',
            description: 'Accolade à droite',
            package: 'mathtools',
            mathMode: '\\begin{rcases}\\n$1\\n\\end{rcases}$0',
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
            mathMode: '\\systeme{\\n$1\\n}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   },
   
   // Variantes pour multline
   'multline': {
      default: 'multline_star',
      variants: [
         {
            id: 'multline',
            label: '\\begin{multline}',
            description: 'Formule trop longue, première ligne alignée à gauche, dernière à droite',
            package: 'amsmath',
            mathMode: '\\begin{multline}\\n$1\\n\\end{multline}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         },
         {
            id: 'multline_star',
            label: '\\begin{multline*}',
            description: 'Idem sans numérotation',
            package: 'amsmath',
            mathMode: '\\begin{multline*}\\n$1\\n\\end{multline*}$0',
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
            mathMode: '\\begin{split}\\n$1\\n\\end{split}$0',
            textMode: null,
            supportsMath: true,
            supportsText: false
         }
      ]
   }
};

// Commandes mathématiques sans variantes (avec templates $1/$0)
const mathSimpleCommands = {
   // Opérateurs mathématiques
   sum: { mathMode: '\\sum_{$1}^{$0}', textMode: null, supportsMath: true, supportsText: false },
   prod: { mathMode: '\\prod_{$1}^{$0}', textMode: null, supportsMath: true, supportsText: false },
   int: { mathMode: '\\int_{$1}^{$0}', textMode: null, supportsMath: true, supportsText: false },
   lim: { mathMode: '\\lim_{$1}$0', textMode: null, supportsMath: true, supportsText: false },
   sup: { mathMode: '\\sup_{$1}$0', textMode: null, supportsMath: true, supportsText: false },
   inf: { mathMode: '\\inf_{$1}$0', textMode: null, supportsMath: true, supportsText: false },
   max: { mathMode: '\\max_{$1}$0', textMode: null, supportsMath: true, supportsText: false },
   min: { mathMode: '\\min_{$1}$0', textMode: null, supportsMath: true, supportsText: false },

   // Fonctions mathématiques
   sin: { mathMode: '\\sin($1)$0', textMode: null, supportsMath: true, supportsText: false },
   cos: { mathMode: '\\cos($1)$0', textMode: null, supportsMath: true, supportsText: false },
   tan: { mathMode: '\\tan($1)$0', textMode: null, supportsMath: true, supportsText: false },
   ln: { mathMode: '\\ln($1)$0', textMode: null, supportsMath: true, supportsText: false },
   exp: { mathMode: '\\exp($1)$0', textMode: null, supportsMath: true, supportsText: false },

   // Exposant et indice
   superscript: { mathMode: '{$1}^{$0}', textMode: null, supportsMath: true, supportsText: false },
   subscript: { mathMode: '{$1}_{$0}', textMode: null, supportsMath: true, supportsText: false },

   // Symboles mathématiques
   leq: { mathMode: '\\leq $0', textMode: null, supportsMath: true, supportsText: false },
   geq: { mathMode: '\\geq $0', textMode: null, supportsMath: true, supportsText: false },
   neq: { mathMode: '\\neq $0', textMode: null, supportsMath: true, supportsText: false },
   approx: { mathMode: '\\approx $0', textMode: null, supportsMath: true, supportsText: false },
   sim: { mathMode: '\\sim $0', textMode: null, supportsMath: true, supportsText: false },
   equiv: { mathMode: '\\equiv $0', textMode: null, supportsMath: true, supportsText: false },

   // Parenthèses ajustables
   left_paren: { mathMode: '\\left($1\\right)$0', textMode: null, supportsMath: true, supportsText: false },
   left_bracket: { mathMode: '\\left[$1\\right]$0', textMode: null, supportsMath: true, supportsText: false },
   left_brace: { mathMode: '\\left\\{$1\\right\\}$0', textMode: null, supportsMath: true, supportsText: false },
   left_abs: { mathMode: '\\left|$1\\right|$0', textMode: null, supportsMath: true, supportsText: false },
   left_norm: { mathMode: '\\left\\|$1\\right\\|$0', textMode: null, supportsMath: true, supportsText: false },

   // Ensembles de nombres
   mathbb_N: { mathMode: '\\mathbb{N}$0', textMode: null, supportsMath: true, supportsText: false },
   mathbb_Z: { mathMode: '\\mathbb{Z}$0', textMode: null, supportsMath: true, supportsText: false },
   mathbb_D: { mathMode: '\\mathbb{D}$0', textMode: null, supportsMath: true, supportsText: false },
   mathbb_Q: { mathMode: '\\mathbb{Q}$0', textMode: null, supportsMath: true, supportsText: false },
   mathbb_R: { mathMode: '\\mathbb{R}$0', textMode: null, supportsMath: true, supportsText: false },
   mathbb_C: { mathMode: '\\mathbb{C}$0', textMode: null, supportsMath: true, supportsText: false },

   // Symboles logiques et ensemblistes
   subset: { mathMode: '\\subset $0', textMode: null, supportsMath: true, supportsText: false },
   cup: { mathMode: '\\cup $0', textMode: null, supportsMath: true, supportsText: false },
   cap: { mathMode: '\\cap $0', textMode: null, supportsMath: true, supportsText: false },
   forall: { mathMode: '\\forall $0', textMode: null, supportsMath: true, supportsText: false },
   exists: { mathMode: '\\exists $0', textMode: null, supportsMath: true, supportsText: false },
   cdot: { mathMode: '\\cdot $0', textMode: null, supportsMath: true, supportsText: false },
   dots: { mathMode: '\\dots $0', textMode: null, supportsMath: true, supportsText: false },
   cdots: { mathMode: '\\cdots $0', textMode: null, supportsMath: true, supportsText: false },
   times: { mathMode: '\\times $0', textMode: null, supportsMath: true, supportsText: false },
   div: { mathMode: '\\div $0', textMode: null, supportsMath: true, supportsText: false },
   pm: { mathMode: '\\pm $0', textMode: null, supportsMath: true, supportsText: false },

   // Vecteurs et texte positionné
   widehat: { mathMode: '\\widehat{$1}$0', textMode: null, supportsMath: true, supportsText: false },
   underset: { mathMode: '\\underset{$1}{$0}', textMode: null, supportsMath: true, supportsText: false },
   overset: { mathMode: '\\overset{$1}{$0}', textMode: null, supportsMath: true, supportsText: false },

   // Environnements mathématiques
   inline_dollar: { mathMode: null, textMode: '$$1$$0', supportsMath: false, supportsText: true },
   display_dollar: { mathMode: null, textMode: '$$\\n$1\\n$$$0', supportsMath: false, supportsText: true },
   inline: { mathMode: null, textMode: '\\($1\\)$0', supportsMath: false, supportsText: true },
   display: { mathMode: null, textMode: '\\[\\n$1\\n\\]$0', supportsMath: false, supportsText: true },

   subequations: { mathMode: '\\begin{subequations}\\n$1\\n\\end{subequations}$0', textMode: '\\begin{subequations}\\n$1\\n\\end{subequations}$0', supportsMath: true, supportsText: true },
   displaystyle: { mathMode: '\\displaystyle $0', textMode: null, supportsMath: true, supportsText: false }
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

function getMathSimpleCommand(command) {
   return mathSimpleCommands[command] || null;
}

/**
 * Fonction pour générer le contenu d'une matrice basée sur des paramètres
 * @param {Object} params - Les paramètres de la matrice
 * @returns {string} - Le contenu à insérer à la place de $1
 */
function generateMatrixContent(params) {
  const { 
    rows = 2, 
    cols = 2 
  } = params;
  
  // Créer une structure vide avec & et \\
  const matrixRows = [];
  for (let i = 0; i < rows; i++) {
    const cells = [];
    for (let j = 0; j < cols; j++) {
      cells.push('');
    }
    matrixRows.push(cells.join(' & '));
  }
  
  return matrixRows.join(' \\\\\n');
}

/**
 * Fonction pour créer une matrice basée sur des paramètres avec processTemplate
 * @param {Object} params - Les paramètres de la matrice
 * @param {string} text - Le texte sélectionné
 * @param {vscode.Selection} selection - La sélection actuelle
 * @returns {Object} - {replaced: string, newSelection: vscode.Selection|null}
 */
function wrapWithMatrix(params, text = '', selection = null) {
  const { 
    rows = 2,
    cols = 2,
    matrixType = 'pmatrix'
  } = params;
  
  // Obtenir la variante correspondant au type de matrice
  const variants = getMathCommandVariants('matrix');
  if (!variants) return { replaced: '', newSelection: null };
  
  const variant = variants.variants.find(v => v.id === matrixType);
  if (!variant) return { replaced: '', newSelection: null };
  
  const { processTemplate } = require('../../utils/utils');
  
  // Si du texte est sélectionné, utiliser le template normal
  if (text && text.trim() !== '') {
    return processTemplate(variant.mathMode, text, selection);
  } else {
    // Pas de texte sélectionné : modifier le template pour injecter le contenu généré
    const matrixContent = generateMatrixContent(params);
    
    // Injecter le contenu généré dans le template en préservant $1
    const commandeModifiee = variant.mathMode.replace('$1', '$1' + matrixContent);
    
    // Appeler processTemplate avec le template modifié et un contenu vide
    return processTemplate(commandeModifiee, '', selection);
  }
}

module.exports = {
   mathCommandVariants,
   mathSimpleCommands,
   getMathCommandVariants,
   getDefaultMathVariant,
   getMathSimpleCommand,
   wrapWithMatrix,
   generateMatrixContent
};