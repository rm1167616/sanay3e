const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util");

router.put('/:id', async(req, res) => {
   try 
   {
     const { f_name ,  l_name , username , email , phone , photo} = req.body ;
     const userid = req.params.id;
     const query = util.promisify(connection.query).bind(connection); 
     const user = await query (" select * from user where id = ?",userid);
     if(user[0])
     {
         // PREPARE THE OBJECT 
         const userobj = {
            f_name: f_name ? f_name : user[0].f_name,
            l_name:l_name ? l_name : user[0].l_name,
            username:username ? username : user[0].username,
            email:email ? email : user[0].email,
            phone:phone ? phone : user[0].phone,
            photo:photo ? photo : user[0].photo,
        };
        // update the data base 
        const newuser  =  await query ("UPDATE user SET ? WHERE id = ? ",[userobj,userid]);
        res.status(200).json("profile created");
     }
     else
     {
         res.status(200).json("SORRY THE USER NOT FOUND....");
     }

   }
   catch(err)
   {
    res.status(404).json(err)
   }

});
  
  module.exports = router ;