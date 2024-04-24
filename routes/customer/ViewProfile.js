const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util");


router.get('/:id', (req, res) => {
    const profileId = req.params.id;
  
   
    const query = `SELECT photo, f_name FROM user WHERE id = ?`;
  
    connection.query(query, [profileId], (err, results) => {
      if (err) {
        console.error('Error fetching profile:', err);
        res.status(500).send('Error fetching profile');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send('Profile not found');
        return;
      }
  
      
      const { photo, f_name } = results[0];
  
      res.json({
        photo: photo,
        f_name: f_name
      });
    });
  });





  
  router.get('/Profile/:id', (req, res) => {
    const userId = req.params.id;

    
    const query = `SELECT username,f_name, l_name , email, phone ,photo FROM user WHERE id = ?`;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user information:', err);
            res.status(500).send('Error fetching user information');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        
        const userData = results[0];

       
        res.json(userData);
    });
});
  module.exports = router ;