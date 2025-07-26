#!/bin/bash
set -e

echo "🚀 LaTeX Format Panel - Build & Release"
echo "======================================"

# Récupération des informations depuis package.json
VERSION=$(node -p "require('./package.json').version")
PUBLISHER=$(node -p "require('./package.json').publisher")
NAME=$(node -p "require('./package.json').name")
FULL_NAME="$PUBLISHER.$NAME"

echo "🏷️  Version : $VERSION"
echo "📦  Extension : $FULL_NAME"

# Mise à jour du README.md principal
echo "📝 Mise à jour du README.md principal..."
sed -i "s/\(mmaunier\.\)\?latex-format-panel-[0-9]\+\.[0-9]\+\.[0-9]\+\.vsix/$FULL_NAME-$VERSION.vsix/g" README.md

# Création du dossier build si nécessaire
mkdir -p build

# Mise à jour du README.md dans le dossier build
echo "📝 Mise à jour du README.md dans le dossier build..."
if [ -f "build/README.md" ]; then
    # Si le fichier existe, mettre à jour la version
    sed -i "s/\(mmaunier\.\)\?latex-format-panel-[0-9]\+\.[0-9]\+\.[0-9]\+\.vsix/$FULL_NAME-$VERSION.vsix/g" build/README.md
else
    # Si le fichier n'existe pas, copier le README.md principal
    cp README.md build/README.md
fi

# Nettoyage
echo "🧹 Nettoyage des builds précédents..."
rm -rf build/*.vsix

# Build de l'extension
echo "📦 Construction de l'extension..."
npx vsce package --out build/

# Vérification du fichier créé
VSIX_FILE=$(ls build/*.vsix 2>/dev/null || echo "")
if [ -n "$VSIX_FILE" ]; then
    echo "✅ Extension créée : $VSIX_FILE"
    echo "📊 Taille : $(ls -lh "$VSIX_FILE" | awk '{print $5}')"
else
    echo "❌ Erreur : Fichier .vsix non créé"
    exit 1
fi

# Git add du fichier build et README
echo "📤 Ajout au repository Git..."
git add build/
git add package.json
git add README.md
git add build/README.md

# Commit et push
git commit -m "Release v$VERSION - Add build artifact and update README" || echo "Rien à commiter"
git push

# Publication sur le Marketplace
echo "🌐 Publication sur le Marketplace VSCode..."
if npx vsce publish; then
    echo "✅ Extension publiée avec succès sur le Marketplace !"
    echo "🔗 Lien : https://marketplace.visualstudio.com/items?itemName=$FULL_NAME"
else
    echo "❌ Erreur lors de la publication sur le Marketplace"
    echo "📦 Le fichier .vsix est disponible dans : $VSIX_FILE"
    echo "🔧 Vous pouvez publier manuellement avec : npx vsce publish"
    exit 1
fi

echo "✅ Release terminée !"
echo "📥 Installation locale : code --install-extension $VSIX_FILE"
echo "🌐 Marketplace : https://marketplace.visualstudio.com/items?itemName=$FULL_NAME"
echo "🌐 GitHub : https://github.com/mmaunier/latex-format-panel"