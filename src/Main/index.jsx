import React from 'react'
import mainPicture from "./ASSESTS/result.png"
function Index() {
  return (
    <div>
      <div className='mainContainer'>
        <div className='mainPage'>
          <div className='mainArticle'>
            <p>Setree, thoughts and ideas, brings together tasks and plans in a harmonious unity.</p>
            <p>Take Notes Your Wishes and Keep Everything in the Same Place</p>
          </div>
          <div className='mainImg'>
            <img src={mainPicture} alt="" />
          </div>

        </div>
        <div className='featureContainer'>
          <div className='featureTitle'>
            <h2>Setree Features</h2>
            <h1>Daily essentials, goals, and inspiration.</h1>
          </div>
          <div className='Content'>
            <div className='mainCards'>
              <div className='cardTitle'>
                <p>Collection </p>
              </div>
              <div className='cardTitle'>
                <p>Goals </p>
              </div>
              <div className='cardTitle'>
                <p>Wheel </p>
              </div>
              <div className='cardTitle'>
                <p>Social </p>
              </div>
              <div className='cardTitle'>
                <p>Profile</p>
              </div>
            </div>

            <div className='cardImage'>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos quibusdam, repellendus, quis omnis illum sint qui rem mollitia aliquam hic, facilis necessitatibus laboriosam accusamus corporis sapiente veniam nulla magni culpa.</p>
              <img src="" alt="" />image
            </div>

            
          </div>
        </div>
        <div>
          <div>
            <h1>How it works ?</h1>
            <button>For Web</button>
            <button>For Mobile</button>
          </div>
          <div>
            <div>
              <h1>Step 1</h1>
              card1
            </div>
            <div>
              <h1>Step 2</h1>
              card2</div>
            <div><h1>Step 3</h1>
              card3</div>
            <div><h1>Step 4</h1>
              card4</div>
          </div>
        </div>
        

        <div>
          <h1>Sign up now!</h1>
          <p>Getting started with PencilBooth is free, easy, and bound to make you forget about the fleeting impermanence of life for at least five to seven minutes.

What are you waiting for?</p>
          <button>Getting Started</button>
        </div>




      </div>
    </div>
  )
}

export default Index