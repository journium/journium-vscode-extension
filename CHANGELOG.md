# Changelog

All notable changes to the "Journium" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.2] - 2025-01-20

### Changed
- **Flexible file pattern matching**: Schema validation now matches any YAML file containing `journium-tracker` anywhere in the filename (e.g., `journium-tracker.yml`, `my-journium-tracker.yaml`, `journium-tracker-v2.yml`)
- Updated success message to reflect flexible file naming support
- Improved README documentation with examples of supported file naming patterns

### Fixed
- Corrected VS Code version requirement in README (1.105.0 instead of 1.108.1)

## [0.0.1] - 2025-01-20

### Added
- Initial release of Journium VS Code extension
- Command to enable schema validation for workspace (`Journium: Enable schema validation for this workspace`)
- Automatic integration with YAML extension for real-time validation
- Schema validation for `journium-tracker.yml` and `journium-tracker.yaml` files
- Workspace-scoped settings configuration
- MIT license
- Comprehensive README with usage instructions and settings persistence documentation

[Unreleased]: https://github.com/journium/journium-vscode-extension/compare/v0.0.2...HEAD
[0.0.2]: https://github.com/journium/journium-vscode-extension/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/journium/journium-vscode-extension/releases/tag/v0.0.1
