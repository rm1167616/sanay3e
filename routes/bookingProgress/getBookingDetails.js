const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


router.get("/:id", async (req, res)=>{
    try
    {
        const bookingid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const booking = await query ("select * from booking where id = ?  ",bookingid);
        const statues = booking[0].statues ;
            res.status(200).json(statues);
    }
    catch(err)
    {
        res.status(404).json(err)
    }
})



module.exports = router ;
