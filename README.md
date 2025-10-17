# 秋葉原 ・ Akihabara: A Night in Tokyo — Code Color Theory

Akihabara at night is neon over black: vivid signals guiding calm movement.
This theme applies that idea to code. Each **programming concept** gets a **base color family** (red / purple / blue / green→teal / yellow / orange), and each **subtype** gets a precise hue so your eyes learn “what kind of thing” before reading the word.

- **Values** feel alive and immediate.
- **Control** is signage—clear routes, no cargo.
- **Actions** are the waterworks—they reshape.
- **State & Structure** are where things live and organize.
- **Definitions & Literals** set shape and fixed atoms.
- **Parameters** are the in-flight handoff between value and state.

Designed for **long sessions**: high contrast on black, saturated but disciplined accents, and systematic semantics so large codebases feel navigable, not noisy.

---

# Color Design Philosophy

Color families map to concepts; individual hues map to sub-roles. Keep families distinct so categories are recognizable at a glance, then encode nuance via hue/saturation shifts within each family.

---

# Values / Information

**Idea & Rationale:** Values are the code’s **lifeblood**. Keep the family in **red** for “this is data.” Use brightness/hue to encode role; this stays distinct from **Actions** (blue) and **Control** (purple).

## Subtypes & Color Behavior

| Subtype           | Hex     | Name              | Metaphor        | Role Cue                        |
|-------------------|---------|-------------------|-----------------|----------------------------------|
| Constants         | #A8304B | Amaranth Purple   | **Old blood**   | Immutable foundation             |
| Local Variables   | #D53D5C | Cerise            | **Fresh blood** | Scoped, short-lived carriers     |
| Member Variables  | #904483 | Plum              | **Royal blood** | Object identity & enduring state |

---

# Keywords / Flow Control

**Idea & Rationale:** Flow words are **traffic signals**—they **route** data; they don’t carry it. One confident **purple** unifies control and stays distinct from **Values** (red) and **Actions** (blue).

## Subtypes & Color Behavior

| Category                 | Examples                                                                 | Hex     | Name          | Role Cue               |
|--------------------------|--------------------------------------------------------------------------|---------|---------------|------------------------|
| Branching                | `if`, `else`, `switch`, `case`, `default`                                | #7757BA | Royal Purple  | Choose a path          |
| Looping                  | `for`, `while`, `do`                                                     | #7757BA | Royal Purple  | Repeat a path          |
| Transfer                 | `return`, `break`, `continue`                                            | #7757BA | Royal Purple  | Exit / skip / handoff  |
| Exceptions               | `try`, `catch`, `throw`                                                  | #7757BA | Royal Purple  | Detour on error        |
| Misc Flow                | `goto`, labels                                                           | #7757BA | Royal Purple  | Unstructured jump      |
| **Access / Declarations**| `public`, `protected`, `private`, `class`, `struct`, `namespace`, `interface`, `enum`, `union`, `template`, `using namespace`, scope `::` | #7757BA | Royal Purple  | Visibility & structure |

---

# Action / Transformation

**Idea & Rationale:** Callables are the system’s **waterworks**—they move and reshape data. Keep **blue** for “this acts,” with a greener tilt when action is state-aware. This separates **Actions** (blue) from **Values** (red) and **Control** (purple).

## Subtypes & Color Behavior

| Subtype   | Hex     | Name           | Role Cue                          |
|-----------|---------|----------------|-----------------------------------|
| Function  | #00A5E0 | Picton Blue    | Free-flowing transform            |
| Method    | #06A3C6 | Pacific Cyan   | Transform shaped by object/state  |

---

# State / Storage

**Idea & Rationale:** These are the **containers and grounds**—where information **lives** (green) or is **organized** (teal). Use **green → teal** to signal **state & structure**, distinct from **Values** (red) and **Control** (purple).

## Subtypes & Color Behavior

| Subtype    | Hex     | Name            | Role Cue                                   |
|------------|---------|-----------------|--------------------------------------------|
| Namespace  | #15A284 | Zomp            | Organizational scope (non-instantiable)    |
| Class      | #0EA3A5 | Light Sea Green | Owns/organizes object state                |

---

# Definitions / Primitives

**Idea & Rationale:** These mark **shape** (types) and **literal atoms** (literals). Keep **types** in pure yellow for “what it *is*,” and render **literals** in yellow-green for “the concrete value here,” distinct from **Values** (red), **Actions** (blue), and **Control** (purple).
**Note:** **Numbers** lean slightly green to emphasize **discrete state**; **enum values** remain literal (yellow-green), while **enum type names** stay with the **type** family (pure yellow).

## Subtypes & Color Behavior

| Subtype                            | Hex     | Name        | Role Cue                                  |
|------------------------------------|---------|-------------|-------------------------------------------|
| Types (incl. enum/class names)     | #FAE57B | Jasmine     | Type identifiers & fundamental types      |
| Strings                            | #88C480 | Pistachio   | Text literals (fixed in source)           |
| Booleans                           | #88C480 | Pistachio   | `true` / `false` literals                 |
| Numbers                            | #88C480 | Pistachio   | Discrete, fixed numeric state             |
| Enums (values)                     | #88C480 | Pistachio   | Enumerator values (enum *types* use Jasmine) |

---

# Parameters

**Idea & Rationale:** Parameters are **handoff points**—between **Values** (red) and **State** (green). Use **orange** to signal “in-flight input/output” without conflating with locals or fields.

## Subtypes & Color Behavior

| Subtype   | Hex     | Name         | Role Cue                                      |
|-----------|---------|--------------|-----------------------------------------------|
| Parameter | #F47357 | Burnt Sienna | Per-call inputs/outputs, bound to scope       |

---

# Comments

Muted, readable notes that recede from code but remain legible during long reads.
Hex: **#3C354E** (Ultra Violet)

---

## Recommendations
For best results, use **Fira Code Retina** (ligatures on). Consider **disabling Bracket Pair Colorization** to let Akihabara’s bracket/paren accents carry the structure.

## Feedback
If you encounter any issues, or have suggestions for improving this theme, please open an issue on GitHub.

## Review
If you enjoy using the Akihabara theme, please consider leaving a review on the marketplace. Your support helps others discover the theme!
