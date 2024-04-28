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
router.post("/gallery/:id", async (req, res) => {
    try {
        const { imageUrls, publicIds } = req.body;
        const query = util.promisify(connection.query).bind(connection);
        const userId = req.params.id;

        // Check if the user exists
        const user = await query("SELECT * FROM user WHERE id = ?", userId);
        if (!user[0]) {
            return res.status(404).json({ error: "Not Found", message: "User not found." });
        }

        // Prepare the object to insert into the database
        const galleryData = {
            userid: userId,
            public_id: publicIds,
            img_url: imageUrls
        };

        // Insert paths into the database using parameterized query
        await query("INSERT INTO gallary SET ?", galleryData);

        res.status(200).json("Images uploaded successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

router.post("/compp/:id",async(req,res)=>{
    try
    {
        const { area ,  category } = req.body ;
        const craftsmanid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const craftsman = await query ("select * from craftsman where userid = ? ",craftsmanid);
        if(craftsman[0])
        {
            await query ("update craftsman set area =? , category= ? where userid = ?",[area,category,craftsmanid]);
            res.status(500).json("th profileupdated") ;       
        }
        else
        {
            res.status(404).json("sorry the craftsman not exist ...");

        }



    }
    catch(err)
    {
        res.status(404).json(err)
    }
})




module.exports = router;
