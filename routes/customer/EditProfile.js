const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util");

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { f_name, l_name, username, email, phone, photo , public_id  } = req.body;

  
    const query = `UPDATE user SET 
      f_name = ?,
      l_name = ?,
      username = ?,
      email = ?,
      phone = ?,
      photo = ?,
      public_id = ?
      WHERE id = ?`;

    connection.query(query, [f_name, l_name, username, email, phone, photo,public_id, userId], (err, results) => {
        if (err) {
            console.error('Error updating user information:', err);
            res.status(500).send('Error updating user information');
            return;
        }

        // updated user data from the database
        const Query = `SELECT f_name, l_name, username, email, phone, photo ,public_id FROM user WHERE id = ?`;

        connection.query(Query, [userId], (Err, Results) => {
            if (Err) {
                console.error('Error fetching updated user data:', Err);
                res.status(500).send('Error fetching updated user data');
                return;
            }

            if (Results.length === 0) {
                res.status(404).send('User not found');
                return;
            }

            const updatedUserData = Results[0];
            res.json(updatedUserData);
             // res.status(200).send('User information updated successfully');
        });
    });
});
  
  module.exports = router ;