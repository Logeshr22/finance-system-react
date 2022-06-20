import React from "react";
import jwt from "jsonwebtoken"
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
const CustomerDashboard = ()=>{
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
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            const user = jwt.decode(token);
            if(!user){
                localStorage.removeItem("token");
                navigate("/Login");
            }
            else{
                populateQuote();
            }
        }
    },[])

    return (
        <div>  Hello world </div>
    )
}

export default CustomerDashboard;