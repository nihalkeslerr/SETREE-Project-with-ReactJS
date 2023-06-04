import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { FreeMode, Mousewheel, Navigation } from "swiper";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function Profile() {
  const {
    token,
    API_URL,
    collections,
    user,
    setUser,
    setCollections,
    followerObjects,
    followingsObjects,
    fetchCollectionsData,
    getFollowersData,
    getFollowingsData,
    getRandomColor,
    personalID,
    ID,
    collectionsself,
    setCollectionself,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCollections(null);
    setUser(null);
  }, []);

  const dataFetchedRef = useRef(false);
  
  useEffect(() => {
    setUser(null);
    const fetchUserData = async (userid = null) => {
      try {
        let reqUrl = `${API_URL}/getUser/`;
        if (userid != null) {
          reqUrl = `${API_URL}/getUser/${userid}`;
        }

        const response = await axios.get(reqUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.user);

        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCollectionsData(user.id);
      getFollowersData();
      getFollowingsData();
    }
  }, [user]); // user state'i değiştiğinde çalışacak

  return (
    
      <div>
        <div className="DetailContainer">
          <div className="ppDetail">
            {user && (
              <div>
              <NavLink to="/updateprofile"><button className="Edit">Edit Profile</button></NavLink>
                <div
                  className="ppDetailimg"
                  style={{
                    backgroundImage: `url(${user.imageUrl})`,
                  }}
                ></div>
                <label className="name">
                  {user.firstName} {user.lastName}
                </label>
                <div className="info">
                  <p>
                    <span>{user.listCount}</span>Lists
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
              <Swiper
                slidesPerView={4.5}
                spaceBetween={1}
                freeMode={true}
                mousewheel={true}
                navigation={true}
                modules={[FreeMode, Mousewheel, Navigation]}
                className="mySwiper"
              >
                {followerObjects &&
                  followerObjects.map((follower) => (
                    <SwiperSlide key={follower.id}>
                      <NavLink
                        to={{
                          pathname: "/SocialDetail",
                          state: { followingId: follower.id },
                        }}
                      >
                        <div
                          key={follower.id}
                          className="followppimg"
                          style={{
                            backgroundImage: `url(${follower.imageUrl})`,
                          }}
                        ></div>
                      </NavLink>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          <hr className="divider" /> {/* Çizgi ekleniyor */}
          <div className="followhead">
            <h1>Followings</h1>

            <div className="followers">
              <Swiper
                slidesPerView={4.5}
                spaceBetween={1}
                freeMode={true}
                navigation={true}
                mousewheel={true}
                modules={[FreeMode, Mousewheel, Navigation]}
                className="mySwiper"
              >
                {followingsObjects &&
                  followingsObjects.map((following) => (
                    <SwiperSlide key={following.id}>
                      <NavLink
                        to={{
                          pathname: "/SocialDetail",
                          state: { followingId: following.id },
                        }}
                      >
                        <div
                          key={following.id}
                          className="followppimg"
                          style={{
                            backgroundImage: `url(${following.imageUrl})`,
                          }}
                        ></div>
                      </NavLink>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="listhead">
          <h1>Your Collections</h1>
        </div>
        <div className="cardsForProfile">
          {collectionsself &&
            collectionsself.map((collection, index) => (
              <a href="#" key={collection.id}>
                {" "}
                <div
                  className="ppDetailCard health"
                  style={{
                    background: `url(${collection.imageUrl})`,
                    backgroundSize: "501px",
                    backgroundPosition: "59% 20%",
                    boxShadow: `9px 9px ${getRandomColor(index)}`,
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
