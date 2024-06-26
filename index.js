//================= init express app ===============
const express = require("express");
const app = express();

//=================Global middleware==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors());  // allow https requst,respons


// create file called upload 
app.use(express.static("uploads"));
app.use('/uploads', express.static('uploads'));



//======== run the app ============//
app.listen(4000 || process.env.port, () => {
        console.log(`SERVER IS RUNNING ON PORT 4000....`);
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
app.use("/updatecategory",require("./routes/category/updatecategory"));
app.use("/deletecategory",require("./routes/category/deletecategory"));
app.use("/getcategorywthid",require("./routes/category/getcategorywthid"));
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
app.use("/bookinglistfotc",require("./routes/booking/getbokinglistforcraftsman"));
app.use("/bookinglistforcustomer",require("./routes/booking/getbookinglistforcustomer"));
app.use("/getuser",require("./routes/gets/getuser"));
app.use("/getreviewandrate",require("./routes/gets/getreviewandrate"));
app.use("/getnumbers",require("./routes/gets/getnumbers"));
app.use("/getcraftsmanwallet",require("./routes/gets/getcraftsmanwallet"));
//============ booking function ==========//
app.use("/booking",require("./routes/booking/book"));
//========================support============//
app.use("/support",require("./routes/support/Support"));
app.use("/viewsupport",require("./routes/support/viewallsupport"));
//============= scadule =======//
app.use("/choosescadule",require("./routes/scadule/choosescadule"));
app.use("/getcraftsmanworktime",require("./routes/scadule/getcraftsmanworktime"));
//============== rate function =========== //
app.use("/rate",require("./routes/rate/Rate"));
app.use("/reviwe",require("./routes/review/review"));
//============== SERACH FUNCTION ============ // 
app.use("/search",require("./routes/search/search"));
//============= TRANSACTION ==================//
app.use("/transction",require("./routes/gets/transaction"));
//============== RECOMMENDATION ================//
app.use("/recommendation",require("./routes/recommendation/reco"));
app.use("/priceprediction",require("./routes/recommendation/price_prediction"));
//==============  BOOKING SERVICES =============//
app.use("/acceptRequest",require("./routes/bookingProgress/acceptRequest"));
app.use("/arrived",require("./routes/bookingProgress/arrived"));
app.use("/endjob",require("./routes/bookingProgress/endjob"));
app.use("/startjob",require("./routes/bookingProgress/startjob"));
app.use("/getjobdetails",require("./routes/bookingProgress/getBookingDetails"));
//================= CHARTS =====================//
app.use("/charts",require("./routes/charts/getChart"));
//================== WALLET ==================//
app.use("/getwallet",require("./routes/gets/getwallet"));
//=================  COMMITION ===============//
app.use("/commition",require("./routes/adminTaxes/gettaxis"));
