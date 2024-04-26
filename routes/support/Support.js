const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util");
router.post("/", async (req, res) => {
  try
  {

    const { username, email, description } = req.body;
    const query = util.promisify(connection.query).bind(connection); 
    const user = await query(" select * from user where email = ? ",email);
    if(user[0])
    {
      // prepare the object 
      const userid = user.id;
      const supportobj = {
        user_id : userid ,
        description : description 
      };
      // insert it in data base 
      const supp = await query (" insert into support set ?" , supportobj);
      res.status(200).json(supportobj);
    }
    else
    {
      res.status(404).json("sorry the user not exist ....");
    }
    
       
  }
    catch(err)
    {
        res.status(404).json(err)
    }

  });

  module.exports = router;