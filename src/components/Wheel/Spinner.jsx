import React, { useState, useEffect } from "react";


const Spinner = ({ options }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      startSpinning();
    }
  };

  const startSpinning = () => {
    setIsSpinning(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setSelectedOption(options[randomIndex]);
      setIsSpinning(false);
    }, 5000);
  };

  return (
    <div className="custom-wheel-container">
      <div className={`custom-wheel ${isSpinning ? "spin-animation" : ""}`}>
        {options.map((option, index) => (
          <div
            className="custom-wheel-option"
            key={index}
            style={{
              transform: `rotate(${(360 / options.length) * index}deg)`,
            }}
          >
            {option}
          </div>
        ))}
      </div>
      <button onClick={startSpinning} disabled={isSpinning}>
        {isSpinning ? "Dönüyor..." : "Döndür"}
      </button>
      {selectedOption && (
        <div className="selected-option">Seçilen: {selectedOption}</div>
      )}
    </div>
  );
};

export default Spinner;
