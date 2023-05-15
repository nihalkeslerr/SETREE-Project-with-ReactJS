import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_URL;
  const [collections, setCollections] = useState(null);
  const [user, setUser] = useState(null);
  const [followerObjects, setFollowers] = useState([]);
  const [followingsObjects, setFollowings] = useState([]);

  useEffect(() => {
    const fetchUserData = async (userid = null) => {
      try {
        const reqUrl = `${API_URL}/getUser/`;
        if (userid != null) {
          reqUrl = `${API_URL}/getUser/${userid}`;
        }

        const response = await axios.get(reqUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const fetchCollectionsData = async () => {
    try {
      console.log("istek gidiyooooo");
      const response = await axios.get(`${API_URL}/getCollections/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("istek tamamlandı... :) ");
      console.log("response: ", response);
      setCollections(response.data.collections);
    } catch (error) {
      console.log("hataa: ");
      console.log(error);
    }
  };
  const getFollowersData = async () => {
    try {
      console.log("Followerslar geliyor");
      const response = await axios.get(`${API_URL}/getFollowers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Followerslar geldiii :) ");
      console.log("response for Followers: ", response);
      setFollowers(response.data.followerObjects);
    } catch (error) {
      console.log("hataa: ");
      console.log(error);
    }
  };
  const getFollowingsData = async () => {
    try {
      console.log("Followings geliyor");
      const response = await axios.get(`${API_URL}/getFollowings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Followerslar geldiii :) ");
      console.log("response for Followings: ", response);
      setFollowings(response.data.followingObjects);
    } catch (error) {
      console.log("hataa: ");
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCollectionsData();
      getFollowersData();
      getFollowingsData();
    }
  }, [user]); // user state'i değiştiğinde çalışacak

  return (
    <div>
      <div className="DetailContainer">
        <div className="ppDetail">
          <div className="ppDetailimg"></div>
          {user && (
            <div>
              <label className="name">
                {user.firstName} {user.lastName}
              </label>
              <div className="info">
                <p>
                  <span>14</span>Lists
                </p>
                <p>
                  <span>{user.followers.length}</span>Followers
                </p>
                <p>
                  <span>{user.followings.length}</span>Followings
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
<div className="FollowInfo">
      <div className="followhead">
        <h1>Followers</h1>
      

      <div className="followers">
        {followerObjects &&
          followerObjects.map((follower) => (
            <div
              key={follower.id}
              className="followppimg"
              style={{
                backgroundImage: `url(${follower.imageUrl})`,
              }}
            ></div>
          ))}
          </div>
          </div>
        <hr className="divider" /> {/* Çizgi ekleniyor */}
        
      <div className="followhead">
        <h1>Followings</h1>
     

      <div className="followers">
        {followingsObjects &&
          followingsObjects.map((following) => (
            <div
              key={following.id}
              className="followppimg"
              style={{
                backgroundImage: `url(${following.imageUrl})`,
              }}
            ></div>
          ))}
          </div>
           </div>
</div>
      <div className="followhead">
        <h1>Your Lists</h1>
      </div>
      <div className="cardsForProfile">
        {collections &&
          collections.map((collection) => (
            <a href="#" key={collection.id}>
              {" "}
              <div
                className="ppDetailCard health"
                style={{
                  background: `url(${collection.imageUrl})`,
                  backgroundSize: "501px",
                  backgroundPosition: "59% 20%",
                  boxShadow: "9px 9px #f8a770",
                }}
              >
                <div
                  className="count"
                  style={{ backgroundColor: "rgb(255 202 166)" }}
                >
                  <label>{collection.itemCount}</label>
                </div>
                <div className="label" style={{ marginTop: "100px" }}>
                  <label>{collection.title}</label>
                </div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}

export default Profile;
