
const fs = require("fs");

// 1. UPDATE CSS
let css = fs.readFileSync("style.css", "utf8");

// Change the gradient text colors to dark purple (#4B0082 or #6C3CE1) and dark grey (#1E1E2E)
css = css.replace(/--accent-1: #6C3CE1;/g, "--accent-1: #4a2b9a;");
css = css.replace(/--accent-2: #9F7AEA;/g, "--accent-2: #2d2d3f;");
// The --gradient variable will naturally pick this up

// Remove all body.light-mode blocks
css = css.replace(/body\.light-mode[\s\S]*?\}[\s\S]*?(?=(?:\n[A-Za-z#.]|$))/g, "");
// Let us do a more aggressive regex or just remove anything with body.light-mode
let newLines = [];
let insideLightMode = false;
let braceCount = 0;
const lines = css.split("\n");

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("body.light-mode")) {
        insideLightMode = true;
    }
    
    if (insideLightMode) {
        if (line.includes("{")) braceCount += (line.match(/\{/g) || []).length;
        if (line.includes("}")) braceCount -= (line.match(/\}/g) || []).length;
        
        if (braceCount === 0) {
            insideLightMode = false;
        }
        continue;
    }
    newLines.push(line);
}

fs.writeFileSync("style.css", newLines.join("\n"));

// 2. UPDATE SCRIPT
let js = fs.readFileSync("script.js", "utf8");
// Remove theme toggle logic
js = js.replace(/\/\/ Theme toggle functionality[\s\S]*?(?=\/\/|\n\n)/i, "");
// Or simply delete anything referencing theme-toggle
let jsLines = js.split("\n");
let cleanJs = [];
let skipJs = false;
for (let i = 0; i < jsLines.length; i++) {
    if (jsLines[i].includes("theme-toggle") || jsLines[i].includes("Theme toggle")) {
        skipJs = true;
        continue; // skip this and next few lines until empty line or end of block
    }
    if (skipJs && jsLines[i].trim() === "") {
        skipJs = false;
        continue;
    }
    if (!skipJs) cleanJs.push(jsLines[i]);
}

// Since the block might be a standard addEventListener block:
js = js.replace(/const themeToggle = document.getElementById\('theme-toggle'\);[\s\S]*?\}\);/i, "");

fs.writeFileSync("script.js", cleanJs.join("\n"));

console.log("Light mode logic and old gradients removed.");

