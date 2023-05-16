import React from "react";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode } from "swiper";

function Profile() {
  const {
    token,
    API_URL,
    collections,
    user,
    setUser,
    followerObjects,
    followingsObjects,
    fetchCollectionsData,
    getFollowersData,
    getFollowingsData,
  } = useContext(GlobalContext);
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
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
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
              modules={[FreeMode]}
              className="mySwiper"
            >
              {followerObjects &&
                followerObjects.map((follower) => (
                  <SwiperSlide>
                    <div
                      key={follower.id}
                      className="followppimg"
                      style={{
                        backgroundImage: `url(${follower.imageUrl})`,
                      }}
                    ></div>
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
              modules={[FreeMode]}
              className="mySwiper"
            >
              {followingsObjects &&
                followingsObjects.map((following) => (
                  <SwiperSlide>
                    <div
                      key={following.id}
                      className="followppimg"
                      style={{
                        backgroundImage: `url(${following.imageUrl})`,
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="listhead">
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
