const router = require("express").Router();
const connection = require("../../db/dbConnection");
const { body , validationResult } = require('express-validator');
const util = require("util"); // helper 
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// ========= LOGIN ==============//

router.post("/",body("email").isEmail().withMessage("enter valid email"),
                     body("password"),async (req,res)=>{
    try
    {
       //=== validation of request 
     const errors = validationResult(req);
     if(!errors.isEmpty())
     {
        return res.status(400).json({errors:errors.array()})
     }
     //==== check the email is exist or not ====//
     const query = util.promisify(connection.query).bind(connection) // transform query to promise to can use await/ async
     const user = await query ("select * from user where email = ? ",[req.body.email])
     if(user.length == 0)
     {
        res.status(404).json({msg:"the email or password not found....."})
     }
      // === compare hashed password ===// 
      const checkpassword = await bcrypt.compare(
         req.body.password,
         user[0].password
      );
      if(checkpassword)
      {
         res.status(200).json(user);
      }
      else
      {
         res.status(404).json({
            msg:"the password or email not correct"
         })
      }
     }
    catch(err)
    {
        res.send(err)
    }
})

module.exports = router
