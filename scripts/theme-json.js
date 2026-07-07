const fs = require("fs");

function stripJsonComments(source) {
    let result = "";
    let inString = false;
    let escaped = false;
    let inLineComment = false;
    let inBlockComment = false;

    for (let index = 0; index < source.length; index += 1) {
        const char = source[index];
        const next = source[index + 1];

        if (inLineComment) {
            if (char === "\n") {
                inLineComment = false;
                result += char;
            }
            continue;
        }

        if (inBlockComment) {
            if (char === "*" && next === "/") {
                inBlockComment = false;
                index += 1;
            } else if (char === "\n") {
                result += char;
            }
            continue;
        }

        if (inString) {
            result += char;
            if (escaped) {
                escaped = false;
            } else if (char === "\\") {
                escaped = true;
            } else if (char === "\"") {
                inString = false;
            }
            continue;
        }

        if (char === "\"") {
            inString = true;
            result += char;
            continue;
        }

        if (char === "/" && next === "/") {
            inLineComment = true;
            index += 1;
            continue;
        }

        if (char === "/" && next === "*") {
            inBlockComment = true;
            index += 1;
            continue;
        }

        result += char;
    }

    return result;
}

function readTheme(filePath) {
    const withoutComments = stripJsonComments(fs.readFileSync(filePath, "utf8"));
    const json = withoutComments.replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(json);
}

function writeTheme(filePath, theme) {
    fs.writeFileSync(filePath, `${JSON.stringify(theme, null, 4)}\n`);
}

module.exports = {
    readTheme,
    writeTheme,
};
