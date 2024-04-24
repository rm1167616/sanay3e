const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"bisbuk6d0p6wy2iiuazy-mysql.services.clever-cloud.com",
    user:"unzjszxn0e5mkop4",
    password:"Iee3p6UYEQN9b1LS664g",
    database:"bisbuk6d0p6wy2iiuazy",
    port:"3306"
})

connection.connect((err)=>{
    if(err)
    {
        throw err ;
    }
    console.log("DATABASE IS CONNECTED");
})

module.exports = connection ;