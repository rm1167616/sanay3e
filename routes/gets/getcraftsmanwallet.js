const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 



router.get("/:id",async(req,res)=>{
    try
    {
        const craftsmanid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const craftsman  = await query (" select budget from craftsman where userid  = ?",craftsmanid);
        res.status(404).json(craftsman);
        
    }
    catch(err)
    {
        res.status(404).json(err)
    }
})




module.exports = router ;