import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import axios from "axios";
import image from "../ASSETS/icons/image.png"
function CollectionDetail() {
  const { token, ID, API_URL, personalID, setPersonalID } =
    useContext(GlobalContext);

  const location = useLocation();
  const collectionID = location.state?.collectionID;

  const [collItem, setCollItem] = useState([]);
  const [collDetail, setCollDetail] = useState({});

  useEffect(() => {
    const fetchCollectionDetail = async () => {
      try {
        const reqUrl = `${API_URL}/getCollectionDetail/${collectionID}`;

        const response = await axios.get(reqUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response: getCollectionDetail", response.data.collections);
        setCollDetail(response.data.collections);
        console.log("collDetail", response.data.collections);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchItemsByCollection = async () => {
      try {
        const reqUrl = `${API_URL}/getItemsByCollection/${collectionID}`;

        const response = await axios.get(reqUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCollItem(response.data.collectionItems);
        console.log(
          "response: getItemsByCollection",
          response.data.collectionItems
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (collectionID) {
      fetchCollectionDetail();
      fetchItemsByCollection();
    }
  }, [collectionID, API_URL, token]);

  console.log("collItem:", collItem);

  return (
    <div>
        <div className="collectionContainer">
          <div
            className="CollectionDetail"
            style={{ backgroundImage: `url(${collDetail.imageUrl})` }}
          >
            <div className="bgOpacity">
              
              <div className="collectionHead">
                <p> {collDetail.title}</p>
                <p className="tag">Tag: { collDetail.tag}</p>
              </div>
              
            </div>
          </div>

          <div className="CollExplanation">
            <div className="itemBtn">
            <button className="titleBtn" type="button" ></button>
            <button className="textBtn" type="button"  ></button>
            <button className="imageBtn" type="button"  ></button>
            </div>
            <div>
            {collItem.map((item) => {
                  if (item.type === "image") {
                    return <img key={item.id}  src={item.content} alt="Image" />;
                  } else if (item.type === "text") {
                    return <p key={item.id} >{item.content}</p>;
                  } else if (item.type === "title") {
                    return <h1 key={item.id} >{item.content}</h1>;
                  }
                  return null;
            })}
              </div>
          </div>
        </div>
    </div>
  );
}

export default CollectionDetail;
