import React,{useState} from "react";
import "./Register.css";
import axios from "axios";
function Register(){
    const [input,setInput]=useState({
        name : "",
        lastName : "",
        email : "",
        username : "",
    })
    function handleChange(event){
        const {name,value}=event.target;
        setInput(prevInput=>{
            return{
                ...prevInput,
                [name]:value
            }
        })
    }
    function handleClick(event){
        event.preventDefault();
        const newNote = {
            name : input.name,
            lastName : input.lastName,
            email : input.email,
            username : input.username,
            password : input.password
        }
        axios.post("http://localhost:3001/Register",newNote);
    }

    function successMessage(){
        // const dialogue = document.getElementById("dialogue");
        const button = document.getElementsByClassName("submitButton");
        if(button.onClick){
            console.log("Hello");
        }
    }
    successMessage();


    return(
        <div className="Register">
            <div id="dialogue">
            <span >Account created successfully</span>
            </div>
                
                <div className="formContainer">
                <h1 className="header" id="loginTitle">User Registration</h1>
                <div className="form">
                    <br />
                    <form action="/src/data.jsx" method="post">
                    <input type="text" onChange={handleChange} name="name" placeholder="Name" className="inputField" />
                    <br />
                    <input type="text" onChange={handleChange} name="lastName" placeholder="Last Name" className="inputField" />
                    <br />
                    <input type="email" onChange={handleChange} name="email" placeholder="Email" className="inputField" />
                    <br />
                    <input type="text" onChange={handleChange} name="username" placeholder="Username" className="inputField" />
                    <br />
                    <input type="password" onChange={handleChange} name="password" placeholder="Password" className="inputField" />
                    <br />
                    <button onClick={handleClick} className="submitButton">Register</button>
                    {/* <button class="submitButton">Login as admin</button> */}    
                    <p><a href="/Users/logee/Documents/Codes/miniProject/finance-system/login.html" className="link">Already Registerd? Login</a></p>
                    </form>
                    
                </div>
                </div>
               
        </div>
    );
}



export default Register;
