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
import UpdateProfle from "../Profile/UpdateProfle";
import logo from "../ASSETS/images/logo.png";
import { GlobalProvider } from "../Context/GlobalContext";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from "react-router-dom";

function Body() {
  return (
    <GlobalProvider>
      <Router>
        <div>
          <div>
            <NavLink to="/">
              <img className="imglogo" src={logo} alt=""/>
            </NavLink>
          </div>

          <Sidebar />
          <Switch>
            <Route path="/goal" component={Goal}></Route>
            <Route path="/social" component={Social}></Route>
            <Route exact path="/" component={Collection}></Route>
            <Route path="/socialDetail" component={SocialDetail}></Route>
            <Route path="/wheel" component={Wheel}></Route>
            <Route
              path="/collectionDetail"
              component={CollectionDetail}
            ></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/updateprofile" component={UpdateProfle} />
          </Switch>
          <Footer></Footer>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default Body;
