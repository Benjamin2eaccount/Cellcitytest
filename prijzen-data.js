// javascript/prijzen-data.js
// Deze data wordt direct ingeladen (geen fetch nodig)

window.CELLCITY_CATALOGUS = {
    categories: ["Telefoons", "iPads & Tablets", "Laptops", "Smartwatches", "Accessoires"],
    brands: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Oppo", "Huawei", "Nokia", "Motorola", "Sony"],
    services: [
        { id: "screen", name: "Scherm vervangen", basePrice: 79 },
        { id: "battery", name: "Batterij vervangen", basePrice: 49 },
        { id: "chargeport", name: "Laadpoort reparatie", basePrice: 59 },
        { id: "camera", name: "Camera reparatie", basePrice: 55 },
        { id: "speaker", name: "Speaker / microfoon", basePrice: 45 },
        { id: "diagnose", name: "Diagnose / check", basePrice: 0 },
        { id: "data", name: "Data overzetten", basePrice: 25 }
    ],
    devices: [
        { type: "Telefoons", brand: "Apple", model: "iPhone 11", multipliers: { screen: 1.2, battery: 1.1, chargeport: 1.1, camera: 1.2, speaker: 1.1 } },
        { type: "Telefoons", brand: "Apple", model: "iPhone 12", multipliers: { screen: 1.35, battery: 1.15, chargeport: 1.15, camera: 1.25, speaker: 1.15 } },
        { type: "Telefoons", brand: "Apple", model: "iPhone 13", multipliers: { screen: 1.45, battery: 1.2, chargeport: 1.15, camera: 1.3, speaker: 1.15 } },

        { type: "Telefoons", brand: "Samsung", model: "Galaxy A52", multipliers: { screen: 1.25, battery: 1.1, chargeport: 1.05, camera: 1.15, speaker: 1.05 } },
        { type: "Telefoons", brand: "Samsung", model: "Galaxy S21", multipliers: { screen: 1.55, battery: 1.2, chargeport: 1.1, camera: 1.35, speaker: 1.1 } },

        { type: "iPads & Tablets", brand: "Apple", model: "iPad (9th gen)", multipliers: { screen: 1.6, battery: 1.3, chargeport: 1.2, camera: 1.2, speaker: 1.1 } },

        { type: "Smartwatches", brand: "Apple", model: "Apple Watch Series 6", multipliers: { screen: 1.5, battery: 1.2, chargeport: 1.0, camera: 1.0, speaker: 1.1 } },

        { type: "Laptops", brand: "Apple", model: "MacBook Air (M1)", multipliers: { screen: 2.2, battery: 1.8, chargeport: 1.3, camera: 1.0, speaker: 1.2 } }
    ]
};
