const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 


// location 
router.put("/:id",async (req, res) => {
    try {
        const { Longitude, latitude , address} = req.body; 
        const query = util.promisify(connection.query).bind(connection);
        const id = req.params.id ;
        const user = await query ("select * from user where id = ? ",id);
        if(user[0])
        {
            //prepare the object to insert in database 
            const location = {
                Longitude : Longitude ,
                latitude : latitude ,
                address : address 
            } ;
            // insert the object in data base 
            await query ("update user set ? where id = ?",[location,id]);
            res.status("the profile updated");


        }
        else
        {
            res.status(404).json("sorry the user not exist....");
        }
    } catch (err) {
        console.error(err);
        res.status(404).json(err);
    }
});

module.exports= router;