const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 

router.get("/",async(req,res)=>{
    try
    {
        const query = util.promisify(connection.query).bind(connection);
        const supportlist = await query("SELECT support.id , user.username, user.email, user.phone, support.description FROM user JOIN support ON user.id = support.user_id; ");
        if(supportlist[0])
        {
            res.status(200).json(supportlist)
        }
        else
        {
            res.status(404).json("THE SUPPORT LIST EMPTY....");
        }

    }
    catch(err)
    {
        res.status(404).json(err)
    }
})



module.exports = router;