const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


router.get("/:id", async (req, res) => {
    try {


        // calculate current date 
        const now = new Date();

        // Get the components of the date
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(now.getDate()).padStart(2, '0');

        // Format the date as YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;




        const craftsmanid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const chartsobj = await query(`SELECT DATE_FORMAT(scadule.date, '%Y-%m-%e') AS formatted_date, booking.price
FROM scadule
JOIN booking ON booking.scaduleid = scadule.id
WHERE scadule.craftsmanid = ?
`, [craftsmanid, formattedDate]);
        res.status(200).json(chartsobj);

    }
    catch (err) {
        res.status(404).json(err)
    }
})



module.exports = router;