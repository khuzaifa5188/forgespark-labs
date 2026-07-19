
const fs = require("fs");

let html = fs.readFileSync("index.html", "utf8");

// We need to keep: Head, Nav, Team Section, Modals, Footer, Scripts.
// We should remove: Hero to Projects (before Team section)
// We should remove: FAQ, Contact (after Modals)

// The sections to remove in team.html
const heroToProjectsRegex = /<header id="home" class="hero">[\s\S]*?(?=<!-- ForgeSpark Academy section moved above to Community Hub zone -->)/i;
const faqToContactRegex = /<!-- ========== FAQ SECTION ========== -->[\s\S]*?(?=<footer)/i;
// actually I will look for FAQ section and Contact section tags.
// Let us use string replacement.

let teamHtml = html;
// Delete from <header id="home" to before <section id="team"
let startIdx = teamHtml.indexOf('<header id="home"');
let endIdx = teamHtml.indexOf('<section id="team"');
if(startIdx !== -1 && endIdx !== -1) {
    teamHtml = teamHtml.substring(0, startIdx) + teamHtml.substring(endIdx);
}

// Delete FAQ and Contact.
startIdx = teamHtml.indexOf('<section class="faq-section">');
endIdx = teamHtml.indexOf('<footer');
if(startIdx !== -1 && endIdx !== -1) {
    teamHtml = teamHtml.substring(0, startIdx) + teamHtml.substring(endIdx);
}

// Also update the Title and active Nav links in team.html
teamHtml = teamHtml.replace(/<title>.*?<\/title>/, "<title>Our Team | ForgeSpark Labs</title>");

fs.writeFileSync("team.html", teamHtml);

// Now for index.html, we need to remove Team Section and Modals.
let indexHtml = fs.readFileSync("index.html", "utf8");
let teamStart = indexHtml.indexOf('<section id="team"');
let modalsEnd = indexHtml.indexOf('<section class="faq-section">'); // modals end before FAQ
if(teamStart !== -1 && modalsEnd !== -1) {
    indexHtml = indexHtml.substring(0, teamStart) + indexHtml.substring(modalsEnd);
}

fs.writeFileSync("index.html", indexHtml);
console.log("Extraction complete.");

