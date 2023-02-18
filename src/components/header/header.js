import React from 'react'
import logo from '../ASSETS/images/logo.png'
import Collection from '../Collection/collection'
import Social from '../Social/social';
import SocialDetail from '../Social/socialDetail';
import Goal from '../Goal/goal';
import CollectionDetail from '../Collection/collectionDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
function Header() {
  return (
    <Router>
    <header>
        <div>
            <img className='imglogo' src={logo} alt=''></img>
        </div>
        <div className='navbar'>
            <ul>
                <li><NavLink to="/social">Social</NavLink></li>
                <li><NavLink to="/goal">Goal</NavLink></li>
                <li><NavLink to="/">Collection</NavLink></li>
                <li><NavLink to="/wheel">Wheel</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
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
        <Route  path="/collectionDetail" component={CollectionDetail}>
        </Route>


    </Switch>
    </Router>
  )
}

export default Header