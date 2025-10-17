import os
import shutil
from PIL import Image, ImageDraw  # pip install pillow

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

SIZE   = 14   # px
RADIUS = 2    # px
OUT_DIR = "assets/chips"

def wipe_dir(path: str) -> None:
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

def make_chip_png(hexcode: str, path: str, size: int = SIZE, radius: int = RADIUS) -> None:
    """Create a rounded-rectangle PNG chip with transparent background."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    # Pillow's rounded_rectangle supports radius param
    draw.rounded_rectangle(
        [0, 0, size, size],
        radius=radius,
        fill=tuple(int(hexcode[i:i+2], 16) for i in (0, 2, 4)) + (255,)
    )
    img.save(path, format="PNG")

def main():
    wipe_dir(OUT_DIR)
    for name, hexcode in PALETTE.items():
        png_path = os.path.join(OUT_DIR, f"{name}.png")
        make_chip_png(hexcode, png_path)
    print(f"✓ Wrote {len(PALETTE)} PNG chips to {OUT_DIR}/ (directory wiped beforehand)")

if __name__ == "__main__":
    main()
