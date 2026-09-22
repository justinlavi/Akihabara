# Visual language fixture guide

This directory is a visual test bench, not an executable polyglot application.
Fixtures favor dense, recognizable language constructs over runtime setup. The
canonical list and expected language modes live in `manifest.json`.

## Review workflow

1. Run `npm run build:themes` and `npm run check` in the repository root.
2. Press `F5` to open an Extension Development Host.
3. Select one Akihabara variant and open `test/languages` in that window.
4. Open each fixture and confirm the status bar language mode matches the
   manifest. Install a language extension for entries marked `extension`.
5. Run **Developer: Inspect Editor Tokens and Scopes** on any surprising token.
6. Repeat a representative C/C++, TypeScript, markup, stylesheet, data, shell,
   and extension-backed fixture in all four variants.

Compare both the TextMate and semantic classifications shown by the inspector.
Turning `editor.semanticHighlighting.enabled` off temporarily is useful for
isolating the TextMate fallback; restore it afterward.

## Expected concept map

| Construct | Family | Color |
| --- | --- | --- |
| Keywords, control flow, operators, punctuation | Control | `#7757BA` |
| Types and type parameters | Definitions | `#CBBB52` |
| Literals and enum members | Primitives | `#70AF6B` |
| Namespaces and modules | Storage | `#15A284` |
| Classes, structs, interfaces, sections, tags | Containers | `#0EA3A5` |
| Functions and commands | Action | `#00A5E0` |
| Methods | Action | `#06A3C6` |
| Parameters and markup attributes | Handoff | `#D77F43` |
| Variables | Values | `#D53D5C` |
| Properties and document keys | Member values | `#A7447C` |
| Constants and readonly values | Fixed values | `#A8304B` |
| Comments / documentation tags | Documentation | `#514867` / `#604E87` |

Do not “fix” one fixture by broadly coloring a `meta.*` parent scope. Parent
scopes commonly span complete declarations or expressions and can wash out
more meaningful nested tokens. Prefer the narrowest common scope that expresses
the intended concept.
