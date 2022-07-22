import React from "react";
import loan1 from "./loan1.jpeg";
import loan2 from "./loan2.jpeg";
import loan3 from "./loan3.jpeg";
import loan4 from "./loan4.jpeg";
// import {bg1,stLoan} from "images";
import "./home.css";
function Home(){
    return (
        <div className="Home">
            <table>
                <tr>
                    <td className="div1part1">
                    <p id="mainHeading"><span id="l1" >KRISHNA </span><span id="l2" className="">FINANCE</span></p>
                    <p id="heading">YOUR <span className="highlight">ESSENTIAL</span> FINANCE MANAGEMENT SYSTEM</p>
                    </td>
                    <td className="div1part2">
                    <p className="largeText">What we do <span className="hightlight">?</span></p>
                    <p className="pText">Our Finance management system processes an organization uses to manage assets, income and expenses. This FMS performs various functions: reducing accounting errors, maintaining audit trails and ensuring compliance with applicable accounting standards.</p>
                    </td>
                </tr>
            </table>
            <div className="part2">
            <p className="largeText"><span><span id="l1" >LOANS </span>
                <span id="l2">OFFERED</span></span></p>
            <div className="images">
                <div className="img"><img src={loan1} height={200} width={200} alt=""></img>
                <span className="imageText">Short term loan 2%</span></div>
                <div className="img"><img src={loan2} height={200} width={200} alt=""></img>
                <span className="imageText">Monthly due 1.5%</span></div>
                <div className="img"><img src={loan3} height={200} width={200} alt=""></img>
                <span className="imageText">Daily loan 3%</span></div>
                <div className="img"><img src={loan4} height={200} width={200} alt=""></img>
                <span className="imageText">HP loan 1.00-1.15 %</span></div>
            </div>
            </div>
            <div className="footer"><span id="l1">KRISHNA </span><span id="l2">FINANCE</span> &#169; All Rights Reserved.</div>
            
        </div>
    );
}

export default Home;