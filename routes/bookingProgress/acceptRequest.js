const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


router.put("/:id",async(req,res)=>{
    try
    {
        const bookingid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const bookingobj = await query (" select * from booking where id = ? ",bookingid);
        if(bookingobj[0])
        {
        await query ("UPDATE booking SET statues = 2 WHERE id = ?",bookingid);
        res.status(200).json("THE SERVICES ACCEPTED...");
        }
        else
        {
            res.status(404).json("SOME THNG ERROR");

        }

    }
    catch(err)
    {
        res.status(404).json(err)
    }
})




module.exports = router ;