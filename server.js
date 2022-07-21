const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User  = require("./models/user.model");
const Loan = require("./models/loan.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const twilio = require("twilio");
const routes = require('./routes/api');

app.use(cors());
app.use('/api', routes);
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
            await Loan.deleteMany({
                loanID : req.body.loanID,
            });
            res.json({status : "ok"});
        }
        catch(err){
            res.json({status : "error", error : "record not deleted"});
        }
})
let a = 0;
//fetchData
app.post("/api/fetchData",async (req,res)=>{
    try{
        const countData = await Loan.count({
        });
        const displayData = await Loan.find({})
        console.log("no. of data : "+countData);
        console.log("data");
        console.log(displayData);
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
//twilio send sms
const accountId = "AC68579d53b68ab4fe5922dcfefc2a4a44";
const authToken = "e9a46eb6b51615525167c4ccb91ba562";
app.get("/send-sms",(req,res)=>{
    var client = new twilio(accountId,authToken);
    client.messages.create({
        to : "+917358820898",
        from : "+16199433607",
        body : "Kindly pay the loan due",
    })
    res.send("SMS sent");
})

app.listen(3001,()=>{
    console.log("Server started on 3001");
})