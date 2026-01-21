function euro(n) {
    return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);
}

function calcPrice(base, multiplier = 1) {
    return Math.round(base * multiplier);
}

function makeRow(device, service, price) {
    const tr = document.createElement("tr");
    tr.dataset.type = device.type;
    tr.dataset.brand = device.brand;
    tr.dataset.model = device.model.toLowerCase();
    tr.dataset.service = service.name.toLowerCase();

    tr.innerHTML = `
    <td>${device.type}</td>
    <td>${device.brand}</td>
    <td>${device.model}</td>
    <td>${service.name}</td>
    <td><strong>${euro(price)}</strong></td>
    <td class="muted small">Richtprijs</td>
  `;
    return tr;
}

function fillSelect(select, items, allLabel) {
    select.innerHTML = "";

    const optAll = document.createElement("option");
    optAll.value = "all";
    optAll.textContent = allLabel;
    select.appendChild(optAll);

    items.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.textContent = item;
        select.appendChild(opt);
    });
}

function applyFilters() {
    const q = (document.getElementById("q")?.value || "").toLowerCase().trim();
    const type = document.getElementById("typeFilter")?.value || "all";
    const brand = document.getElementById("brandFilter")?.value || "all";

    const rows = document.querySelectorAll("#catalogusTable tbody tr");
    rows.forEach((row) => {
        const matchesQ =
            !q ||
            row.dataset.model.includes(q) ||
            row.dataset.brand.toLowerCase().includes(q) ||
            row.dataset.service.includes(q);

        const matchesType = type === "all" || row.dataset.type === type;
        const matchesBrand = brand === "all" || row.dataset.brand === brand;

        row.style.display = matchesQ && matchesType && matchesBrand ? "" : "none";
    });
}

function initCatalogus() {
    const data = window.CELLCITY_CATALOGUS;
    if (!data) {
        console.error("CELLCITY_CATALOGUS ontbreekt. Laad prijzen-data.js vóór catalogus.js.");
        return;
    }

    const typeFilter = document.getElementById("typeFilter");
    const brandFilter = document.getElementById("brandFilter");
    const tbody = document.querySelector("#catalogusTable tbody");

    if (!typeFilter || !brandFilter || !tbody) {
        console.error("Kan filters/tabel niet vinden. Check ids: typeFilter, brandFilter, catalogusTable.");
        return;
    }

    fillSelect(typeFilter, data.categories, "Alles");
    fillSelect(brandFilter, data.brands, "Alle merken");

    tbody.innerHTML = "";

    data.devices.forEach((device) => {
        data.services.forEach((service) => {
            const multiplier = device.multipliers?.[service.id] ?? 1;
            const price = calcPrice(service.basePrice, multiplier);
            tbody.appendChild(makeRow(device, service, price));
        });
    });

    document.getElementById("q")?.addEventListener("input", applyFilters);
    typeFilter.addEventListener("change", applyFilters);
    brandFilter.addEventListener("change", applyFilters);

    applyFilters();
}

document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("catalogusTable");
    if (table) initCatalogus();
});
