import React from "react";
import bg1 from "./images/bg1.jpg";
import stLoan from "./images/stLoan.png"
// import {bg1,stLoan} from "images";
import "./home.css";
function Home(){
    return (
        <div className="Home">
            <p id="mainHeading"><span id="l1">MONEY </span><span id="l2">MATTERS</span></p>
            <p id="heading">YOUR <span class="highlight">ESSENTIAL</span> FINANCE MANAGEMENT SYSTEM.</p>
            <p class="largeText">What our software do ?</p>
            <p className="pText">Money Matters processes an organization uses to manage assets, income and expenses. This FMS performs various functions: reducing accounting errors, maintaining audit trails and ensuring compliance with applicable accounting standards.</p>
            <p className="largeText">Types of Loans</p>
            <div className="images">
                <div className="img"><img src={stLoan} height={200} width={200}></img>
                <span className="imageText">Short term loan 2%</span></div>
                <div className="img"><img src={stLoan} height={200} width={200}></img>
                <span className="imageText">Monthly due 1.5%</span></div>
                <div className="img"><img src={stLoan} height={200} width={200}></img>
                <span className="imageText">Daily loan 3%</span></div>
                <div className="img"><img src={stLoan} height={200} width={200}></img>
                <span className="imageText">HP loan 1.00-1.15 %</span></div>
            </div>
            <div className="footer"><span id="l1">MONEY </span><span id="l2">MATTERS</span> &#169; All Rights Reserved.</div>
        </div>
        // <div className="Home">
        //     <p>Hello
        //     </p>
        // </div>
    );
}

export default Home;