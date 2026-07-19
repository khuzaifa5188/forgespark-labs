
const fs = require("fs");
let css = fs.readFileSync("style.css", "utf8");

// 1. Remove glassmorphism and replace with clean white card
css = css.replace(/\.glass-card\s*\{[\s\S]*?\}/g, `.glass-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}`);

// 2. Update navbar background
css = css.replace(/background: rgba\(11, 15, 25, 0\.7\);/g, "background: rgba(255, 255, 255, 0.9);");
css = css.replace(/border: 1px solid rgba\(255, 255, 255, 0\.06\);/g, "border: 1px solid var(--border-color);");
css = css.replace(/\.nav-links a:hover \{[\s\S]*?\}/g, `.nav-links a:hover {
    color: var(--accent-1);
}`);

// 3. Update footer styling (New Footer CSS)
const footerCss = `
.site-footer {
    background-color: var(--bg-dark);
    color: var(--text-on-dark);
    padding: 4rem 2rem 1.5rem;
    margin-top: 5rem;
}
.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
}
.footer-brand .logo {
    color: var(--text-on-dark);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.footer-brand p {
    color: #94a3b8;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
}
.footer-links h4 {
    color: var(--text-on-dark);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
}
.footer-links ul {
    list-style: none;
}
.footer-links li {
    margin-bottom: 0.8rem;
}
.footer-links a {
    color: #94a3b8;
    transition: color 0.3s ease;
}
.footer-links a:hover {
    color: var(--accent-1);
}
.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.5rem;
    text-align: center;
    color: #94a3b8;
    font-size: 0.9rem;
}
@media (max-width: 768px) {
    .footer-grid {
        grid-template-columns: 1fr;
    }
}
/* University Logos Strip */
.uni-logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;
}
.uni-logo {
    font-weight: 700;
    font-size: 1.2rem;
    color: #9ca3af;
    background: #f3f4f6;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    letter-spacing: 1px;
    transition: all 0.3s ease;
}
.uni-logo:hover {
    color: var(--accent-1);
    background: var(--purple-100);
}
`;
css = css.replace(/footer \{[\s\S]*?\}/, footerCss);

// 4. Update Alternating Section Backgrounds
css = css.replace(/\.simple-tier \{[\s\S]*?\}/g, `.simple-tier { background: var(--bg-secondary); padding: 3rem 0 1rem; text-align: center; }`);
css = css.replace(/\.engineering-tier \{[\s\S]*?\}/g, `.engineering-tier { background: var(--bg-primary); padding: 3rem 0 1rem; text-align: center; }`);

fs.writeFileSync("style.css", css);
console.log("CSS updated successfully!");

