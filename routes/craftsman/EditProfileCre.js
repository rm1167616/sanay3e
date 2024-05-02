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
  


router.put("/profile2/:id", async (req, res) => {
    const { aboutme, skills } = req.body;
    try {
        const query = util.promisify(connection.query).bind(connection);
        const id = req.params.id;
        const user = await query("select * from user where id = ?", id);
        if (user[0]) {
                // prepare the object 
                const craftsman = {
                    userid: id,
                    aboutme: aboutme,
                    skills: skills
                };
                // insert it into data base 
                await query("update craftsman set ? where userid = ?", [craftsman,id]);
                res.status(200).json(craftsman);
            }
        else {
            res.status(400).json("SORRY YHE USER NOT EXIST PLEASE SIGNUP AGAIN....");
        }

    }
    catch (err) {
        res.status(404).json(err);
    }
})


module.exports = router;

