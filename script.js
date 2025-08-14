document.addEventListener('DOMContentLoaded', function() {
    // --- Logic for the calculator page ---
    const roiForm = document.getElementById('roi-form');
    if (roiForm) {
        const locationDropdown = document.getElementById('location');
        const rateInput = document.getElementById('rate');

        // Define electricity rates for different locations
        const electricityRates = {
            'maharashtra': 9.00 // Average rate in ₹ per kWh
        };

        // Auto-fill rate based on location
        locationDropdown.addEventListener('change', function() {
            const selectedLocation = this.value;
            rateInput.value = electricityRates[selectedLocation] || '';
        });

        // Handle the form submission
        roiForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the form from submitting the traditional way

            // 1. Run the ROI calculation and display results
            const calculationSuccessful = calculateROI();

            // 2. If calculation is successful, submit data to Formspree
            if (calculationSuccessful) {
                const formData = new FormData(roiForm);
                const formStatus = document.getElementById('form-status');
                formStatus.textContent = 'Submitting...';

                fetch(roiForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        formStatus.textContent = 'Thank you! Your details have been sent.';
                        roiForm.reset(); // Optional: clear the form
                    } else {
                        formStatus.textContent = 'Oops! There was a problem submitting your form.';
                    }
                }).catch(error => {
                    formStatus.textContent = 'Oops! There was a network problem.';
                });
            }
        });
    }
});

function calculateROI() {
    const area = parseFloat(document.getElementById('area').value);
    const installCost = parseFloat(document.getElementById('cost').value);
    const electricityRate = parseFloat(document.getElementById('rate').value);

    if (isNaN(area) || isNaN(installCost) || isNaN(electricityRate) || area <= 0 || installCost <= 0 || electricityRate <= 0) {
        alert("Please fill in all fields with valid positive numbers.");
        return false; // Indicate failure
    }

    const solarIrradiance = 5.0;
    const capacityPerSqm = 0.15;
    const performanceRatio = 0.75;

    const systemCapacityKW = area * capacityPerSqm;
    const annualGeneration = systemCapacityKW * solarIrradiance * 365 * performanceRatio;
    const annualSavings = annualGeneration * electricityRate;
    const paybackPeriod = installCost / annualSavings;

    const resultsDiv = document.getElementById('results');
    document.getElementById('annualSavings').innerText = ₹ ${annualSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })};
    document.getElementById('paybackPeriod').innerText = ${paybackPeriod.toFixed(1)} years;
    resultsDiv.style.display = 'block';

    return true; // Indicate success
}
