# Journium

Journium tracker validation and tooling for VS Code.

## Features

- **Schema Validation**: Automatically validates YAML files containing `journium-tracker` in the filename (e.g., `journium-tracker.yml`, `my-journium-tracker.yaml`, `journium-tracker-v2.yml`) against the Journium insight tracker schema
- **Easy Setup**: One command to enable schema validation for your workspace
- **Real-time Validation**: Get instant feedback on your tracker YAML files as you edit them

## Requirements

- VS Code 1.105.0 or higher
- [YAML Extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) by Red Hat (automatically installed as a dependency)

## Usage

1. Open a workspace folder in VS Code
2. Run the command `Journium: Enable schema validation for this workspace` from the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Create or edit YAML files containing `journium-tracker` in the filename (e.g., `journium-tracker.yml`, `my-journium-tracker.yaml`)
4. The YAML extension will automatically validate your files against the Journium schema

## Extension Settings

This extension configures the YAML extension to validate tracker files. The configuration is stored in your workspace `.vscode/settings.json` file.

### Settings Persistence

**Important**: The schema validation settings persist in your workspace even if you disable or uninstall the extension. This is intentional and follows VS Code best practices:

- **Settings belong to your workspace**, not the extension
- **Your configuration is preserved** if you temporarily disable the extension
- **No data loss** if you uninstall and reinstall the extension later
- **Team consistency** - settings are committed with your workspace, so all team members get validation

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

This follows VS Code extension best practices:
- **User data integrity**: Workspace settings are user data and should not be modified without explicit user action
- **Predictable behavior**: Settings remain stable and don't disappear unexpectedly
- **Team workflows**: Settings committed to version control persist for all team members
- **Reversibility**: You can easily re-enable validation by running the command again

If you need to remove the settings, please do so manually as described above.

## Release Notes

### 0.0.2

**Changed**
- Flexible file pattern matching: Schema validation now matches any YAML file containing `journium-tracker` anywhere in the filename (e.g., `journium-tracker.yml`, `my-journium-tracker.yaml`, `journium-tracker-v2.yml`)

**Fixed**
- Corrected VS Code version requirement in documentation

### 0.0.1

**Added**
- Initial release of Journium VS Code extension
- Command to enable schema validation for workspace
- Automatic integration with YAML extension for real-time validation
- Schema validation for `journium-tracker.yml` and `journium-tracker.yaml` files
- Workspace-scoped settings configuration

---

## For more information

Visit [Journium](https://journium.app) for more information about Journium trackers and schemas.
