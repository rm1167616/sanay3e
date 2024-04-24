const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 
const { query } = require("express");


// api make customer send services 
router.get("/", async (req, res) => {
    try {
        // const { category } = req.body;
        const query = util.promisify(connection.query).bind(connection);
        const cratsman =  await query(`SELECT 
    user.photo,
    user.f_name,
    user.l_name,
    user.Longitude,
    user.latitude,
    user.address,
    craftsman.category,
    craftsman.price,
    craftsman.rate
FROM 
    user
JOIN 
craftsman ON user.id = craftsman.userid;`);
res.status(200).json(cratsman);

    }
    catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router;