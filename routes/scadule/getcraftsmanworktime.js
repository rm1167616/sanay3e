const router = require("express").Router();
const connection = require("../../db/dbConnection");
const util = require("util"); // helper


router.get("/:id",async(req,res)=>{
    try
    {
        const query = util.promisify(connection.query).bind(connection);
        const id = req.params.id;
        const craftsmanobj = await query (" select start_time , end_time , date from scadule where craftsmanid = ?",id);
     
                res.status(200).json(craftsmanobj);



    }
    catch(err)
    {
        res.status(404).json(err)
    }
})


module.exports= router;