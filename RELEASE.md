# Release Guide

This guide walks you through creating GitHub releases for the Journium VS Code extension.

## Prerequisites

1. All changes committed and pushed to GitHub
2. Extension packaged (`.vsix` file created)
3. Version number updated in `package.json` and `CHANGELOG.md`

## Release Workflow

### Step 1: Commit and Push Changes

```bash
# Make sure all changes are committed
git add .
git commit -m "Release v0.0.2: Flexible file pattern matching"

# Push to GitHub
git push origin main  # or your default branch name
```

### Step 2: Create Git Tags

Create tags for both versions (since you're creating releases retroactively):

```bash
# Tag v0.0.1 (initial release)
git tag -a v0.0.1 -m "Initial release v0.0.1"

# Tag v0.0.2 (current release)
git tag -a v0.0.2 -m "Release v0.0.2: Flexible file pattern matching"

# Push tags to GitHub
git push origin v0.0.1
git push origin v0.0.2

# Or push all tags at once
git push origin --tags
```

### Step 3: Package the Extension

```bash
# Build and package the extension
pnpm run package-vsix
```

This creates `journium-0.0.2.vsix` (and you'll need to create `journium-0.0.1.vsix` for the first release).

### Step 4: Create GitHub Releases

You have two options:

#### Option A: Using GitHub Web UI (Recommended for first time)

1. Go to your repository: https://github.com/journium/journium-vscode-extension
2. Click "Releases" → "Create a new release"
3. For each version:

   **For v0.0.1:**
   - **Tag**: Select `v0.0.1` (or create new tag)
   - **Release title**: `v0.0.1 - Initial Release`
   - **Description**: Copy from CHANGELOG.md section for 0.0.1:
     ```
     ## Added
     - Initial release of Journium VS Code extension
     - Command to enable schema validation for workspace
     - Automatic integration with YAML extension for real-time validation
     - Schema validation for journium-tracker.yml and journium-tracker.yaml files
     - Workspace-scoped settings configuration
     - MIT license
     - Comprehensive README with usage instructions
     ```
   - **Attach binaries**: Upload `journium-0.0.1.vsix`
   - Click "Publish release"

   **For v0.0.2:**
   - **Tag**: Select `v0.0.2`
   - **Release title**: `v0.0.2 - Flexible File Pattern Matching`
   - **Description**: Copy from CHANGELOG.md section for 0.0.2:
     ```
     ## Changed
     - Flexible file pattern matching: Schema validation now matches any YAML file containing journium-tracker anywhere in the filename
     - Updated success message to reflect flexible file naming support
     - Improved README documentation with examples

     ## Fixed
     - Corrected VS Code version requirement in README
     ```
   - **Attach binaries**: Upload `journium-0.0.2.vsix`
   - Click "Publish release"

#### Option B: Using GitHub CLI (gh)

```bash
# Install GitHub CLI if not installed: brew install gh
# Authenticate: gh auth login

# Create release for v0.0.1
gh release create v0.0.1 \
  --title "v0.0.1 - Initial Release" \
  --notes-file <(cat <<EOF
## Added
- Initial release of Journium VS Code extension
- Command to enable schema validation for workspace
- Automatic integration with YAML extension
- Schema validation for journium-tracker.yml/.yaml files
- Workspace-scoped settings configuration
- MIT license
EOF
) \
  journium-0.0.1.vsix

# Create release for v0.0.2
gh release create v0.0.2 \
  --title "v0.0.2 - Flexible File Pattern Matching" \
  --notes-file <(cat <<EOF
## Changed
- Flexible file pattern matching: Schema validation now matches any YAML file containing journium-tracker anywhere in the filename

## Fixed
- Corrected VS Code version requirement in README
EOF
) \
  journium-0.0.2.vsix
```

### Step 5: Verify Releases

1. Visit: https://github.com/journium/journium-vscode-extension/releases
2. Verify both releases appear
3. Verify `.vsix` files are attached and downloadable
4. Test downloading and installing a `.vsix` file locally

## Quick Release Script

For future releases, you can use this workflow:

```bash
# 1. Update version in package.json and CHANGELOG.md
# 2. Commit changes
git add .
git commit -m "Release vX.Y.Z: Description"

# 3. Create and push tag
git tag -a vX.Y.Z -m "Release vX.Y.Z: Description"
git push origin vX.Y.Z

# 4. Package extension
pnpm run package-vsix

# 5. Create GitHub release (using gh CLI)
gh release create vX.Y.Z \
  --title "vX.Y.Z - Release Title" \
  --notes "Release notes from CHANGELOG" \
  journium-X.Y.Z.vsix
```

## Important Notes

- **Always create the tag AFTER committing** - tags should point to the commit with the updated version
- **Attach .vsix files** - Users can download and install directly from releases
- **Use semantic versioning** - Follow MAJOR.MINOR.PATCH format
- **Update CHANGELOG first** - Then copy relevant sections to release notes
- **Test the .vsix** - Install it locally before publishing to ensure it works

## For v0.0.1 Retroactive Release

Since v0.0.1 was already published but not released on GitHub:

1. Find the commit where v0.0.1 was first published
2. Create tag pointing to that commit:
   ```bash
   git tag -a v0.0.1 <commit-hash> -m "Initial release v0.0.1"
   ```
3. Package that version (checkout that commit, build, then checkout back)
4. Create GitHub release with that .vsix file

Or simply create the release now pointing to the current state - it's fine to retroactively tag.
