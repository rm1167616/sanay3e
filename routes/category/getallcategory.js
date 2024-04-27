const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


router.get("/",async(req,res)=>{
    try
    {
        const query = util.promisify(connection.query).bind(connection);
        const category = await query ("select * from category");
        if(category[0])
        {
            res.status(200).json(category);
        }
        else
        {
            res.status(400).json("NO CATEGORY EXIST ......");
        }

    }
    catch(err)
    {
        res.status(404).json(err);
    }
})

module.exports = router;