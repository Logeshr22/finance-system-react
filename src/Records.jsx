import React from "react"
import axios from "axios"
import "./Login.css";
import {useNavigate} from "react-router-dom";
class Records extends React.Component{
    state = {
        customerName : "",
        loanID : "",
        amount : "",
        billNumber : "",
        paidStatus : "",
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
                <h1 className="table-title">Loan Records</h1>
                <div className="table-container">
                <table className="table">
                    <tr>
                        <td className="table-header"><h3>NAME OF CUSTOMER</h3></td>
                        <td className="table-header"><h3>LOAN ID (#)</h3></td>
                        <td className="table-header"><h3>AMOUNT (₹)</h3></td>
                        <td className="table-header"><h3>BILL NUMBER</h3></td>
                        <td className="table-header"><h3>PAID STATUS</h3></td>

                    </tr>
                </table>
                </div>
                {this.displayPosts(this.state.posts)}
                <button className="submitButton" onClick={toCustomerDashboard}>Back</button>
            </div>
        )
    }
}
function WithNavigate(props){
    let navigate = useNavigate();
    return <Records {...props} navigate={navigate}/>
}


export default WithNavigate;