// Mobiel menu
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");
if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

// Jaar in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Active nav op basis van bestandsnaam
(function setActiveNav(){
    const file = (location.pathname.split("/").pop() || "").toLowerCase();
    document.querySelectorAll(".nav-link").forEach(a => {
        const href = (a.getAttribute("href") || "").toLowerCase();
        if (href === file) a.classList.add("active");
        else a.classList.remove("active");
    });
})();
