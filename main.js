// javascript/main.js
(function () {
    // Footer year
    const yearEl = document.querySelector("[data-year]");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Mobile nav
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");
    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });

        document.addEventListener("click", (e) => {
            if (!nav.classList.contains("open")) return;
            const t = e.target;
            if (t.closest && (t.closest("[data-nav]") || t.closest("[data-nav-toggle]"))) return;
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    }

    // ===== prijzen flow (alleen op prijzen.html) =====
    const brandGrid = document.querySelector("[data-brand-grid]");
    const modelGrid = document.querySelector("[data-model-grid]");
    const selectedBrandEl = document.querySelector("[data-selected-brand]");
    const selectedModelEl = document.querySelector("[data-selected-model]");
    const modelSearch = document.querySelector("[data-model-search]");
    const repairSearch = document.querySelector("[data-repair-search]");
    const repairTbody = document.querySelector("[data-repair-table] tbody");
    const resetBtn = document.querySelector("[data-reset]");

    // Als deze niet bestaan, zitten we niet op prijzen.html
    if (!brandGrid || !modelGrid || !repairTbody) return;

    const DATA = Array.isArray(window.CELL_CITY_PRICES) ? window.CELL_CITY_PRICES : [];

    function normalize(s) {
        return String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
    }

    let selectedBrand = null;
    let selectedModel = null;

    function renderEmptyTable() {
        repairTbody.innerHTML = `<tr><td class="muted" colspan="2">Kies eerst een model.</td></tr>`;
    }

    function setBrandText(text) {
        if (selectedBrandEl) selectedBrandEl.textContent = text;
    }

    function setModelText(text) {
        if (selectedModelEl) selectedModelEl.textContent = text;
    }

    function clearModelAndRepairs() {
        modelGrid.innerHTML = "";
        selectedModel = null;
        setModelText("Geen model gekozen");
        if (repairSearch) {
            repairSearch.value = "";
            repairSearch.disabled = true;
        }
        renderEmptyTable();
    }

    function renderRepairs(repairs) {
        repairTbody.innerHTML = "";

        if (!repairs || repairs.length === 0) {
            renderEmptyTable();
            return;
        }

        repairs.forEach(([name, price]) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${name}</td><td>${price}</td>`;
            repairTbody.appendChild(tr);
        });
    }

    function renderModels(models) {
        modelGrid.innerHTML = "";
        (models || []).forEach((m) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "model-box";
            btn.textContent = m.name;

            btn.addEventListener("click", () => {
                selectedModel = m;
                setModelText(`Gekozen model: ${m.name}`);
                if (repairSearch) {
                    repairSearch.value = "";
                    repairSearch.disabled = false;
                }
                renderRepairs(m.repairs);
            });

            modelGrid.appendChild(btn);
        });

        if ((models || []).length === 0) {
            const div = document.createElement("div");
            div.className = "muted";
            div.style.padding = "8px 0";
            div.textContent = "Geen modellen gevonden.";
            modelGrid.appendChild(div);
        }
    }

    function renderBrands() {
        brandGrid.innerHTML = "";

        if (DATA.length === 0) {
            brandGrid.innerHTML = `<div class="muted">Geen prijzen-data gevonden. Check javascript/prijzen-data.js</div>`;
            return;
        }

        DATA.forEach((b) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "brand-box";
            btn.innerHTML = `
        <div class="brand-title">${b.brand}</div>
        <div class="brand-sub muted">${b.badge || ""}</div>
      `;

            btn.addEventListener("click", () => {
                selectedBrand = b;
                setBrandText(`Gekozen merk: ${b.brand}`);
                clearModelAndRepairs();
                if (modelSearch) {
                    modelSearch.value = "";
                    modelSearch.disabled = false;
                }
                renderModels(b.models || []);
            });

            brandGrid.appendChild(btn);
        });
    }

    function filterModels() {
        if (!selectedBrand) return;
        const q = normalize(modelSearch.value);
        const models = selectedBrand.models || [];
        const filtered = !q ? models : models.filter(m => normalize(m.name).includes(q));
        renderModels(filtered);
    }

    function filterRepairs() {
        if (!selectedModel) return;
        const q = normalize(repairSearch.value);
        const repairs = selectedModel.repairs || [];
        const filtered = !q ? repairs : repairs.filter(([name, price]) => {
            const t = normalize(name) + " " + normalize(price);
            return t.includes(q);
        });
        renderRepairs(filtered);
    }

    if (modelSearch) modelSearch.addEventListener("input", filterModels);
    if (repairSearch) repairSearch.addEventListener("input", filterRepairs);

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            selectedBrand = null;
            selectedModel = null;
            setBrandText("Geen merk gekozen");
            setModelText("Geen model gekozen");
            if (modelSearch) { modelSearch.value = ""; modelSearch.disabled = true; }
            if (repairSearch) { repairSearch.value = ""; repairSearch.disabled = true; }
            modelGrid.innerHTML = "";
            renderEmptyTable();
        });
    }

    // init state
    setBrandText("Geen merk gekozen");
    setModelText("Geen model gekozen");
    if (modelSearch) modelSearch.disabled = true;
    if (repairSearch) repairSearch.disabled = true;
    renderEmptyTable();
    renderBrands();
})();
