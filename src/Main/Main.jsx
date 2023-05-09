import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { GlobalProvider } from "../Auth/ContextAuth/GlobalContext";

function Main() {
  return (
    <GlobalProvider>
      <Router>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
        <Link>
          <button>Login</button>
        </Link>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default Main;
