const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util");

router.post("/:id", async (req, res) => {
    try {
        const customerid = req.params.id;
        const { craftsmanid, rate } = req.body;
        const query = util.promisify(connection.query).bind(connection);

        // Prepare the object of rating 
        const rating = {
            customerid: customerid,
            craftsmanid: craftsmanid,
            rate: rate
        };
        
        // Insert rating into the rating table
        await query("INSERT INTO rating SET ?", rating);

        // Retrieve all ratings for the craftsman
        const rateobj = await query("SELECT * FROM rating WHERE craftsmanid = ?", craftsmanid);

        // Variable to store the sum of ratings
        let sum = 0;

        // Loop through the array and add each rating to the sum
        for (let i = 0; i < rateobj.length; i++) {
            sum += rateobj[i].rate;
        }

        // Calculate average rating
        const average = sum / rateobj.length;

        // Update the rate in the craftsman table
        await query("UPDATE craftsman SET rate = ? WHERE id = ?", [average, craftsmanid]);

        // Respond with the sum of ratings (for debugging purposes)
        res.status(200).json({ sum: sum, average: average });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
