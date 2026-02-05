# Journium

Journium tracker validation and tooling for VS Code.

## Features

- **Automatic Activation**: Extension activates automatically when it detects YAML files under `.journium/trackers/` in your workspace
- **Schema Validation**: Validates all YAML files in `.journium/trackers/` (at any depth) against the Journium insight tracker schema
- **Zero Configuration**: Schema validation is enabled automatically when the extension activates - no manual setup required
- **Real-time Validation**: Get instant feedback on your tracker YAML files as you edit them
- **Monorepo Support**: Works with nested `.journium/trackers/` folders at any level in your workspace


## Requirements

- VS Code 1.105.0 or higher
- [YAML Extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) by Red Hat (automatically installed as a dependency)

## Usage

### Getting Started

The extension works automatically once installed:

1. **Install the extension** from the VS Code Marketplace
2. **Create or open a workspace** with a `.journium/trackers/` folder containing YAML files
3. **Extension auto-activates** and configures schema validation
4. **Start editing** - you'll see validation, auto-completion, and hover documentation

> **Note**: The extension activates when it detects files matching `**/.journium/trackers/**/*.yml` or `**/.journium/trackers/**/*.yaml` in your workspace.

### Manual Configuration (Optional)

If you need to manually trigger configuration:

1. Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Run: `Journium: Enable schema validation for this workspace`

This is useful for setting up validation before creating tracker files.

## Extension Settings

This extension automatically configures the YAML extension to validate tracker files in `.journium/trackers/`. The configuration is stored in your workspace `.vscode/settings.json` file.

### What Gets Configured

When the extension activates (first install or after an update), it updates your workspace settings (`.vscode/settings.json`):

```json
{
  "yaml.schemas": {
    "https://journium.app/schemas/journium-insight-tracker.schema.json": [
      "**/.journium/trackers/**/*.yml",
      "**/.journium/trackers/**/*.yaml"
    ]
  }
}
```

This configuration:
- ✅ **Only affects files under `.journium/trackers/`** - your other YAML files remain unchanged
- ✅ **Works at any depth** - supports monorepos with nested tracker folders
- ✅ **Persists across sessions** - no need to reconfigure after reopening the workspace
- ✅ **Can be version controlled** - commit to share validation with your team

### Settings Behavior

**Automatic Modification**: This extension follows VS Code best practices by automatically modifying workspace settings (similar to how the ESLint, Prettier, and other popular language extensions work). This provides:
- Zero-configuration experience
- Immediate validation on installation
- Team-wide consistency when settings are committed

**Settings Persistence**: The schema validation settings persist in your workspace even if you disable or uninstall the extension. This is intentional and follows VS Code extension guidelines:
- **Settings belong to your workspace**, not the extension
- **Your configuration is preserved** if you temporarily disable the extension
- **No data loss** if you uninstall and reinstall the extension later
- **Team consistency** - settings can be committed with your workspace

### Removing Schema Validation

If you want to remove the schema validation from your workspace:

1. Open your workspace `.vscode/settings.json` file
2. Find the `yaml.schemas` section
3. Remove the entry for `https://journium.app/schemas/journium-insight-tracker.schema.json`
4. Save the file

Alternatively, you can delete the entire `yaml.schemas` section if it only contained the Journium schema.

### Why We Don't Auto-Remove Settings

The extension does **not** automatically remove settings when:
- The extension is disabled
- The extension is deactivated  
- The extension is uninstalled

This follows [VS Code extension guidelines](https://code.visualstudio.com/docs/configure/settings) and industry best practices:
- **User data integrity**: Workspace settings are considered user data and should not be modified without explicit user action
- **Predictable behavior**: Settings remain stable and don't disappear unexpectedly
- **Team workflows**: Settings committed to version control persist for all team members
- **Reversibility**: You can easily re-enable validation by running the command again

If you need to remove the settings, please do so manually as described above.

### Privacy & Performance

**No External Scans**: The extension uses VS Code's built-in file index to detect `.journium/trackers/` folders - it does not perform additional file system scans or impact performance.

**Local Validation**: Schema validation happens entirely within VS Code using the YAML extension - no data is sent to external servers.

## Known Issues

None at this time. Please [report issues](https://github.com/journium/journium-vscode-extension/issues) on GitHub.

## Release Notes

See [CHANGELOG.md](https://github.com/journium/journium-vscode-extension/blob/main/CHANGELOG.md) for detailed release notes.


---

## For more information

Visit [Journium](https://journium.app) for more information about Journium trackers and schemas.
