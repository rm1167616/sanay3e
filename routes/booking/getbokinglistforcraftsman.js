const router = require("express").Router();
const connection = require("../../db/dbConnection");
const util = require("util"); // helper

router.get("/:id", async (req, res) => {
    try
    {

    const query = util.promisify(connection.query).bind(connection);

    const bookinglist = await query(`
        SELECT 
            booking.id,
            user.f_name,
            user.l_name,
            services.name,
            scadule.start_time,
            scadule.end_time,
            scadule.date,
            booking.price
        FROM 
            booking
        JOIN 
            user ON booking.userid = user.id
        JOIN 
            services ON booking.servceid = services.id
        JOIN 
            scadule ON booking.scaduleid = scadule.id
        WHERE 
            booking.craftsmanid = ? AND booking.statues = '1'
    `, [req.params.id]);
    

    res.status(200).json(bookinglist);
}
catch(err)
{
    res.status(404).json(err)
}

});


router.get("/accepted/:id", async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const bookinglist = await query(`
            SELECT 
                booking.id,
                user.f_name,
                user.l_name,
                services.name,
                scadule.start_time,
                scadule.end_time,
                scadule.date,
                booking.price
            FROM 
                booking
            JOIN 
                user ON booking.userid = user.id
            JOIN 
                services ON booking.servceid = services.id
            JOIN 
                scadule ON booking.scaduleid = scadule.id
            WHERE 
                booking.craftsmanid = ? AND booking.statues != '1'
        `, [req.params.id]);
        
 
    res.status(200).json(bookinglist);

    }
    catch (error) {
        res.status(404).json(error);
    }
})


module.exports = router;
