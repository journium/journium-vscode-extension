# Journium

Journium tracker validation and tooling for VS Code.

## Features

- **Schema Validation**: Automatically validates `journium-tracker.yml` and `journium-tracker.yaml` files against the Journium insight tracker schema
- **Easy Setup**: One command to enable schema validation for your workspace
- **Real-time Validation**: Get instant feedback on your tracker YAML files as you edit them

## Requirements

- VS Code 1.108.1 or higher
- [YAML Extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) by Red Hat (automatically installed as a dependency)

## Usage

1. Open a workspace folder in VS Code
2. Run the command `Journium: Enable schema validation for this workspace` from the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Create or edit `journium-tracker.yml` or `journium-tracker.yaml` files in your workspace
4. The YAML extension will automatically validate your files against the Journium schema

## Extension Settings

This extension configures the YAML extension to validate tracker files. The configuration is stored in your workspace `.vscode/settings.json` file.

## Release Notes

### 0.0.1

Initial release of Journium extension:
- Enable schema validation for journium-tracker.yml/.yaml files
- Automatic integration with YAML extension

---

## For more information

Visit [Journium](https://journium.app) for more information about Journium trackers and schemas.
