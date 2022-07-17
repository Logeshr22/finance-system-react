const mongoose = require("mongoose");

const Loan = new mongoose.Schema(
    {
        loanID : {type : String , required : true, unique : true},
        amount  : {type : String, required : true},
        interest : {type : String, required : true},
    },
    {
        collection  : "loanData"
    }
)

const model = mongoose.model("loanData",Loan);

module.exports = model;