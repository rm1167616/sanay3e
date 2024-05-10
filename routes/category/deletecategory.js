const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const fs = require("fs");



router.delete("/:id",async(req,res)=>{
    try
    {
        const query = util.promisify(connection.query).bind(connection);
        const categoryid = req.params.id;
        const cate = await query("SELECT * FROM category WHERE id = ?", categoryid);
        // check if categry exist or not
        if(cate[0])
        {
            fs.unlinkSync(`uploads/${cate[0].img}`);
            fs.unlinkSync(`uploads/${cate[0].coverImg}`);
            await query (" delete from category where id = ?",categoryid);
            res.status(200).json(" THE CATEGORY DELETED.....") ;
        }
        else
        {
            res.status(404).json("sorry the category not exist...");
        }

    }
    catch(err)
    {
        res.status(404).json(err)
    }
})


module.exports = router ;