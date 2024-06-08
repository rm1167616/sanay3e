const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 



router.get("/:id",async(req,res)=>{
    try
    {
        const craftsmanid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const craftsman  = await query (" select * from craftsman where userid  = ?",craftsmanid);
        const budget = craftsman[0].budget
        res.status(200).json(budget);
        
    }
    catch(err)
    {
        res.status(404).json(err)
    }
})




module.exports = router ;