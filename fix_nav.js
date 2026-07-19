
const fs = require("fs");

let teamHtml = fs.readFileSync("team.html", "utf8");
let indexHtml = fs.readFileSync("index.html", "utf8");

// Extract the original head and body open from team.html
let headMatch = teamHtml.match(/<!DOCTYPE html>[\s\S]*?<body>/i);
if(headMatch) {
    let originalHead = headMatch[0];
    
    // Fix index.html head by replacing from DOCTYPE to <body>
    let indexBodyMatch = indexHtml.match(/<body>/i);
    if(indexBodyMatch) {
        indexHtml = originalHead + indexHtml.substring(indexBodyMatch.index + 6);
    } else {
        // If <body> was lost, we just prepend the head
        let navStart = indexHtml.indexOf('<nav class="navbar">');
        if (navStart !== -1) {
            indexHtml = originalHead + "\n" + indexHtml.substring(navStart);
        }
    }
}

// Now rebuild the navbar for both correctly
const newNavbar = `
    <nav class="navbar">
        <a href="#home" class="logo">
            <span>ForgeSpark<span class="accent">.</span></span>
        </a>
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#simple-services">Apply</a></li>
            <li><a href="#writing">Writing</a></li>
            <li><a href="#tuition">Academy</a></li>
            <li><a href="#complex-services">Labs</a></li>
            <li><a href="#portfolio">Work</a></li>
            <li><a href="team.html">Team</a></li>
            <li><a href="#contact" class="btn-primary">Hire Us</a></li>
        </ul>
        <button class="hamburger" id="hamburger" aria-label="Menu">
            <i class="fa-solid fa-bars"></i>
        </button>
    </nav>
`;

function replaceNavbar(html) {
    return html.replace(/<nav class="navbar">[\s\S]*?<\/nav>/, newNavbar.trim());
}

indexHtml = replaceNavbar(indexHtml);
teamHtml = replaceNavbar(teamHtml);

fs.writeFileSync("index.html", indexHtml);
fs.writeFileSync("team.html", teamHtml);

console.log("Navbar fixed in both files.");

