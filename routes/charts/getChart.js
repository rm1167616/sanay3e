const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


router.get("/:id", async (req, res) => {
    try {
        const craftsmanid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const chartsobj = await query(`
            SELECT scadule.date, booking.price
            FROM scadule
            JOIN booking ON booking.scaduleid = scadule.id
            WHERE scadule.craftsmanid = ?
              AND DATE(scadule.date) BETWEEN DATE(DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) DAY)) AND DATE(DATE_SUB(NOW(), INTERVAL WEEKDAY(NOW()) - 6 DAY))
        `, [craftsmanid]);

        let sum = 0 ;
        for( let i=0 ; i<chartsobj.length ; i++)
            {
                sum += chartsobj[i].price
            }
        
        res.status(200).json(sum);

    }
    catch (err) {
        res.status(404).json(err)
    }
})



module.exports = router;