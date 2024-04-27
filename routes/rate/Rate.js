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
        await query("INSERT INTO rating SET ?", rating);
        // Compute the average rating of craftsman
        const rateobj = await query("SELECT * FROM rating WHERE craftsmanid = ?", craftsmanid);

        // Variable to store the sum
        let sum = 0;
        // Loop through the array and add each rating to the sum
        for (let i = 0; i < rateobj.length; i++) {
            sum += rateobj[i].rate;
        }
        // Calculate average 
        const average = sum / rateobj.length;
        // Insert average in craftsman table 
        await query("UPDATE craftsman SET rate = ? WHERE userid = ?", [average, craftsmanid]);
        
        res.status(200).json({ average: average });
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
})

module.exports = router;
