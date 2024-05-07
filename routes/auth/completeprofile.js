const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const upload = require("../../middleware/uploadimage");


// api put first name / last name / birthday  / img
router.put("/prof1/:id", upload.single("photo"), async (req, res) => {
    const { f_name, l_name, birthday } = req.body;
    const emailid = req.params.id;
    
    try {
        // Validation: Check if required fields are provided
        if (!f_name || !l_name || !birthday) {
            return res.status(400).json({ error: "Bad Request", message: "Missing required fields." });
        }

        // Check if the user exists
        const query = util.promisify(connection.query).bind(connection);
        const user = await query("SELECT * FROM user WHERE id = ?", emailid);
        if (!user[0]) {
            return res.status(404).json({ error: "Not Found", message: "User not found." });
        }

        // Update the user profile
        const userobj = {
            f_name: f_name,
            l_name: l_name,
            birthday: birthday,
        };

        // If a photo is uploaded, include it in the update
        if (req.file) {
            userobj.photo = req.file.originalname;
        }

        // Update the user record in the database
        await query("UPDATE user SET ? WHERE id = ?", [userobj, emailid]);
        res.status(200).json({ message: "Profile updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});



// api select gender
router.put("/gender/:id",body("gender"),async(req,res)=>{
    try
    {
        // validation of id of email exist 
        const emailid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const user = await query ("select * from user where id = ?",emailid);
        if(user[0])
        {
            // create object for user 
            const userobj = {
                gender : req.body.gender,
            }
            // update the record of id in data base..
            await query ("update user set ? where id = ?",[userobj,emailid]);;
            res.status(200).json("the profile updated...");

        }
        else
        {
            res.status(404).json("SOMETHING WRONG THE USER NOT FOUND......");
        }



    }
    catch(err)
    {
        res.status(404).json(err);
    }
})

module.exports=router;