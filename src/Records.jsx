import React from "react"
import axios from "axios"
import "./Login.css";
import {useNavigate} from "react-router-dom";
class Records extends React.Component{
    state = {
        loanID : "",
        amount : "",
        interest : "",
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
          <div key={index} className="table-container">
            <table>
                <tr>
                    <td className="table-header"><h3>LOAN ID (#)</h3></td>
                    <td className="table-header"><h3>AMOUNT (₹)</h3></td>
                </tr>
                <tr>
                    <td className="table-data"> <h3>{post.loanID}</h3></td>
                    <td className="table-data"><h3>{post.amount}</h3></td>
                </tr>
            </table> 
          </div>
        ));
    }
    render(){
        console.log("State : ",this.state);

        return(
            <div className="Records">
                <h1 className="table-title">Loan Records</h1>
                {this.displayPosts(this.state.posts)}
                <button className="submitButton">Back</button>
            </div>
           
        )
    }
}


export default Records;