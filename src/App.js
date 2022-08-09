import './App.css';
import {Link,Routes, BrowserRouter as Router,Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import About from "./About";
import Records from "./Records";
import AdminLogin from "./AdminLogin";
import CustomerDashboard from "./CustomerDashboard";
import AdministratorDashboard from "./AdministratorDashboard";
import NotFoundPage from "./NotFoundPage";
import "./Navigation.css";
import {Helmet} from "react-helmet";
import Background from "./bg3.jpg";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  var sectionStyle = {
    backgroundImage: "url(" + { Background } + ")"
  };
  return (
    <div className="App" style={sectionStyle}>
      <ToastContainer autoClose={5000} />
      <Helmet>
        <style>{"body { background-color : white; }"}</style>
      </Helmet>
      <Router>
          <nav>
              <span><span id="l1">KRISHNA </span><span id="l2">FINANCE</span></span>
              <Link to="./Home" className="text-link">HOME</Link>
              <Link to="./Login" className="text-link">LOGIN</Link>
              <Link to="./Register" className="text-link">REGISTER</Link>
              <Link to="./About" className="text-link">ABOUT</Link>
          </nav> 
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Home" element={<Home/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Register" element={<Register/>}/>
          <Route exact path="/About" element={<About/>}/>
          <Route exact path="/Records" element={<Records/>}/>
          <Route exact path="/CustomerDashboard" element={<CustomerDashboard/>}/>
          <Route exact path="/AdministratorDashboard" element={<AdministratorDashboard/>}/>
          <Route exact path="/AdminLogin" element={<AdminLogin/>}/>
          <Route exact path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
