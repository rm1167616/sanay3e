const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 

router.get("/craftsman",async(req,res)=>{
    try
    {
        const query = util.promisify(connection.query).bind(connection);
        const craftsmans = await query (" select * from craftsman");
        const numberofcragtsman = craftsmans.length;
        res.status(200).json(numberofcragtsman);
    }
    catch(err)
    {
        res.status(404).json(err)
    }
})

router.get("/customer",async(req,res)=>{
    try
    {
        const query = util.promisify(connection.query).bind(connection);
        const craftsmans = await query (" select * from craftsman");
        const users = await query (" select * from user");
        const numberofcustomers = users.length - craftsmans.length;
        res.status(200).json(numberofcustomers);
    }
    catch(err)
    {
        res.status(404).json(err)
    }
})


router.get("/booking",async(req,res)=>{
    try
    {
        const query = util.promisify(connection.query).bind(connection);
        const booking = await query (" select * from booking");
        const numberofbooking = booking.length;
        res.status(200).json(numberofbooking);
    }
    catch(err)
    {
        res.status(404).json(err)
    }
})




module.exports = router ;
