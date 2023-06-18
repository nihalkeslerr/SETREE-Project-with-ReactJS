import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { GlobalProvider } from "../Auth/ContextAuth/GlobalContext";
import logo from "../components/ASSETS/images/logo.png";
import appstore from "./ASSESTS/appstore.jpg";
import Index from ".";
function Main() {
  return (
    <GlobalProvider>
      <Router>
        <div className="main">
          <div className="containerMain">
            <div className="mainContent">
              <ul>
                <li>
                  {" "}
                  <a
                    href="#content"
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector("#content");
                      target.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    Setree 101
                    <br />
                  </a>
                </li>
                <li>
                  {" "}
                  <a href="#HowItWorks"
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector("#HowItWorks");
                      target.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}>How it works?</a>
                </li>
                
              </ul>
                <img className="appStore" src={appstore} alt="" />
            </div>
            <div className="logoMain">
              <Link to={"/"}>
                <img className="imglogo" src={logo} alt=""></img>
              </Link>
            </div>
            <div className="Auth">
              <Link to={"/login"}>
                <button className="btnLog">Login</button>
                <br />
              </Link>
              <Link to="/register">
                <button className="btnSign">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>

        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Index} />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default Main;
