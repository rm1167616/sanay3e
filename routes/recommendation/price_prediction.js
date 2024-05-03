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

        // If addMaterial flag is true, add 50% to the predicted charge
        if (addMaterial === true) {
            predictedCharge *= 1.5;
        }

        // Apply taxes (35% including 20% tax)
        predictedCharge *= 1.35;

        // Round the predicted charge amount to the nearest integer
        predictedCharge = Math.round(predictedCharge);

        console.log('Python API Response:', response.data);
        res.json({ predicted_charge_amount: predictedCharge });
    } catch (error) {
        console.error('Error predicting charge amount:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
