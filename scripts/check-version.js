const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const packageJson = JSON.parse(
    fs.readFileSync(path.join(root, "package.json"), "utf8")
);
const changelog = fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8");
const latestChangelogEntry = changelog.match(/^## \[([0-9]+\.[0-9]+\.[0-9]+)\]/m);

if (!latestChangelogEntry) {
    console.error("Could not find a version header like ## [1.2.3] in CHANGELOG.md.");
    process.exit(1);
}

const packageVersion = packageJson.version;
const changelogVersion = latestChangelogEntry[1];

if (packageVersion !== changelogVersion) {
    console.error(
        `Version mismatch: package.json is ${packageVersion}, but CHANGELOG.md starts at ${changelogVersion}.`
    );
    process.exit(1);
}

console.log(`Version check passed: ${packageVersion}`);
