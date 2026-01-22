(() => {
    const services = [
        { id: "screen",     name: "Scherm vervangen",     basePrice: 79 },
        { id: "battery",    name: "Batterij vervangen",   basePrice: 49 },
        { id: "chargeport", name: "Laadpoort reparatie",  basePrice: 59 },
        { id: "camera",     name: "Camera reparatie",     basePrice: 55 },
        { id: "speaker",    name: "Speaker / microfoon",  basePrice: 45 },
        { id: "diagnose",   name: "Diagnose / check",     basePrice: 0  },
        { id: "data",       name: "Data overzetten",      basePrice: 25 }
    ];

    const devices = [];
    const add = (type, brand, model) => devices.push({ type, brand, model, multipliers: {} });

    // ===== Apple iPhone =====
    [
        "iPhone 17 Pro Max","iPhone 17 Pro","iPhone 17","iPhone 17 Air","iPhone 16e",
        "iPhone 16 Pro Max","iPhone 16 Plus","iPhone 16 Pro","iPhone 16",
        "iPhone 15 Pro Max","iPhone 15 Plus","iPhone 15 Pro","iPhone 15",
        "iPhone 14 Pro Max","iPhone 14 Plus","iPhone 14 Pro","iPhone 14",
        "iPhone 13 Pro Max","iPhone 13 Pro","iPhone 13","iPhone 13 Mini",
        "iPhone 12 Pro Max","iPhone 12 Pro","iPhone 12","iPhone 12 Mini",
        "iPhone SE 2022","iPhone SE 2020",
        "iPhone 11 Pro Max","iPhone 11 Pro","iPhone 11",
        "iPhone XS Max","iPhone XR","iPhone XS","iPhone X",
        "iPhone 8 Plus","iPhone 8","iPhone 7","iPhone 6S","iPhone 6","iPhone SE"
    ].forEach(m => add("Telefoons","Apple",m));

    // ===== Apple iPad =====
    [
        "iPad A16 11″","iPad 2022 10.9 (10e Gen)","iPad 2021 10.2 (9e Gen)","iPad 2020 10.2 (8e Gen)",
        "iPad 2019 10.2 (7e Gen)","iPad 2018 9.7 (6e Gen)","iPad 4",
        "iPad Air 13″ 2025","iPad Air 11″ 2025","iPad Air 13″ 2024","iPad Air 6 2024",
        "iPad Air 5 (5e Gen)","iPad Air 4","iPad Air 3 2019","iPad Air 2",
        "iPad Pro 13″ 2024","iPad Pro 12.9″ 2022","iPad Pro 11″ 2022",
        "iPad Pro 12.9″ 2021","iPad Pro 11″ 2021",
        "iPad Pro 12.9″ 2020","iPad Pro 11″ 2020",
        "iPad Pro 12.9 2018","iPad Pro 11″ 2018",
        "iPad Mini 7 2024","iPad Mini 6 2021","iPad Mini 5","iPad Mini 4","iPad Mini 3","iPad Mini 2"
    ].forEach(m => add("iPads & Tablets","Apple",m));

    // iPod
    ["iPod Touch 5","iPod Touch 4"].forEach(m => add("iPads & Tablets","Apple",m));

    // ===== Samsung S =====
    [
        "Samsung S25 FE","Samsung S25 Edge","Samsung S25 Ultra","Samsung S25 Plus","Samsung S25",
        "Samsung S24 Ultra","Samsung S24 FE","Samsung S24 Plus","Samsung S24",
        "Samsung S23 Ultra","Samsung S23 FE","Samsung S23 Plus","Samsung S23",
        "Samsung S22 Ultra","Samsung S22 Plus","Samsung S22",
        "Samsung S21 Ultra","Samsung S21 Plus","Samsung S21 FE","Samsung S21",
        "Samsung S20 Ultra","Samsung S20 Plus","Samsung S20 FE","Samsung S20",
        "Samsung S10 Plus","Samsung S10e","Samsung S10",
        "Samsung S9 Plus","Samsung S9",
        "Samsung S8 Plus","Samsung S8"
    ].forEach(m => add("Telefoons","Samsung",m));

    // ===== Samsung A =====
    [
        "Samsung A17","Samsung A56","Samsung A36","Samsung A26","Samsung A16",
        "Samsung A55","Samsung A35","Samsung A25","Samsung A15",
        "Samsung A54","Samsung A34","Samsung A14",
        "Samsung A53","Samsung A33","Samsung A23","Samsung A13",
        "Samsung A52","Samsung A42","Samsung A32","Samsung A22","Samsung A12",
        "Samsung A71","Samsung A51","Samsung A41","Samsung A21s",
        "Samsung A70","Samsung A50","Samsung A40","Samsung A30s","Samsung A20e","Samsung A10"
    ].forEach(m => add("Telefoons","Samsung",m));

    // Samsung J
    ["Samsung Galaxy J3 2016 / 2017","Samsung Galaxy J5 2016 / 2017"].forEach(m => add("Telefoons","Samsung",m));

    // Samsung Note
    [
        "Samsung Galaxy Note 20","Samsung Galaxy Note 20 Ultra","Samsung Galaxy Note 20 Plus",
        "Samsung Galaxy Note 10","Samsung Galaxy Note 10 Plus","Samsung Galaxy Note 9","Samsung Galaxy Note 8"
    ].forEach(m => add("Telefoons","Samsung",m));

    // Samsung Tab S
    [
        "Samsung Tab S10 Ultra – X920","Samsung Tab S10 Plus – X820",
        "Samsung Tab S9 Ultra – X910","Samsung Tab S9 FE Plus – X610","Samsung Tab S9 Plus – X810",
        "Samsung Tab S9 FE – X510","Samsung Tab S9 – X710",
        "Samsung Tab S8 Ultra – X900","Samsung Tab S8 Plus – X800","Samsung Tab S8 – X700",
        "Samsung Tab S7 FE – T730","Samsung Tab S7 – T870",
        "Samsung Tab S6 Lite – P610N","Samsung Tab S6 – T860","Samsung Tab S5e – T725",
        "Samsung Tab S4 – T830","Samsung Tab S3 – T820","Samsung Tab S2 – T815"
    ].forEach(m => add("iPads & Tablets","Samsung",m));

    // Samsung Tab A
    [
        "Samsung Tab A9+ – X210","Samsung Tab A9 – X110","Samsung Tab A8 – X200",
        "Samsung Tab A7 Lite – T220","Samsung Tab A7 – T500",
        "Samsung Tab A 10.1 – T580","Samsung Tab A – T550","Samsung Tab A 10.1 – T510"
    ].forEach(m => add("iPads & Tablets","Samsung",m));

    // Sony
    [
        "Sony Xperia XZ","Sony Xperia 1","Sony Xperia 10","Sony Xperia XZ2",
        "Sony Xperia XZ2 Compact","Sony Xperia XZ3","Sony Xperia XZ1","Sony Xperia X"
    ].forEach(m => add("Telefoons","Sony",m));

    // Huawei
    [
        "Huawei Ascend P40 Lite","Huawei Ascend P40","Huawei Ascend P40 Pro",
        "Huawei Ascend P30","Huawei Ascend P30 Lite","Huawei Ascend P30 Pro",
        "Huawei Ascend P20","Huawei Ascend P20 Lite","Huawei Ascend P20 Pro",
        "Huawei Nova","Huawei Mate 20","Huawei Mate 20 Lite","Huawei Mate 20 Pro",
        "Huawei Mate 10 Lite","Huawei P Smart 2019","Huawei P Smart","Huawei Honor 20"
    ].forEach(m => add("Telefoons","Huawei",m));

    // LG
    ["LG G8 Thinq","LG G7","LG G6","LG G2"].forEach(m => add("Telefoons","LG",m));

    // OnePlus
    ["OnePlus 7","OnePlus 7 Pro","OnePlus 7T","OnePlus 7T Pro","OnePlus 6","OnePlus 5T","OnePlus 5","OnePlus X","OnePlus 3T"]
        .forEach(m => add("Telefoons","OnePlus",m));

    // ===== multipliers (uit je JSON) =====
    const multiplierOverrides = [
        { type:"Telefoons", brand:"Apple", model:"iPhone 11", multipliers:{ screen:1.2, battery:1.1, chargeport:1.1, camera:1.2, speaker:1.1 } },
        { type:"Telefoons", brand:"Apple", model:"iPhone 12", multipliers:{ screen:1.35, battery:1.15, chargeport:1.15, camera:1.25, speaker:1.15 } },
        { type:"Telefoons", brand:"Apple", model:"iPhone 13", multipliers:{ screen:1.45, battery:1.2, chargeport:1.15, camera:1.3, speaker:1.15 } },

        { type:"Telefoons", brand:"Samsung", model:"Galaxy A52", multipliers:{ screen:1.25, battery:1.1, chargeport:1.05, camera:1.15, speaker:1.05 } },
        { type:"Telefoons", brand:"Samsung", model:"Galaxy S21", multipliers:{ screen:1.55, battery:1.2, chargeport:1.1, camera:1.35, speaker:1.1 } },

        { type:"iPads & Tablets", brand:"Apple", model:"iPad (9th gen)", multipliers:{ screen:1.6, battery:1.3, chargeport:1.2, camera:1.2, speaker:1.1 } },
        { type:"iPads & Tablets", brand:"Samsung", model:"Galaxy Tab S7", multipliers:{ screen:1.75, battery:1.35, chargeport:1.2, camera:1.2, speaker:1.15 } },

        { type:"Smartwatches", brand:"Apple", model:"Apple Watch Series 6", multipliers:{ screen:1.5, battery:1.2, chargeport:1.0, camera:1.0, speaker:1.1 } },
        { type:"Laptops", brand:"Apple", model:"MacBook Air (M1)", multipliers:{ screen:2.2, battery:1.8, chargeport:1.3, camera:1.0, speaker:1.2 } }
    ];

    const key = (d) => `${d.type}__${d.brand}__${d.model}`.toLowerCase();
    const map = new Map(multiplierOverrides.map(x => [key(x), x.multipliers]));

    devices.forEach(d => {
        const m = map.get(key(d));
        if (m) d.multipliers = { ...d.multipliers, ...m };
    });

    // categories/brands auto (no mismatch)
    const categories = [...new Set(devices.map(d => d.type))].sort((a,b)=>a.localeCompare(b));
    const brands = [...new Set(devices.map(d => d.brand))].sort((a,b)=>a.localeCompare(b));

    window.CELLCITY_CATALOGUS = { categories, brands, services, devices };
})();
