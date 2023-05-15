import React, { useContext, useState, useEffect } from "react";
import Footer from "../Footer/footer";
import CollectionDetail from "./collectionDetail";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
function Collection() {
  const token = localStorage.getItem("token");

  const API_URL = process.env.REACT_APP_URL;
  const [collections, setCollections] = useState(null);
  const [user, setUser] = useState(null);

  const data = {
    title: "Health",
    tagReq: "health",
    isPublic: true,
    imageUrl:
      "https://images.pexels.com/photos/3683040/pexels-photo-3683040.jpeg?auto=compress&cs=tinysrgb&w=1600",
  };

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

 const denemeAxios = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios.post(`${API_URL}/createCollection`, data, config)
    .then((response) => {
      console.log("Koleksiyon oluşturuldu:", response.data);
    })
    .catch((error) => {
      console.error("İstek sırasında bir hata oluştu:", error);
    });
}; 

  useEffect(() => {
    if (user) {
      fetchCollectionsData();
    }
  }, [user]); // user state'i değiştiğinde çalışacak

  return (
    <div>
      <div className="container collection">
        <div className="cards">
         

          {collections &&
            collections.map((collection) => (
              <NavLink
                to={`/collectionDetail/${collection.id}`}
                key={collection.id}
              >
                <div className="card health"  style={{
                background:`url(${collection.imageUrl})`,
                backgroundSize: "501px",
                backgroundPosition: "59% 20%",
                boxShadow: "9px 9px #f8a770",
              }}>
                  <div
                    className="count"
                    style={{ backgroundColor: "rgb(255 202 166)" }}
                  >
                    <label>{collection.itemCount}</label>
                  </div>
                  <div className="label " >
                    <label>{collection.title}</label>
                  </div>
                </div>
              </NavLink>
            ))}

          {/*
        <a href='#'><div className='card marketlist'>
          <div className='count' style={{ backgroundColor: "rgb(236 222 245)"}}><label>9</label></div>
          <div className='label'><label>Market List</label></div> 
        </div></a>

          <a href='#'><div className='card movies'>
          <div className='count' style={{ backgroundColor: "rgb(255 220 242)"}}><label>4</label></div>
          <div className='label'><label>Movies</label></div>
        </div></a>

        <a href='#'><div className='card books'>
          <div className='count' style={{ backgroundColor: "rgb(255 160 150)"}}><label>5</label></div>
          <div className='label'><label>Books</label></div>
        </div></a>
        
        <a href='#'><div className='card clothes'>
          <div className='count' style={{ backgroundColor: "rgb(192 235 238)"}}><label>6</label></div>
          <div className='label'><label>Clothes</label></div>
        </div></a>

        <a href='#'><div className='card recipes'>
          <div className='count' style={{ backgroundColor: "rgb(118 166 221)"}}><label>1</label></div>
          <div className='label'><label>Recipes</label></div>
        </div></a>

        <a href='#'><div className='card places'>
          <div className='count' style={{ backgroundColor: "rgb(230 199 218)"}}><label>3</label></div>
          <div className='label'><label>Places</label></div>
        </div></a>*/}
        </div>
      </div>
      <div>
            <button onClick={denemeAxios}>Create Collection</button>
          </div> 
    </div>
  );
}

export default Collection;
