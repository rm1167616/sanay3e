const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util");
const { query } = require("express");


router.post("/:id",async (req, res) => {
    try
    {
      const query = util.promisify(connection.query).bind(connection);
      const customerid = req.params.id;
    const { craftsmanid, comment } = req.body;
    // prepare the object 
    const reviewobj = {
      customerid : customerid ,
      craftsmanid : craftsmanid, 
      comment : comment 
    };
    // insert the object in database
    await query (" insert into reviews set ?",reviewobj); 
    res.status(500).json(reviewobj);
    }
    catch(err)
    {
        res.status(404).json(err)
    }
  });
  



module.exports = router;