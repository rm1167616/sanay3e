const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); 
const upload = require("../../middleware/uploadimage");
const fs = require('fs');


router.put("/editprofile/:id", async (req, res) => {
    const { aboutme, skills } = req.body;
    const userId = req.params.id;

    try {
        const query = util.promisify(connection.query).bind(connection);
        
        // Update craftsman profile
        const result = await query("UPDATE craftsman SET aboutme = ?, skills = ? WHERE userId = ?", [aboutme, skills, userId]);
        
        // Check if the update was successful
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Craftsman profile not found." });
        }
        
        return res.status(200).json({ message: "Craftsman profile updated successfully." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error." });
    }
});
  
router.put("/gallery/:id", upload.single('picture'), async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const userId = req.params.id;
        const newFile = req.file;

        // Check if the image exists
        const image = await query("SELECT * FROM gallary WHERE userid = ?", userId);
        if (image[0]) {
            // Update image path
            const extension = newFile.originalname.split('.').pop(); // Extract file extension
            const newPath = `uploads/${userId}_${Date.now()}.${extension}`; // Construct unique destination path
            fs.renameSync(`uploads/${newFile.filename}`, newPath);
            await query("UPDATE gallary SET img_url = ? WHERE userid = ?", [newPath, userId]);
            
            res.status(200).json("THE IMG UPDATED SUCCESSFULLY..");
        } else {
            res.status(404).json("SORRY, IMAGE NOT FOUND");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;

