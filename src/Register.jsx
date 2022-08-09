import "./Login.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
function Register(){
    //Form Validation
    // const initialValues = {name : "",email : "",password : ""};
    // const [formValues, setFormValues] = useState(initialValues);
    // const [formErrors, setFormErrors] = useState({});
    // const [isSubmit,setIsSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    // const handleChange = function(e){
    //     const {name,value} = e.target;
    //     setFormValues({...formValues,[name]:value});
    // };
    // const handleSubmit = function(e){
    //     e.preventDefault();
    //     setFormErrors(validate(formValues));
    //     setIsSubmit(true);
    // }
    // const validate = (value) => {
 
    //     if (validator.isStrongPassword(value, {
    //       minLength: 8, minLowercase: 1,
    //       minUppercase: 1, minNumbers: 1, minSymbols: 1
    //     })) {
    //       setErrorMessage('Strong Password')
    //     } else {
    //       setErrorMessage('Weak Password')
    //     }
    //   }
    // const validate = function(values){
    //     const errors = {};
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     if(!values.name){
    //         errors.name = "Name is required";
    //     }
    //     else if(values.name.length<4){
    //         errors.name = "Name must be at least 4 characters"
    //     }
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
    
    //Authentication 
    const navigate = useNavigate();
    const [name,setName ] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleName = (e)=>{
        setName(e.target.value);
    }
    const handleEmail = function(e){
        setEmail(e.target.value);
    }
    const handlePassword = function(e){
        setPassword(e.target.value);
    }
    const handleOnclick = function(){
        navigate("/Login");
    }
    async function registerUser(event){
        event.preventDefault();
        const response  = await fetch('http://localhost:3001/api/register/',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                name,
                email,
                password,
            }),
        })
        const data = await response.json();
        console.log(data);
        
        if(data.status==="ok"){
            navigate("/Login");
            toast.success("Registered Successfully");
        }
    }



    return(
        <div className="Register">
                <div className="formContainer">
                <h1 className="header" id="loginTitle">REGISTER 
                    <span><br/><span id="l1" >KRISHNA </span>
                <span id="l2">FINANCE</span></span> </h1>
                <div className="form">
                    <br />
                    <form id="form" onSubmit={registerUser}>
                    <div className="error"></div>
                    <input type="text" id="name"  name="name" placeholder="Name" className="inputField" autoComplete="off" 
                     onChange={handleName}/>
                    <input type="email" id="email" name="email" placeholder="Email" className="inputField" autoComplete="off"
                     onChange={handleEmail}/>
                    <input type="password" id="password" name="password" placeholder="Password" className="inputField" autoComplete="off" 
                     onChange={handlePassword}/>
                     {errorMessage === '' ? null : 
                     <span style={{fontWeight: 'bold',color: 'black'}}>{errorMessage}</span>}
                    {/* <p className="errorMessage">{formErrors.password}</p> */}
                    <button className="submitButton" >Register</button>
                    {/* <input type="submit" id="button" value="Register"></input> */} 
                    <p><a onClick={handleOnclick} className="link">Already Registerd? Login</a></p>
                    </form>                 
                </div>
                </div>    
        </div>
    );
}



export default Register;
