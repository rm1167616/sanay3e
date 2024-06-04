const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


// api make customer send services 
router.post("/:id",async(req,res)=>{
    try
    {
        const { craftsmanid , date , start_time , end_time } = req.body ;
        const bookingid = req.params.id;
        // prepare the object of scadule 
        const scaduleobj = {
            craftsmanid : craftsmanid ,
            date : date ,
            start_time : start_time ,
            end_time : end_time,
            bookingid : bookingid,
        };
        const query = util.promisify(connection.query).bind(connection); 
        const scadule = await query ("select * from scadule where craftsmanid = ?",craftsmanid);
        if(scadule[0])
        {
            for (let i = 0; i < scadule.length; i++) {
                if (start_time >= scadule[i].start_time && end_time <= scadule[i].end_time && date==scadule[i].date) {
                  return res.status(404).json("The craftsman is busy during this time");
                }
              }
              const result = await query ("insert into scadule set ?",scaduleobj);
              const insertId = result.insertId;
              const scaduleobj1 = await query ("select * from scadule where id = ?",insertId);
              res.status(200).json(scaduleobj1);
        }
        else
        {
            //insert the object of scadule in data base 
            const result =  await query ("insert into scadule set ?",scaduleobj);
            const insertId = result.insertId;
            const scaduleobj1 = await query ("select * from scadule where id = ?",insertId);
            res.status(200).json(scaduleobj1);
      

        }



    }
    catch(err)
    {
        res.status(404).json(err)
    }
})

module.exports = router ;