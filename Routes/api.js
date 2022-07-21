const express = require("express");
const router = express.Router();
const loanData = require("../models/loan.model");

router.get("/",(req,res)=>{
    loanData.find({})
    .then((data)=>{
        console.log("Data : ",data);
        res.json(data);
    })
    .catch((error)=>{
        console.log("error : ",error);
    })
});


module.exports = router;
