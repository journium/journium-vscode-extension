# Publishing Your Journium VS Code Extension

This guide walks you through packaging and publishing your extension to both VS Code Marketplace and Open VSX (for Cursor and other IDEs).

## Prerequisites

1. **VS Code Marketplace Account**
   - Go to https://marketplace.visualstudio.com/manage
   - Sign in with your Microsoft/GitHub account
   - Create a publisher profile if you don't have one
   - Note your publisher ID (you'll need this)

2. **Open VSX Account** (for Cursor and other IDEs)
   - Go to https://open-vsx.org/
   - Sign in with GitHub
   - Go to your user settings to get your Personal Access Token

3. **Personal Access Tokens**
   - **VS Code Marketplace**: Create at https://dev.azure.com → User Settings → Personal Access Tokens
   - **Open VSX**: Create at https://open-vsx.org/user-settings/namespaces → Generate Token

## Step 1: Update Publisher ID

If your publisher ID is different from "journium", update it in `package.json`:

```json
"publisher": "your-publisher-id"
```

## Step 2: Create a Personal Access Token (VS Code Marketplace)

1. Go to https://dev.azure.com
2. Click your profile icon → Security → Personal Access Tokens
3. Create a new token with:
   - **Name**: VS Code Extension Publishing
   - **Organization**: All accessible organizations
   - **Scopes**: Custom defined → Marketplace → Manage
   - **Expiration**: Set as needed
4. Copy the token (you won't see it again!)

## Step 3: Package the Extension

Create a `.vsix` file (the installable package):

```bash
pnpm run package-vsix
```

This will:
- Compile and lint your code
- Create a production build
- Generate `journium-0.0.1.vsix` file

**Test the package locally:**
- In VS Code, go to Extensions
- Click the `...` menu → "Install from VSIX..."
- Select your `.vsix` file
- Verify it works correctly

## Step 4: Publish to VS Code Marketplace

### Option A: Using Command Line (Recommended)

1. Login to VS Code Marketplace:
```bash
pnpm exec vsce login your-publisher-id
```
Enter your Personal Access Token when prompted.

2. Publish:
```bash
pnpm run publish-vscode
```

Or manually:
```bash
pnpm exec vsce publish
```

### Option B: Using Web Interface

1. Go to https://marketplace.visualstudio.com/manage
2. Click "New Extension"
3. Upload your `.vsix` file
4. Fill in the details and publish

## Step 5: Publish to Open VSX (for Cursor, VSCodium, etc.)

1. Get your Open VSX Personal Access Token:
   - Go to https://open-vsx.org/user-settings/namespaces
   - Click "Generate Token" next to your namespace
   - Copy the token

2. Set the token as an environment variable:
```bash
export OVSX_PAT=your-open-vsx-token
```

3. Publish:
```bash
pnpm run publish-ovsx
```

Or manually:
```bash
pnpm exec ovsx publish --pat $OVSX_PAT
```

## Step 6: Update Your Extension

When you make changes:

1. **Update version** in `package.json`:
```json
"version": "0.0.2"  // Use semantic versioning
```

2. **Update CHANGELOG.md** with your changes

3. **Package and publish**:
```bash
pnpm run package-vsix    # Test locally first
pnpm run publish-vscode   # Publish to VS Code Marketplace
pnpm run publish-ovsx     # Publish to Open VSX
```

## Troubleshooting

### "Publisher not found"
- Make sure your publisher ID matches exactly
- Verify you're logged in: `pnpm exec vsce ls-publishers`

### "Extension already exists"
- Update the version number in `package.json`
- Or use `--allow-missing-repository` flag

### Icon not showing
- Make sure `icon.png` is 128x128 pixels
- Verify the path in `package.json` is correct
- Icon will show after publishing (may not show during development)

### Publishing fails
- Check that all required fields in `package.json` are filled
- Verify your Personal Access Token is valid
- Make sure you've run `pnpm run package` successfully first

## Useful Commands

```bash
# Package extension (.vsix file)
pnpm run package-vsix

# Publish to VS Code Marketplace
pnpm run publish-vscode

# Publish to Open VSX
pnpm run publish-ovsx

# Check what will be published (dry run)
pnpm exec vsce ls

# Login to VS Code Marketplace
pnpm exec vsce login your-publisher-id

# Logout
pnpm exec vsce logout
```

## After Publishing

1. **VS Code Marketplace**: Your extension will be available at:
   `https://marketplace.visualstudio.com/items?itemName=journium.journium`

2. **Open VSX**: Your extension will be available at:
   `https://open-vsx.org/extension/journium/journium`

3. **Users can install**:
   - VS Code: Search for "journium" in Extensions
   - Cursor: Search for "journium" in Extensions (uses Open VSX)
   - Command line: `code --install-extension journium.journium`

## Next Steps

- Add a README.md with screenshots and usage instructions
- Consider adding a LICENSE file
- Set up CI/CD to auto-publish on version bumps
- Monitor reviews and issues from users

Good luck with your extension! 🚀
