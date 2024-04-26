const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const fs = require('fs');
const upload = require("../../middleware/uploadimage");


// api create category
router.post("/", async (req, res) => {
    const { name, description, package, min_time, material , img ,public_id } = req.body;
    try {
        const query = util.promisify(connection.query).bind(connection);


        uploadImageToCloudinary(img);
        // prepare the object 
        const category = {
            name: name,
            description: description,
            img: img,
            public_id : public_id,
            min_time: min_time,
            package: package,
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