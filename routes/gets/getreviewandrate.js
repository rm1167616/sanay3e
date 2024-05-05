const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


router.get("/:id", async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const craftsmanid = req.params.id;
        const object = await query(`
        SELECT 
    user.username,
    reviews.comment,
    reviews.rate
FROM 
    reviews
JOIN 
    user ON user.id = reviews.customerid
WHERE 
reviews.craftsmanid = ?`, craftsmanid)
        if (object[0]) {
            res.status(200).json(object);
        }
        else {
            res.status(404).json("the review not founded...")
        }


    }
    catch (err) {
        res.status(404).json(err)
    }
})



module.exports = router;
