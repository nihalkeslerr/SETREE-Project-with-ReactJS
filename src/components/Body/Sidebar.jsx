import React from "react";
import profileImg from "./images/profile.png";
import socialImg from "./images/social.png";
import goalImg from "./images/goal.png";
import collectionImg from "./images/collection.png";
import wheelImg from "./images/wheel.png";
import menuImg from "./images/menu.png";
import logoImg from "./images/logoImg.png";

import { BrowserRouter as Router, NavLink,useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [display, setDisplay] = useState("open");
  const location = useLocation();

  return (
    <header>
      <div className={`sidebar ${display}`}>
        <ul>
          <li>
            <button
              className="menu"
              onClick={() => setDisplay(display === "open" ? "close" : "open")}
            >
              <img src={menuImg}></img>
            </button>
            <img
              style={{ width: " 78px" }}
              className="logoSidebar"
              src={logoImg}
            />
          </li>

          <li>
            <NavLink to="/social" isActive={() => location.pathname === "/social"}>
              <img src={socialImg}></img>
              <label htmlFor="social">Social</label>
            </NavLink>
          </li>

          <li>
            <NavLink to="/goal" isActive={() => location.pathname === "/goal"}>
              <img src={goalImg}></img>
              <label htmlFor="goal">Goal</label>
            </NavLink>
          </li>

          <li>
            <NavLink to="/" isActive={() => location.pathname === "/"}>
              <img src={collectionImg}></img>
              <label htmlFor="collection">Collection</label>
            </NavLink>
          </li>

          <li>
            <NavLink to="/wheel" isActive={() => location.pathname === "/wheel"}>
              <img src={wheelImg}></img>
              <label htmlFor="wheel">Wheel</label>
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" isActive={() => location.pathname === "/profile"}>
              <img src={profileImg}></img>
              <label htmlFor="profile">Profile</label>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Sidebar;
