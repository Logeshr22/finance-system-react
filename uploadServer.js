const express  = require("express");
const app = express();
const imageUpload = require("./Routes/imageUpload");
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE");
    next();
});
app.use("/user/upload",imageUpload);


app.listen(3002,()=>{
    console.log("File Upload Server Running");
});