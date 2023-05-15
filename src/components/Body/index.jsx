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
import logo from "../ASSETS/images/logo.png";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function Body() {
  return (
    <Router>
      <div>
        <NavLink to={"/"}>
          <div>
            <img className="imglogo" src={logo} alt=""></img>
          </div>
        </NavLink>
        <Sidebar />
        <Routes>
          <Route path="/goal" element={<Goal />} />
          <Route path="/social" element={<Social />} />
          <Route path="/" element={<Collection />} />
          <Route path="/socialDetail" element={<SocialDetail />} />
          <Route path="/wheel" element={<Wheel />} />
          <Route path="/collectionDetail" element={<CollectionDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default Body;
