#!/bin/bash
set -e

# Récupérer le type de version (défaut: patch)
VERSION_TYPE=${1:-patch}

echo "🚀 LaTeX Format Panel - Build & Release"
echo "======================================"
echo "Usage: $0 [patch|minor|major] (défaut: patch)"
echo "Type de version : $VERSION_TYPE"
echo ""

# Valider le type de version
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo "❌ Type de version invalide : $VERSION_TYPE"
    echo "   Types valides : patch, minor, major"
    exit 1
fi

# 1. Vérifier qu'il n'y a pas de commits en attente
echo "🔍 Vérification de l'état Git..."
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "❌ Des modifications sont en attente. Commitez ou annulez les changements avant de continuer."
    git status
    exit 1
fi

# 2. Incrémenter la version et récupérer les informations
echo "📝 Incrémentation de la version ($VERSION_TYPE)..."
npm version $VERSION_TYPE --no-git-tag-version

VERSION=$(node -p "require('./package.json').version")
PUBLISHER=$(node -p "require('./package.json').publisher")
NAME=$(node -p "require('./package.json').name")
FULL_NAME="$PUBLISHER.$NAME"

echo "🏷️  Nouvelle version : $VERSION"

# 3. Mettre à jour les README.md
echo "📝 Mise à jour des README.md..."
sed -i "s/latex-format-panel-[0-9]\+\.[0-9]\+\.[0-9]\+\.vsix/$NAME-$VERSION.vsix/g" README.md

mkdir -p build
cp README.md build/README.md

# 4. Créer le .vsix
echo "📦 Construction de l'extension..."
rm -f build/*.vsix
npx vsce package --out build/

VSIX_FILE=$(ls build/*.vsix)
echo "✅ Extension créée : $VSIX_FILE"

# 5. Commit tout
echo "📤 Commit et push..."
git add .
git commit -m "Release v$VERSION"
git tag "v$VERSION"
git push --follow-tags

# 6. Publier sur le Marketplace
echo "🌐 Publication sur le Marketplace..."
if npx vsce publish; then
    echo "✅ Extension publiée avec succès !"
    echo "🔗 https://marketplace.visualstudio.com/items?itemName=$FULL_NAME"
else
    echo "❌ Erreur lors de la publication"
    echo "📦 Fichier disponible : $VSIX_FILE"
    exit 1
fi

echo "✅ Release terminée !"
echo "📥 Installation locale : code --install-extension $VSIX_FILE"