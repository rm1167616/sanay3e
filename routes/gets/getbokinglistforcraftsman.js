const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


router.get("/:id", async (req, res) => {
    try {
        const craftsmanid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const bookinglist = await query(`
        SELECT 
    user.f_name ,
    user.l_name,
    services.name,
    booking.price,
    scadule.start_time,
    scadule.end_time,
    scadule.date
FROM 
    booking 
JOIN 
    user  ON booking.userid = user.id
JOIN 
    services ON booking.servceid  = services.id
JOIN 
    scadule  ON booking.id = scadule.bookingid
WHERE 
    booking.craftsmanid = ?`,craftsmanid);  
    if(bookinglist[0])
    {
        res.status(200).json(bookinglist);
    }
    else
    {
        res.status(404).json("no booking exist");
    }

    }
    catch (error) {
        res.status(404).json(error);
    }
})


module.exports = router;
