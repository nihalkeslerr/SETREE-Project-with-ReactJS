import React from 'react'
import tickIcon from '../ASSETS/icons/tick.png'
function Goal() {
  return (
    <div className='goal'>
        <div className='target daily'>
            <label className="containerTarget da">
                <input type="checkbox" defaultChecked="checked"></input>
                <span className="checkmark">
                    <img src={tickIcon} alt="tick" />
                </span>
                 <label htmlFor="matter" className='matter'>Drink water more</label>    
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Read the Book</label>
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Do Sport </label>
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Shopping for Kitchen</label>
            </label>
           
            <div className='title'>
                <label>daily</label>
                <div className='goalcount'>
                <label>2</label>
            </div>
            </div>
            
        </div>
        <div className='target monthly'>
            <label className="containerTarget">
                <input type="checkbox" defaultChecked="checked"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Drink water more</label>  
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Read the Book</label>
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark"></span>
                <label htmlFor="matter" className='matter'>Do Sport </label>
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Shopping for Kitchen</label>
            </label>
            <div className='title'>
                <label>Monthly</label>
                <div className='goalcount '>
                <label>5</label>
            </div>
            </div>
            
        </div>
        <div className='target yearly'>
            <label className="containerTarget">
                <input type="checkbox" defaultChecked="checked"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Drink water more</label> 
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Read the Book</label>
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Do Sport </label>
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Shopping for Kitchen</label>
            </label>
            <div className='title'>
                <label>yearly</label>
                <div className='goalcount'>
                <label>8</label>
            </div>
            </div>
            
        </div>
        <div className='target yearly'>
            <label className="containerTarget">
                <input type="checkbox" defaultChecked="checked"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Drink water more</label> 
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Read the Book</label>
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Do Sport </label>
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Shopping for Kitchen</label>
            </label>
            <div className='title'>
                <label>weekly</label>
                <div className='goalcount'>
                <label>8</label>
            </div>
            </div>
            
        </div>
        <div className='target yearly'>
            <label className="containerTarget">
                <input type="checkbox" defaultChecked="checked"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Drink water more</label> 
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Read the Book</label>
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Do Sport </label>
            </label>
            <label className="containerTarget">
                <input type="checkbox"></input>
                <span className="checkmark">
                <img src={tickIcon} alt="tick" />
                </span>
                <label htmlFor="matter" className='matter'>Shopping for Kitchen</label>
            </label>
            <div className='title'>
                <label>today</label>
                <div className='goalcount'>
                <label>8</label>
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Goal