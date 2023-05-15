import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { GlobalProvider } from "../Auth/ContextAuth/GlobalContext";
import logo from "../components/ASSETS/images/logo.png";
import Index from ".";
function Main() {

  return (
    <GlobalProvider>
      <Router>
        <div className="main">
        <div className="containerMain">
          <div className="logoMain">
            <Link to={"/"}>
              <img className="imglogo" src={logo} alt=""></img>
            </Link>
            </div>
            <div className="Auth">
            <Link to={"/login"}>
              <button className="btnLog">Login</button><br />
            </Link> 
            <Link to="/register">
              <button className="btnSign">Sign Up</button>
            </Link>
              </div>
          </div>
          </div>

        <Routes>
          <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default Main;
