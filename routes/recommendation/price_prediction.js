const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
    try {
        // Extract latitude, longitude, and addMaterial from the request body
        const { latitude, longitude, addMaterial } = req.body;

        console.log('Input Latitude:', latitude);
        console.log('Input Longitude:', longitude);

        // Call your Python-based prediction API
        const pythonApiUrl = 'https://bac8ee73-b403-4648-b577-4391dad4d2fd-00-6xpceuwiiadd.worf.replit.dev:4200/predict'; // Adjust the URL
        const response = await axios.post(pythonApiUrl, {
            latitude,
            longitude,
        });

        let predictedCharge = response.data.predicted_charge_amount;
        // Predicted charge before tax and material cost
        const predictedChargeBefore = predictedCharge;
        // Apply taxes (35% including 20% tax)
        const taxAmount = predictedCharge * 0.35;
        predictedCharge += taxAmount;

        // Material cost addition
        let materialCost = 0;
        if (addMaterial === true) {
            materialCost = predictedCharge * 0.5;
            predictedCharge += materialCost;
        }

        

        

        // Admin fees (25% of predicted charge after taxes and material costs)
        const adminFees = predictedCharge * 0.25;
        const predictedChargeAfterAdminFees = predictedCharge - (adminFees+taxAmount);

        // Round the values to the nearest integer
        const roundedPredictedChargeBefore = Math.round(predictedChargeBefore);
        const roundedPredictedCharge = Math.round(predictedCharge);
        const roundedMaterialCost = Math.round(materialCost);
        const roundedTaxAmount = Math.round(taxAmount);
        const roundedAdminFees = Math.round(adminFees);
        const roundedPredictedChargeAfterAdminFees = Math.round(predictedChargeAfterAdminFees);

        console.log('Python API Response:', response.data);
        res.json({
            predicted_charge_amount_before: roundedPredictedChargeBefore,
            predicted_charge_amount_after: roundedPredictedCharge,
            material_cost: roundedMaterialCost,
            tax_amount: roundedTaxAmount,
            admin_fees: roundedAdminFees,
            craftsman_predicted_price: roundedPredictedChargeAfterAdminFees
        });
    } catch (error) {
        console.error('Error predicting charge amount:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;