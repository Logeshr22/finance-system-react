import "./Login.css";
import {useState,useEffect} from "react";
function Register(){
    const initialValues = {name : "",email : "",password : ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);

    const handleChange = function(e){
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    };
    const handleSubmit = function(e){
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }
    const validate = function(values){
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.name){
            errors.name = "Name is required";
        }
        if(!values.email){
            errors.email = "Email is required";
        }else if(!regex.test(values.email)){
            errors.email = "Enter a valid email"
        }
        if(!values.password){
            errors.password = "Passwrod is required";
        }else if(values.password.length < 4){
            errors.password = "Password should be more than 4 characters"
        }else if(values.password.length > 15){
            errors.password = "Password cannot exceed more than 15 characters"
        }
        return errors;
    }
    useEffect(()=>{
        if(Object.keys(formErrors).length===0&&isSubmit){
            console.log(formValues);    
        }
    },[formErrors]);
    
    return(
        <div className="Register">
                <div className="formContainer">
                <h1 className="header" id="loginTitle">REGISTER 
                    <span><span id="l1" >KRISHNA </span>
                <span id="l2">FINANCE</span></span> </h1>
                <div className="form">
                    <br />
                    <form id="form" onSubmit={handleSubmit}>
                    <div className="error"></div>
                    <input type="text" id="name"  name="name" placeholder="Name" className="inputField" autoComplete="off" value={formValues.name} onChange={handleChange}/>
                    <p className="errorMessage">{formErrors.name}</p>
                    {/* <input type="text" name="lastName" placeholder="Last Name" className="inputField" /> */}
                    <input type="email" id="email" name="email" placeholder="Email" className="inputField" autoComplete="off" value={formValues.email} onChange={handleChange}/>
                    <p className="errorMessage">{formErrors.email}</p>
                    {/* <input type="text" name="username" placeholder="Username" className="inputField" /> */}
                    <input type="password" id="password" name="password" placeholder="Password" className="inputField" autoComplete="off" value={formValues.password} onChange={handleChange}/>
                    <p className="errorMessage">{formErrors.password}</p>
                    <button  className="submitButton">Register</button>
                    {/* <button class="submitButton">Login as admin</button> */}    
                    <p><a href="/Users/logee/Documents/Codes/miniProject/finance-system/login.html" className="link">Already Registerd? Login</a></p>
                    </form>                 
                </div>
                </div>
               
        </div>
    );
}



export default Register;
