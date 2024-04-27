const router = require("express").Router();
const { body } = require("express-validator");
const connection = require("../../db/dbConnection");
const util = require("util"); // helper 




router.post("/",async(req, res) => {
    try {
        const { name , description , img , public_id , min_time , package , material ,coverimg_url ,coverPUblic_id	} = req.body ;
        const query = util.promisify(connection.query).bind(connection);

        const cate = await query ("select * from category where name = ?",name);
        if(cate[0])
        {
            res.status(404).json("sorry ypu cant add the same category more than once time");

        }
        else
        {
                    // prepare the object 
        const category = {
            name: name,
            description: description,
            img: img,
            public_id : public_id,
            min_time: min_time,
            package: package,
            material: material,
            coverimg_url:coverimg_url,
            coverPUblic_id:coverPUblic_id
        };
        // insert the object in data base 
        await query("insert into category set ?", category);
        res.status(200).json(category);
    
        }
    



    }
    catch (err) {
        res.status(404).json(err)
    }
})


module.exports = router;