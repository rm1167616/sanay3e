const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


router.get("/", async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const transaction = await query(`SELECT 
        booking.id,
        user.username,
        services.name,
        booking.price,
        schedule.start_time,
        schedule.end_time,
        schedule.date,
        craftsman.cr_name
    FROM 
        booking 
    JOIN  
        user ON booking.userid = user.id
    JOIN 
        services ON booking.servceid = services.id
    JOIN 
        schedule ON booking.id = schedule.bookingid
    JOIN
        craftsman ON booking.craftsmanid = craftsman.userid; 
`);
res.status(200).json(transaction);

    }
    catch (err) {
        res.status(404).json(err)
    }

})



module.exports = router;
