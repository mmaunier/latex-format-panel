const vscode = require('vscode');

/**
 * Classe pour synchroniser les paramètres VSCode avec la configuration
 */
class SettingsSync {
   constructor(configManager) {
      this.configManager = configManager;
   }

   /**
    * Enregistre les commandes liées aux paramètres
    */
   registerCommands(context) {
      // Commandes générales
      context.subscriptions.push(
         vscode.commands.registerCommand('latex-format-panel.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', 'latex-format-panel');
         })
      );

      context.subscriptions.push(
         vscode.commands.registerCommand('latex-format-panel.resetConfig', () => {
            this.configManager.resetConfig();
            vscode.window.showInformationMessage('Configuration réinitialisée aux valeurs par défaut');
         })
      );

      context.subscriptions.push(
         vscode.commands.registerCommand('latex-format-panel.showConfig', () => {
            const configPath = this.configManager.getConfigPath();
            vscode.window.showInformationMessage(`Configuration: ${configPath}`, 'Ouvrir le fichier').then(selection => {
               if (selection === 'Ouvrir le fichier') {
                  vscode.workspace.openTextDocument(configPath).then(doc => {
                     vscode.window.showTextDocument(doc);
                  });
               }
            });
         })
      );

      context.subscriptions.push(
         vscode.commands.registerCommand('latex-format-panel.cleanVSCodeSettings', () => {
            this.configManager.cleanVSCodeSettings();
            vscode.window.showInformationMessage('Paramètres VSCode nettoyés et resynchronisés avec le fichier JSON');
         })
      );

      // Commandes spécifiques pour le gras
      this.registerFormatCommands(context, 'bold', 'Gras');
      
      // Commandes spécifiques pour l'italique (futures)
      this.registerFormatCommands(context, 'italic', 'Italique');
   }

   /**
    * Enregistre les commandes pour un format spécifique
    */
   registerFormatCommands(context, formatKey, formatName) {
      // Commande pour ajouter une variante
      context.subscriptions.push(
         vscode.commands.registerCommand(`latex-format-panel.add${formatName}Variant`, async () => {
            await this.addVariantDialog('formats', 'text', formatKey, formatName);
         })
      );

      // Commande pour supprimer une variante
      context.subscriptions.push(
         vscode.commands.registerCommand(`latex-format-panel.remove${formatName}Variant`, async () => {
            await this.removeVariantDialog('formats', 'text', formatKey, formatName);
         })
      );

      // Commande pour valider les variantes
      context.subscriptions.push(
         vscode.commands.registerCommand(`latex-format-panel.validate${formatName}Variants`, () => {
            this.validateVariants('formats', 'text', formatKey, formatName);
         })
      );

      // Commande pour sélectionner une variante
      context.subscriptions.push(
         vscode.commands.registerCommand(`latex-format-panel.select${formatName}Variant`, async () => {
            await this.selectVariantDialog('formats', 'text', formatKey, formatName);
         })
      );
   }

   /**
    * Dialogue pour ajouter une variante
    */
   async addVariantDialog(category, subcategory, formatKey, formatName) {
      try {
         const name = await vscode.window.showInputBox({
            prompt: `Nom de la variante ${formatName}`,
            placeHolder: 'textbf',
            validateInput: (value) => {
               if (!value || value.trim() === '') return 'Le nom est requis';
               if (value.includes('§')) return 'Le nom ne doit pas contenir §';
               return null;
            }
         });
         
         if (!name) return;
         
         const command = await vscode.window.showInputBox({
            prompt: 'Commande LaTeX (optionnel - utilisera le nom si vide)',
            placeHolder: '\\textbf{$1}$0',
            value: name,
            validateInput: (value) => {
               if (value && value.includes('§')) return 'La commande ne doit pas contenir §';
               return null;
            }
         });
         
         const finalCommand = command && command.trim() ? command : name;
         
         const description = await vscode.window.showInputBox({
            prompt: 'Description (optionnel)',
            placeHolder: 'Commande standard',
            validateInput: (value) => {
               return null;
            }
         });
         
         const finalDescription = description || '';
         
         this.configManager.addButtonVariant(category, subcategory, formatKey, name, finalCommand, finalDescription);
         vscode.window.showInformationMessage(`Variante "${name}" ajoutée avec succès au format ${formatName}`);
         
      } catch (error) {
         vscode.window.showErrorMessage(`Erreur : ${error.message}`);
      }
   }

   /**
    * Dialogue pour supprimer une variante
    */
   async removeVariantDialog(category, subcategory, formatKey, formatName) {
      try {
         const variants = this.configManager.getButtonVariants(category, subcategory, formatKey);
         
         if (variants.length === 0) {
            vscode.window.showWarningMessage(`Aucune variante à supprimer pour ${formatName}`);
            return;
         }
         
         const items = variants.map(variant => ({
            label: variant.name,
            description: variant.description,
            detail: variant.command
         }));
         
         const selected = await vscode.window.showQuickPick(items, {
            placeHolder: `Sélectionnez la variante ${formatName} à supprimer`
         });
         
         if (selected) {
            this.configManager.removeButtonVariant(category, subcategory, formatKey, selected.label);
            vscode.window.showInformationMessage(`Variante "${selected.label}" supprimée du format ${formatName}`);
         }
         
      } catch (error) {
         vscode.window.showErrorMessage(`Erreur : ${error.message}`);
      }
   }

   /**
    * Dialogue pour sélectionner une variante
    */
   async selectVariantDialog(category, subcategory, formatKey, formatName) {
      try {
         const variants = this.configManager.getButtonVariants(category, subcategory, formatKey);
         
         if (variants.length === 0) {
            vscode.window.showWarningMessage(`Aucune variante configurée pour ${formatName}`);
            return;
         }
         
         const items = variants.map(variant => ({
            label: variant.name,
            description: variant.description || 'Pas de description',
            detail: variant.command,
            variant: variant
         }));
         
         const selected = await vscode.window.showQuickPick(items, {
            placeHolder: `Sélectionnez une variante ${formatName}`
         });
         
         if (selected) {
            // Appliquer la variante sélectionnée
            vscode.commands.executeCommand('latexFormat.wrapWithVariant', formatKey, selected.variant);
         }
         
      } catch (error) {
         vscode.window.showErrorMessage(`Erreur : ${error.message}`);
      }
   }

   /**
    * Valide les variantes d'un format
    */
   validateVariants(category, subcategory, formatKey, formatName) {
      const config = this.configManager.loadConfig();
      const variants = config[category]?.[subcategory]?.[formatKey]?.variants || '';
      
      const errors = this.configManager.validateVariants(variants);
      
      if (errors.length === 0) {
         vscode.window.showInformationMessage(`Toutes les variantes ${formatName} sont valides !`);
      } else {
         vscode.window.showErrorMessage(`Erreurs trouvées dans ${formatName}:\n${errors.join('\n')}`);
      }
   }
}

module.exports = {
   SettingsSync
};