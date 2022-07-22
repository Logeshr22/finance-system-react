import React from "react";
import jwt from "jsonwebtoken"
import {useEffect,useState,useRef} from "react";
import "./Login.css"
import {toast} from "react-toastify";
import {Navigate, useNavigate} from "react-router-dom";
// import axios from "axios";



const CustomerDashboard = (props)=>{

    const [customerName,setCustomerName]= useState("");
    const [amount,setAmount] = useState("");
    const [loanID,setLoanID] = useState("");
    const [billNumber,setBillNumber] = useState("");

    const handleAmount = function(e){
        setAmount(e.target.value);
    }
    const handleLoanID = function(e){
        setLoanID(e.target.value);
    }
    const handleCustomerName  = function(e){
        setCustomerName(e.target.value);
    }
    const handleBillNumber = function(e){
        setBillNumber(e.target.value);
    }
    async function updateRecord(event){
        event.preventDefault();
        const response = await fetch("http://localhost:3001/api/updateRecord",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                customerName,
                billNumber,
                loanID,
                amount,
            }),
        })
        const data = await response.json();
        console.log(data);
        if(data.status==="ok"){
            console.log("updated");
            toast.success("Record Updated successfully")
        }
        else{
            toast.error("Record not updated");
        }
    }

    //display loan data
    const navigate = useNavigate();
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
                CUSTOMER DASHBOARD
            </div>
            <div className="display">

                <div className="LoanDetails">
                <h1 className="header" id="loginTitle">PAYMENT DETAILS</h1>
                <div className="formBox">
                <form id="formBox" onSubmit={updateRecord}>
                    <input type="text" id="customerName"
                    onChange={handleCustomerName}  name="customerName" placeholder="Customer Name" className="inputField" autoComplete="off" />

                    <input type="text" id="billNumber"
                    onChange={handleBillNumber}  name="billNumber" placeholder="Bill Number" className="inputField" autoComplete="off" />

                    <input type="text" id="loanID"
                    onChange={handleLoanID}  name="loanID" placeholder="LoanID" className="inputField" autoComplete="off" />

                    <input type="text" id="amount"
                    onChange={handleAmount} name="amount" placeholder="Amount" className="inputField" autoComplete="off"/>

                    <button  className="submitButton" >Update</button>
                </form> 
                </div>
                </div>
            </div>
            <div>
            </div>
           
            
        </div>
    )
}

export default CustomerDashboard;