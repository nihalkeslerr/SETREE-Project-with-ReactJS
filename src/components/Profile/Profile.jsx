import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_URL;
  const [collections, setCollections] = useState(null);
  const [user, setUser] = useState(null);
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
        const response = await axios.get(
          `${API_URL}/getCollections/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 
        console.log("istek tamamlandı... :) ");
        console.log("response: ", response);
       setCollections(response.data.collections);
      } catch (error) {
        console.log("hataa: ");
        console.log(error);
      }
    };


  useEffect(() => {
    if (user) {
      fetchCollectionsData();
    }
  }, [user]); // user state'i değiştiğinde çalışacak



  return (
    <div>
      <div className="DetailContainer">
        <div className="ppDetail">
          <div className="ppDetailimg"></div>
          {user && (
            <div><label className='name'>{user.firstName} {user.lastName}</label>
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
            </div></div>
            
          )}
        </div>
      </div>

      <div className="followhead">
        <h1>Followers</h1>
      </div>

      <div className="followers">
        <div className="followppimg"></div>
        <div className="followppimg"></div>
        <div className="followppimg"></div>
        <div className="followppimg"></div>
        <div className="followppimg"></div>
        <div className="followppimg"></div>
      </div>
      <div className="followhead">
        <h1>Lists</h1>
      </div>
      <div className=" cards">
        {collections &&
          collections.map((collection) => (
            <a href="#">
              {" "}
              <div className="ppDetailCard health">
                <div
                  className="count"
                  style={{ backgroundColor: "rgb(255 202 166)" }}
                >
                  <label>{collection.itemCount}</label>
                </div>
                <div className="label">
                  <label>{collection.title}</label>
                </div>
              </div>
            </a>
          ))}

        {/*       <a href='#'> <div className='ppDetailCard health'>
          <div className='count' style={{ backgroundColor: "rgb(255 202 166)"}}><label>3</label></div>
          <div className='label'><label>Health</label></div>
        </div></a>

        <a href='#'><div className='ppDetailCard marketlist'>
          <div className='count' style={{ backgroundColor: "rgb(236 222 245)"}}><label>9</label></div>
          <div className='label'><label>Market List</label></div> 
        </div></a>

        <a href='#'><div className='ppDetailCard movies'>
          <div className='count' style={{ backgroundColor: "rgb(255 220 242)"}}><label>4</label></div>
          <div className='label'><label>Movies</label></div>
        </div></a>

        <a href='#'><div className='ppDetailCard books'>
          <div className='count' style={{ backgroundColor: "rgb(255 160 150)"}}><label>5</label></div>
          <div className='label'><label>Books</label></div>
        </div></a> */}
      </div>
    </div>
  );
}

export default Profile;
