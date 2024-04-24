const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const connection = require("../../db/dbConnection");
const bcrypt = require("bcrypt");
const util = require("util");

// Change password endpoint
router.put("/:id",async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.params.id;
    const query = util.promisify(connection.query).bind(connection);
    // Validate input parameters
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
  
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New password and confirm password do not match' });
    }
  
    // Retrieve the current hashed password from the database
      await query('SELECT password FROM user WHERE id = ?', [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const hashedPassword = result[0].password;
  
      // Verify that the current password matches
      bcrypt.compare(currentPassword, hashedPassword, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        if (!isMatch) {
          return res.status(401).json({ error: 'Current password is incorrect' });
        }
  
        // Hash the new password
        bcrypt.hash(newPassword, 10, (err, hashedNewPassword) => {
          if (err) {
            return res.status(500).json({ error: 'Internal server error' });
          }
  
          // Update the user's record in the database with the new hashed password
            query('UPDATE user SET password = ? WHERE id = ?', [hashedNewPassword, userId], (err, result) => {
            if (err) {
              return res.status(500).json({ error: 'Internal server error' });
            }
  
            return res.status(200).json({ message: 'Password updated successfully' });
          });
        });
      });
    });
  });

       

module.exports = router;