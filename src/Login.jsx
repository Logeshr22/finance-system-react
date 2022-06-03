import React from "react";
import "./Login.css";
function Login(){
    return(
        <div className="Login">
            <div id="dialogue">
            <span >Account created successfully</span>
            </div>
            <div className="formContainer">
            <h1 className="header" id="loginTitle">Customer Login</h1>
            <div className="form">
            <br />
            <form action method="post">
                <input type="text" name="username" placeholder="Username" className="inputField" />
                <br />
                <input type="password" name="password" placeholder="Password" className="inputField" />
                <br />
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


