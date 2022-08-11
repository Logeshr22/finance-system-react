const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User  = require("./models/user.model");
const Admin = require("./models/admin.model");
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
//customerRegistration
app.post('/api/register', async (req, res) => {
	try {
        const newPassword = await bcrypt.hash(req.body.password,10);
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		});
		return res.json({ status: 'ok', created : 'Collection' });
	} catch (err) {
		return res.json({ status: 'error', error: 'Collection not created' })
	}
});



// const registerAdmin = async (req,res)=>{
//     try{
//         const newPassword = await bcrypt.hash("Logesh123",10);
//         await Admin.create({
//             email : "logesh.r22@gmail.com",
//             password : newPassword,
//         });
//         console.log("Admin created");
//     }catch(err){
//         console.log("Admin not created");
//     }
// }
// registerAdmin();

app.post("/api/addRecord",async (req,res)=>{

        try{
            const {customerName,loanID,amount} = req.body;
            let flag = 0;
            if(!customerName || !loanID || !amount)
                return res.json({status : "noInput"})
            else{
                const checkExists = await Loan.findOne({
                    customerName : req.body.customerName,
                    loanID : req.body.loanID,
                })
                if(checkExists)
                    flag = 1;
                else
                    flag = 2;
            }
            if(flag === 1){
                return res.json({status : "alreadyExists"});
            }
            if(flag === 2){
                await Loan.create({
                    customerName : req.body.customerName,
                    loanID : req.body.loanID,
                    amount : req.body.amount,
                    billNumber : "-",
                    paidStatus : "Not Paid",
                    verifyStatus : "Not Verified",
                 });
                 return res.json({status : "ok"});
            }
        }
        catch(err){
            return res.json({status : "error" , error : "record not added"})
        }

});
app.post("/api/updateRecord",async (req,res)=>{
    try{
        const {customerName,loanID,billNumber,amount} = req.body;
        if(!customerName || !loanID || !billNumber || !amount){
            return res.json({status : "noInput"});
        }
        else{
            const find = await Loan.findOne({
                customerName : req.body.customerName,
                loanID : req.body.loanID,
            }
            )
            if(find){
                const findBillNumber = await Loan.findOne({
                    billNumber : req.body.billNumber,
                })
                if(findBillNumber){
                    return res.json({status : "invalidBillNumber"});
                }
                else{
                    const checkUpdated = await Loan.findOne({loanID : req.body.loanID, customerName : req.body.customerName, amount : req.body.amount, paidStatus : "Paid"})
                    if(checkUpdated)
                        return res.json({status : "alreadyUpdated"})
                    else{
                        await Loan.updateOne({
                            customerName : req.body.customerName,
                            loanID : req.body.loanID,
                        }
                        ,{
                            $set : {billNumber : req.body.billNumber,paidStatus : "Paid"}
                        }
                        )
                        return res.json({status : "ok"});
                    }
                }

            }
            else{
                return res.json({status : "noRecord"});
            }
        }
    }
    catch(err){
        return res.json({status : "error",error : "record not updated"})
    }
});
app.post("/api/verifyRecord",async (req,res)=>{
    try{
        const {customerName,loanID,billNumber} = req.body;
        if(!customerName || !loanID || !billNumber )
            return res.json({status : "noInput"});  
        else{
            const checkExists = await Loan.findOne({
                customerName : req.body.customerName,
                loanID : req.body.loanID,
                billNumber : req.body.billNumber,
            })
            if(checkExists){
                const checkVerified = await Loan.findOne({customerName : req.body.customerName,loanID : req.body.loanID,verifyStatus : "Verified"});
                if(checkVerified)
                    return res.json({status : "alreadyVerified"});
                else{
                    await Loan.updateOne({
                        customerName : req.body.customerName,
                        loanID : req.body.loanID,
                        billNumber : req.body.billNumber,
                    },
                    {
                        $set : {verifyStatus : "Verified"}
                    })
                    return res.json({status : "ok"});
                }
            }
            else{
                return res.json({status : "noRecord"})
            }
        }   
    }
    catch(err){
       return res.json({status : "not-ok", error : "record not verified"})
    }
});

app.post("/api/deleteRecord",async (req,res)=>{
    try{
        const {customerName, loanID,billNumber} = req.body;
        if(!customerName || !loanID || !billNumber)
            return res.json({status : "noInput"})
        else{
            const checkExists = await Loan.findOne({
                customerName : req.body.customerName,
                loanID : req.body.loanID,
                billNumber : req.body.billNumber,
            })
            if(checkExists)
            {
                await Loan.deleteOne({
                    customerName : req.body.customerName,
                    loanID : req.body.loanID,
                })
                return res.json({status : "ok"});
            }
            else{
                return res.json({status : "noRecord"})
            }
        }
        
    }
    catch(err){
        return res.json({status : "error", error : "record not deleted"});
    }
})

app.post("/api/checkStatus",async (req,res)=>{
    try{
        const {loanID,billNumber } = req.body;
        if(!loanID || !billNumber)
            return res.json({status : "noInput"});

        const checkExists = await Loan.findOne({
                loanID : req.body.loanID,
                billNumber : req.body.billNumber,
        },)   
        if(!checkExists)
            return res.json({status : "noRecord"})
        else{
            const checkStatus = await Loan.findOne({loanID : req.body.loanID,billNumber : req.body.billNumber,verifyStatus : "Verified"});
            if(checkStatus)
                return res.json({status : "ok"})
            else    
                return res.json({status : "notVerified"})
        }
    }   
    catch(err){
        return res.json({status : "error", error :"error"});
    }

})

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
        return res.json({status : "ok"});
    }catch(error){
        return res.json({status : "error", error : "record not fetched"})
    }
})

app.post("/api/login", async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
        return res.json({status : "noInput"});
    else{
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
}
})

app.post("/api/adminLogin", async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
        return res.json({status : "noInput"});
    else{
        const admin = await Admin.findOne({
            email : req.body.email,
        });

        if(!admin){return {status : "error", error : "Invalid login"}}

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            admin.password
        );
        
        if(isPasswordValid){
            const token = jwt.sign(
            {
                email : admin.email,
            },
            "secret123",
        )
            return res.json({status : "ok",admin : token})
        }
        else{
            return res.json({status : "ok", admin : false})
        }
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
    return res.send("SMS sent");
})

app.listen(3001,()=>{
    console.log("Server started on 3001");
})