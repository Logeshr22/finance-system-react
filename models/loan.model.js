const mongoose = require("mongoose");

const Loan = new mongoose.Schema(
    {
        customerName : {type :String, required: true},
        loanID : {type : String , required : true, unique : true},
        amount  : {type : String, required : true},
        billNumber : {type : String},
        paidStatus : {type : String},
        verifyStatus : {type : String},
    },
    {
        collection  : "loanData"
    }
)

const model = mongoose.model("loanData",Loan);

module.exports = model;