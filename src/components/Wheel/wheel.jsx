import React, { useContext, useState, useEffect, useRef } from "react";
import WheelComponent from "react-wheel-of-prizes";
import { GlobalContext } from "../Context/GlobalContext";

function Wheel() {
  const { goals, fetchGoals } = useContext(GlobalContext);

  const [selectedTitle, setSelectedTitle] = useState("");
  const [filteredContent, setFilteredContent] = useState([]);
  const [winningSegment, setWinningSegment] = useState("");

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
  const content = [
    "Do homework",
    "Clean the house",
    "Drink water",
    "Cook dinner",
    "Go to dentist",
  ];
  const dataFetchedRef = useRef(false);

  const onFinished = (winner) => {
    console.log(winner);
  };

  useEffect(() => {
    if (!dataFetchedRef.current) {
      fetchGoals();
      dataFetchedRef.current = true;
    }
  }, []);

  useEffect(() => {
    filterContent(selectedTitle);
  }, [selectedTitle, goals]);

  useEffect(() => {
    console.log("filteredContent:", filteredContent);
    if (filteredContent.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredContent.length);
      const winningSegment = filteredContent[randomIndex];
      setWinningSegment(winningSegment);
    }
  }, [filteredContent]);

  const handleTitleChange = (event) => {
    const selectedTitle = event.target.value;
    setSelectedTitle(selectedTitle);
  };

  const filterContent = (selectedTitle) => {
    if (selectedTitle) {
      const goal = goals.find((goal) => goal.title === selectedTitle);
      if (goal) {
        setFilteredContent(goal.goalItems.map((item) => item.content));
        return;
      }
    }
    setFilteredContent([]);
  };

  const LoadWheel = () => {
    filterContent(selectedTitle);
    setSelectedTitle(""); // Clear the selected title
  };

  const WheelWrapper = () => {
    if (filteredContent.length > 1) {
      return (
        <div className="wheel-container">
          <WheelComponent
            segments={filteredContent}
            segColors={segColors}
            winningSegment={winningSegment}
            onFinished={(winner) => onFinished(winner)}
            primaryColor="#b7b7b7"
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={false}
            size={290}
            upDuration={200}
            downDuration={1200}
            fontFamily="Abel, sans-serif"
            textFontSize={100}
          />
        </div>
      );
    } else {
      return (
        <div className="wheel-container">
          <WheelComponent
            segments={content}
            segColors={segColors}
            winningSegment={winningSegment}
            onFinished={(winner) => onFinished(winner)}
            primaryColor="#b7b7b7"
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={false}
            size={290}
            upDuration={200}
            downDuration={1200}
            fontFamily="Abel, sans-serif"
            textFontSize={100}
          />
        </div>
      );
    }
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
          <select value={selectedTitle} onChange={handleTitleChange}>
            <option value="">Choose a Goal Title</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.title}>
                {goal.title}
              </option>
            ))}
          </select>
          <ul>
            {filteredContent.length > 1 ? (
              filteredContent.map((item, id) => <li key={id}>{item}</li>)
            ) : filteredContent.length === 1 ? (
              <p>There is only one item!</p>
            ) : (
              <p>There is no item for the chosen goal!</p>
            )}
          </ul>
        </div>
      </div>
      <div>
        <WheelWrapper />
      </div>
    </div>
  );
}

export default Wheel;
