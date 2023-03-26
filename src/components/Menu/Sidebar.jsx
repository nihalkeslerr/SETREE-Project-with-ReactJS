import React from 'react'
import logo from '../ASSETS/images/logo.png'
import Collection from '../Collection/collection'
import Social from '../Social/social';
import SocialDetail from '../Social/socialDetail';
import Goal from '../Goal/goal';
import CollectionDetail from '../Collection/collectionDetail';
import Wheel from '../Wheel/wheel';
import profileImg from './images/profile.png'
import socialImg from './images/social.png'
import goalImg from './images/goal.png'
import collectionImg from './images/collection.png'
import wheelImg from './images/wheel.png'
import menuImg from './images/menu.png'
import logoImg from './images/logoImg.png'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
import { useState } from 'react';

function Sidebar() {
    const [display, setDisplay] = useState("open");
    
  return (
    <Router>
    <header>
        <div>
            <img className='imglogo' src={logo} alt=''></img>
        </div>
        <div className={`sidebar ${display}`} >
            <ul>
            <li>
                    <button className='menu' onClick={()=>setDisplay(display==="open" ? "close" : "open")}>
                    <img src={menuImg}></img></button>
                    <img className='logoSidebar' src={logoImg}/>
                </li>

                <li><NavLink to="/social">
                    <img src={socialImg}></img>
                    <label htmlFor="social">Social</label>
                    </NavLink></li>

                <li><NavLink to="/goal">
                    <img src={goalImg}></img>
                    <label htmlFor="goal">Goal</label>
                    </NavLink></li>

                <li><NavLink to="/">
                    <img src={collectionImg}></img>
                    <label htmlFor="collection">Collection</label>
                    </NavLink></li>

                <li><NavLink to="">
                    <img src={wheelImg}></img>
                    <label htmlFor="wheel">Wheel</label>
                    </NavLink></li>

                <li><NavLink to="/profile">
                    <img src={profileImg}></img>
                    <label htmlFor="profile">Profile</label>
                </NavLink></li>
            </ul>
        </div>
    </header>
    <Switch>
        <Route  path="/goal" component={Goal}>
        </Route>
        <Route path="/social" component={Social}> 
        </Route>
        <Route exact path="/" component={Collection}>
        </Route>
        <Route  path="/socialDetail" component={SocialDetail}>
        </Route>
        <Route  path="/wheel" component={Wheel}>
        </Route>
        <Route  path="/collectionDetail" component={CollectionDetail}>
        </Route>


    </Switch>
    </Router>
  )
}

export default Sidebar