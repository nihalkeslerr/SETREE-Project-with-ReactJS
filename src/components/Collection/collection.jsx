import React, { useContext, useState, useEffect } from "react";
import Footer from "../Footer/footer";
import CollectionDetail from "./collectionDetail";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
function Collection() {
  const { token, API_URL, collections,setCollections,user,setUser,
    fetchCollectionsData,} =useContext(GlobalContext)

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
                backgroundSize: "cover",
                backgroundPosition: "59% 20%",
                  boxShadow: "9px 9px #f8a770",
                backgroundRepeat: "no-repeat"
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

        </div>
      </div>
      <div>
            <button onClick={denemeAxios}>Create Collection</button>
          </div> 
    </div>
  );
}

export default Collection;
