
const fs = require("fs");
const css = fs.readFileSync("style.css", "utf8");
let issues = [];

const lines = css.split("\n");
lines.forEach((line, index) => {
    if (line.includes("modal-content") && line.includes("background")) issues.push(`Line ${index + 1}: ${line}`);
    if (line.includes("modal-box") && line.includes("background")) issues.push(`Line ${index + 1}: ${line}`);
});

console.log("Modal checks:");
console.log(issues.join("\n"));

