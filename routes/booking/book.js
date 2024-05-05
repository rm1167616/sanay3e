const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


// api make customer send services 
router.post("/:id",async(req,res)=>{
    try
    {
        const { craftsmanid , servceid , price ,scaduleid} = req.body;
        const userid = req.params.id;
        const query = util.promisify(connection.query).bind(connection); 
        // prepare the object to insert it in data base 
        const bookingobj = {
            craftsmanid : craftsmanid ,
            servceid : servceid ,
            price : price,
            userid : userid,
            scaduleid:scaduleid
        };
        // insert it in data base 
        await query ("insert into booking set ?",bookingobj);
        res.status(200).json(bookingobj);


    }
    catch(err)
    {
        res.status(404).json(err)
    }
})

module.exports = router ;