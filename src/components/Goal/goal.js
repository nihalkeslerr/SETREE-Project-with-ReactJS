import React from 'react'

function Goal() {
  return (
    <div className='goal'>
        <div className='target daily'>
            <label className="containerTarget da">Drink water more
                <input type="checkbox" defaultChecked="checked"></input>
                <span className="checkmark"></span>
            </label>
            <label className="containerTarget">Read the Book
                <input type="checkbox"></input>
                <span className="checkmark"></span>
            </label>
            <label className="containerTarget">Do Sport 
                <input type="checkbox"></input>
                <span className="checkmark"></span>
            </label>
            <label className="containerTarget">Shopping for Kitchen
                <input type="checkbox"></input>
                <span className="checkmark"></span>
            </label>
            <div className='title'>
                <label>daily</label>
            </div>
            <div className='goalcount'>
                <label>2</label>
            </div>
        </div>
        <div className='target monthly'>
            <label className="containerTarget">Drink water more
                <input type="checkbox" defaultChecked="checked"></input>
                <span className="checkmark"></span>
            </label>
            <label className="containerTarget">Read the Book
                <input type="checkbox"></input>
                <span className="checkmark"></span>
            </label>
            <label className="containerTarget">Do Sport 
                <input type="checkbox"></input>
                <span className="checkmark"></span>
            </label>
            <label className="containerTarget">Shopping for Kitchen
                <input type="checkbox"></input>
                <span className="checkmark"></span>
            </label>
            <div className='title'>
                <label>Monthly</label>
            </div>
            <div className='goalcount '>
                <label>5</label>
            </div>
        </div>
        <div className='target yearly'>
            <label className="containerTarget">Drink water more
                <input type="checkbox" defaultChecked="checked"></input>
                <span className="checkmark"></span>
            </label>
            <label className="containerTarget">Read the Book
                <input type="checkbox"></input>
                <span className="checkmark"></span>
            </label>
            <label className="containerTarget">Do Sport 
                <input type="checkbox"></input>
                <span className="checkmark"></span>
            </label>
            <label className="containerTarget">Shopping for Kitchen
                <input type="checkbox"></input>
                <span className="checkmark"></span>
            </label>
            <div className='title'>
                <label>yearly</label>
            </div>
            <div className='goalcount'>
                <label>8</label>
            </div>
        </div>
    </div>
  )
}

export default Goal