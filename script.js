document.addEventListener('DOMContentLoaded', function() {
    // Check if we are on the calculator page
    const calculateButton = document.getElementById('calculate-btn');
    if (calculateButton) {
        
        // --- Logic for auto-filling the electricity rate ---
        const locationDropdown = document.getElementById('location');
        const rateInput = document.getElementById('rate');

        const electricityRates = {
            'maharashtra': 9.50 // Average rate in ₹ per kWh
        };

        locationDropdown.addEventListener('change', function() {
            const selectedLocation = this.value;
            rateInput.value = electricityRates[selectedLocation] || '';
        });

        // --- Attach the calculation to the button click ---
        calculateButton.addEventListener('click', calculateROI);
    }
});

function calculateROI() {
    const area = parseFloat(document.getElementById('area').value);
    const installCost = parseFloat(document.getElementById('cost').value);
    const electricityRate = parseFloat(document.getElementById('rate').value);

    // Validate inputs
    if (isNaN(area) || isNaN(installCost) || isNaN(electricityRate) || area <= 0 || installCost <= 0 || electricityRate <= 0) {
        alert("Please fill in all fields with valid positive numbers.");
        return; // Stop the function
    }

    // Assumptions
    const solarIrradiance = 5.0;
    const capacityPerSqm = 0.15;
    const performanceRatio = 0.75;

    // Calculations
    const systemCapacityKW = area * capacityPerSqm;
    const annualGeneration = systemCapacityKW * solarIrradiance * 365 * performanceRatio;
    const annualSavings = annualGeneration * electricityRate;
    const paybackPeriod = installCost / annualSavings;

    // Display results
    const resultsDiv = document.getElementById('results');
    document.getElementById('annualSavings').innerText = ₹ ${annualSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    document.getElementById('paybackPeriod').innerText = ${paybackPeriod.toFixed(1)} years;
    resultsDiv.style.display = 'block';
}
