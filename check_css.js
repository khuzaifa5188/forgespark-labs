
const fs = require("fs");
const css = fs.readFileSync("style.css", "utf8");
const lines = css.split("\n");

const darkColors = ["#0b0f19", "rgba(17, 24, 39", "#f8fafc", "#111827", "#1e293b", "rgba(255, 255, 255"];
let issues = [];

lines.forEach((line, index) => {
    darkColors.forEach(color => {
        if (line.includes(color) && !line.includes("--bg-dark") && !line.includes("text-on-dark") && !line.includes("footer")) {
            issues.push(`Line ${index + 1}: ${line.trim()}`);
        }
    });
});

if (issues.length > 0) {
    console.log("Potential dark theme artifacts found:");
    console.log(issues.slice(0, 15).join("\n"));
} else {
    console.log("No obvious dark theme artifacts found.");
}

