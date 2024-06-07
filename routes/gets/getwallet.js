const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const upload = require("../../middleware/uploadimage");



router.get("/:id",async(req,res)=>{
    try
    {
        const userid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const user = await  query (" select * from user where id = ?",userid);
        if(user[0])
            {
                const wallet = user[0].wallet
                res.status(200).json(wallet);
            }
        else
        {
            res.status(200).json("the subject not found...");
        }

    }
    catch(err)
    {
        res.status(404).json(err)
    }
})


module.exports = router;