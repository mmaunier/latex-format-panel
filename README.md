# 🎨 LaTeX Format Panel

Extension VSCode pour le formatage LaTeX avec panneau interactif.

## ✨ Fonctionnalités

- **📝 Formatage de texte** : Gras, italique, emphase, oblique, souligné, etc.
- **🔢 Symboles mathématiques** : Plus de 80 symboles organisés en 12 blocs
- **📄 Environnements LaTeX** : Insertion rapide d'environnements courants
- **🎛️ Interfaces modales** : 
  - Création avancée de tableaux tabularray avec options personnalisables
  - Génération de matrices avec dimensions et délimiteurs configurables
- **🎯 Menus contextuels** : Variantes pour fractions, racines, matrices, environnements d'équation, etc.
- **📊 Support mathématique avancé** : 
  - Environnements d'équations (equation, align, gather, cases)
  - Environnements d'alignement et systèmes d'équations
- **⚒️ Structure du document** :
  - Commandes de chapitres et sections avec variantes
  - Gestion des compteurs et références
  - Espacement horizontal et vertical avancé
- **🔄 Support complet** : Fonctionne en mode math et texte
- **⚙️ Configuration avancée** : Variantes personnalisables pour chaque commande
- **📍 Positionnement intelligent** : Placement optimal du curseur après insertion
- **✨ Onglet personnalisé** : Créez vos propres boutons via les paramètres de l'extension

## 📦 Installation

### Depuis le Marketplace de Visual Studio Code

1. Ouvrez Visual Studio Code
2. Cliquez sur l'icône Extensions dans la barre latérale (ou `Ctrl+Shift+X`)
3. Recherchez "LaTeX Format Panel" ou "mmaunier"
4. Cliquez sur "Installer"

### Depuis le fichier .vsix

1. Téléchargez le fichier `build/mmaunier.latex-format-panel-0.1.14.vsix`
2. Ouvrez VSCode
3. Utilisez `Ctrl+Shift+P` → "Extensions: Install from VSIX"
4. Sélectionnez le fichier téléchargé

### Depuis le code source

```bash
git clone https://github.com/mmaunier/latex-format-panel.git
cd latex-format-panel
npm install
npx vsce package
code --install-extension mmaunier.latex-format-panel-0.1.14.vsix
```

## 🚀 Utilisation

1. Ouvrez un fichier `.tex`
2. Le panneau "LaTeX Format" apparaît dans la barre latérale
3. Sélectionnez du texte et cliquez sur les boutons
4. Utilisez le clic droit pour les variantes (fractions, racines, matrices)
5. Utilisez les boutons "Commenter" et "Décommenter" dans la section Spécial pour commenter/décommenter rapidement le code LaTeX, même de façon répétée. Les commandes sont aussi accessibles via la palette (Ctrl+Shift+P) et par raccourcis clavier personnalisables.
6. Configurez vos propres boutons via les paramètres (`Ctrl+,` → "LaTeX Format Panel" → "Perso Buttons")

## 📋 Blocs disponibles

### 🎨 Formatage (12 blocs)
- **📝 Texte** : Gras, italique, emphase, oblique, souligné, petites capitales, surligné
- **📏 Tailles** : tiny, scriptsize, footnotesize, small, normalsize, large, Large, LARGE, huge, Huge
- **🔤 Transformations** : Majuscules, minuscules, exposant, indice, accentuation
- **📐 Alignement** : Centré, aligné à gauche/droite
- **🎯 Espacement horizontal** : quad, qquad, noindent, hspace, hfill, hbox
- **↕️ Espacement vertical** : smallskip, medskip, bigskip, vspace, vfill, newpage
- **📑 Structure** : Chapitres, sections, paragraphes avec variantes
- **🔢 Compteurs** : setlength, setcounter, label avec références
- **📃 Listes** : enumerate, itemize, description, \item
- **🏗️ Environnements** : 
  - **Mise en page** : minipage, multicols, tabbing
  - **Figures** : figure, wrapfig, includegraphics
  - **Dessin et code** : tikzpicture, tcolorbox, listing
  - **Tableaux** : table, tabular, tabularray
- **🛠️ Spécial** : Deux boutons "Commenter" et "Décommenter", enchaînables à volonté.

### 🔢 Mathématiques (12 blocs)
- **⚡ Opérateurs** : ∑, ∏, ∫, lim, sup, inf, max, min
- **🔝 Exposants/Indices** : Fractions, x², x₂
- **⚖️ Comparaisons** : ≤, ≥, ≠, ≈, →, ⇒, etc.
- **📊 Fonctions** : √, sin, cos, tan, ln, exp
- **🔗 Parenthèses** : ( ), [ ], { }, | |, || ||, matrices (pmatrix, bmatrix, vmatrix, etc.)
- **🔢 Ensembles** : ℕ, ℤ, 𝔻, ℚ, ℝ, ℂ
- **🎯 Logique** : ∈, ⊂, ∪, ∩, ∀, ∃, ×, ÷, ±, ⋯
- **📍 Vecteurs** : Flèches (vec, overrightarrow), angles, texte positionné (underset, overset)
- **📐 Environnements de base** : `$...$`, `\[...\]`
- **📝 Environnements équation** : equation, equation*, subequations, \displaystyle
- **📊 Environnements d'alignement** : align, alignat, gather avec leurs variantes
- **🧮 Environnements spéciaux** : cases, systeme, multline, split

### ✨ Personnalisé
- **🎯 Vos propres boutons** : Configurez entièrement l'onglet Perso via les paramètres
- **📝 Titres et sections** : Organisez vos boutons par groupes thématiques
- **⚙️ Commandes personnalisées** : Définissez vos propres commandes LaTeX avec syntaxe `{}` pour le texte sélectionné
- **🔄 Configuration dynamique** : Modification à chaud sans redémarrage, regroupement automatique par 3 boutons par ligne

## 🛠️ Développement

```bash
# Cloner le repository
git clone https://github.com/mmaunier/latex-format-panel.git

# Installer les dépendances
npm install

# Développer
code .
# Appuyer sur F5 pour tester

# Construire le paquet
npm run package
```

## 📄 Licence

MIT © Mikaël Maunier

## 🤝 Contributions

Les contributions sont les bienvenues ! Ouvrez une issue ou soumettez une pull request.

## 📈 Changelog

### 0.1.15
- Correction d'un bug sur l'affichage du menu contextuel.

### 0.1.14
- Correction de la version dans le fichier `package.json`
- Mise à jour du fichier `README.md` sur le marketplace

### 0.1.13
- ✨ Nouvel onglet "Perso" pour vos propres boutons
- ⚙️ Configuration entièrement personnalisable via les paramètres de l'extension
- 🐛 Correction de bugs

### 0.1.12
- 🚀 Publication de l'extension sur le MarketPlace

### 0.1.11
- 🛠️ Ajout de la section "Spécial" dans l'onglet Format avec deux boutons : "Commenter" et "Décommenter"
- 🔄 Les boutons permettent d'enchaîner plusieurs `%` ou de les retirer, ligne par ligne
- 🚀 Export des fonctions pour utilisation via la palette de commandes et les raccourcis clavier

### 0.1.10
- 🔧 Downgrade de l'extension
- 🗑️ Plus de lien avec les paramètres
- 🧹 Commandes consoles supprimées

### 0.1.8
- ⚒️ Refonte de l'onglet Format avec nouveaux blocs thématiques :
  - Ajout d'une section "Sectionnement et espacement" pour une meilleure organisation
  - Nouveaux blocs d'espacement horizontal et vertical (12 commandes)
  - Bloc de commandes pour chapitres, sections et paragraphes avec variantes
  - Bloc de compteurs et références (setlength, setcounter, label)
- 🔍 Extension des menus contextuels :
  - Variantes pour chapitres et sections (part, chapter, section, subsection...)
  - Multiples options pour references (label, ref, eqref, cref, vref...)
  - Variantes pour commandes de compteurs (setcounter, stepcounter, addtocounter...)
- 🎯 Positionnement intelligent du curseur :
  - Amélioration du placement du curseur dans les commandes à plusieurs arguments
  - Support étendu pour les marqueurs de position dans tous les types de commandes
- 🎨 Refonte visuelle de l'interface :
  - Regroupement thématique des boutons
  - Distinction visuelle entre commandes primaires et secondaires
  - Icônes SVG pour certaines commandes d'espacement
- 🐛 Corrections et optimisations diverses

### 0.1.7
- 🎛️ Ajout d'une interface modale pour la création de matrices :
  - Sélection des dimensions (2×2, 3×3, personnalisé)
  - Choix du type de délimiteurs (parenthèses, crochets, barres, accolades)
  - Génération automatique de la structure selon les dimensions
- 📊 Enrichissement des environnements mathématiques :
  - Environnements d'équation : equation, equation*, subequations, \displaystyle
  - Environnements d'alignement : align, alignat, gather avec leurs variantes
  - Environnements spéciaux : cases, systeme, multline, split
- 🎯 Amélioration des variantes par défaut :
  - Versions sans numérotation (*) comme options par défaut
  - Menus contextuels étendus pour accéder aux variantes
- 🔄 Positionnement intelligent du curseur :
  - Placement optimal dans les tableaux et matrices
  - Support des marqueurs de position pour une meilleure expérience utilisateur
- 🐛 Corrections et optimisations diverses

### 0.1.6
- 🛠️ Amélioration de l'interface modale tabularray :
  - Option de coloration d'une ligne sur deux (lignes paires)
  - Meilleure gestion des paramètres colspec (génération automatique selon le nombre de colonnes)
  - Réorganisation des options pour une utilisation plus intuitive
  - Grille complète comme option par défaut
- 🔄 Centralisation du code de génération des tableaux pour une maintenance facilitée
- 📦 Amélioration du script de build :
  - Synchronisation automatique du README dans le dossier build
  - Meilleure gestion des erreurs
  - Intégration Git améliorée
- 🐛 Corrections mineures et optimisations de performances

### 0.1.5
- 🎛️ Ajout d'une interface modale pour la création de tableaux tabularray
- 📊 Options avancées pour les tableaux :
  - Largeur et hauteur des lignes configurables
  - Gestion des en-têtes (première ligne/colonne)
  - Styles de bordures personnalisables (grille, lignes horizontales/verticales)
  - Coloration alternée des lignes
  - Personnalisation avancée des spécifications de colonnes
- 📋 Support de l'insertion du texte sélectionné dans les tableaux
- 🔧 Amélioration du script de build et de déploiement
- 🧹 Refactoring du code pour une meilleure maintenance

### 0.1.3
- ✅ Correction du support du souligné en mode mathématique (`\underline` vs `\uline`)
- 🆕 Ajout de nouveaux environnements : tikzpicture, tcolorbox, listing, tabularray
- 🔧 Amélioration de la détection du mode mathématique
- 📊 Ajout de variantes pour les matrices (pmatrix, bmatrix, vmatrix, Vmatrix, Bmatrix)
- 🎯 Menus contextuels étendus pour plus de commandes
- 🔢 Ajout de l'ensemble 𝔻 (nombres décimaux)

### 0.1.2
- 🔢 Support mathématique complet (9 blocs)
- 🎯 Menus contextuels pour variantes
- 🎨 Amélioration de l'interface

### 0.1.0
- 🎉 Version initiale
- 📝 Support de base du formatage