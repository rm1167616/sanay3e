const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const { json } = require("express");


router.post("/",async(req,res)=>{
    try
    {
        const { categoryname } = req.body;
        const query = util.promisify(connection.query).bind(connection) ;
        const category = await query("SELECT * FROM category WHERE name = ?", [categoryname]);

        if(category[0])
        {
            res.status(500).json(category);
        }
        else
        {
            res.status(404).json("SORRY THE NAME OF CATEGORY NOT EXIST....");
        }

    }
    catch(err)
    {
        res.status(404).json(err);
    }
})



module.exports = router ;