
const fs = require("fs");
let css = fs.readFileSync("style.css", "utf8");

// Fix subtle white/dark artifacts
css = css.replace(/rgba\(255, 255, 255, 0\.\d+\)/g, "var(--border-color)"); // replaces most subtle white borders/bgs meant for dark mode
css = css.replace(/background: rgba\(17, 24, 39, 0\.7\);/g, "background: #f8f9fa;"); // form fields bg
css = css.replace(/background: rgba\(17, 24, 39, 0\.4\);/g, "background: #ffffff;");
css = css.replace(/color: rgba\(255, 255, 255, 0\.25\);/g, "color: var(--text-muted);");
css = css.replace(/border-top: 1px solid rgba\(255, 255, 255, 0\.1\);/g, "border-top: 1px solid var(--border-color);");

// Fix form fields
css = css.replace(/\.form-group input, \.form-group select, \.form-group textarea \{[\s\S]*?\}/g, (match) => {
    return match.replace(/background: var\(--bg-color\)/g, "background: #F3F4F6")
                .replace(/border: 1px solid rgba\(255, 255, 255, 0\.1\)/g, "border: 1px solid var(--border-color)")
                .replace(/color: var\(--text-main\)/g, "color: var(--text-main)");
});

// Fix buttons that might have dark text on dark background in hover
css = css.replace(/\.btn-primary \{[\s\S]*?\}/g, `.btn-primary {
    background: var(--purple-600);
    color: #ffffff;
    padding: 0.8rem 1.8rem;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 15px rgba(108, 60, 225, 0.3);
}`);

css = css.replace(/\.btn-secondary \{[\s\S]*?\}/g, `.btn-secondary {
    background: #ffffff;
    color: var(--purple-600);
    padding: 0.8rem 1.8rem;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 2px solid var(--purple-600);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}`);

// Fix text colors for section titles
css = css.replace(/\.section-title \{[\s\S]*?\}/g, `.section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
    color: var(--text-primary);
}`);

css = css.replace(/\.section-subtitle \{[\s\S]*?\}/g, `.section-subtitle {
    color: var(--text-secondary);
}`);

fs.writeFileSync("style.css", css);
console.log("Deep CSS clean completed!");

