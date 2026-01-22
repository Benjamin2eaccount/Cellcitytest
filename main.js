(() => {
    // Mobiel menu (pak de nav in de header, niet per ongeluk iets anders)
    const navToggle = document.getElementById("navToggle");
    const header = document.querySelector(".site-header");
    const nav = header ? header.querySelector(".nav") : document.querySelector(".nav");

    if (navToggle && nav) {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // Jaar in footer
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Active nav op basis van bestandsnaam (ook voor / -> index.html)
    (function setActiveNav() {
        let file = (location.pathname.split("/").pop() || "").toLowerCase();
        if (!file || file === "/") file = "index.html";

        document.querySelectorAll(".nav-link").forEach(a => {
            const href = (a.getAttribute("href") || "").toLowerCase();
            a.classList.toggle("active", href === file);
        });
    })();

    // Contact form demo (zonder inline script)
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thanks! (demo) — later koppelen we dit aan mail/WhatsApp.");
            form.reset();
        });
    }
})();
