# 📈 Changelog

Ce fichier suit le format [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).  
Toutes les modifications notables du projet seront documentées ici.

Le format de version utilisé est [SemVer](https://semver.org/lang/fr/).

## [Non publié]

## [0.2.3] - 2025-08-21
### Fixed
- Correction de bug critique : préservation du texte sélectionné lors de l'utilisation de boutons non compatibles avec le mode actuel (texte/math)
- Amélioration de la sécurité : annulation automatique des actions inappropriées au lieu de supprimer le contenu sélectionné
- Harmonisation du comportement de sécurité sur tous les onglets (Math, Format, Perso)

## [0.2.2] - 2025-08-05
### Added
- Ajout de menus contextuels pour les environnements de mise en page :
  - **minipage** : variantes standard, mini (k), mini (dim) avec package perso
  - **multicols** : variantes standard, MultiCols avec trait, MultiCols avec énumération  
  - **tabbing** : variantes simple et avec exemple de structure

### Changed
- Optimisation de l'affichage des boutons dans l'onglet Format :
  - Réduction du padding intérieur à 2px avec contenu parfaitement centré
  - Adaptation automatique de la taille de police selon la longueur du texte des boutons
  - Amélioration du centrage avec flexbox et gestion du débordement

### Fixed
- Correction du caractère Unicode pour \mathbb{B} : 𝔸𝔹ℂ (au lieu de 𝔸𝔻ℂ)

## [0.2.1] - 2025-07-29
### Fixed
- Correction du bug des variantes dans l'onglet Perso (les menus contextuels fonctionnent maintenant correctement)
- Amélioration de la numérotation des variantes : numérotation à partir de 1 pour une meilleure expérience utilisateur
- Validation automatique des valeurs par défaut (si ≤ 0 ou > nombre de variantes, la valeur est automatiquement fixée à 1)

## [0.2.0] - 2025-07-28
### Added
- Ajout de menus contextuels dans l'onglet Perso avec possibilité d'ajouter des variantes (voir la documentation)
- Uniformisation de la taille des boutons dans l'onglet Perso

### Changed
- Refonte complète de la logique de traitement des commandes dans tous les onglets (Formats/Math/Perso) pour une meilleure gestion
- Amélioration du positionnement de la sélection et des curseurs
- Mise à jour de la documentation

## [0.1.18] - 2025-07-28
### Added
- Nouvelle gestion des identifiants dans Perso (générateur unique)

### Changed
- Amélioration du rafraichissement lors de la création d'une nouvelle commande dans l'onglet Perso

### Fixed
- Correction de bugs dans l'onglet Perso

## [0.1.17] - 2025-07-26
### Added
- Nouveau système de marqueurs pour l'onglet Perso :
  - Support de `$1` pour le texte sélectionné (peut apparaître plusieurs fois)
  - Support de `$0` pour la position finale du curseur
  - Support de `\n` pour les retours à la ligne

## [0.1.16] - 2025-07-26
### Fixed
- Correction d'un bug sur l'affichage du menu contextuel

## [0.1.15] - 2025-07-26
### Fixed
- Correction d'un bug sur l'affichage du menu contextuel

## [0.1.14] - 2025-07-26
### Fixed
- Correction de la version dans le fichier `package.json`

### Changed
- Mise à jour du fichier `README.md` sur le marketplace

## [0.1.13] - 2025-07-26
### Added
- Nouvel onglet "Perso" pour vos propres boutons
- Configuration entièrement personnalisable via les paramètres de l'extension

### Fixed
- Correction de bugs

## [0.1.12] - 2025-07-24
### Added
- Publication de l'extension sur le MarketPlace

## [0.1.11] - 2025-07-22
### Added
- Ajout de la section "Spécial" dans l'onglet Format avec deux boutons : "Commenter" et "Décommenter"
- Les boutons permettent d'enchaîner plusieurs `%` ou de les retirer, ligne par ligne
- Export des fonctions pour utilisation via la palette de commandes et les raccourcis clavier

## [0.1.10] - 2025-07-20
### Changed
- Downgrade de l'extension

### Removed
- Plus de lien avec les paramètres
- Commandes consoles supprimées

## [0.1.9] - 2025-07-19
### Added
- Refonte de l'onglet Format avec nouveaux blocs thématiques :
  - Ajout d'une section "Sectionnement et espacement" pour une meilleure organisation
  - Nouveaux blocs d'espacement horizontal et vertical (12 commandes)
  - Bloc de commandes pour chapitres, sections et paragraphes avec variantes
  - Bloc de compteurs et références (setlength, setcounter, label)
- Extension des menus contextuels :
  - Variantes pour chapitres et sections (part, chapter, section, subsection...)
  - Multiples options pour references (label, ref, eqref, cref, vref...)
  - Variantes pour commandes de compteurs (setcounter, stepcounter, addtocounter...)

### Changed
- Positionnement intelligent du curseur :
  - Amélioration du placement du curseur dans les commandes à plusieurs arguments
  - Support étendu pour les marqueurs de position dans tous les types de commandes
- Refonte visuelle de l'interface :
  - Regroupement thématique des boutons
  - Distinction visuelle entre commandes primaires et secondaires
  - Icônes SVG pour certaines commandes d'espacement

### Fixed
- Corrections et optimisations diverses

## [0.1.8] - 2025-07-18
### Added
- Refonte de l'onglet Format avec nouveaux blocs thématiques

## [0.1.7] - 2025-07-18
### Added
- Ajout d'une interface modale pour la création de matrices :
  - Sélection des dimensions (2×2, 3×3, personnalisé)
  - Choix du type de délimiteurs (parenthèses, crochets, barres, accolades)
  - Génération automatique de la structure selon les dimensions
- Enrichissement des environnements mathématiques :
  - Environnements d'équation : equation, equation*, subequations, \displaystyle
  - Environnements d'alignement : align, alignat, gather avec leurs variantes
  - Environnements spéciaux : cases, systeme, multline, split

### Changed
- Amélioration des variantes par défaut :
  - Versions sans numérotation (*) comme options par défaut
  - Menus contextuels étendus pour accéder aux variantes
- Positionnement intelligent du curseur :
  - Placement optimal dans les tableaux et matrices
  - Support des marqueurs de position pour une meilleure expérience utilisateur

### Fixed
- Corrections et optimisations diverses

## [0.1.6] - 2025-07-17
### Added
- Amélioration de l'interface modale tabularray :
  - Option de coloration d'une ligne sur deux (lignes paires)
  - Meilleure gestion des paramètres colspec (génération automatique selon le nombre de colonnes)
  - Réorganisation des options pour une utilisation plus intuitive
  - Grille complète comme option par défaut

### Changed
- Centralisation du code de génération des tableaux pour une maintenance facilitée
- Amélioration du script de build :
  - Synchronisation automatique du README dans le dossier build
  - Meilleure gestion des erreurs
  - Intégration Git améliorée

### Fixed
- Corrections mineures et optimisations de performances

## [0.1.5] - 2025-07-16
### Added
- Ajout d'une interface modale pour la création de tableaux tabularray
- Options avancées pour les tableaux :
  - Largeur et hauteur des lignes configurables
  - Gestion des en-têtes (première ligne/colonne)
  - Styles de bordures personnalisables (grille, lignes horizontales/verticales)
  - Coloration alternée des lignes
  - Personnalisation avancée des spécifications de colonnes
- Support de l'insertion du texte sélectionné dans les tableaux

### Changed
- Amélioration du script de build et de déploiement
- Refactoring du code pour une meilleure maintenance

## [0.1.4] - 2025-07-15
### Added
- Ajout de nouveaux environnements : tikzpicture, tcolorbox, listing, tabularray
- Ajout de variantes pour les matrices (pmatrix, bmatrix, vmatrix, Vmatrix, Bmatrix)
- Ajout de l'ensemble 𝔻 (nombres décimaux)
- Menus contextuels étendus pour plus de commandes

### Changed
- Amélioration de la détection du mode mathématique

### Fixed
- Correction du support du souligné en mode mathématique (`\underline` vs `\uline`)

## [0.1.3] - 2025-07-14
### Fixed
- Correction du support du souligné en mode mathématique (`\underline` vs `\uline`)

## [0.1.2] - 2025-07-14
### Added
- Support mathématique complet (9 blocs)
- Menus contextuels pour variantes

### Changed
- Amélioration de l'interface

## [0.1.0] - 2025-07-13
### Added
- Version initiale
- Support de base du formatage