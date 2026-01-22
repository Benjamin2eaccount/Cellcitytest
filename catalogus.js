function euro(n) {
    return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);
}
function calcPrice(base, multiplier = 1) {
    return Math.round(base * multiplier);
}

const CART = [];

function addToCart(item){
    CART.push(item);
    renderCart();
}
function removeFromCart(idx){
    CART.splice(idx, 1);
    renderCart();
}
function clearCart(){
    CART.length = 0;
    renderCart();
}

function buildMailto(){
    const to = "info@cellcityrosmalen.nl";
    const subject = "Reparatie aanvraag (CellCity Rosmalen)";
    const lines = [];

    lines.push("Hallo CellCity,");
    lines.push("");
    lines.push("Ik wil graag een reparatie aanvragen:");
    lines.push("");

    CART.forEach((it, i) => {
        lines.push(`${i+1}. ${it.brand} ${it.model} — ${it.service} (richtprijs ${euro(it.price)})`);
    });

    lines.push("");
    lines.push("Mijn contactgegevens:");
    lines.push("- Naam: ");
    lines.push("- Telefoon: ");
    lines.push("- Eventuele opmerkingen: ");
    lines.push("");
    lines.push("Alvast bedankt!");

    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function renderCart(){
    const wrap = document.getElementById("cartItems");
    const countEl = document.getElementById("cartCount");
    const emailBtn = document.getElementById("emailCartBtn");
    const emptyEl = document.getElementById("cartEmpty");

    if(!wrap || !countEl || !emailBtn || !emptyEl) return;

    countEl.textContent = String(CART.length);
    wrap.innerHTML = "";

    if(CART.length === 0){
        emptyEl.style.display = "block";
        emailBtn.href = "#";
        return;
    }

    emptyEl.style.display = "none";
    emailBtn.href = buildMailto();

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
        div.querySelector("button").addEventListener("click", () => removeFromCart(idx));
        wrap.appendChild(div);
    });
}

function makeRow(device, service, price) {
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
        addToCart({
            type: device.type,
            brand: device.brand,
            model: device.model,
            service: service.name,
            price
        });
    });

    tr.lastElementChild.appendChild(addBtn);
    return tr;
}

function setSelectOptions(select, options, placeholder){
    select.innerHTML = "";
    const p = document.createElement("option");
    p.value = "";
    p.textContent = placeholder;
    select.appendChild(p);

    options.forEach(v => {
        const o = document.createElement("option");
        o.value = v;
        o.textContent = v;
        select.appendChild(o);
    });
}

function uniq(arr){ return [...new Set(arr)].sort((a,b)=>a.localeCompare(b)); }

function initCatalogus() {
    const data = window.CELLCITY_CATALOGUS;
    if (!data) return;

    const typeSel = document.getElementById("typeFilter");
    const brandSel = document.getElementById("brandFilter");
    const modelSel = document.getElementById("modelFilter");
    const tbody = document.querySelector("#catalogusTable tbody");

    const pickHint = document.getElementById("pickHint");
    const resultWrap = document.getElementById("resultWrap");

    const showModelsBtn = document.getElementById("showModelsBtn");
    const modelPanel = document.getElementById("modelPanel");
    const modelGrid = document.getElementById("modelGrid");
    const closeModelsBtn = document.getElementById("closeModelsBtn");

    if(!typeSel || !brandSel || !modelSel || !tbody) return;

    // Type opties
    setSelectOptions(typeSel, uniq(data.devices.map(d=>d.type)), "Kies type…");

    function resetBrand(){
        brandSel.disabled = true;
        setSelectOptions(brandSel, [], "Kies eerst type…");
    }
    function resetModel(){
        modelSel.disabled = true;
        setSelectOptions(modelSel, [], "Kies eerst type + merk…");
        showModelsBtn.disabled = true;
        if(modelPanel) modelPanel.style.display = "none";
    }
    function hideResults(){
        if(pickHint) pickHint.classList.remove("hidden");
        if(resultWrap) resultWrap.classList.add("hidden");
        tbody.innerHTML = "";
    }

    function buildModelsPanel(models){
        if(!modelGrid) return;
        modelGrid.innerHTML = "";
        models.forEach(m=>{
            const chip = document.createElement("div");
            chip.className = "model-chip";
            chip.textContent = m;
            chip.addEventListener("click", ()=>{
                modelSel.value = m;
                modelPanel.style.display = "none";
                renderForSelection();
            });
            modelGrid.appendChild(chip);
        });
    }

    function renderForSelection(){
        const type = typeSel.value;
        const brand = brandSel.value;
        const model = modelSel.value;

        if(!type || !brand || !model){
            hideResults();
            return;
        }

        const device = data.devices.find(d => d.type===type && d.brand===brand && d.model===model);
        if(!device){
            hideResults();
            return;
        }

        tbody.innerHTML = "";
        data.services.forEach(service=>{
            const mult = device.multipliers?.[service.id] ?? 1;
            const price = calcPrice(service.basePrice, mult);
            tbody.appendChild(makeRow(device, service, price));
        });

        if(pickHint) pickHint.classList.add("hidden");
        if(resultWrap) resultWrap.classList.remove("hidden");
    }

    // Events
    typeSel.addEventListener("change", ()=>{
        const type = typeSel.value;
        resetBrand();
        resetModel();
        hideResults();

        if(!type) return;

        const brands = uniq(data.devices.filter(d=>d.type===type).map(d=>d.brand));
        brandSel.disabled = false;
        setSelectOptions(brandSel, brands, "Kies merk…");
    });

    brandSel.addEventListener("change", ()=>{
        const type = typeSel.value;
        const brand = brandSel.value;
        resetModel();
        hideResults();

        if(!type || !brand) return;

        const models = uniq(data.devices.filter(d=>d.type===type && d.brand===brand).map(d=>d.model));
        modelSel.disabled = false;
        setSelectOptions(modelSel, models, "Kies model…");

        showModelsBtn.disabled = false;
        buildModelsPanel(models);
    });

    modelSel.addEventListener("change", renderForSelection);

    // Model panel toggle
    if(showModelsBtn && modelPanel){
        showModelsBtn.addEventListener("click", ()=>{
            modelPanel.style.display = (modelPanel.style.display === "block") ? "none" : "block";
        });
    }
    if(closeModelsBtn && modelPanel){
        closeModelsBtn.addEventListener("click", ()=> modelPanel.style.display = "none");
    }

    document.getElementById("clearCartBtn")?.addEventListener("click", clearCart);

    hideResults();
    renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("catalogusTable")) initCatalogus();
});
