// const router = require("express").Router();
// const { body } = require("express-validator");
// const connection = require("../../db/dbConnection");
// const util = require("util");

// router.post('/', async (req, res) => {
//     try {
//         const { customerid, craftsmanid, rate } = req.body;
//         // prepare the object 
//         const ratingob = {
//             customerid: customerid,
//             craftsmanid: craftsmanid,
//             rate: rate
//         };
//         // insert the object in the database 
//         const insertResult = await util.promisify(connection.query)("INSERT INTO rate SET ?", ratingob);

//         // get all rates about craftsman 
//         const craftsmanRates = await util.promisify(connection.query)("SELECT * FROM rate WHERE craftsmanid = ?", craftsmanid);
//         let sum = 0;
//         for (let i = 0; i < craftsmanRates.length; i++) {
//             sum += craftsmanRates[i].rate;
//         }
//         const average = sum / craftsmanRates.length;
//         res.status(200).json({ averageRating: average });
//     } catch (err) {
//       throw (err)
//         console.error("Error:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;
