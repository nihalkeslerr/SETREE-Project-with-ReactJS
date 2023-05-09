import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { GlobalProvider } from "../Auth/ContextAuth/GlobalContext";
import Index from ".";
function Main() {
  return (
    <GlobalProvider>
      <Router>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
        <Link to={"/"}></Link>
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
