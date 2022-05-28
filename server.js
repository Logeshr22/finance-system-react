const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

//connect to mongoose
mongoose.connect("mongodb+srv://Logeshr22:3a77493Pj0sb11ZQ@cluster0.tbudu.mongodb.net/RegisterDB");


//require route
app.use("/",require("./routes/noteRoute"));


app.listen(3001,function(){
    console.log("express server is running on port 3001");
})