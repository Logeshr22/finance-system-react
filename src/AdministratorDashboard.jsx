import React from "react";
import jwt from "jsonwebtoken"
import {useEffect,useState,useRef} from "react";
import "./Login.css"
import {toast} from "react-toastify";
import {Navigate, useNavigate} from "react-router-dom";
// import axios from "axios";



const AdministratorDashboard = (props)=>{

    const [customerName,setCustomerName]= useState("");
    const [amount,setAmount] = useState("");
    const [interest,setInterest] = useState("");
    const [loanID,setLoanID] = useState("");

    const handleAmount = function(e){
        setAmount(e.target.value);
    }
    const handleInterest = function(e){
        setInterest(e.target.value);
    }
    const handleLoanID = function(e){
        setLoanID(e.target.value);
    }
    const handleCustomerName  = function(e){
        setCustomerName(e.target.value);
    }
    async function addRecord(event){
        event.preventDefault();
        const response = await fetch("http://localhost:3001/api/addRecord",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                customerName,
                loanID,
                amount,
            }),
        })
        const data = await response.json();
        console.log(data);
        if(data.status==="ok"){
            console.log("stored");
            toast.success("Record Added successfully")
        }
        else{
            toast.error("Record not added");
        }
    }
    //send sms
    async function sendSMS(event){
        event.preventDefault();
        const response = await fetch("http://localhost:3001/send-sms");
        const data = await response.json();
        console.log(data);
    }
    //fetch loan Data
    async function fetchData(event){
        event.preventDefault();
        const response = await fetch("http://localhost:3001/api/fetchData",{
            method : "POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                customerName,
                loanID,
                amount,
            }),
        })
        const data = await response.json();
        console.log(data); //status : "ok"
        if(data.status==="ok"){
            console.log("fetched");
        }else{
            console.log("error fetching")
        }
    }

    //delete the record
    async function deleteRecord(event){
        event.preventDefault();
        const response = await fetch("http://localhost:3001/api/deleteRecord",{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                customerName,
                loanID,
                amount,
            }),
        })
        const data = await response.json();
        console.log(data);
        if(data.status === "ok"){
            console.log("deleted");
            toast.success("Record deleted successfully")
        } else{
            toast.error("Record not deleted");
        }
    }

    //display loan data
    const navigate = useNavigate();
    const handleOnClick = () =>{
        navigate("/Records");
    }

    const [loan,setLoan] = useState("")
    async function populateLoan(){
        const req = await fetch("http://localhost:3001/api/loan",{
            headers : {
                "x-access-token" : localStorage.getItem("token"),
            },
        })
        const data = await req.json()
        if(data.status === "ok"){
            setLoan(data.loan);
            console.log(data);
        }
        else{
            alert(data.error);
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            const user = jwt.decode(token);
            if(!user){
                localStorage.removeItem("token");
                navigate("/Login");
            }
            else{
                populateLoan();
            }
        }
    },[])




    return (
        <div className="CustomerDashboard">
            <div className="title">
                ADMINISTRATOR DASHBOARD
            </div>
            <div className="display">

                <div className="formContainerBox">
                <h1 className="header" id="loginTitle">ADD RECORD</h1>
                <div className="formBox">
                <form id="formBox" onSubmit={addRecord}>
                    <input type="text" id="customerName"
                    onChange={handleCustomerName}  name="customerName" placeholder="Customer Name" className="inputField" autoComplete="off" />

                    <input type="text" id="loanID"
                    onChange={handleLoanID}  name="loanID" placeholder="LoanID" className="inputField" autoComplete="off" />

                    <input type="text" id="amount"
                    onChange={handleAmount} name="amount" placeholder="Amount" className="inputField" autoComplete="off"/>

                    <button  className="submitButton" >Add Loan Record</button>
                </form> 
                </div>
                </div>
                <div className="timerRecordBox">
                
                {/* <div className="timerBox" >
                    <p className="timer-text">Time remaining</p>
                    <div className="timerContainer">
                        <div className="timers">
                            <div className="timer">{timerDays}</div>
                            <div className="duration">Days</div>
                        </div>
                        <div className="timers">
                            <div className="timer">{timerHours}</div>
                            <div className="duration">Hours</div>
                        </div><div className="timers">
                            <div className="timer">{timerMinutes}</div>
                            <div className="duration">Mins</div>
                        </div><div className="timers">
                            <div className="timer">{timerSeconds}</div>
                            <div className="duration">Sec</div>
                    </div>
                    </div>
                    
                </div> */}

                </div>
                
                <div className="formContainerBox">
                <h1 className="header" id="loginTitle">DELETE RECORD</h1>
                <div className="formBox">
                <form id="formBox" onSubmit={deleteRecord}>
                    <input type="text" id="customerName"
                    onChange={handleCustomerName}  name="customerName" placeholder="Customer Name" className="inputField" autoComplete="off" />

                    <input type="text" id="loanID" onChange={handleLoanID}
                     name="loanID" placeholder="LoanID" className="inputField" autoComplete="off" />

                    <input type="text" id="amount" onChange={handleAmount}
                     name="amount" placeholder="Amount" className="inputField" autoComplete="off"/>

                   

                    <button  className="submitButton" >Delete Loan Record</button>
                </form> 
               
                </div>
                </div>
                
                
                

            </div>
            <div className="recordBox">
                    <button className="submitButton" onClick={handleOnClick}>Show Records</button>
                </div>
            <div>
                {/* <button className="submitButton" onClick={sendSMS}>Send SMS</button> */}
                {/* <ul>
                    {loans.map(loans=>(
                        <li key={loans.id}>{loans.amount}</li>
                    ))}
                </ul> */}
            </div>
           
            
        </div>
    )
}

export default AdministratorDashboard;