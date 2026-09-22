const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const manifestPath = path.join(root, "test", "languages", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const fixtureRoot = path.dirname(manifestPath);
const supportDocument = fs.readFileSync(path.join(root, "LANGUAGE_SUPPORT.md"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const errors = [];
const ids = new Set();
const modes = new Set();
const languages = Array.isArray(manifest.languages) ? manifest.languages : [];

if (manifest.schemaVersion !== 1 || languages.length === 0) {
    errors.push("Expected schemaVersion 1 and a languages array.");
} else {
    for (const language of languages) {
        const context = language.label || language.id || "unknown entry";

        for (const field of ["id", "label", "languageMode", "fixture", "provider"]) {
            if (typeof language[field] !== "string" || language[field].trim() === "") {
                errors.push(`${context}: missing ${field}.`);
            }
        }

        if (ids.has(language.id)) errors.push(`${context}: duplicate id ${language.id}.`);
        ids.add(language.id);

        if (modes.has(language.languageMode)) {
            errors.push(`${context}: duplicate language mode ${language.languageMode}.`);
        }
        modes.add(language.languageMode);

        if (!['built-in', 'extension'].includes(language.provider)) {
            errors.push(`${context}: provider must be built-in or extension.`);
        }

        const catalogRow = `| ${language.label} | \`${language.languageMode}\``;
        if (!supportDocument.includes(catalogRow)) {
            errors.push(`${context}: missing or mismatched LANGUAGE_SUPPORT.md row.`);
        }

        if (typeof language.fixture !== "string" || language.fixture.trim() === "") continue;

        const fixturePath = path.resolve(fixtureRoot, language.fixture);
        const relative = path.relative(root, fixturePath);
        if (relative.startsWith("..") || path.isAbsolute(relative)) {
            errors.push(`${context}: fixture escapes the repository.`);
        } else if (!fs.existsSync(fixturePath)) {
            errors.push(`${context}: missing fixture ${relative}.`);
        } else if (fs.statSync(fixturePath).size < 40) {
            errors.push(`${context}: fixture is too small to exercise useful syntax.`);
        }
    }
}

if (!readme.includes(`${languages.length} VS Code language modes`)) {
    errors.push(`README.md must state the manifest count (${languages.length}).`);
}

if (errors.length > 0) {
    console.error("Language fixture check failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
}

console.log(`Language fixture check passed for ${languages.length} language modes.`);
