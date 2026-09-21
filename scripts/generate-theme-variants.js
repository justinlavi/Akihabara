const fs = require("fs");
const path = require("path");
const { readTheme, serializeTheme, writeTheme } = require("./theme-json");

const root = path.resolve(__dirname, "..");
const darkPath = path.join(root, "themes", "akihabara-dark-color-theme.json");
const lightPath = path.join(root, "themes", "akihabara-light-color-theme.json");
const oledPath = path.join(root, "themes", "akihabara-oled-color-theme.json");
const experimentalPath = path.join(root, "themes", "akihabara-experimental-color-theme.json");
const checkOnly = process.argv.includes("--check");

const source = readTheme(darkPath);

const palettes = {
    light: {
        editor: "#f7f3f8",
        base: "#efe8f2",
        chrome: "#e7dfea",
        surface: "#fffaff",
        elevated: "#ffffff",
        border: "#d8ccdf",
        borderStrong: "#b7a8c4",
        fg: "#2f2938",
        fgMuted: "#5f546d",
        fgSubtle: "#8f829e",
        accent: "#7757BA",
        accentSoft: "#ded5f2",
        red: "#b83245",
        green: "#177f5f",
        cyan: "#007d96",
        yellow: "#8a741f",
        orange: "#a85f24",
    },
    oled: {
        editor: "#000000",
        base: "#000000",
        chrome: "#030305",
        surface: "#07060a",
        elevated: "#0d0b12",
        border: "#171222",
        borderStrong: "#2d2442",
        fg: "#c7bfdb",
        fgMuted: "#aa9fc8",
        fgSubtle: "#5c536e",
        accent: "#7a63ed",
        accentSoft: "#17102d",
        red: "#C13838",
        green: "#14b871",
        cyan: "#04c4d9",
        yellow: "#cc8c39",
        orange: "#D77F43",
    },
    experimental: {
        editor: "#0d0a12",
        base: "#100c17",
        chrome: "#171021",
        surface: "#1d1528",
        elevated: "#251a33",
        border: "#3a294f",
        borderStrong: "#7e64c6",
        fg: "#e2d8eb",
        fgMuted: "#b9a8cc",
        fgSubtle: "#71627f",
        accent: "#8b6bff",
        accentSoft: "#2c2144",
        royal: "#6f4cc3",
        gold: "#d4a54f",
        goldBright: "#f0c878",
        red: "#c04a54",
        green: "#5ca77e",
        cyan: "#7773e6",
        yellow: "#d4a54f",
        orange: "#c9873e",
        shadow: "#020104cc",
    },
};

function alpha(original, fallback = "") {
    return /^#[0-9a-fA-F]{8}$/.test(original) ? original.slice(7) : fallback;
}

function withAlpha(hex, original, fallback = "") {
    return `${hex}${alpha(original, fallback)}`;
}

function isTransparent(value) {
    return /^#(?:0{8}|[0-9a-fA-F]{6}00)$/.test(value);
}

function colorForKey(key, original, palette) {
    if (typeof original !== "string" || !original.startsWith("#")) {
        return original;
    }

    if (isTransparent(original)) {
        return original;
    }

    const lower = key.toLowerCase();
    const translucent = (hex, fallback = "33") => withAlpha(hex, original, fallback);
    const isExperimental = palette === palettes.experimental;
    const accent = palette.accent;
    const activeAccent = isExperimental ? palette.gold : accent;
    const buttonAccent = isExperimental ? palette.gold : accent;

    if (lower.includes("error") || lower.includes("deleted") || lower.includes("removed")) {
        return lower.endsWith("foreground") ? withAlpha(palette.red, original) : translucent(palette.red, "33");
    }
    if (lower.includes("warning")) {
        return lower.endsWith("foreground") ? withAlpha(palette.orange, original) : translucent(palette.orange, "33");
    }
    if (lower.includes("info") || lower.includes("modified")) {
        return lower.endsWith("foreground") ? withAlpha(palette.cyan, original) : translucent(palette.cyan, "33");
    }
    if (lower.includes("added") || lower.includes("inserted") || lower.includes("success")) {
        return lower.endsWith("foreground") ? withAlpha(palette.green, original) : translucent(palette.green, "33");
    }

    if (lower.includes("chart")) {
        if (lower.endsWith("blue")) return withAlpha(accent, original);
        if (lower.endsWith("green")) return withAlpha(palette.green, original);
        if (lower.endsWith("orange")) return withAlpha(palette.orange, original);
        if (lower.endsWith("purple")) return withAlpha(isExperimental ? palette.royal : accent, original);
        if (lower.endsWith("red")) return withAlpha(palette.red, original);
        if (lower.endsWith("yellow")) return withAlpha(palette.yellow, original);
        return withAlpha(palette.fgMuted, original);
    }

    if (lower.endsWith("foreground") || lower === "foreground") {
        if (lower.includes("disabled") || lower.includes("inactive") || lower.includes("placeholder")) {
            return withAlpha(palette.fgSubtle, original);
        }
        if (lower.includes("activitybar.foreground") || lower.includes("active") || lower.includes("highlight")) {
            return withAlpha(activeAccent, original);
        }
        if (lower.includes("description") || lower.includes("muted") || lower.includes("secondary")) {
            return withAlpha(palette.fgMuted, original);
        }
        if (lower.includes("icon")) {
            return withAlpha(palette.fgMuted, original);
        }
        return withAlpha(palette.fg, original);
    }

    if (lower.includes("selection") || lower.includes("highlight") || lower.includes("match") || (lower.includes("active") && !lower.includes("inactive"))) {
        if (lower.endsWith("foreground")) {
            return withAlpha(activeAccent, original);
        }
        return translucent(activeAccent, "33");
    }

    if (lower.endsWith("border") || lower.includes(".border")) {
        return translucent(lower.includes("focus") ? palette.borderStrong : palette.border, "ff");
    }

    if (lower.endsWith("background") || lower.includes(".background")) {
        if (lower.startsWith("editor.") || lower.startsWith("peekvieweditor.") || lower.startsWith("terminal.")) {
            return translucent(palette.editor, "ff");
        }
        if (lower.includes("hover") || lower.includes("widget") || lower.includes("dropdown") || lower.includes("input") || lower.includes("quickinput") || lower.includes("menu")) {
            return translucent(palette.elevated, "ff");
        }
        if (lower.includes("button") || lower.includes("badge") || lower.includes("progressbar")) {
            return translucent(buttonAccent, "99");
        }
        if (lower.includes("tab") || lower.includes("titlebar") || lower.includes("activitybar") || lower.includes("statusbar")) {
            return translucent(palette.chrome, "ff");
        }
        if (lower.includes("sidebar") || lower.includes("panel") || lower.includes("list") || lower.includes("tree")) {
            return translucent(palette.surface, "ff");
        }
        return translucent(palette.base, "ff");
    }

    if (lower.includes("shadow")) {
        if (palette === palettes.light) return "#72598226";
        return palette.shadow || "#00000099";
    }

    return original;
}

function buildVariant(label, type, colors) {
    const theme = {
        name: label,
        type,
        colors: {},
        tokenColors: source.tokenColors,
    };

    if (source.semanticTokenColors) {
        theme.semanticTokenColors = source.semanticTokenColors;
    }
    if (typeof source.semanticHighlighting === "boolean") {
        theme.semanticHighlighting = source.semanticHighlighting;
    }

    for (const [key, value] of Object.entries(source.colors)) {
        theme.colors[key] = colorForKey(key, value, colors);
    }

    return theme;
}

const variants = [
    [lightPath, buildVariant("Akihabara Light", "light", palettes.light)],
    [oledPath, buildVariant("Akihabara OLED", "dark", palettes.oled)],
    [
        experimentalPath,
        buildVariant("Akihabara Experimental", "dark", palettes.experimental),
    ],
];

if (checkOnly) {
    const staleFiles = variants
        .filter(([filePath, theme]) => {
            const actual = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
            return actual !== serializeTheme(theme);
        })
        .map(([filePath]) => path.relative(root, filePath));

    if (staleFiles.length > 0) {
        console.error("Generated themes are stale:");
        for (const filePath of staleFiles) {
            console.error(`- ${filePath}`);
        }
        console.error("Run npm run build:themes and commit the generated files.");
        process.exit(1);
    }

    console.log(`Generated theme check passed for ${variants.length} variants.`);
} else {
    for (const [filePath, theme] of variants) {
        writeTheme(filePath, theme);
    }

    console.log("Generated Akihabara Light, OLED, and Experimental theme variants.");
}
