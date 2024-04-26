const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util");
 router.post("/",async (req, res) => {
  try
  {

    const { username, email, description } = req.body;
  
 
    const user = 'SELECT id FROM user WHERE username = ? AND email = ?';
    connection.query(user, [username, email], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      
      if (results.length > 0) {
        const userId = results[0].id;
  
    
        const support = 'INSERT INTO support (description, user_id) VALUES (?, ?)';
        connection.query(support, [description, userId], (err, results) => {
          if (err) {
            console.error('Error inserting support info:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
         
          res.status(200).json({ message: 'Support information saved successfully' });
        });
      } else {
       
        res.status(404).json({ error: 'Error checking username or email' });
      }
    });
  }
    catch(err)
    {
        res.status(404).json(err)
    }

  });

  module.exports = router;