import React from 'react'
import logo from '.././ASSETS/images/logo.png'
function Header() {
  return (
    <header>
        <div>
            <img className='imglogo' src={logo} alt=''></img>
        </div>
        <div className='navbar'>
            <ul>
                <li><a href='social.js'>Social</a></li>
                <li><a href='goal.js'>Goal</a></li>
                <li><a href='collection.js'>Collection</a></li>
                <li><a href='wheel.js'>Wheel</a></li>
                <li><a href='profile'>Profile</a></li>
            </ul>
        </div>
    </header>
  )
}

export default Header