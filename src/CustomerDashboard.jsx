import React from "react";
import {useState} from "react";
import "./Login.css"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import { render } from "react-dom";
import TextField from "@material-ui/core/TextField";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
// import axios from "axios";
const CustomerDashboard = (props)=>{
    //interest calculator
    const [principal, setPrincipal] = useState();
    const [years, setYears] = useState();
    const [interest, setInterest] = useState();
    const [result, setResult] = useState();
    
    const calculate = () => {
        // A=p(1+(r/n))^(nt)
        const result = principal * Math.pow(1 + interest, years);
        setResult(result.toFixed(2));
    };
    //theme
    const InputTheme = createTheme({
        palette: {
          primary: {
            main : "rgb(169, 1, 255)"
          }
        },
        typography:{
            fontFamily : "Montserrat",
            fontSize : 13,
        },
        shadows:"none",
        

    });
    const ButtonTheme = createTheme({
        palette: {
          primary: {
            main : "rgb(169, 1, 255)"
          }
        },
        typography:{
            fontFamily : "Montserrat",
            fontSize : 14,
        },
        shadows:"none",
        

    });
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
        else if(data.status === "noInput"){
            toast.error("Please fill the details");
        }
        else if(data.status === "noRecord"){
            toast.error("No such Record")
        }
        else if(data.status === "invalidBillNumber"){
            toast.error("Bill Number is invalid")
        }
        else if(data.status === "alreadyUpdated")
            toast.error("Record already updated")
    }

    // async function checkStatus(event){
    //     event.preventDefault();
    //     const response = await fetch("http://localhost:3001/api/checkStatus",{
    //         method:'POST',
    //         headers:{
    //             'Content-Type' : 'application/json',
    //         },
    //         body : JSON.stringify({
    //             customerName,
    //             billNumber,
    //             loanID,
    //             amount, 
    //         }),
    //     })
    //     const data = await response.json();
    //     console.log(data);
    //     if(data.status==="ok"){
    //         console.log("verified");
    //         toast.success("Your record was verified")
    //     }
    //     else if(data.status==="not-ok"){
    //         console.log("not verified")
    //         toast.error("Your record is not verified");
    //     }else{
    //         toast.error("Please fill the details");
    //     }
    // }

    const navigate = useNavigate();
    const handleLogoutButton = () =>{
        navigate("/Login");
    }

    


    return (
        <div className="CustomerDashboard">
            <div className="titleContainer">
                <p className="title">CUSTOMER DASHBOARD</p>
                <button className="logoutButton" onClick={handleLogoutButton}>Logout</button>
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

                    <button  className="submitButton">Update</button>
                    
                </form> 
                </div>
                </div>
                <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh",
        }}
      >
        <form className="material-form">
        <h1 id="interestCalculatorHeader">INTEREST CALCULATOR</h1>
        <Grid container direction={"column"} spacing={2}>        
            <Grid item>
                <ThemeProvider theme = {InputTheme}>
                <TextField
                label="What is the principal?"
                variant="outlined"
                type="number"
                style={{width : 230}}
                onChange={(e) => setPrincipal(e.target.value)}
                />
                </ThemeProvider>
            </Grid>          
            <Grid item>
                <ThemeProvider theme = {InputTheme}>
                <TextField
                label="How many years?"
                variant="outlined"
                type="number"
                style={{width : 230}}
                onChange={(e) => setYears(e.target.value)}
                />
                </ThemeProvider>
            </Grid>  
            <Grid item>
                <ThemeProvider theme = {InputTheme}>
                <TextField
                label="Annual Interest rate?"
                variant="outlined"
                type="number"
                style={{width : 230}}
                onChange={(e) => setInterest(e.target.value / 100)}
                />
                </ThemeProvider>
            </Grid>
            <br />
            <br />
            <div>
            <ThemeProvider theme = {ButtonTheme}>
            <Button
                variant="contained"
                color="primary"
                font="Montserrat"
                style={{borderRadius : 8, padding : 10, paddingRight:14,paddingLeft : 14,fontWeight : 700,}}
                onClick={() => {
                    calculate();
                }}
                >
                Calculate
            </Button>
            </ThemeProvider>
            </div>
            <br />
            <br />
            <div className="resultValue" style={{ fontSize: "30px" , color : "black"}}>₹{result}</div>
            </Grid>
        </form>
      </div>

                {/* <div className="LoanDetails">
                <h1 className="header" id="loginTitle">CHECK STATUS</h1>
                <div className="formBox">
                <form id="formBox" onSubmit={checkStatus}>
                    <input type="text" id="customerName"
                    onChange={handleCustomerName}  name="customerName" placeholder="Customer Name" className="inputField" autoComplete="off" />

                    <input type="text" id="loanID"
                    onChange={handleLoanID}  name="loanID" placeholder="LoanID" className="inputField" autoComplete="off" />


                    <button  className="submitButton" >Check Status</button>
                </form> 
                </div>
                </div> */}


            </div>
            <div>
            </div>
           
            
        </div>
    )
}

export default CustomerDashboard;