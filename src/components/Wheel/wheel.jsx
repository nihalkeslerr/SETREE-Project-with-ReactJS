import React, { Component } from 'react'



function Wheel() {
    const segments = [
        '1',
        '2',
        '3',
        '4',
        '6',
        '7'
      ]
      const segColors = [
        '#F7DDC8',
        '#F5D3D4',
        '#E0BDD5',
        '#C3B3D2',
        '#C3E3E5',
        '#AFCCF1'
      ]
      const onFinished = (winner) => {
        console.log(winner)
      }
  return (
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
{/*                 <WheelComponent
                    segments={segments}
                    segColors={segColors}
                    onFinished={(winner) => onFinished(winner)}
                    primaryColor='#2c2c2c'
                    contrastColor='white'
                    buttonText='Spin'
                    isOnlyOnce={false}
                    size={180}
                    upDuration={50}
                    downDuration={140}
                    fontFamily='Arial'
                    fontSize="bold 30px"
                /> */}

        
            </div>

        </div>

  )
}



export default Wheel