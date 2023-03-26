import React from 'react'

import Footer from '../Footer/footer';
import Sidebar from '../Menu/Sidebar';

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
      <Sidebar/>
      <Footer></Footer>
    </div>
    </Router>
  )
}

export default Body;