const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const upload = require("../../middleware/uploadimage");
const fs = require("fs");




router.put("/:id", upload.single("img"), async (req, res) => {
    try {
        const { name, description, min_time, package, package2, package3, package4, material } = req.body;
        const query = util.promisify(connection.query).bind(connection);
        const categoryid = req.params.id;
        const cate = await query("SELECT * FROM category WHERE id = ?", categoryid);
        
        if (cate[0]) {
            // Prepare the updated category object
            const category = {
                name: name,
                description: description,
                img: req.file ? req.file.originalname : null, // Check if file exists
                min_time: min_time,
                package: package,
                package2: package2,
                package3: package3,
                package4: package4,
                material: material,
            };

            // Delete old file if there was one
            if (cate[0].img) {
                fs.unlinkSync(`uploads/${cate[0].img}`);
            }

            // Update the category in the database
            await query("UPDATE category SET ? WHERE id = ?", [category, categoryid]);
            
            res.status(200).json({ message: "Category updated successfully" });
        } else {
            res.status(404).json("Sorry, you can't update a category that does not exist");
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;