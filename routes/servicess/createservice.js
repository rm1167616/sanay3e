    const router = require("express").Router();
    const { body } = require("express-validator");
    const connection = require("../../db/dbConnection");
    const util = require("util"); // helper 


    // api make customer send services 
    router.post("/:id",async(req,res)=>{
        try
        {
            const { descreption , Longitude , latitude , address } = req.body ;
            const userid = req.params.id;
            const query = util.promisify(connection.query).bind(connection) ;
            // prepare the object 
            const service = {
                descreption : descreption ,
                Longitude:Longitude,
                latitude:latitude,
                address :address,
                userid :userid 
            };
            // insert the object tp data base 
            await query (" insert into services set ?",service);
            res.status(200).json(service)
        }
        catch(err)
        {
            res.status(404).json(err)
        }
    })

    module.exports = router ;