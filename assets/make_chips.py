import os
import shutil

# filename -> hex (no #)
PALETTE = {
    # Values / Information
    "red":              "FF0000",
    "red_const":        "A8304B",  # Amaranth Purple
    "red_local":        "D53D5C",  # Cerise
    "red_member":       "904483",  # Plum

    # Keywords / Flow Control
    "purple":           "800080",
    "purple_keyword":   "7757BA",  # Royal Purple

    # Action / Transformation
    "blue":             "0000FF",
    "blue_function":    "00A5E0",  # Picton Blue
    "blue_method":      "06A3C6",  # Pacific Cyan

    # State / Storage
    "green":            "00FF00",
    "green_namespace":  "15A284",  # Zomp
    "teal":             "008080",
    "teal_class":       "0EA3A5",  # Light Sea Green

    # Definitions / Primitives
    "yellow":           "FFFF00",
    "yellow_type":      "FAE57B",  # Jasmine
    "yellow_literal":   "88C480",  # Pistachio

    # Parameters / Arguments
    "orange":           "FFA500",
    "orange_parameter": "F47357",  # Burnt Sienna

    # Comments
    "gray_comment":     "5E5379",  # Ultra Violet
}

SVG_TMPL = """\
<svg xmlns="http://www.w3.org/2000/svg" width="{s}" height="{s}" viewBox="0 0 {s} {s}">
  <rect x="0" y="0" width="{s}" height="{s}" rx="{r}" ry="{r}" fill="#{hex}"/>
</svg>
"""

SIZE = 14
RADIUS = 2
OUT_DIR = "assets/chips"

def wipe_dir(path: str) -> None:
    """
    Hard wipe the directory contents (files & subdirs) safely.
    Only removes contents of `path`, not the parent dir.
    """
    os.makedirs(path, exist_ok=True)
    for entry in os.listdir(path):
        p = os.path.join(path, entry)
        try:
            if os.path.isfile(p) or os.path.islink(p):
                os.unlink(p)
            else:
                shutil.rmtree(p)
        except Exception as e:
            print(f"! Skipped '{p}': {e}")

def main():
    # Wipe existing chips
    wipe_dir(OUT_DIR)

    # Recreate fresh chips
    for name, hexcode in PALETTE.items():
        path = os.path.join(OUT_DIR, f"{name}.svg")
        with open(path, "w", encoding="utf-8") as f:
            f.write(SVG_TMPL.format(s=SIZE, r=RADIUS, hex=hexcode))

    print(f"✓ Wrote {len(PALETTE)} chips to {OUT_DIR}/ (directory wiped beforehand)")

if __name__ == "__main__":
    main()
