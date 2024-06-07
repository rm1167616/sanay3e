const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 



router.get("/",async(req,res)=>{
    try {
        const query = util.promisify(connection.query).bind(connection);
        const commitionResults = await query("SELECT commition FROM history");
        let sum = 0;
        for (let i = 0; i < commitionResults.length; i++) {
            sum += commitionResults[i].commition;
        }
        const joker = await query (" select * from joker where attribute = 'taxis' ");
        if(joker[0])
        {
            let summ = 0;
            for (let i = 0; i < joker.length; i++) {
                summ += joker[i].magnitude;
            }
        }
        else
        {
            summ = 0 
        }
        const available_balance = sum - summ;
        res.status(200).json({
            taxis : sum ,
            available_balance : available_balance
        });
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router ;