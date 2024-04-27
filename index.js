//================= init express app ===============
const express = require("express");
const app = express();

//=================Global middleware==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors());  // allow https requst,respons



//======== run the app ============//
app.listen(4000 || process.env.port, () => {
        console.log("SERVER IS RUNNING....${port}");
    });

//============== api ==============//

//============== auth ==============//
app.use("/register",require("./routes/auth/register"));
app.use("/login",require("./routes/auth/login"));
app.use("/complete",require("./routes/auth/completeprofile"));
app.use("/forgetpass",require("./routes/auth/forgetpassword"));
app.use("/location",require("./routes/auth/location"));

//=============== category ===========// 
app.use("/createcategory",require("./routes/category/createcategory"));
app.use("/getcategory",require("./routes/category/getallcategory"));

//============== profile function ========// 
app.use("/ChangePassword",require("./routes/customer/ChangePassword"));
app.use("/EditProfile",require("./routes/customer/EditProfile"));
app.use("/ViewProfile",require("./routes/customer/ViewProfile"));

//============== craftsman function ========// 
app.use("/craftsmanfun",require("./routes/craftsman/createprofile"));
app.use("/editcratsma",require("./routes/craftsman/EditProfileCre"));

//============== service function ==========// 
app.use("/createservice",require("./routes/servicess/createservice"));

//============== GETS ====================//
app.use("/getcraftsman",require("./routes/gets/getlcraftsmanbycategory"));
app.use("/getcraftsmanskills",require("./routes/gets/getuserskills"));
app.use("/getgallery",require("./routes/gets/getgallery"));
app.use("/bookinglistfotc",require("./routes/gets/getbokinglistforcraftsman"));
app.use("/bookinglistforcustomer",require("./routes/gets/getbookinglistforcustomer"));
//============ booking function ==========//
app.use("/booking",require("./routes/booking/book"));
//========================support============//
app.use("/support",require("./routes/support/Support"));
//============= scadule =======//
app.use("/choosescadule",require("./routes/scadule/choosescadule"));
//============== rate function =========== //
// app.use("/rate",require("./routes/rate/Rate"));
app.use("/reviwe",require("./routes/review/review"));
//============== SERACH FUNCTION ============ // 
app.use("/search",require("./routes/search/search"));