const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// Configuration par défaut
const DEFAULT_CONFIG = {
  version: "0.1.8",
  lastModified: new Date().toISOString(),
  formats: {
    text: {
      bold: {
        textMode: "\\textbf{$1}$0",
        mathMode: "\\symbf{$1}$0",
        variants: "\\textbf{...}§\\textbf{$1}$0§Commande standard\n\\symbf{...}f§\\textbf{$1}$0§Gras mathématique\n{\\bfseries ...}§{\\bfseries $1}$0§Commande de déclaration\n\\begin{bfseries}...\\end{bfseries}§\\begin{bfseries}\n$1\n\\end{bfseries}\n$0§Environnement en Gras"
      },
      italic: {
        textMode: "\\textit{$1}$0",
        mathMode: "\\symit{$1}$0",
        variants: "\\textit{...}§\\textit{$1}$0§Commande standard\n\\emph{...}§\\emph{$1}$0§Mise en évidence\n{\\itshape ...}§{\\itshape $1}$0§Commande de déclaration"
      }
    }
  }
};

/**
 * Classe pour gérer la configuration de l'extension
 */
class ConfigManager {
  constructor(context) {
    this.context = context;
    this.configPath = path.join(context.globalStorageUri.fsPath, 'latex-format-panel.json');
    this.isUpdatingVSCode = false;
  }

  /**
   * Obtient le chemin du fichier de configuration
   */
  getConfigPath() {
    return this.configPath;
  }

  /**
   * Sauvegarde la configuration dans le fichier JSON
   */
  saveConfig(config) {
    try {
      const configDir = path.dirname(this.configPath);
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }

      config.lastModified = new Date().toISOString();
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
      console.log(`Configuration sauvegardée dans : ${this.configPath}`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw error;
    }
  }

  /**
   * Charge la configuration depuis le fichier JSON
   */
  loadConfig() {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf8');
        const config = JSON.parse(data);
        return this.mergeConfig(DEFAULT_CONFIG, config);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la configuration:', error);
    }
    
    return DEFAULT_CONFIG;
  }

  /**
   * Fusionne la configuration par défaut avec la configuration utilisateur
   */
  mergeConfig(defaultConfig, userConfig) {
    const merged = JSON.parse(JSON.stringify(defaultConfig));
    
    function deepMerge(target, source) {
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key]) target[key] = {};
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    
    deepMerge(merged, userConfig);
    return merged;
  }

  /**
   * Initialise la synchronisation des paramètres VSCode
   */
  initializeSync() {
    const config = this.loadConfig();
    this.updateVSCodeSettings(config);
    this.setupVSCodeListener();
  }

  /**
   * Met à jour les paramètres VSCode depuis le fichier JSON
   */
  updateVSCodeSettings(config) {
    if (this.isUpdatingVSCode) return;
    
    this.isUpdatingVSCode = true;
    
    try {
      const vscodeConfig = vscode.workspace.getConfiguration('latex-format-panel');
      
      // Synchroniser tous les formats
      Object.keys(config.formats.text).forEach(formatKey => {
        const formatConfig = config.formats.text[formatKey];
        
        vscodeConfig.update(`formats.${formatKey}.textMode`, formatConfig.textMode, vscode.ConfigurationTarget.Global);
        vscodeConfig.update(`formats.${formatKey}.mathMode`, formatConfig.mathMode, vscode.ConfigurationTarget.Global);
        vscodeConfig.update(`formats.${formatKey}.variants`, formatConfig.variants, vscode.ConfigurationTarget.Global);
      });
      
      console.log('Paramètres VSCode mis à jour depuis le fichier JSON');
    } finally {
      this.isUpdatingVSCode = false;
    }
  }

  /**
   * Écoute les changements dans VSCode et les répercute dans le fichier JSON
   */
  setupVSCodeListener() {
    vscode.workspace.onDidChangeConfiguration(event => {
      if (this.isUpdatingVSCode) return;
      
      if (event.affectsConfiguration('latex-format-panel.formats')) {
        this.syncFromVSCodeToJSON();
      }
    });
  }

  /**
   * Synchronise les changements VSCode vers le fichier JSON
   */
  syncFromVSCodeToJSON() {
    try {
      const config = this.loadConfig();
      const vscodeConfig = vscode.workspace.getConfiguration('latex-format-panel');
      
      let needsSave = false;
      
      // Synchroniser tous les formats
      Object.keys(config.formats.text).forEach(formatKey => {
        const textMode = vscodeConfig.get(`formats.${formatKey}.textMode`);
        const mathMode = vscodeConfig.get(`formats.${formatKey}.mathMode`);
        const variants = vscodeConfig.get(`formats.${formatKey}.variants`);
        
        // Valider les variantes avant de sauvegarder
        if (variants !== config.formats.text[formatKey].variants) {
          const errors = this.validateVariants(variants);
          if (errors.length > 0) {
            console.error(`Erreurs de validation des variantes pour ${formatKey}:`, errors);
            vscode.window.showErrorMessage(`Erreurs dans les variantes ${formatKey}:\n${errors.join('\n')}`);
            this.updateVSCodeSettings(config);
            return;
          }
        }
        
        // Mettre à jour la configuration
        if (textMode !== config.formats.text[formatKey].textMode) {
          config.formats.text[formatKey].textMode = textMode;
          needsSave = true;
        }
        
        if (mathMode !== config.formats.text[formatKey].mathMode) {
          config.formats.text[formatKey].mathMode = mathMode;
          needsSave = true;
        }
        
        if (variants !== config.formats.text[formatKey].variants) {
          config.formats.text[formatKey].variants = variants;
          needsSave = true;
        }
      });
      
      if (needsSave) {
        this.saveConfig(config);
        console.log('Configuration synchronisée: VSCode → fichier JSON');
      }
      
    } catch (error) {
      console.error('Erreur lors de la synchronisation:', error);
    }
  }

  /**
   * Obtient la configuration d'un bouton spécifique
   */
  getButtonConfig(category, subcategory, buttonId) {
    const config = this.loadConfig();
    return config[category]?.[subcategory]?.[buttonId] || null;
  }

  /**
   * Obtient les variantes d'un bouton
   */
  getButtonVariants(category, subcategory, buttonId) {
    const config = this.loadConfig();
    const variantsString = config[category]?.[subcategory]?.[buttonId]?.variants || '';
    return this.parseVariants(variantsString);
  }

  /**
   * Ajoute une variante à un bouton
   */
  addButtonVariant(category, subcategory, buttonId, name, command, description) {
    const config = this.loadConfig();
    
    if (!config[category]) config[category] = {};
    if (!config[category][subcategory]) config[category][subcategory] = {};
    if (!config[category][subcategory][buttonId]) config[category][subcategory][buttonId] = {};
    
    const existingVariants = this.getButtonVariants(category, subcategory, buttonId);
    
    if (existingVariants.find(v => v.name === name)) {
      throw new Error(`Une variante avec le nom "${name}" existe déjà`);
    }
    
    const newVariant = { name, command, description };
    const updatedVariants = [...existingVariants, newVariant];
    
    config[category][subcategory][buttonId].variants = this.variantsToString(updatedVariants);
    
    this.saveConfig(config);
    this.updateVSCodeSettings(config);
    
    return config;
  }

  /**
   * Supprime une variante d'un bouton
   */
  removeButtonVariant(category, subcategory, buttonId, name) {
    const config = this.loadConfig();
    
    const existingVariants = this.getButtonVariants(category, subcategory, buttonId);
    const updatedVariants = existingVariants.filter(v => v.name !== name);
    
    if (updatedVariants.length === existingVariants.length) {
      throw new Error(`Variante "${name}" introuvable`);
    }
    
    config[category][subcategory][buttonId].variants = this.variantsToString(updatedVariants);
    
    this.saveConfig(config);
    this.updateVSCodeSettings(config);
    
    return config;
  }

  /**
   * Nettoie les paramètres VSCode et resynchronise
   */
  cleanVSCodeSettings() {
    const config = this.loadConfig();
    const vscodeConfig = vscode.workspace.getConfiguration('latex-format-panel');
    
    // Nettoyer tous les formats
    Object.keys(config.formats.text).forEach(formatKey => {
      vscodeConfig.update(`formats.${formatKey}.textMode`, undefined, vscode.ConfigurationTarget.Global);
      vscodeConfig.update(`formats.${formatKey}.mathMode`, undefined, vscode.ConfigurationTarget.Global);
      vscodeConfig.update(`formats.${formatKey}.variants`, undefined, vscode.ConfigurationTarget.Global);
    });
    
    // Nettoyer les anciens paramètres UI (si ils existent)
    vscodeConfig.update('ui.textMode', undefined, vscode.ConfigurationTarget.Global);
    vscodeConfig.update('ui.mathMode', undefined, vscode.ConfigurationTarget.Global);
    vscodeConfig.update('ui.variants', undefined, vscode.ConfigurationTarget.Global);
    
    setTimeout(() => {
      this.updateVSCodeSettings(config);
    }, 100);
  }

  /**
   * Parse les variantes avec gestion flexible du nombre d'éléments
   */
  parseVariants(variantsString) {
    if (!variantsString || variantsString.trim() === '') return [];
    
    return variantsString.split('\n').map(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;
      
      const parts = trimmedLine.split('§');
      
      if (parts.length === 1) {
        const element = parts[0]?.trim() || '';
        return { name: element, command: element, description: '' };
      } else if (parts.length === 2) {
        return {
          name: parts[0]?.trim() || '',
          command: parts[1]?.trim() || '',
          description: ''
        };
      } else if (parts.length === 3) {
        return {
          name: parts[0]?.trim() || '',
          command: parts[1]?.trim() || '',
          description: parts[2]?.trim() || ''
        };
      } else {
        const name = parts[0]?.trim() || '';
        const command = parts[1]?.trim() || '';
        const description = parts.slice(2).join('§').trim();
        return { name, command, description };
      }
    }).filter(v => v && v.name && v.command);
  }

  /**
   * Convertit les variantes en chaîne multiligne
   */
  variantsToString(variants) {
    return variants.map(variant => {
      const name = variant.name || '';
      const command = variant.command || '';
      const description = variant.description || '';
      
      if (!description) {
        if (name === command) {
          return name;
        } else {
          return `${name}§${command}`;
        }
      } else {
        return `${name}§${command}§${description}`;
      }
    }).join('\n');
  }

  /**
   * Valide le format des variantes
   */
  validateVariants(variantsString) {
    const errors = [];
    const lines = variantsString.split('\n');
    const names = new Set();
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;
      
      const parts = trimmedLine.split('§');
      
      if (parts.length === 0) {
        errors.push(`Ligne ${index + 1}: Ligne vide non autorisée`);
        return;
      }
      
      let name, command;
      
      if (parts.length === 1) {
        name = parts[0]?.trim();
        command = name;
      } else if (parts.length === 2) {
        name = parts[0]?.trim();
        command = parts[1]?.trim();
      } else {
        name = parts[0]?.trim();
        command = parts[1]?.trim();
      }
      
      if (!name) {
        errors.push(`Ligne ${index + 1}: Le nom est requis`);
      } else if (names.has(name)) {
        errors.push(`Ligne ${index + 1}: Le nom "${name}" est déjà utilisé`);
      } else {
        names.add(name);
      }
      
      if (!command) {
        errors.push(`Ligne ${index + 1}: La commande est requise`);
      }
    });
    
    return errors;
  }

  /**
   * Réinitialise la configuration aux valeurs par défaut
   */
  resetConfig() {
    console.log('Réinitialisation de la configuration...');
    this.saveConfig(DEFAULT_CONFIG);
    this.updateVSCodeSettings(DEFAULT_CONFIG);
    return DEFAULT_CONFIG;
  }
}

module.exports = {
  ConfigManager,
  DEFAULT_CONFIG
};