import React from 'react'
import Header from '../header/header';
import Collection from '../Collection/collection';
import Footer from '../Footer/footer';
import Social from '../Social/social';
import SocialDetail from '../Social/socialDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

function Body() {
  return (
    <Router>
    <div>
      <Header></Header>

      <Footer></Footer>
    </div>
    </Router>
  )
}

export default Body;