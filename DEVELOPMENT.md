# Developing and releasing Akihabara

This is the canonical guide for maintainers, contributors, and fork authors who
want to restore the Akihabara development environment on Windows, macOS, or
Linux. Marketplace release steps are clearly separated from normal development.

## What this repository contains

Akihabara is a declarative VS Code color-theme extension. It has no extension
runtime or compiled application code. VS Code loads the four theme JSON files
registered in `package.json`.

| Path | Purpose |
| --- | --- |
| `package.json` | Extension identity, Marketplace metadata, contributed themes, and npm commands |
| `themes/akihabara-dark-color-theme.json` | Hand-edited source theme and the source of shared code colors |
| `themes/akihabara-{light,oled,experimental}-color-theme.json` | Generated variants; do not edit these directly |
| `scripts/generate-theme-variants.js` | Variant palettes and workbench-color transformation rules |
| `scripts/check-version.js` | Requires the manifest version to match the newest changelog entry |
| `scripts/check-public-safety.js` | Rejects common credentials and credential files before packaging |
| `scripts/check-theme-code-colors.js` | Requires identical TextMate and semantic token settings in every variant |
| `scripts/generate-theme-variants.js --check` | Fails when checked-in generated variants do not match their sources |
| `scripts/theme-json.js` | Small JSON-with-comments reader and generated-theme writer |
| `test/` | Manual syntax-highlighting fixtures for C++, CMake, JSON, and Python |
| `assets/` | Marketplace icon and README screenshots |
| `.vscode/launch.json` | Launches the extension in a VS Code Extension Development Host |
| `.github/workflows/validate.yml` | Validation-only CI; it never publishes or receives release credentials |
| `package.json` `files` | Allowlist that keeps development-only files out of the published VSIX |

The dark theme is the generator's source of truth. The generator copies its
`tokenColors` (and `semanticTokenColors`, if later enabled) into all variants,
then derives each non-dark variant's `colors` map from the palette and mapping
logic in `scripts/generate-theme-variants.js`.

## New-machine setup

### 1. Install the prerequisites

Install:

- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Node.js 24 LTS](https://nodejs.org/en/download) with npm

Node 24 is recorded in `.nvmrc`. It satisfies the Node 22-or-newer requirement
of the pinned `@vscode/vsce` 4.0.0 packaging tool. A Node version manager is
optional but makes switching machines easier.

Verify the command-line tools in a new terminal:

```sh
git --version
node --version
npm --version
code --version
```

On macOS, if `code` is unavailable, run **Shell Command: Install 'code' command
in PATH** from VS Code's Command Palette. Windows and Linux installers normally
add it to `PATH`. The `code` command is convenient but is not required for `F5`
development.

### 2. Clone and bootstrap

Configure a Git author identity once on a new machine if it is not already set:

```sh
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
```

Authenticate to GitHub with the platform's credential manager, GitHub CLI, or
an SSH key. Do not put a GitHub token in the remote URL or any repository file.

Maintainers with write access can clone the original repository:

```sh
git clone https://github.com/justinlavi/Akihabara.git
cd Akihabara
```

Contributors should clone their fork and retain the original as `upstream`:

```sh
git clone https://github.com/YOUR_ACCOUNT/Akihabara.git
cd Akihabara
git remote add upstream https://github.com/justinlavi/Akihabara.git
```

Then initialize either checkout:

```sh
git remote -v
npm ci
npm run check
code .
```

`npm ci` installs the repository-pinned copy of `vsce`; no global `vsce`
installation is needed. It does not store Marketplace credentials in the
repository.

If `npm ci` says the lock file and `package.json` disagree, repair them with the
expected Node version, review the dependency change, and commit the updated
lock file:

```sh
npm install
npm run check
```

## Git updates versus Marketplace releases

Git and Marketplace publishing are intentionally independent:

- `git commit` and `git push` update GitHub only.
- Pull requests and pushes run read-only validation in GitHub Actions.
- CI builds a disposable VSIX to prove packaging works, but never uploads or
  publishes it and has no Marketplace credential.
- The Marketplace changes only when an authorized publisher explicitly runs
  `npm run release:marketplace` or manually uploads a VSIX.
- `"private": true` and a failing `prepublishOnly` script prevent accidental
  publication to the npm registry. Neither prevents VSCE packaging or an
  explicit Marketplace release.

Documentation, contributor guidance, tests, CI, and build-tool cleanup can be
committed without changing the extension version or `CHANGELOG.md`. Increment
the version and add a changelog entry when preparing an actual Marketplace
release containing user-visible theme, manifest, or Marketplace-page changes.

Fork authors can develop and package locally without any publisher access. See
[CONTRIBUTING.md](./CONTRIBUTING.md) before publishing a derivative extension.

## Development workflow

### Launch and preview

1. Open the repository root in VS Code.
2. Press `F5` (or run **Debug: Start Debugging**).
3. In the new **Extension Development Host** window, run **Preferences: Color
   Theme** and choose an Akihabara variant.
4. Open files under `test/` and inspect the editor, workbench, terminal,
   notifications, menus, source-control decorations, and other UI states.

Saved theme-file changes are applied live in the Extension Development Host.
If the manifest changes or a newly generated file does not appear, reload that
window with **Developer: Reload Window**.

For an unexpected token color, place the caret on the token and run
**Developer: Inspect Editor Tokens and Scopes**. It shows both the TextMate
scope and any semantic token supplied by the active language extension. C++
semantic testing requires a C++ language extension such as Microsoft's C/C++
extension; basic TextMate coloring does not.

### Make theme changes

- Shared syntax/token color: edit `tokenColors` in
  `themes/akihabara-dark-color-theme.json`.
- Dark workbench color: edit `colors` in that same dark theme.
- Light, OLED, or Experimental workbench palette/mapping: edit
  `scripts/generate-theme-variants.js`.
- Never hand-edit a generated non-dark theme; the next build overwrites it.

After any source or generator change, run:

```sh
npm run build:themes
npm run check
git diff --check
git diff
```

Commit all three regenerated variants whenever the build changes them. The
generator deliberately makes code colors identical across variants while
allowing their workbench colors to differ.

### Semantic-highlighting status

The current released themes are driven by TextMate `tokenColors`. A draft
`semanticHighlighting`/`semanticTokenColors` section exists but is commented
out in the dark theme, so no theme-level semantic setting is currently active.

If semantic rules are activated later, put `"semanticHighlighting": true` and
`semanticTokenColors` in the dark theme JSON, regenerate, and test several
language providers before release. The generator preserves those settings, and
the cross-variant check compares them when present.

## Build and test a VSIX locally

Create the same installable artifact that will be sent to the Marketplace:

```sh
npm run package
```

This runs the version, cross-variant color, and generated-file freshness checks,
then creates
`akihabara-<version>.vsix` in the repository root. VSIX files are ignored by
Git.

Inspect the proposed package contents before release:

```sh
npx vsce ls
```

The list should contain only the manifest, public documentation/license,
assets used by the Marketplace page, and the four generated themes. It should
not contain `test/`, `.vscode/`, build scripts, credentials, or local settings.

Install the package in VS Code:

```sh
code --install-extension akihabara-<version>.vsix --force
```

Alternatively, use **Extensions: Install from VSIX...** from the Command
Palette. Restart or reload VS Code, select every variant, and repeat the manual
visual checks. Uninstall the packaged copy before returning to `F5` development
if it makes the source of the active theme ambiguous.

## Public-repository safety

Assume every committed file, branch, pull-request diff, CI log, issue, and
screenshot will be permanently public.

- Keep Marketplace, GitHub, Azure, npm, and signing credentials outside the
  repository. VSCE authentication belongs in the operating-system credential
  store or a secured deployment system.
- Do not add real secrets to examples. Use unmistakable placeholders.
- Review `git status`, `git diff`, and `git diff --cached` before every push.
- Run `npm run check`; its public-safety check scans tracked and prospective
  unignored files for several common credential formats.
- Treat the scanner as a backstop, not proof that a commit is safe.
- If a credential is committed, revoke or rotate it immediately. A follow-up
  deletion does not remove the secret from Git history.

Local `.env`, `.npmrc`, key, and credential files are ignored. This project does
not require any such file for ordinary development or packaging.

## Release checklist

Publishing the original extension requires access to the `justin-lavi`
Marketplace publisher. A derivative must use its author's own publisher ID.
Packaging and local testing do not require any publisher access.

1. Pull the current `main` branch and confirm the worktree contains only the
   intended release changes.
2. Choose a new `major.minor.patch` version that has never been published.
3. Set exactly that version in `package.json`.
4. Add the matching newest heading to `CHANGELOG.md`, for example
   `## [4.9.1] - 2026-09-21`.
5. Run the full local gate:

   ```sh
   npm ci
   npm run build:themes
   npm run check
   git diff --check
   npm run package
   npx vsce ls
   ```

6. Install the VSIX and visually smoke-test all four themes.
7. Commit the source change, generated themes, version, changelog, and any
   intentional public assets. Verify the staged diff and push the release
   branch using the repository's normal review workflow:

   ```sh
   git status
   git diff
   git add -p
   git diff --cached
   git commit -m "Describe the release"
   git push origin HEAD
   ```
8. Publish only after the commit to release is final:

   ```sh
   npm run release:marketplace
   ```

9. Confirm version, README rendering, screenshots, and installability on the
   appropriate Marketplace listing. For the original extension, use the
   [Akihabara listing](https://marketplace.visualstudio.com/items?itemName=justin-lavi.akihabara).
10. Create and push a matching Git tag if the project continues to use release
    tags; `npm run release:marketplace` does not request an automatic version
    bump.

Do not use `vsce publish major`, `minor`, or `patch` in this repository. Those
forms mutate `package.json` automatically and can leave the changelog/version
check out of sync. Do not retry a partially failed publish by reusing a version
until the Marketplace publisher page confirms that version was not accepted.

## Marketplace authentication and recovery

Use the official [VS Code publishing
guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
for current authentication instructions. Never commit a PAT, access token,
`.env` file, or copied credential to this repository.

As of September 2026, a maintainer can still authenticate interactively with a
Marketplace-scoped Azure DevOps PAT. Substitute the publisher authorized for
the extension being released:

```sh
npx vsce login PUBLISHER_ID
npm run release:marketplace
```

Global Azure DevOps PATs are scheduled for retirement on December 1, 2026.
For a durable automated release process, follow Microsoft's Entra ID/workload
identity instructions and publish with `vsce publish --azure-credential` from a
secured pipeline. Keep tenant, service-connection, and identity details in the
deployment system, not in Git. Until automation exists, manual upload of a
locally verified VSIX through the Marketplace publisher-management page is the
fallback.

If a new machine cannot publish, check these in order:

1. `node --version` is 24.x (or another supported version at least 22).
2. `npm ci` succeeds and `npx vsce --version` reports the pinned tool.
3. The signed-in Microsoft/Azure identity is a contributor to the publisher ID
   in `package.json`.
4. The authentication method has not expired or been revoked.
5. `package.json` and the newest changelog heading have the same unused version.
6. `npm run package` succeeds before trying to publish.

## Useful commands

| Command | Effect |
| --- | --- |
| `npm ci` | Restore the pinned development toolchain |
| `npm run build:themes` | Regenerate Light, OLED, and Experimental from Dark |
| `npm run check` | Check public safety, version alignment, cross-variant code colors, and generated-file freshness |
| `npm run package` | Validate and build a VSIX |
| `npx vsce ls` | Preview the exact VSIX file list |
| `npm run release:marketplace` | Explicitly validate and publish an already-versioned release |
| `code --install-extension <file>.vsix --force` | Install a local package for smoke testing |

## Authoritative references

- [VS Code color-theme guide](https://code.visualstudio.com/api/extension-guides/color-theme)
- [VS Code syntax-highlighting and scope-inspector guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [VS Code theme-color reference](https://code.visualstudio.com/api/references/theme-color)
- [VS Code extension publishing guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [VS Code command-line guide](https://code.visualstudio.com/docs/configure/command-line)
