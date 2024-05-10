const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const fs = require("fs");
const upload = require("../../middleware/uploadimage");



router.put("/:id", upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'coverImg', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, description, min_time, package, package2, package3, package4, material } = req.body;
        const query = util.promisify(connection.query).bind(connection);
        const categoryid = req.params.id;
        const cate = await query("SELECT * FROM category WHERE id = ?", categoryid);
        
        if (cate[0]) {
            // Prepare the updated category object
            const category = {
                // Retain the existing name if 'name' is not provided in the request
                name: name ? name : cate[0].name,
                description: description ? description : cate[0].description,
                // Check if file exists for 'img' field
                img: req.files['img'] ? req.files['img'][0].originalname : cate[0].img,
                // Check if file exists for 'coverImg' field
                coverImg: req.files['coverImg'] ? req.files['coverImg'][0].originalname : cate[0].coverImg,
                min_time: min_time ? min_time : cate[0].min_time,
                package: package ? package : cate[0].package,
                package2: package2 ? package2 : cate[0].package2,
                package3: package3 ? package3 : cate[0].package3,
                package4: package4 ? package4 : cate[0].package4,
                material: material ? material : cate[0].material,
            };

            // Delete old files if there were any
            if (req.files['img'] && cate[0].img) {
                fs.unlinkSync(`uploads/${cate[0].img}`);
            }
            if (req.files['coverImg'] && cate[0].coverImg) {
                fs.unlinkSync(`uploads/${cate[0].coverImg}`);
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