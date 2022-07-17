const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User  = require("./models/user.model");
const Loan = require("./models/loan.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

app.use(cors());
app.use(express.json())
app.get("/hello",(req,res)=>{
    res.send("hello world");
})

mongoose.connect("mongodb://localhost:27017/userDB");

const loanCount = Loan.countDocuments({loanID : "1"});
console.log(loanCount);

app.post('/api/register', async (req, res) => {
	try {
        const newPassword = await bcrypt.hash(req.body.password,10);
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		});
		res.json({ status: 'ok', created : 'Collection' });
	} catch (err) {
		res.json({ status: 'error', error: 'Collection not created' })
	}
});

app.post("/api/addRecord",async (req,res)=>{
    try{
        await Loan.create({
           loanID : req.body.loanID,
           amount : req.body.amount,
           interest : req.body.interest
        });
        res.json({status : "ok"});
    }
    catch(err){
        res.json({status : "error" , error : "record not added"})
    }
    
});
app.post("/api/deleteRecord",async (req,res)=>{
    try{
        await Loan.deleteOne({
            loanID : req.body.loanID,
        });
        res.json({status : "ok"});
    }
    catch(err){
        res.json({status : "error", error : "record not deleted"});
    }
})
//fetchData
app.post("/api/fetchData",async (req,res)=>{
    try{
        const data = await Loan.find({
        });
        console.log(data);
        console.log("Fetched");
        res.json({status : "ok"});
    }catch(error){
        res.json({status : "error", error : "record not fetched"})
    }
})

app.post("/api/login", async (req,res)=>{
    const token = req.headers["x-access-token"];
    const user = await User.findOne({
        email : req.body.email,
    });

    if(!user){return {status : "error", error : "Invalid login"}}

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    );
    
    if(isPasswordValid){
        const token = jwt.sign(
        {
            name : user.name,
            email : user.email,
        },
        "secret123",
    )
        return res.json({status : "ok",user : token})
    }
    else{
        return res.json({status : "ok", user : false})
    }


})

app.listen(3001,()=>{
    console.log("Server started on 3001");
})