const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


// api make customer send services 
router.get("/:id",async(req,res)=>{
    try
    {
        const userid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const user = await query ("select * from craftsman where userid = ?",userid);
        if(user[0])
        {
            res.status(200).json(user);
        }
        else
        {
            res.status(404).json("sorry the craftsman not exist")
        }

    }
    catch(err)
    {
        res.status(404).json(err);
    }
})

module.exports = router ;