
const fs = require("fs");

let html = fs.readFileSync("index.html", "utf8");

// 1. Update Navbar
html = html.replace(
    /<ul class="nav-links">[\s\S]*?<\/ul>/,
    `<ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#simple-services">Admissions</a></li>
            <li><a href="#writing">Writing</a></li>
            <li><a href="#tuition">Academy</a></li>
            <li><a href="#complex-services">Engineering Labs</a></li>
            <li><a href="#portfolio">Projects</a></li>
            <li><a href="team.html">Our Team &rarr;</a></li>
            <li><a href="#contact" class="btn-primary">Hire Us</a></li>
        </ul>`
);

// 2. Rewrite Hero Section
const newHero = `
    <header id="home" class="hero">
        <div class="hero-content">
            <div class="hero-badge">
                <span class="badge-dot"></span>
                <span>Our Expert Team. End-to-End Solutions.</span>
            </div>
            <h1>Your Problems, <br><span class="gradient-text">Our Solutions</span></h1>
            <p class="hero-sub">From helping a student write their CV to building advanced robotics &amp; AI systems, we are an expert team that solves problems for <strong>everyone</strong>. Simple services for students &amp; community. Advanced engineering for professionals.</p>
            <div class="hero-buttons">
                <a href="#contact" class="btn-primary"><i class="fa-solid fa-paper-plane"></i> Get a Free Quote</a>
                <a href="#simple-services" class="btn-secondary"><i class="fa-solid fa-users"></i> Explore Services</a>
            </div>
            <div class="hero-tech-stack">
                <span class="tech-label">Tech Stack:</span>
                <div class="tech-icons">
                    <span class="tech-pill"><i class="fa-solid fa-microchip"></i> ESP32</span>
                    <span class="tech-pill"><i class="fa-solid fa-brain"></i> TinyML</span>
                    <span class="tech-pill"><i class="fa-solid fa-gears"></i> SolidWorks</span>
                    <span class="tech-pill"><i class="fa-solid fa-bolt"></i> MATLAB</span>
                    <span class="tech-pill"><i class="fa-brands fa-python"></i> Python</span>
                    <span class="tech-pill"><i class="fa-solid fa-wave-square"></i> FPGA</span>
                </div>
            </div>
        </div>
    </header>
`;
html = html.replace(/<header id="home" class="hero">[\s\S]*?<\/header>/, newHero);

// 3. Add University Logos & CTA to Online Apply Card
const applyCta = `
                    <div class="uni-logos-wrapper" style="margin: 2rem 0;">
                        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem; text-align: center;">Applications for top institutions:</p>
                        <div class="uni-logos">
                            <span class="uni-logo">NUST</span>
                            <span class="uni-logo">PIEAS</span>
                            <span class="uni-logo">GIKI</span>
                            <span class="uni-logo">UET</span>
                            <span class="uni-logo">NTS</span>
                            <span class="uni-logo">ETEA</span>
                            <span class="uni-logo">NMDCAT</span>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 1.5rem;">
                        <a href="https://wa.me/923189523824?text=Hello%20ForgeSpark%20Labs!%20I%20need%20help%20with%20an%20online%20application%20or%20university%20admission." target="_blank" class="btn-primary" style="display:inline-block; padding: 1rem 2rem; border-radius: 50px; font-weight: 600;">
                            <i class="fa-brands fa-whatsapp"></i> Apply Now via WhatsApp
                        </a>
                    </div>
`;
html = html.replace(
    /(<a href="https:\/\/wa\.me\/923189523824\?text=Hello%20ForgeSpark%20Labs!%20I%20need%20help%20with%20an%20online%20application%20or%20university%20admission."[^>]*>[\s\S]*?<\/a>)/,
    applyCta
);

// 4. Update Footer
const newFooter = `
    <footer class="site-footer">
        <div class="container footer-grid">
            <div class="footer-brand">
                <a href="#home" class="logo">
                    <img src="favicons/favicon-96x96.png" alt="ForgeSpark Labs Logo" class="logo-img" style="width: 32px; vertical-align: middle;">
                    <span>ForgeSpark<span class="accent">.</span></span>
                </a>
                <p>Your Problems, Our Solutions.</p>
                <p>We build complete hardware and software solutions. From mechanical prototyping to IoT and AI integration.</p>
            </div>
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#simple-services">Services</a></li>
                    <li><a href="#tuition">Academy</a></li>
                    <li><a href="#portfolio">Projects</a></li>
                    <li><a href="team.html">Our Team &rarr;</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Services</h4>
                <ul>
                    <li><a href="#writing">CV Writing</a></li>
                    <li><a href="#simple-services">Uni Apply</a></li>
                    <li><a href="#tuition">Tuition</a></li>
                    <li><a href="#complex-services">Engineering Labs</a></li>
                    <li><a href="#writing">Patent Writing</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Contact</h4>
                <ul>
                    <li><a href="https://wa.me/923189523824" target="_blank"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a></li>
                    <li><a href="mailto:info@forgesparklab.tech"><i class="fa-solid fa-envelope"></i> Email Us</a></li>
                    <li><a href="#contact"><i class="fa-solid fa-paper-plane"></i> Contact Form</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 ForgeSpark Labs &mdash; Built by an Expert Team of Engineers. All rights reserved.</p>
        </div>
    </footer>
`;
html = html.replace(/<footer>[\s\S]*?<\/footer>/, newFooter);

// We want the section order to be: 
// Hero -> Stats -> Simple Services (Apply) -> Writing -> Tuition (Academy) -> Complex Services -> Process -> Portfolio -> FAQ -> Contact
// Currently it is: Hero -> Quick Nav -> Stats -> Simple Services -> Tuition -> Writing -> Complex Services -> Process -> Portfolio -> FAQ -> Contact
// I need to swap Tuition and Writing sections.
const extractSection = (content, startRegex, endRegex) => {
    const match = content.match(startRegex);
    if (!match) return null;
    const startIndex = match.index;
    const nextMatch = content.substring(startIndex + match[0].length).match(endRegex);
    const endIndex = nextMatch ? startIndex + match[0].length + nextMatch.index : content.length;
    const sectionHtml = content.substring(startIndex, endIndex);
    return { html: sectionHtml, start: startIndex, end: endIndex };
};

const tuitionSection = extractSection(html, /<!-- ========== FORGESPARK ACADEMY/, /<!-- ========== PROFESSIONAL WRITING SERVICES/);
const writingSection = extractSection(html, /<!-- ========== PROFESSIONAL WRITING SERVICES/, /<!-- ===== SECTION DIVIDER: ENGINEERING LABS/);

if (tuitionSection && writingSection) {
    // Both exist, so let us swap them in the main HTML.
    let newHtml = html.substring(0, tuitionSection.start) + 
                  writingSection.html + 
                  tuitionSection.html + 
                  html.substring(writingSection.end);
    html = newHtml;
}

// Write the changes back to index.html
fs.writeFileSync("index.html", html);
console.log("index.html updated successfully!");

