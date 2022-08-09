import React from "react";
import {useState} from "react";
import "./Login.css"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
// import axios from "axios";



const AdministratorDashboard = (props)=>{

    const [customerName,setCustomerName]= useState("");
    const [amount,setAmount] = useState("");
    const [billNumber,setBillNumber] = useState("");
    const [loanID,setLoanID] = useState("");

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

    //send sms
    // async function sendSMS(event){
    //     event.preventDefault();
    //     const response = await fetch("http://localhost:3001/send-sms");
    //     const data = await response.json();
    //     console.log(data);
    // }
    //add record
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
        if(data.status==="noInput"){
            toast.error("Please fill the details")
        }
        else if(data.status === "alreadyExists"){
            toast.error("Record already exists");
        }
        else if(data.status === "noInput"){
            toast.error("Please fill the details");
        }
        else if(data.status === "ok"){
            toast.success("Record Added")
        }
        else{
            toast.error("Invalid ID");
        }
    }
    //verify record
    async function verifyRecord(event){
        event.preventDefault();
        const response = await fetch("http://localhost:3001/api/verifyRecord",{
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
        if(data.status==="noInput"){
            toast.error("Please fill the details")
        } 
        else if(data.status === "noRecord"){
            toast.error("No such Record");
        }
        else if(data.status === "alreadyVerified"){
            toast.error("Record already verified");
        }
        else if(data.status === "ok"){
            toast.success("Record verified");
        }
    }
    //delete record
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
                billNumber,
            }),
        })
        const data = await response.json();
        console.log(data);
        if(data.status === "noInput"){
            toast.error("Please fill the details");
        } else if(data.status==="noRecord"){
            toast.error("No such Record");
        }else if(data.status==="ok"){
            toast.success("Record deleted");
        }
    }
    //display loan data
    const navigate = useNavigate();
    const handleOnClick = () =>{
        navigate("/Records");
    }

    const handleLogoutButton = () =>{
        navigate("/AdminLogin");
    }
    return (
        <div className="AdministratorDashboard">
            <div className="titleContainer">
                <p className="title">ADMINISTRATOR DASHBOARD</p>
                <button className="logoutButton" onClick={handleLogoutButton}>Logout</button>
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
                    onChange={handleAmount} name="amount" placeholder="Total Amount" className="inputField" autoComplete="off"/>

                    <button  className="submitButton" >Add Loan Record</button>
                </form> 
                </div>
                </div>

                <div className="formContainerBox">
                <h1 className="header" id="loginTitle">VERIFY RECORD</h1>
                <div className="formBox">
                <form id="formBox" onSubmit={verifyRecord}>
                    <input type="text" id="customerName"
                    onChange={handleCustomerName}  name="customerName" placeholder="Customer Name" className="inputField" autoComplete="off" />

                    <input type="text" id="loanID" onChange={handleLoanID}
                     name="loanID" placeholder="LoanID" className="inputField" autoComplete="off" />

                    <input type="text" id="billNumber" onChange={handleBillNumber}
                     name="billNumber" placeholder="Bill Number" className="inputField" autoComplete="off"/>

                    <button  className="submitButton">Verify Record</button>
                </form> 
                </div>
                </div>
                
                <div className="formContainerBox">
                <h1 className="header" id="loginTitle">DELETE RECORD</h1>
                <div className="formBox">
                <form id="formBox" onSubmit={deleteRecord}>
                    <input type="text" id="customerName"
                    onChange={handleCustomerName}  name="customerName" placeholder="Customer Name" className="inputField" autoComplete="off" />

                    <input type="text" id="loanID" onChange={handleLoanID}
                     name="loanID" placeholder="LoanID" className="inputField" autoComplete="off" />

                    <input type="text" id="billNumber" onChange={handleBillNumber}
                     name="billNumber" placeholder="Bill Number" className="inputField" autoComplete="off"/>

                    <button  className="submitButton" >Delete Loan Record</button>
                </form> 
                </div>
                </div>
                <div className="timerRecordBox">
                
                </div>
                
                

            </div>

            <div>
            <button className="actionButton" onClick={handleOnClick}>Show Records</button>

                {/* <p className="title">ADMINISTRATOR DASHBOARD</p> */}
                {/* <button className="logoutButton" onClick={handleLogoutButton}>Logout</button> */}
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