import * as vscode from "vscode";

const SCHEMA_URL =
  "https://journium.app/schemas/journium-insight-tracker.schema.json";

const TRACKER_PATTERNS = [
  "**/.journium/trackers/**/*.yml",
  "**/.journium/trackers/**/*.yaml",
];

export async function activate(context: vscode.ExtensionContext) {
  console.log("Journium extension is activating...");
  
  // Track version for silent upgrades
  const previousVersion = context.globalState.get<string>('journium.version');
  const currentVersion = context.extension.packageJSON.version;
  
  // First install or upgrade - silently update settings
  if (!previousVersion || previousVersion !== currentVersion) {
    console.log(`Journium: ${previousVersion ? `Upgrading from v${previousVersion} to v${currentVersion}` : `Installing v${currentVersion}`}`);
    await enableSchemaValidationForAllWorkspaceFolders();
    await context.globalState.update('journium.version', currentVersion);
  }
  
  // Register manual command
  const disposable = vscode.commands.registerCommand(
    "journium.enableSchemaValidation",
    async () => {
      await enableSchemaValidationForAllWorkspaceFolders();
      vscode.window.showInformationMessage(
        "Journium schema validation enabled for tracker files in .journium/trackers/"
      );
    }
  );

  context.subscriptions.push(disposable);
  console.log("Journium extension activated successfully!");
}

async function enableSchemaValidationForAllWorkspaceFolders() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    return;
  }

  for (const workspaceFolder of workspaceFolders) {
    const yamlConfig = vscode.workspace.getConfiguration(
      "yaml",
      workspaceFolder.uri
    );

    const currentSchemas =
      (yamlConfig.get<Record<string, string[]>>("schemas") ?? {});

    // MIGRATION STRATEGY: Additive approach
    // - Preserves existing patterns from v0.0.2 (backward compatible)
    // - Adds new patterns alongside old ones
    // - Users can gradually migrate files to new location
    // - Both old (**/*journium-tracker*.yml) and new (**/.journium/trackers/**/*.yml) locations work
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
  }
}

export function deactivate() {}
