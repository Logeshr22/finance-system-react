import React from "react";
import "./Login.css";
import {useState,useEffect} from "react";
function Login(){
    // const initialValues = {email : "",password : ""};
    // const [formValues, setFormValues] = useState(initialValues);
    // const [formErrors, setFormErrors] = useState({});
    // const [isSubmit,setIsSubmit] = useState(false);

    // const handleChange = function(e){
    //     const {name,value} = e.target;
    //     setFormValues({...formValues,[name]:value});
    // };
    // const handleSubmit = function(e){
    //     e.preventDefault();
    //     setFormErrors(validate(formValues));
    //     setIsSubmit(true);
    // }
    // const validate = function(values){
    //     const errors = {};
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     if(!values.email){
    //         errors.email = "Email is required";
    //     }else if(!regex.test(values.email)){
    //         errors.email = "Enter a valid email"
    //     }
    //     if(!values.password){
    //         errors.password = "Passwrod is required";
    //     }else if(values.password.length < 4){
    //         errors.password = "Password should be more than 4 characters"
    //     }else if(values.password.length > 15){
    //         errors.password = "Password cannot exceed more than 15 characters"
    //     }
    //     return errors;
    // }
    // useEffect(()=>{
    //     if(Object.keys(formErrors).length===0&&isSubmit){
    //         console.log(formValues);    
    //     }
    // },[formErrors]);


    // Authentication
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleEmail = function(e){
        setEmail(e.target.value);
    }
    const handlePassword = function(e){
        setPassword(e.target.value);
    }
    async function loginUser(event){
        event.preventDefault();
        const response  = await fetch('http://localhost:3001/api/login/',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                email,
                password,
            }),
        })
        const data = await response.json();
        if(data.user){
            localStorage.setItem("token",data.user);
            alert("Login successful");
            window.location.href = "/cDashboard"; 
        }
        else{
            alert("Please check email and password");
        }
        console.log(data);
    }

    return(
        <div className="Login">
            <div className="formContainer">
            <h1 className="header" id="loginTitle">CUSTOMER LOGIN <span><span id="l1" >KRISHNA </span>
                <span id="l2">FINANCE</span></span></h1>
            <div className="form">
            <br />
            <form id="form" onSubmit={loginUser}>
                <input type="email" name="email" placeholder="Email" className="inputField" 
                 onChange={handleEmail}/>
                {/* <p className="errorMessage">{formErrors.email}</p> */}
                <input type="password" name="password" placeholder="Password" className="inputField" 
                 onChange={handlePassword}/>
                {/* <p className="errorMessage">{formErrors.password}</p> */}
                <button className="submitButton">Login</button>
                {/* <button class="submitButton">Login as admin</button> */}    
                <p><a href="/Users/logee/Documents/Codes/miniProject/finance-system/adminLogin.html" className="link">Login as admin?</a></p>
            </form>
            </div>
            </div>
        </div>
       
    );
}



export default Login;


