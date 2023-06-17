import React, { useContext, useState, useEffect, useRef } from "react";
import mainPicture from "./ASSESTS/result.png";
import Image1 from "./ASSESTS/Image1.png";
import Image2 from "./ASSESTS/Image2.png";
import Image3 from "./ASSESTS/Image3.png";
import Image4 from "./ASSESTS/Image4.png";
import step1 from "./ASSESTS/step1.png";
import step2 from "./ASSESTS/step2.png";
import step3 from "./ASSESTS/step3.png";
import step4 from "./ASSESTS/step4.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/footer";

function Index() {
  const [selectedCard, setSelectedCard] = useState("Collection");

  const handleCardClick = (cardName) => {
    setSelectedCard(cardName);
  };
  return (
    <div>
      <div className="mainContainer">
        <div className="mainPage">
          <div className="mainArticle">
            <p>
              Setree, thoughts and ideas, brings together tasks and plans in a
              harmonious unity.
            </p>
            <p>Take Notes Your Wishes and Keep Everything in the Same Place</p>
          </div>
          <div className="mainImg">
            <img src={mainPicture} alt="" />
          </div>
        </div>
        <div className="contntContainer" id="content">
          <div className="featureContainer">
            <div className="featureTitle">
              <h2>Setree 101</h2>
              <h1>
                Daily essentials, goals, and inspiration.
                <br />
                Seamlessly experience this journey on two different platforms:
                Web / iOS.
              </h1>
            </div>
            <div className="Content">
              <div className="mainCards">
                {/* Collection Card */}
                <div
                  className={`cardTitle ${
                    selectedCard === "Collection" ? "selectedCard" : ""
                  }`}
                  onClick={() => handleCardClick("Collection")}
                >
                  <p>Collection</p>
                  <p>
                    Users can gather and organize various topics and items from
                    their daily lives, such as movies, shopping lists, and
                    places to visit, in a unified and convenient environment.
                  </p>
                </div>

                {/* Goals Card */}
                <div
                  className={`cardTitle ${
                    selectedCard === "Goals" ? "selectedCard" : ""
                  }`}
                  onClick={() => handleCardClick("Goals")}
                >
                  <p>Goals</p>
                  <p>
                    Users can set and track their daily, monthly, and yearly
                    goals within the platform, empowering them to prioritize and
                    progress towards their desired achievements.
                  </p>
                </div>

                {/* Wheel Card */}
                <div
                  className={`cardTitle ${
                    selectedCard === "Wheel" ? "selectedCard" : ""
                  }`}
                  onClick={() => handleCardClick("Wheel")}
                >
                  <p>Wheel</p>
                  <p>
                    The goal wheel feature assists users in determining which
                    goal to start with, providing a structured path and guiding
                    their focus and efforts effectively.
                  </p>
                </div>

                {/* Social Card */}
                <div
                  className={`cardTitle ${
                    selectedCard === "Social" ? "selectedCard" : ""
                  }`}
                  onClick={() => handleCardClick("Social")}
                >
                  <p>Social</p>
                  <p>
                    By accessing lists created by other users, Setree fosters a
                    social aspect, enabling users to explore diverse
                    perspectives, gain inspiration, and develop their own vision
                    through shared content.
                  </p>
                </div>
              </div>

              <div className="cardImage">
                {selectedCard === "Collection" && <img src={Image1} alt="" />}
                {selectedCard === "Goals" && <img src={Image2} alt="" />}
                {selectedCard === "Wheel" && <img src={Image3} alt="" />}
                {selectedCard === "Social" && <img src={Image4} alt="" />}
              </div>
            </div>
          </div>
        </div>

        <div className="workcontainer" id="HowItWorks">
          <div className="workTitle">
            <h1>How it works ?</h1>
            <div className="workBtn">
              {/* <button>For Web</button>
              <button>For Mobile</button> */}
            </div>
          </div>
          <div className="workSteps">
            <div className="step">
              <h1>Step 1</h1>
              <h2>Complete the membership process</h2>
              <img src={step1} alt="" />
              <p>
                Complete your membership process on the platform using your
                personal information
              </p>
            </div>
            <div className="step">
              <h1>Step 2</h1>
              <h2>Perform the login procedure</h2>
              <img src={step2} alt="" />
              <p>
                {" "}
                After creating your membership, log in with the email address
                and password you have chosen
              </p>
            </div>
            <div className="step">
              <h1>Step 3</h1>
              <h2>Gather thoughts and create goals</h2>
              <img src={step3} alt="" />
              <p>
                Utilize the Collection feature to gather your thoughts in one
                place and create your goals from the Goal page.
              </p>
            </div>
            <div className="step">
              <h1>Step 4</h1>
              <h2>Review other users' activities and gather ideas</h2>
              <img src={step4} alt="" />
              <p>
                Optionally, explore what other users are doing to gather ideas
              </p>
            </div>
          </div>
        </div>

        <div className="start">
          <h1>Sign up now!</h1>
          <p>
            Getting started with PencilBooth is free, easy, and bound to make
            you forget about the fleeting impermanence of life for at least five
            to seven minutes. What are you waiting for?
          </p>
          <Link  to="/register"><button>Getting Started</button></Link>
        </div>

        <div className="footer">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default Index;
