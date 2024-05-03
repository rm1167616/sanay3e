const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
    try {
        const category = req.body.category; // Assuming category is sent in the request body
        const number_craftsmen = req.body.number_craftsmen;

        console.log('Input Category:', category);
        console.log('Input Number of Craftsmen:', number_craftsmen);

        // Call your Python-based recommendation API
        const pythonApiUrl = 'https://bac8ee73-b403-4648-b577-4391dad4d2fd-00-6xpceuwiiadd.worf.replit.dev:4200/recommendations'; // Adjust the URL
        const response = await axios.post(pythonApiUrl, {
            category,
            number_craftsmen,
        });

        console.log('Python API Response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
