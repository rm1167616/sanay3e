const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


router.put("/:id", async (req, res) => {
    try {
        const bookingid = req.params.id;
        const query = util.promisify(connection.query).bind(connection);
        const bookingobj = await query(" select * from booking where id = ? ", bookingid);

        if (bookingobj[0]) {
            const price = bookingobj[0].price;
            const craftsmanid = bookingobj[0].craftsmanid;
            const admincomition = price * (10 / 100);
            const budget = price - admincomition;
            const result = await query(" select * from craftsman where userid  = ?", [craftsmanid]);
            const existbudget = result[0].budget;
            const allbudget = existbudget + budget;
            // insert new budget in craftsman table
            await query("UPDATE craftsman SET budget = ? WHERE userid = ?",[allbudget, craftsmanid]);
            // insert new budget in admin table 
            const historyobj = {
                bookingid: bookingid,
                commition: admincomition
            }
            await query(" insert into history set ? ", historyobj);
            await query("UPDATE booking SET statues = 4 WHERE id = ?", bookingid);
            res.status(200).json("THE JOB ENDED...");
        }
        else {
            res.status(404).json("SOME THNG ERROR");

        }

    }
    catch (err) {
        res.status(404).json(err)
    }
})




module.exports = router;