# Contributing to Akihabara

Contributions, experiments, and forks are welcome. Akihabara is a public,
declarative VS Code color-theme extension, so most work is JSON, JavaScript,
documentation, and visual testing rather than application code.

## Before you begin

Read [DEVELOPMENT.md](./DEVELOPMENT.md) for the repository architecture,
new-machine setup, preview workflow, commands, and release process.

Never include credentials, private configuration, unpublished personal data,
or proprietary source samples in a commit, issue, screenshot, or pull request.
The repository checks common credential patterns, but that check is only a
backstop and cannot recognize every secret.

## Fork and branch workflow

1. Fork the repository on GitHub.
2. Clone your fork and add the original repository as `upstream`:

   ```sh
   git clone https://github.com/YOUR_ACCOUNT/Akihabara.git
   cd Akihabara
   git remote add upstream https://github.com/justinlavi/Akihabara.git
   npm ci
   ```

3. Create a focused branch:

   ```sh
   git switch -c describe-the-change
   ```

4. Make and test the change.
5. Push the branch to your fork and open a pull request.

Contributors should not publish a Marketplace release, change the extension
version, or add a release entry to `CHANGELOG.md` unless a maintainer asks for
it. Maintainers handle release versioning after changes are accepted.

## Theme source rules

- Edit `themes/akihabara-dark-color-theme.json` for shared code colors and the
  Dark workbench.
- Edit `scripts/generate-theme-variants.js` for Light, OLED, and Experimental
  workbench palettes or transformation behavior.
- Do not hand-edit generated non-dark theme files.
- Run `npm run build:themes` after changing either source.
- Use **Developer: Inspect Editor Tokens and Scopes** in VS Code when diagnosing
  token color behavior.

## Required checks

Before opening a pull request, run:

```sh
npm ci
npm run build:themes
npm run check
git diff --check
npm run package
```

Install the resulting VSIX and visually inspect all four variants when the
change affects theme colors, scopes, generation, or the manifest. Documentation
and repository-maintenance changes do not require a Marketplace version bump.

GitHub Actions runs the same validation and builds a VSIX for verification. It
does not upload or publish that VSIX and has read-only repository permissions.

## Publishing a derivative theme

You can package and install a fork locally without publishing it. If you want
to publish a derivative to the Marketplace, use your own identity and make the
fork distinguishable from Akihabara. At minimum, update:

- `name`, `displayName`, `description`, and `publisher` in `package.json`
- `homepage`, `repository`, and `bugs` URLs
- theme labels and filenames if the derivative should coexist with Akihabara
- Marketplace links, names, screenshots, and branding in `README.md`
- `LICENSE.txt` while preserving the existing MIT notice as required

Create your own Marketplace publisher and credentials. Do not attempt to use
the `justin-lavi` publisher or any maintainer credential.

## Pull request checklist

- The change is focused and described clearly.
- Generated themes are committed when their source changed.
- `npm run check` and `npm run package` pass.
- Theme-facing changes were visually tested in the Extension Development Host.
- No secret, credential, machine-specific path, or private source sample is
  present.
- The extension version and changelog were left to the maintainer unless
  explicitly requested.
