(() => {
    const euro = (n) =>
        new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

    const calcPrice = (base, multiplier = 1) => Math.round(base * multiplier);

    const CART = [];

    const els = () => ({
        typeSel: document.getElementById("typeFilter"),
        brandSel: document.getElementById("brandFilter"),
        modelSel: document.getElementById("modelFilter"),
        tbody: document.querySelector("#catalogusTable tbody"),

        pickHint: document.getElementById("pickHint"),
        resultWrap: document.getElementById("resultWrap"),

        showModelsBtn: document.getElementById("showModelsBtn"),
        modelPanel: document.getElementById("modelPanel"),
        modelGrid: document.getElementById("modelGrid"),
        closeModelsBtn: document.getElementById("closeModelsBtn"),

        cartItems: document.getElementById("cartItems"),
        cartCount: document.getElementById("cartCount"),
        emailBtn: document.getElementById("emailCartBtn"),
        cartEmpty: document.getElementById("cartEmpty"),
        clearCartBtn: document.getElementById("clearCartBtn"),
    });

    const uniq = (arr) => [...new Set(arr)].sort((a, b) => a.localeCompare(b));

    const setSelectOptions = (select, options, placeholder) => {
        select.innerHTML = "";
        const p = document.createElement("option");
        p.value = "";
        p.textContent = placeholder;
        select.appendChild(p);

        options.forEach((v) => {
            const o = document.createElement("option");
            o.value = v;
            o.textContent = v;
            select.appendChild(o);
        });
    };

    // ===== CART =====
    const buildMailto = () => {
        const to = "info@cellcityrosmalen.nl";
        const subject = "Reparatie aanvraag (CellCity Rosmalen)";

        const lines = [
            "Hallo CellCity,",
            "",
            "Ik wil graag een reparatie aanvragen:",
            "",
            ...CART.map((it, i) => `${i + 1}. ${it.brand} ${it.model} — ${it.service} (richtprijs ${euro(it.price)})`),
            "",
            "Mijn contactgegevens:",
            "- Naam: ",
            "- Telefoon: ",
            "- Eventuele opmerkingen: ",
            "",
            "Alvast bedankt!",
        ];

        return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    };

    const renderCart = () => {
        const { cartItems, cartCount, emailBtn, cartEmpty } = els();
        if (!cartItems || !cartCount || !emailBtn || !cartEmpty) return;

        cartCount.textContent = String(CART.length);
        cartItems.innerHTML = "";

        if (CART.length === 0) {
            cartEmpty.style.display = "block";
            emailBtn.href = "#";
            emailBtn.setAttribute("aria-disabled", "true");
            return;
        }

        cartEmpty.style.display = "none";
        emailBtn.href = buildMailto();
        emailBtn.setAttribute("aria-disabled", "false");

        CART.forEach((it, idx) => {
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
        <div class="top">
          <div>
            <div class="name">${it.brand} ${it.model}</div>
            <div class="meta">${it.type} • ${it.service}</div>
            <div class="price">${euro(it.price)}</div>
          </div>
          <button title="Verwijderen" aria-label="Verwijderen">✕</button>
        </div>
      `;
            div.querySelector("button").addEventListener("click", () => {
                CART.splice(idx, 1);
                renderCart();
            });
            cartItems.appendChild(div);
        });
    };

    const clearCart = () => {
        CART.length = 0;
        renderCart();
    };

    // ===== TABLE ROW =====
    const makeRow = (device, service, price) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${device.type}</td>
      <td>${device.brand}</td>
      <td>${device.model}</td>
      <td>${service.name}</td>
      <td><strong>${euro(price)}</strong></td>
      <td class="muted small">Richtprijs</td>
      <td></td>
    `;

        const addBtn = document.createElement("button");
        addBtn.className = "btn primary small";
        addBtn.type = "button";
        addBtn.textContent = "Toevoegen";
        addBtn.addEventListener("click", () => {
            CART.push({
                type: device.type,
                brand: device.brand,
                model: device.model,
                service: service.name,
                price,
            });
            renderCart();
        });

        tr.lastElementChild.appendChild(addBtn);
        return tr;
    };

    // ===== INIT =====
    const initCatalogus = () => {
        const data = window.CELLCITY_CATALOGUS;
        if (!data) return;

        const {
            typeSel, brandSel, modelSel, tbody,
            pickHint, resultWrap,
            showModelsBtn, modelPanel, modelGrid, closeModelsBtn,
            clearCartBtn
        } = els();

        if (!typeSel || !brandSel || !modelSel || !tbody) return;

        // Start state
        setSelectOptions(typeSel, uniq(data.devices.map(d => d.type)), "Kies type…");
        setSelectOptions(brandSel, [], "Kies eerst type…");
        setSelectOptions(modelSel, [], "Kies eerst type + merk…");
        brandSel.disabled = true;
        modelSel.disabled = true;
        if (showModelsBtn) showModelsBtn.disabled = true;

        const hideResults = () => {
            if (pickHint) pickHint.classList.remove("hidden");
            if (resultWrap) resultWrap.classList.add("hidden");
            tbody.innerHTML = "";
        };

        const buildModelsPanel = (models) => {
            if (!modelGrid || !modelPanel) return;
            modelGrid.innerHTML = "";

            models.forEach((m) => {
                const chip = document.createElement("div");
                chip.className = "model-chip";
                chip.textContent = m;
                chip.addEventListener("click", () => {
                    modelSel.value = m;
                    modelPanel.style.display = "none";
                    renderForSelection();
                });
                modelGrid.appendChild(chip);
            });
        };

        const renderForSelection = () => {
            const type = typeSel.value;
            const brand = brandSel.value;
            const model = modelSel.value;

            // sluit panel ook als je via dropdown kiest
            if (modelPanel) modelPanel.style.display = "none";

            if (!type || !brand || !model) {
                hideResults();
                return;
            }

            const device = data.devices.find(d => d.type === type && d.brand === brand && d.model === model);
            if (!device) {
                hideResults();
                return;
            }

            tbody.innerHTML = "";
            data.services.forEach((service) => {
                const mult = device.multipliers?.[service.id] ?? 1;
                const price = calcPrice(service.basePrice, mult);
                tbody.appendChild(makeRow(device, service, price));
            });

            if (pickHint) pickHint.classList.add("hidden");
            if (resultWrap) resultWrap.classList.remove("hidden");
        };

        typeSel.addEventListener("change", () => {
            const type = typeSel.value;

            brandSel.disabled = true;
            modelSel.disabled = true;

            setSelectOptions(brandSel, [], "Kies eerst type…");
            setSelectOptions(modelSel, [], "Kies eerst type + merk…");
            hideResults();

            if (showModelsBtn) showModelsBtn.disabled = true;
            if (modelPanel) modelPanel.style.display = "none";

            if (!type) return;

            const brands = uniq(data.devices.filter(d => d.type === type).map(d => d.brand));
            brandSel.disabled = false;
            setSelectOptions(brandSel, brands, "Kies merk…");
        });

        brandSel.addEventListener("change", () => {
            const type = typeSel.value;
            const brand = brandSel.value;

            modelSel.disabled = true;
            setSelectOptions(modelSel, [], "Kies eerst type + merk…");
            hideResults();

            if (showModelsBtn) showModelsBtn.disabled = true;
            if (modelPanel) modelPanel.style.display = "none";

            if (!type || !brand) return;

            const models = uniq(data.devices.filter(d => d.type === type && d.brand === brand).map(d => d.model));
            modelSel.disabled = false;
            setSelectOptions(modelSel, models, "Kies model…");

            if (showModelsBtn) showModelsBtn.disabled = false;
            buildModelsPanel(models);
        });

        modelSel.addEventListener("change", renderForSelection);

        if (showModelsBtn && modelPanel) {
            showModelsBtn.addEventListener("click", () => {
                modelPanel.style.display = modelPanel.style.display === "block" ? "none" : "block";
            });
        }

        if (closeModelsBtn && modelPanel) {
            closeModelsBtn.addEventListener("click", () => (modelPanel.style.display = "none"));
        }

        clearCartBtn?.addEventListener("click", clearCart);

        hideResults();
        renderCart();
    };

    document.addEventListener("DOMContentLoaded", () => {
        if (document.getElementById("catalogusTable")) initCatalogus();
    });
})();
