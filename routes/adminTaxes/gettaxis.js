const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 



router.get("/",async(req,res)=>{
    try {
        const query = util.promisify(connection.query).bind(connection);
        const commitionResults = await query("SELECT * FROM history");
        let taxes = 0;
        let adminDues = 0;
        for (let i = 0; i < commitionResults.length; i++) {
            adminDues += commitionResults[i].adminDues;
            taxes =+ commitionResults[i].taxes
        }

        res.status(200).json({
            adminDues:adminDues,
            taxes:taxes
        });
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router ;