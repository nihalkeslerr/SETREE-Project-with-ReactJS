import React from 'react'

function SocialDetail() {
  return (
    <div>
      <div className='DetailContainer'>
      <div className='ppDetail'>
        <div className='ppDetailimg'></div>
        <label className='name'>Laura Burke</label>
        <div className='info'>
          <p><span>14</span>Lists</p>
          <p><span>524</span>Followers</p>
        </div>
        <button>Follow</button>
      </div>

      <div className='followhead'>
        <h1>Followers</h1>
      </div>

      <div className='followers'>
        
        <div className='followppimg'></div>
        <div className='followppimg'></div>
        <div className='followppimg'></div>
        <div className='followppimg'></div>
        <div className='followppimg'></div>
        <div className='followppimg'></div>
      </div>
      <div className='followhead'>
        <h1>Lists</h1>
      </div>
      <div className=' cards'>
      <a href='#'> <div className='ppDetailCard health'>
          <div className='count' style={{ backgroundColor: "rgb(255 202 166)"}}><label>3</label></div>
          <div className='label'><label>Health</label></div>
        </div></a>

        <a href='#'><div className='ppDetailCard marketlist'>
          <div className='count' style={{ backgroundColor: "rgb(236 222 245)"}}><label>9</label></div>
          <div className='label'><label>Market List</label></div> 
        </div></a>

        <a href='#'><div className='ppDetailCard movies'>
          <div className='count' style={{ backgroundColor: "rgb(255 220 242)"}}><label>4</label></div>
          <div className='label'><label>Movies</label></div>
        </div></a>

        <a href='#'><div className='ppDetailCard books'>
          <div className='count' style={{ backgroundColor: "rgb(255 160 150)"}}><label>5</label></div>
          <div className='label'><label>Books</label></div>
        </div></a>
      </div>
    </div>
    </div>
  )
}

export default SocialDetail;