const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 



// api put first name / last name / birthday 
router.put("/prof1/:id",async(req,res)=>{
    const { f_name , l_name , birthday}  = req.body;
    try
    {
        // validation of id of email exist 
        const emailid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const user = await query ("select * from user where id = ?",emailid);
        if(user[0])
        {
            // create object for user 
            const userobj = {
                f_name:f_name,
                l_name:l_name,
                birthday:birthday,
            }
            // update the record of id in data base..
            await query ("update user set ? where id = ?",[userobj,emailid]);;
            res.status(200).json("the profile updated...");

        }
        else
        {
            res.status(404).json("SOMETHING WRONG THE USER NOT FOUND......");
        }



    }
    catch(err)
    {
        res.status(404).json(err);
    }
})


// api select gender
router.put("/gender/:id",body("gender"),async(req,res)=>{
    try
    {
        // validation of id of email exist 
        const emailid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const user = await query ("select * from user where id = ?",emailid);
        if(user[0])
        {
            // create object for user 
            const userobj = {
                gender : req.body.gender,
            }
            // update the record of id in data base..
            await query ("update user set ? where id = ?",[userobj,emailid]);;
            res.status(200).json("the profile updated...");

        }
        else
        {
            res.status(404).json("SOMETHING WRONG THE USER NOT FOUND......");
        }



    }
    catch(err)
    {
        res.status(404).json(err);
    }
})

module.exports=router;