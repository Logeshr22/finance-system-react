import React from "react";
import jwt from "jsonwebtoken"
import {useEffect,useState,useRef} from "react";
import "./Login.css"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

// import axios from "axios";



const CustomerDashboard = ()=>{
    // const getBlogPost = ()=>{
    //     axios.get("https://localhost:27017/")
    // }

    //Timer
    const [timerDays,setTimerDays] = useState();
    const [timerHours,setTimerHours] = useState();
    const [timerMinutes,setTimerMinutes] = useState();
    const [timerSeconds,setTimerSeconds] = useState();

    let interval = useRef();
    const startTimer = ()=>{
        const countdownDate = new Date("Jul 17, 2022 17:25:00").getTime();
        interval = setInterval(()=>{
            const now = new Date().getTime();
            const distance = countdownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 *24)/(1000*60*60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60))/(1000*60));
            const seconds = Math.floor((distance % (1000 * 60))/1000);
            if(distance<0){
                //stop timer
                clearInterval(interval.current);
            }
            else{
                //update timer
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        },1000)
    }
    useEffect(()=>{
        startTimer();
        return () => {
            clearInterval(interval.current);
        };
    })



    const navigate = useNavigate();
    async function populateQuote(){
        const req = await fetch("http://localhost:3001/api/quote",{
            headers : {
                "x-access-token" : localStorage.getItem("token"),
            },
        })
        const data = req.json();
        console.log(data); 
    }

    //display loanData


    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            const user = jwt.decode(token);
            if(!user){
                localStorage.removeItem("token");
                navigate("/Login");
            }
            else{
                // populateQuote();
            }
        }
    },)
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
    async function addRecord(event){
        event.preventDefault();
        const response = await fetch("http://localhost:3001/api/addRecord",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                loanID,
                amount,
                interest
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
    //fetch loan Data
    async function fetchData(event){
        event.preventDefault();
        const response = await fetch("http://localhost:3001/api/fetchData",{
            method : "POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                loanID,
                amount,
                interest,
            }),
        })
        const data = await response.json();
        console.log(data);
        if(data.status==="ok"){
            console.log("fetched");
        }else{
            console.log("error fetching")
        }
    }

    //display loan data
    // const [loans,setLoans] = useState([]);
    // const fetchLoanData = ()=>{
    //     fetch("http://localhost:3001/api/fetchData")
    //     .then(response=>{
    //         return response.json()
    //     })
    //     .then(data=>{
    //         setLoans(data)
    //     })
    // }



    async function deleteRecord(event){
        event.preventDefault();
        const response = await fetch("http://localhost:3001/api/deleteRecord",{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                loanID,
                amount,
                interest
            }),
        })
        const data = await response.json();
        console.log(data);
        if(data.status === "ok"){
            console.log("deleted");
            toast.success("Record deleted successfully")
        }  
    }

    return (
        <div className="CustomerDashboard">
            <div className="display">

                <div className="formContainerBox">
                <h1 className="header" id="loginTitle">ADD RECORD</h1>
                <div className="formBox">
                <form id="formBox" onSubmit={addRecord}>
                    <input type="text" id="loanID" value={loanID}
                    onChange={handleLoanID}  name="loanID" placeholder="LoanID" className="inputField" autoComplete="off" />

                    <input type="text" id="amount" value={amount}
                    onChange={handleAmount} name="amount" placeholder="Amount" className="inputField" autoComplete="off"/>

                    <input type="text" id="interest" value={interest}
                    onChange={handleInterest} name="interest" placeholder="Interest" className="inputField" autoComplete="off" />

                    <button  className="submitButton" >Add Loan Record</button>
                </form> 
                </div>
                </div>
                <div className="timerRecordBox">
                
                <div className="timerBox" >
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
                    
                </div>
                <div className="recordBox">
                    <p className="record-text">No. of Records :</p>
                </div>
                </div>
                
                <div className="formContainerBox">
                <h1 className="header" id="loginTitle">DELETE RECORD</h1>
                <div className="formBox">
                <form id="formBox" onSubmit={deleteRecord}>
                    <input type="text" id="loanID" onChange={handleLoanID}
                     name="loanID" placeholder="LoanID" className="inputField" autoComplete="off" />

                    <input type="text" id="amount" onChange={handleAmount}
                     name="amount" placeholder="Amount" className="inputField" autoComplete="off"/>

                    <input type="text"  id="intereset" onChange={handleInterest}
                     name="interest" placeholder="Interest" className="inputField" autoComplete="off" />

                    <button  className="submitButton" >Delete Loan Record</button>
                </form> 
               
                </div>
                </div>
                
                

            </div>
            <div>
                <button className="submitButton" onClick={fetchData}>Show records</button>
            </div>
           
            
        </div>
    )
}

export default CustomerDashboard;