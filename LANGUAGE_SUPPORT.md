# Language support

Akihabara styles tokens; it does not bundle language parsers. VS Code first
tokenizes a file with a TextMate grammar and, when available, a language service
adds semantic tokens. Akihabara provides a language-neutral TextMate baseline
and opts into semantic highlighting so the same concept-to-color mapping can
carry across languages.

“Covered” in this document means:

1. the language's common TextMate scopes map to Akihabara's palette;
2. standard semantic token types map to the same palette when a provider emits
   them; and
3. the repository contains a dense visual fixture for manual inspection.

It does not mean every third-party grammar emits identical scopes, or that a
theme can replace the language extension responsible for parsing. Use
**Developer: Inspect Editor Tokens and Scopes** when a particular grammar
colors a construct unexpectedly.

## Covered language modes

“Built in” means current VS Code installations include the basic grammar.
“Extension” means a compatible language extension must supply the grammar.
Richer language extensions can improve semantic distinctions for either group.

The workspace recommends known grammar providers for the extension-backed
fixtures. They are development conveniences, not runtime dependencies of the
published theme: [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools),
[Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml),
[Kotlin](https://marketplace.visualstudio.com/items?itemName=fwcd.kotlin),
[GraphQL Syntax](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax),
[HashiCorp Terraform](https://marketplace.visualstudio.com/items?itemName=hashicorp.terraform),
[fish-lsp](https://marketplace.visualstudio.com/items?itemName=ndonfris.fish-lsp),
[gomplate template renderer](https://marketplace.visualstudio.com/items?itemName=xembly.gomplate),
[Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar),
and [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).
You can use another provider, but its emitted scopes may differ and should be
checked with the token inspector.

### Core and repository formats

| Language / format | VS Code mode | Grammar | Fixture |
| --- | --- | --- | --- |
| C | `c` | Built in | [`sample.c`](./test/languages/sample.c) |
| C++ | `cpp` | Built in | [`sample.cpp`](./test/languages/sample.cpp) |
| CMake | `cmake` | Extension | [`sample.cmake`](./test/languages/sample.cmake) |
| Python | `python` | Built in | [`sample.py`](./test/languages/sample.py) |
| TypeScript | `typescript` | Built in | [`sample.ts`](./test/languages/sample.ts) |
| TypeScript JSX | `typescriptreact` | Built in | [`sample.tsx`](./test/languages/sample.tsx) |
| JavaScript | `javascript` | Built in | [`sample.js`](./test/languages/sample.js) |
| JavaScript JSX | `javascriptreact` | Built in | [`sample.jsx`](./test/languages/sample.jsx) |
| JSON / JSON with Comments | `jsonc` | Built in | [`sample.jsonc`](./test/languages/sample.jsonc) |
| Markdown | `markdown` | Built in | [`sample.md`](./test/languages/sample.md) |
| SQL (PostgreSQL-oriented) | `sql` | Built in | [`sample.sql`](./test/languages/sample.sql) |
| YAML | `yaml` | Built in | [`sample.yaml`](./test/languages/sample.yaml) |
| TOML | `toml` | Extension | [`sample.toml`](./test/languages/sample.toml) |
| HTML | `html` | Built in | [`sample.html`](./test/languages/sample.html) |
| Go HTML templates | `gohtml` | Extension | [`sample.gohtml`](./test/languages/sample.gohtml) |
| Shell / Bash | `shellscript` | Built in | [`sample.sh`](./test/languages/sample.sh) |
| Fish shell | `fish` | Extension | [`sample.fish`](./test/languages/sample.fish) |
| PowerShell | `powershell` | Built in | [`sample.ps1`](./test/languages/sample.ps1) |
| Dotenv | `dotenv` | Built in | [`sample.env`](./test/languages/sample.env) |
| Properties / EditorConfig / Git attributes | `properties` | Built in | [`sample.properties`](./test/languages/sample.properties) |
| Git ignore patterns | `ignore` | Built in | [`sample.gitignore`](./test/languages/sample.gitignore) |

### Broader development coverage

| Language / format | VS Code mode | Grammar | Fixture |
| --- | --- | --- | --- |
| C# | `csharp` | Built in | [`sample.cs`](./test/languages/sample.cs) |
| CSS | `css` | Built in | [`sample.css`](./test/languages/sample.css) |
| SCSS | `scss` | Built in | [`sample.scss`](./test/languages/sample.scss) |
| Less | `less` | Built in | [`sample.less`](./test/languages/sample.less) |
| Dart | `dart` | Built in | [`sample.dart`](./test/languages/sample.dart) |
| Dockerfile | `dockerfile` | Built in | [`Dockerfile`](./test/languages/Dockerfile) |
| F# | `fsharp` | Built in | [`sample.fs`](./test/languages/sample.fs) |
| Go | `go` | Built in | [`sample.go`](./test/languages/sample.go) |
| Java | `java` | Built in | [`Sample.java`](./test/languages/Sample.java) |
| Julia | `julia` | Built in | [`sample.jl`](./test/languages/sample.jl) |
| Kotlin | `kotlin` | Extension | [`sample.kt`](./test/languages/sample.kt) |
| Lua | `lua` | Built in | [`sample.lua`](./test/languages/sample.lua) |
| Makefile | `makefile` | Built in | [`Makefile`](./test/languages/Makefile) |
| PHP | `php` | Built in | [`sample.php`](./test/languages/sample.php) |
| R | `r` | Built in | [`sample.r`](./test/languages/sample.r) |
| Ruby | `ruby` | Built in | [`sample.rb`](./test/languages/sample.rb) |
| Rust | `rust` | Built in | [`sample.rs`](./test/languages/sample.rs) |
| Swift | `swift` | Built in | [`sample.swift`](./test/languages/sample.swift) |
| XML | `xml` | Built in | [`sample.xml`](./test/languages/sample.xml) |
| GraphQL | `graphql` | Extension | [`sample.graphql`](./test/languages/sample.graphql) |
| HCL / Terraform | `terraform` | Extension | [`sample.tf`](./test/languages/sample.tf) |
| Vue | `vue` | Extension | [`sample.vue`](./test/languages/sample.vue) |
| Svelte | `svelte` | Extension | [`sample.svelte`](./test/languages/sample.svelte) |

The machine-readable source for this list is
[`test/languages/manifest.json`](./test/languages/manifest.json). `npm run check`
verifies that every entry has a unique language mode and a nontrivial fixture.

## Extension and filename aliases

Several filenames do not represent separate language modes:

- `.mts` and `.cts` use TypeScript; `.mjs` and `.cjs` use JavaScript.
- `.yml` and `.yaml` share YAML.
- `.env`, `.env.local`, and `.env.example` share Dotenv.
- `.editorconfig` and `.gitattributes` use VS Code's `properties` grammar.
- `.gitignore` uses the `ignore` grammar. Tool-specific files such as
  `.prettierignore` use the same syntax but may need a `files.associations`
  entry or manual language-mode selection if VS Code detects plain text.
- Lockfiles are content-defined rather than one language: for example, a JSON
  lockfile needs JSON/JSONC mode while a `*.yaml` lockfile uses YAML.
- `.txt`, checksum lists, codepoint lists, and version marker files are plain
  text; binary assets such as fonts are not syntax-highlighted.

## Coverage priorities

The broad set follows two practical signals: the language families documented
by VS Code and widely used application, systems, data, mobile, scripting, and
infrastructure formats. Generic scopes come first; language-specific selectors
are added only when a grammar cannot express a concept through a shared scope.

Useful references:

- [VS Code syntax highlighting and TextMate scopes](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [VS Code semantic highlighting](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide)
- [VS Code language overview](https://code.visualstudio.com/docs/languages/overview)

## Adding or repairing coverage

1. Add or expand a focused fixture under `test/languages/`.
2. Register it in `test/languages/manifest.json`.
3. Inspect the token with **Developer: Inspect Editor Tokens and Scopes**.
4. Prefer a standard semantic token selector or common TextMate scope.
5. Add a language-qualified scope only when the grammar genuinely requires it.
6. Run `npm run build:themes`, `npm run check`, and the visual review in
   [`test/languages/README.md`](./test/languages/README.md).

Fixtures intentionally exercise representative declarations, values, control
flow, calls, comments, strings, operators, and format-specific constructs. No
finite fixture can enumerate every library, dialect, grammar version, or
third-party extension.
