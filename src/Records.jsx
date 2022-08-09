import React from "react"
import axios from "axios"
import {useState} from "react";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import { MDBIcon } from 'mdb-react-ui-kit';

class Records extends React.Component{
    state = {
        customerName : "",
        loanID : "",
        amount : "",
        billNumber : "",
        paidStatus : "",
        verifyStatus : "",
        posts : [],
    };
    componentDidMount = () =>{
        this.getRecords();
    }
    

    getRecords = () =>{
        axios.get("/api")
        .then((response)=>{
            const data = response.data;
            this.setState({posts : data});
            console.log("Data has been received");
        })
        .catch(()=>{
            console.log("Error receiving data");
        });
    }


    displayPosts=(posts)=>{
        if (!posts.length) return null;
        return posts.map((post, index) => (
          <div key={index}  className="table-container">
            <table className="table">
                <tr>
                    <td className="table-data"> <h3>{post.customerName}</h3></td>
                    <td className="table-data"> <h3>{post.loanID}</h3></td>
                    <td className="table-data"><h3>{post.amount}</h3></td>
                    <td className="table-data"><h3>{post.billNumber}</h3></td>
                    <td className="table-data"><h3>{post.paidStatus}</h3></td>
                    <td className="table-data"><h3>{post.verifyStatus}</h3></td>

                </tr>
            </table> 
          </div>
        ));
    }

    render(){
        console.log("State : ",this.state);

        const toCustomerDashboard = ()=>{
            this.props.navigate("/AdministratorDashboard");
        }
        return(
            <div className="Records">
                <div className="titleContainer">
                    <p className="title">LOAN RECORDS</p>
                </div>
            <div className="Record-container">
            <div className="Record">
                <div className="table-container">
                <table className="table">
                    <tr>
                        <td className="table-header"><h3>CUSTOMER NAME</h3></td>
                        <td className="table-header"><h3>LOAN ID (#)</h3></td>
                        <td className="table-header"><h3>AMOUNT (₹)</h3></td>
                        <td className="table-header"><h3>BILL NUMBER</h3></td>
                        <td className="table-header"><h3>PAID STATUS</h3></td>
                        <td className="table-header"><h3>VERIFY STATUS</h3></td>

                    </tr>
                </table>
                </div>
                {this.displayPosts(this.state.posts)}
                {/* <button className="submitButton" onClick={toCustomerDashboard}>Back</button> */}
                </div>

                
            </div>
            <button className="actionButton" onClick={toCustomerDashboard}>Back to Dashboard</button>

                {/* <p className="title">ADMINISTRATOR DASHBOARD</p> */}
                {/* <button className="logoutButton" onClick={handleLogoutButton}>Logout</button> */}
            </div>
        )
    }
}
function WithNavigate(props){
    let navigate = useNavigate();
    return <Records {...props} navigate={navigate}/>
}



export default WithNavigate;