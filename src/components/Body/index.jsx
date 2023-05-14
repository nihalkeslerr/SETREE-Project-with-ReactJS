import React from "react";

import Footer from "../Footer/footer";
import Sidebar from "./Sidebar";
import Collection from "../Collection/collection";
import Social from "../Social/social";
import SocialDetail from "../Social/socialDetail";
import Goal from "../Goal/goal";
import CollectionDetail from "../Collection/collectionDetail";
import Wheel from "../Wheel/wheel";
import Profile from "../Profile/Profile";
import logo from "../ASSETS/images/logo.png"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function Body() {
  return (
    <Router>
      <div>
        <div>
          <img className="imglogo" src={logo} alt=""></img>
        </div>
        <Sidebar />
        <Switch>
          <Route path="/goal" component={Goal}></Route>
          <Route path="/social" component={Social}></Route>
          <Route exact path="/" component={Collection}></Route>
          <Route path="/socialDetail" component={SocialDetail}></Route>
          <Route path="/wheel" component={Wheel}></Route>
          <Route path="/collectionDetail" component={CollectionDetail}></Route>
          <Route path="/profile" component={Profile}></Route>
        </Switch>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default Body;
