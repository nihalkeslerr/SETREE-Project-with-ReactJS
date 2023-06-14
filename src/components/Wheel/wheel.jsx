import React, { Component,useContext } from "react";
import WheelComponent from "react-wheel-of-prizes";
import { GlobalContext } from "../Context/GlobalContext";
function Wheel() {
    const {
    token,
        API_URL,
    getColor
    } = useContext(GlobalContext);
    
  const segments = [
    "better luck next time",
    "won 70",
    "won 10",
    "better luck next time",
    "won 2",
    "won uber pass",
    "better luck next time",
    "won a voucher",
  ];
  const segColors = [
    "#FFCFC0",
    "#BDDFFF",
      "#BCFFBF",
        "#ffb299",
    "#a7d1f9",
    "#C9C0FF",
      "#FFBDF8",
        "#91d5e2",
    "#8ad4a2",
    "#c9c1fa",
    "#efb8e9",
  ];
  const onFinished = (winner) => {
    console.log(winner);
  };
  return (
    <div className="ContainerWheel">
      <div className="table">
        <div className="headWheel">
          <h1>Wheel Spinner</h1>
          <p>
            If you can't decide where to <br></br> start, leave it to us!
          </p>
        </div>
        <div className="articles">
          <ul>
            <li> Go stay in Poland for at least 2 weeks</li>
            <li> Join a workshop as a part of a team</li>
            <li> Learn a new programming language</li>
            <li> Membership to a gym</li>
            <li> Have a dog/cat</li>
            <li> Start a dairy</li>
          </ul>
        </div>
      </div>
      <div>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment="won 10"
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={290}
          upDuration={100}
          downDuration={1000}
          fontFamily="Arial"
        />
      </div>
    </div>
  );
}

export default Wheel;
