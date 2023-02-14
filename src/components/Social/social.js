import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
import SocialDetail from './socialDetail';

function Social() {
  return (

    <div>

        <div className='container social'>
            <div className='search'>
                <input placeholder="Search Friends"></input>
                <button type='submit'></button>
            </div>
            <div className='followhead'>
                <h1>Followings</h1>
            </div>
        
            <div className='profiles'>
                <div className='profile'>
                <NavLink className="prop" to="/SocialDetail">
                    <div className='profileimg'>
                    </div>
                    <div>
                        <p>Laura Burke</p>
                        <p><span>2</span> List - <span>123</span> Friends</p>
                    </div>
                    </NavLink>
                </div>
                <a href='#'><div className='profile'>
                    <div className='profileimg'>
                    </div>
                    <div>
                        <p>Laura Burke</p>
                        <p><span>2</span> List - <span>123</span> Friends</p>
                    </div>
                </div></a>
                <a href='#'><div className='profile'>
                    <div className='profileimg'>
                    </div>
                    <div>
                        <p>Laura Burke</p>
                        <p><span>2</span> List - <span>123</span> Friends</p>
                    </div>
                </div></a>
                <a href='#'><div className='profile'>
                    <div className='profileimg'>
                    </div>
                    <div>
                        <p>Laura Burke</p>
                        <p><span>2</span> List - <span>123</span> Friends</p>
                    </div>
                </div></a>
                <a href='#'><div className='profile'>
                    <div className='profileimg'>
                    </div>
                    <div>
                        <p>Laura Burke</p>
                        <p><span>2</span> List - <span>123</span> Friends</p>
                    </div>
                </div></a>
                <a href='#'><div className='profile'>
                    <div className='profileimg'>
                    </div>
                    <div>
                        <p>Laura Burke</p>
                        <p><span>2</span> List - <span>123</span> Friends</p>
                    </div>
                </div></a>
                <a href='#'><div className='profile'>
                    <div className='profileimg'>
                    </div>
                    <div>
                        <p>Laura Burke</p>
                        <p><span>2</span> List - <span>123</span> Friends</p>
                    </div>
                </div></a>
                <a href='#'><div className='profile'>
                    <div className='profileimg'>
                    </div>
                    <div>
                        <p>Laura Burke</p>
                        <p><span>2</span> List - <span>123</span> Friends</p>
                    </div>
                </div></a>
            </div>
        </div>

    </div>




  )
}

export default Social