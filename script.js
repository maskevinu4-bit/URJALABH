function calculateROI() {
    // 1. Get user input values
    const area = parseFloat(document.getElementById('area').value);
    const installCost = parseFloat(document.getElementById('cost').value);
    const electricityRate = parseFloat(document.getElementById('rate').value);

    // Check if inputs are valid numbers
    if (isNaN(area) || isNaN(installCost) || isNaN(electricityRate) || area <= 0 || installCost <= 0 || electricityRate <= 0) {
        alert("Please enter valid positive numbers in all fields.");
        return;
    }

    // 2. Assumptions for calculation (based on Indian averages)
    // You can adjust these values for more accuracy
    const solarIrradiance = 5.0; // Average kWh/m²/day in India
    const panelEfficiency = 0.18; // 18% efficiency for a standard panel
    const performanceRatio = 0.75; // Accounts for system losses (dust, heat, wiring)
    const capacityPerSqm = 0.15; // Approx. 1 kW system needs 10 sq.m, so 1 sq.m gives 0.1 kW. We'll use 15% for a safer estimate.

    // 3. Perform the calculations
    const systemCapacityKW = area * capacityPerSqm;
    // Energy Generated (kWh per year) = Capacity * Irradiance * 365 days * Performance Ratio
    const annualGeneration = systemCapacityKW * solarIrradiance * 365 * performanceRatio;
    const annualSavings = annualGeneration * electricityRate;
    const paybackPeriod = installCost / annualSavings;

    // 4. Display the results
    const resultsDiv = document.getElementById('results');
    document.getElementById('annualSavings').innerText = ₹ ${annualSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })};
    document.getElementById('paybackPeriod').innerText = ${paybackPeriod.toFixed(1)} years;
    
    // Make the results visible
    resultsDiv.style.display = 'block';
}
