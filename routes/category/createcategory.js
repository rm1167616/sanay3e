const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const upload = require("../../middleware/uploadimage");



router.post("/", upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'coverImg', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, description, min_time, package, package2, package3, package4, material } = req.body;
        const query = util.promisify(connection.query).bind(connection);

        const cate = await query("SELECT * FROM category WHERE name = ?", name);
        if (cate[0]) {
            res.status(404).json("Sorry, you can't add the same category more than once.");
        } else {
            // Prepare the object
            const category = {
                name: name,
                description: description,
                img: req.files['img'][0].originalname, // First picture
                coverImg: req.files['coverImg'][0].originalname, // Second picture
                min_time: min_time,
                package: package,
                package2: package2,
                package3: package3,
                package4: package4,
                material: material,
            };

            // Insert the object into the database
            await query("INSERT INTO category SET ?", category);

            res.status(200).json(category);
        }
    } catch (err) {
        res.status(404).json(err);
    }
});

module.exports = router;