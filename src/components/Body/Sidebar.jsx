import React from "react";
import profileImg from "./images/profile.png";
import socialImg from "./images/social.png";
import goalImg from "./images/goal.png";
import collectionImg from "./images/collection.png";
import wheelImg from "./images/wheel.png";
import menuImg from "./images/menu.png";
import logoImg from "./images/logoImg.png";
import Logout from "./images/logout.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [display, setDisplay] = useState("open");
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    // Örneğin:
    localStorage.removeItem("token"); // Token'ı localStorage'dan sil

    // Login sayfasına yönlendir
    window.location.href = "/login";
    toast.success("Log Out Successful!");
  };

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
            <NavLink
              to="/social"
              isActive={(match, location) => {
                return (
                  location.pathname === "/social" ||
                  location.pathname === "/SocialDetail"
                );
              }}
            >
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
            <NavLink
              to="/"
              isActive={(match, location) => {
                return (
                  location.pathname === "/" 
                );
              }}
            >
              <img src={collectionImg}></img>
              <label htmlFor="collection">Collection</label>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/wheel"
              isActive={() => location.pathname === "/wheel"}
            >
              <img src={wheelImg}></img>
              <label htmlFor="wheel">Wheel</label>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              isActive={(match, location) => {
                return (
                  location.pathname === "/profile" ||
                  location.pathname === "/updateprofile"
                );
              }}
            >
              <img src={profileImg}></img>
              <label htmlFor="profile">Profile</label>
            </NavLink>
          </li>
          <li>
            <a onClick={logout}>
              <img style={{ width: "28px" }} src={Logout}></img>
              <label htmlFor="profile">Log Out</label>
            </a>
          </li>
        </ul>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </header>
  );
}

export default Sidebar;
