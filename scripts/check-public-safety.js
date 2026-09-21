const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const repositoryFiles = execFileSync(
    "git",
    ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
    {
        cwd: root,
        encoding: "utf8",
    }
)
    .split("\0")
    .filter(Boolean);

const forbiddenPaths = [
    { pattern: /(^|\/)\.env(?:\..+)?$/i, label: "environment file" },
    { pattern: /(^|\/)\.npmrc$/i, label: "npm credentials/config" },
    {
        pattern: /\.(?:key|pem|p12|pfx)$/i,
        label: "private key or certificate bundle",
    },
    { pattern: /(^|\/)credentials[^/]*\.json$/i, label: "credential file" },
];

const secretPatterns = [
    {
        pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
        label: "private key material",
    },
    {
        pattern: /(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/,
        label: "GitHub token",
    },
    { pattern: /AKIA[0-9A-Z]{16}/, label: "AWS access key" },
    {
        pattern: /(?:VSCE_PAT|AZURE_DEVOPS_EXT_PAT)\s*[:=]\s*["']?[^\s"']+/i,
        label: "Marketplace/Azure token assignment",
    },
    {
        pattern: /\/\/registry\.npmjs\.org\/:_authToken\s*=\s*[^\s]+/i,
        label: "npm token",
    },
    {
        pattern: /https?:\/\/[^/\s:@]+:[^@\s/]+@/i,
        label: "credential embedded in URL",
    },
];

const textExtensions = new Set([
    "",
    ".cmake",
    ".cpp",
    ".h",
    ".js",
    ".json",
    ".md",
    ".py",
    ".txt",
    ".yaml",
    ".yml",
]);

const findings = [];
let checkedFiles = 0;

for (const relativePath of repositoryFiles) {
    const normalizedPath = relativePath.replace(/\\/g, "/");
    const absolutePath = path.join(root, relativePath);

    // Deleted tracked files remain in the index until the deletion is staged.
    if (!fs.existsSync(absolutePath)) {
        continue;
    }
    checkedFiles += 1;

    for (const rule of forbiddenPaths) {
        if (
            rule.label === "environment file" &&
            /(^|\/)\.env\.example$/i.test(normalizedPath)
        ) {
            continue;
        }
        if (rule.pattern.test(normalizedPath)) {
            findings.push(`${normalizedPath}: forbidden ${rule.label}`);
        }
    }

    const extension = path.extname(relativePath).toLowerCase();
    if (!textExtensions.has(extension)) {
        continue;
    }

    const contents = fs.readFileSync(absolutePath, "utf8");
    for (const rule of secretPatterns) {
        if (rule.pattern.test(contents)) {
            findings.push(`${normalizedPath}: possible ${rule.label}`);
        }
    }
}

if (findings.length > 0) {
    console.error("Public-repository safety check failed:");
    for (const finding of findings) {
        console.error(`- ${finding}`);
    }
    console.error("Remove the sensitive content before committing or publishing.");
    process.exit(1);
}

console.log(
    `Public-repository safety check passed for ${checkedFiles} repository files.`
);
