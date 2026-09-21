# Akihabara development quickstart

The original generated quickstart became stale when Akihabara added multiple
generated theme variants. Use [DEVELOPMENT.md](./DEVELOPMENT.md) as the canonical
setup, development, packaging, and publishing guide. Fork authors and
contributors should also read [CONTRIBUTING.md](./CONTRIBUTING.md).

For an existing checkout with the prerequisites already installed:

```sh
npm ci
npm run build:themes
npm run check
```

Then open the repository in VS Code and press `F5` to launch the Extension
Development Host. None of these commands publishes to the Marketplace.
