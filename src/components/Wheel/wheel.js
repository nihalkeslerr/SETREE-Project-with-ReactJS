import React from 'react'
import wheel from "../ASSETS/images/wheel.png"
import { useState } from 'react';

function Wheel() {

  return (
    <div>
        <div className='ContainerWheel'>
            <div className='table'>
                <div>
                    <h1>Wheel Spinner</h1>
                    <p>If you can't decide where to <br></br> start, leave it to us!</p>
                </div>
                <div className='articles'>
                    <ul>
                        <li> Go stay in Poland for at least  2 weeks</li>
                        <li> Join a workshop as a part of a team</li>
                        <li> Learn a new programming language</li>
                        <li> Membership to a gym</li>
                        <li> Have a dog/cat</li>
                        <li> Start a dairy</li>
                    </ul>
                </div>
            </div>
            <div className='imgWheel table'>
            <h1>Spinning Prize Wheel React</h1>


        
            </div>
        </div>
    </div>
  )
}



export default Wheel