const minimumMajor = 22;
const actualVersion = process.versions.node;
const actualMajor = Number.parseInt(actualVersion.split(".")[0], 10);

if (!Number.isInteger(actualMajor) || actualMajor < minimumMajor) {
    console.error(
        [
            `Akihabara requires Node.js ${minimumMajor} or newer; the current shell is using ${actualVersion}.`,
            "Node 24 is the repository-pinned version in .nvmrc.",
            "",
            "For fnm in PowerShell, activate it in this terminal and retry:",
            "  fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression",
            "  fnm use 24",
            "  node --version",
        ].join("\n")
    );
    process.exit(1);
}

console.log(`Node.js version check passed: ${actualVersion}`);
