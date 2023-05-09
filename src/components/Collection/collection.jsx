import React from 'react'
import Footer from '../Footer/footer';
import CollectionDetail from './collectionDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
function Collection() {
  return (
    <div>

     <div className='container collection'>
      <div className='cards'>

       <NavLink to='collectionDetail'> <div className='card health'>
          <div className='count' style={{ backgroundColor: "rgb(255 202 166)"}}><label>3</label></div>
          <div className='label'><label>Health</label></div>
        </div></NavLink>

        <a href='#'><div className='card marketlist'>
          <div className='count' style={{ backgroundColor: "rgb(236 222 245)"}}><label>9</label></div>
          <div className='label'><label>Market List</label></div> 
        </div></a>

        <a href='#'><div className='card movies'>
          <div className='count' style={{ backgroundColor: "rgb(255 220 242)"}}><label>4</label></div>
          <div className='label'><label>Movies</label></div>
        </div></a>

        <a href='#'><div className='card books'>
          <div className='count' style={{ backgroundColor: "rgb(255 160 150)"}}><label>5</label></div>
          <div className='label'><label>Books</label></div>
        </div></a>
        
        <a href='#'><div className='card clothes'>
          <div className='count' style={{ backgroundColor: "rgb(192 235 238)"}}><label>6</label></div>
          <div className='label'><label>Clothes</label></div>
        </div></a>

        <a href='#'><div className='card recipes'>
          <div className='count' style={{ backgroundColor: "rgb(118 166 221)"}}><label>1</label></div>
          <div className='label'><label>Recipes</label></div>
        </div></a>

        <a href='#'><div className='card places'>
          <div className='count' style={{ backgroundColor: "rgb(230 199 218)"}}><label>3</label></div>
          <div className='label'><label>Places</label></div>
        </div></a>
        
      </div>
    </div>

    </div>
  )
}

export default Collection