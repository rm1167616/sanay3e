const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util");
router.post("/:id", async (req, res) => {
  try
  {

    const {description } = req.body;
    const userid= req.params.id;
    const query = util.promisify(connection.query).bind(connection); 
    const user = await query(" select * from user where id = ? ",userid);
    if(user[0])
    {
      // prepare the object 
      const supportobj = {
        description : description ,
        user_id:userid,
      };
      // insert it in data base 
      await query (" insert into support set ?" , supportobj);
      res.status(200).json("success");
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