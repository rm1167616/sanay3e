const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const upload = require("../../middleware/uploadimage");
const fs = require('fs');


// api put skills and about me ....
router.post("/profile/:id", async (req, res) => {
    const { aboutme, skills } = req.body;
    try {
        const query = util.promisify(connection.query).bind(connection);
        const id = req.params.id;
        const user = await query("select * from user where id = ?", id);
        if (user[0]) {
            const cr1 = await query("select * from craftsman where userid = ?", id);
            if (cr1[0]) {
                res.status(404).json("the creaftsman created already ");
            }
            else {
                // prepare the object 
                const craftsman = {
                    userid: id,
                    aboutme: aboutme,
                    skills: skills
                };
                // insert it into data base 
                await query("insert into craftsman set ?", craftsman);
                res.status(200).json(craftsman);

            }



        }
        else {
            res.status(400).json("SORRY YHE USER NOT EXIST PLEASE SIGNUP AGAIN....");
        }




    }
    catch (err) {
        res.status(404).json(err);
    }
})



// Route to handle file uploads and store paths in database
router.post("/gallery/:id", upload.array('pictures'), async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const talkId = req.params.id;
        const files = req.files; // Extract uploaded files from req object

        // check if user exist or not 
        const user = await query("select * from user where id = ?", talkId);
        if (user[0]) {
            // Insert paths into database

            for (const file of files) {
                const sourcePath = `uploads/${file.filename}`;
                if (!fs.existsSync(sourcePath)) {
                    console.error(`Source file ${sourcePath} does not exist.`);
                    continue; // Skip to the next file
                }
            
                const extension = file.originalname.split('.').pop(); // Extract file extension
                const newPath = `uploads/${talkId}_${Date.now()}.${extension}`; // Construct unique destination path
                fs.renameSync(sourcePath, newPath);
                await query("INSERT INTO gallary (userid, img_url) VALUES (?, ?)", [talkId, newPath]);
            }

            res.status(200).json("THE IMG UPLOAD SUCCESSFULLY..");
        }
        else {
            res.status(400).json("SORRY THE USER NOT EXIST ")
        }
    } catch (err) {
        console.error(err);
        res.status(404).json(err);
    }
});

module.exports = router;
