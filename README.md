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

### Depuis le code source

```bash
git clone https://github.com/mmaunier/latex-format-panel.git
cd latex-format-panel
npm install
npx vsce package
Dans VSCode, utilisez `Ctrl+Shift+P` → "Extensions: Install from VSIX" et sélectionnez le fichier généré.
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
- **⚙️ Commandes avec marqueurs** : Utilisez `$1` pour le texte sélectionné et `$0` pour la position du curseur
- **🏗️ Support des environnements** : Créez facilement des environnements LaTeX complets
- **🔄 Configuration dynamique** : Modification à chaud sans redémarrage, regroupement automatique par 3 boutons par ligne

#### 📋 Configuration personnalisée

**Marqueurs :** `$1` = texte sélectionné, `$0` = position du curseur, `\n` = nouvelle ligne

**Exemples :**
```json
{"type": "bouton", "texte": "Section", "commande": "\\section{$1}$0"}
{"type": "bouton", "texte": "Environnement", "commande": "\\begin{$1}\n$0\n\\end{$1}"}
{"type": "bouton_variantes", "defaut": 0, "variantes": [
  {"texte": "Numéroté", "commande": "\\begin{align}\n$1\n\\end{align}$0"},
  {"texte": "Non numéroté", "commande": "\\begin{align*}\n$1\n\\end{align*}$0"}
]}
```

→ Configuration complète dans les paramètres VSCode (`Ctrl+,` → "LaTeX Format Panel")

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

### 0.2.1
- 🐛 Correction du bug des variantes dans l'onglet Perso (les menus contextuels fonctionnent maintenant correctement)
- 📊 Amélioration de la numérotation des variantes : numérotation à partir de 1 pour une meilleure expérience utilisateur
- 🔧 Validation automatique des valeurs par défaut (si ≤ 0 ou > nombre de variantes, la valeur est automatiquement fixée à 1)

### 0.2.0
- 🆕 Ajout de menus contextuels dans l'onglet Perso avec possibilité d'ajouter des variantes (voir la documentation)
- 🎨 Uniformisation de la taille des boutons dans l'onglet Perso
- 🛠️ Refonte complète de la logique de traitement des commandes dans tous les onglets (Formats/Math/Perso) pour une meilleure gestion
- 🎯 Amélioration du positionnement de la sélection et des curseurs
- 📚 Mise à jour de la documentation

### 0.1.18
- 🚀 Amélioration du rafraichissement lors de la création d'une nouvelle commande dans l'onglet Perso
- 🐛 Correction de bugs dans l'onglet Perso
- 🆕 Nouvelle gestion des identifiants dans Perso (générateur unique)

### 0.1.17
- 🎯 **Nouveau système de marqueurs** pour l'onglet Perso :
  - Support de `$1` pour le texte sélectionné (peut apparaître plusieurs fois)
  - Support de `$0` pour la position finale du curseur
  - Support de `\n` pour les retours à la ligne

 Retrouvez l’historique complet des versions dans [CHANGELOG.md](./CHANGELOG.md). 