import './App.css';
import {Link,Routes, BrowserRouter as Router,Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import About from "./About";
import "./Navigation.css";
// import Navbar from "./Navbar";
function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Router>
          <nav>
              <span><span id="l1">MONEY </span><span id="l2">MATTERS</span></span>
              <Link to="./" className="text-link">HOME</Link>
              <Link to="./Login" className="text-link">LOGIN</Link>
              <Link to="./Register" className="text-link">REGISTER</Link>
              <Link to="./About" className="text-link">ABOUT</Link>
          </nav>   
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Register" element={<Register/>}/>
          <Route exact path="/About" element={<About/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
