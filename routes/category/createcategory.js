const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const fs = require('fs');
const upload = require("../../middleware/uploadimage");


// api create category
router.post("/",upload.single("img"), async (req, res) => {
    const { name, description,package, min_time, material } = req.body;
    try {
        const query = util.promisify(connection.query).bind(connection);


            // prepare the object 
            const category = {
                name: name,
                description: description,
                img: req.file.originalname,
                min_time: min_time,
                package:package,
                material: material
            };
            // insert the object in data base 
            await query("insert into category set ?", category);
            res.status(200).json(category);
    



    }
    catch (err) {
        res.status(404).json(err)
    }
})


module.exports = router;