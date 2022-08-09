import React from "react";
import "./Login.css";
import {useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
// import {Link,Routes, BrowserRouter as Router,Route} from "react-router-dom";
// import AdminLogin from "./AdminLogin";
function AdminLogin(){
    //Form Validation

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
    async function loginAdmin(event){
        event.preventDefault();
        const response  = await fetch('http://localhost:3001/api/adminLogin/',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                email,
                password,
            }),
        })
        console.log(response);
        const data = await response.json();
        try{
            if(data.admin){
                localStorage.setItem("token",data.admin);
                window.location.href = "./AdministratorDashboard"; 
            }else{
                console.log("Invalid Credentials");
            }
        }
        catch(e){
            console.error(e);
            toast.error("Login failed");
        }
        console.log(data);
    }
    const navigate = useNavigate();
    const handleOnClickLink = () =>{  
        navigate("/Login");
    }
    // async function registerAdmin(event){
    //     event.preventDefault();
    //     const response  = await fetch('http://localhost:3001/api/adminRegister/',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type' : 'application/json',
    //         },
    //         body : JSON.stringify({
    //             email,
    //             password,
    //         }),
    //     })
    //     const data = await response.json();
    //     console.log(data);
        
    //     if(data.status==="ok"){
    //         // navigate("/Login");
    //         toast.success("Registered Successfully");
    //     }
    // }
    return(
        <div className="Login">
            <div className="formContainer">
            <h1 className="header" id="loginTitle">ADMINISTRATOR LOGIN <span><span id="l1" >KRISHNA </span>
                <span id="l2">FINANCE</span></span></h1>
                {/* <button className="submitButton" onClick={registerAdmin}>Reigster Admin</button> */}
            <div className="form">
            <br />
            <form id="form" onSubmit={loginAdmin}>
                <input type="email" name="email" placeholder="Email" className="inputField" 
                 onChange={handleEmail}/>
                {/* <p className="errorMessage">{formErrors.email}</p> */}
                <input type="password" name="password" placeholder="Password" className="inputField" 
                 onChange={handlePassword}/>
                {/* <p className="errorMessage">{formErrors.password}</p> */}
                <button className="submitButton">Login</button>
                {/* <button class="submitButton">Login as admin</button> */}   
                <p className="link" onClick={handleOnClickLink}>Login as Customer?</p>
            </form>
            </div>
            </div>
        </div>
    );
}

export default AdminLogin;


