import * as vscode from "vscode";

const SCHEMA_URL =
  "https://journium.app/schemas/journium-insight-tracker.schema.json";

const TRACKER_PATTERNS = ["**/journium-tracker.yml", "**/journium-tracker.yaml"];

export function activate(context: vscode.ExtensionContext) {
  console.log("Journium extension is activating...");
  
  const disposable = vscode.commands.registerCommand(
    "journium.enableSchemaValidation",
    async () => {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        vscode.window.showErrorMessage(
          "No workspace folder is open. Open a folder/workspace and try again."
        );
        return;
      }

      // Workspace-scoped settings (writes to .vscode/settings.json)
      const yamlConfig = vscode.workspace.getConfiguration(
        "yaml",
        workspaceFolder.uri
      );

      const currentSchemas =
        (yamlConfig.get<Record<string, string[]>>("schemas") ?? {});

      const existingPatterns = new Set(currentSchemas[SCHEMA_URL] ?? []);
      for (const p of TRACKER_PATTERNS) {
        existingPatterns.add(p);
      }

      const nextSchemas: Record<string, string[]> = {
        ...currentSchemas,
        [SCHEMA_URL]: Array.from(existingPatterns),
      };

      await yamlConfig.update(
        "schemas",
        nextSchemas,
        vscode.ConfigurationTarget.Workspace
      );

      vscode.window.showInformationMessage(
        "Journium schema validation enabled for journium-tracker.yml/.yaml in this workspace."
      );
    }
  );

  context.subscriptions.push(disposable);
  console.log("Journium extension activated successfully!");
}

export function deactivate() {}
