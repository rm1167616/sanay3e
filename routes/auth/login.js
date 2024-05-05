const router = require("express").Router();
const connection = require(../../db/dbconnection);
const { body, validationResult } = require('express-validator');
const util = require("util"); // helper 
const bcrypt = require("bcrypt");


// ========= LOGIN ==============//

router.post("/", async (req, res) => {
   const { email, password } = req.body;
   try {
      //=== validation of request 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }
      //==== check the email is exist or not ====//
      const query = util.promisify(connection.query).bind(connection) // transform query to promise to can use await/ async
      const user = await query("SELECT * FROM user WHERE email = ?", [email]);
      const checkpassword = await bcrypt.compare(
         password, user[0].password
      );
      if (user[0] == null) {
         res.status(404).json({ msg: "the email or password not found....." })
      }
      // === compare hashed password ===// 
      else if (checkpassword) {
         res.status(200).json(user);
      }
      else {
         res.status(404).json({
            msg: "the password or email not correct"
         })
      }
   }
   catch (err) {
      res.send(err)
   }
})

module.exports = router;
