const path = require("path");
const { readTheme } = require("./theme-json");

const root = path.resolve(__dirname, "..");
const packageJson = require(path.join(root, "package.json"));
const themeContributions = packageJson.contributes && packageJson.contributes.themes;

if (!Array.isArray(themeContributions) || themeContributions.length < 2) {
    console.error("Expected at least two contributed themes in package.json.");
    process.exit(1);
}

function codeColorSignature(themePath) {
    const theme = readTheme(themePath);
    return JSON.stringify({
        tokenColors: theme.tokenColors || [],
        semanticTokenColors: theme.semanticTokenColors || {},
    });
}

const [firstTheme, ...otherThemes] = themeContributions;
const referencePath = path.join(root, firstTheme.path);
const referenceSignature = codeColorSignature(referencePath);

for (const theme of otherThemes) {
    const themePath = path.join(root, theme.path);
    const signature = codeColorSignature(themePath);

    if (signature !== referenceSignature) {
        console.error(
            `Code color mismatch: ${theme.label} does not match ${firstTheme.label}.`
        );
        process.exit(1);
    }
}

console.log(`Theme code color check passed for ${themeContributions.length} themes.`);
