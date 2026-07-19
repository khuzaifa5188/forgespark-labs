
const fs = require("fs");
let css = fs.readFileSync("style.css", "utf8");

// The previous tool deleted :root and *
// Let us prepend it
const rootVars = `
:root {
    --bg-color: #FFFFFF;
    --bg-secondary: #F8F7FC;
    --card-bg: #FFFFFF;
    --text-main: #2D2D3F;
    --text-muted: #6B7280;
    --accent-1: #4a2b9a;
    --accent-2: #2d2d3f;
    --purple-600: #6C3CE1;
    --purple-100: #EDE9FE;
    --accent-glow: rgba(108, 60, 225, 0.15);
    --gradient: linear-gradient(135deg, var(--accent-1), var(--accent-2));
    --border-color: #E5E7EB;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;

// Remove stray "box-sizing: border-box;" and "}" if it was left at the top
css = css.replace(/^\s*box-sizing:\s*border-box;\s*\n\s*\}\s*/, "");

css = rootVars + "\n" + css;

fs.writeFileSync("style.css", css);
console.log("Fixed style.css root");

