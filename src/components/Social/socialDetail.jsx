import { useState, React, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { FreeMode, Mousewheel, Navigation } from "swiper";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function SocialDetail() {
  const {
    token,
    API_URL,
    personalID,
    setPersonalID,
    collections,
    setCollections,
    user,
    setUser,
    followerObjects,
    followingsObjects,
    fetchCollectionsData,
    getFollowersData,
    getFollowingsData,
    FollowUser,
    UnfollowUser,
    getRandomRenk,
  } = useContext(GlobalContext);

  const [followinfo, setFollowinfo] = useState({
    isfollow: false,
    buttonName: "follow",
  });

  const dataFetchedRef = useRef(false);
  const location = useLocation();
  const followingId = location.state?.followingId;

  useEffect(() => {
    setUser(null);

    const fetchUserData = async (userid = null) => {
      try {
        let reqUrl = `${API_URL}/getUser/`;
        if (userid != null) {
          reqUrl = `${API_URL}/getUser?id=${userid}`;
        }
        console.log("userid: ", userid);

        const response = await axios.get(reqUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("kullanıcı geldiiiii", response.data.user);

        setUser(response.data.user);
      } catch (error) {
        console.log("hataaaaağğğğ!!!!", error);
      }
    };

    if (followingId !== null && followingId !== undefined) {
      fetchUserData(followingId); // followingId'yi fetchUserData fonksiyonuna gönderiyoruz
    }
  }, [followingId]);

  useEffect(() => {
    if (user) {
      /*       if (dataFetchedRef.current) return;
      dataFetchedRef.current = true; */
      console.log("username for socialDetail: ", user.firstName);
      console.log("followingId", followingId);
      fetchCollectionsData(followingId);
      getFollowersData(followingId);
      getFollowingsData(followingId);
    }
  }, [user]); // user state'i değiştiğinde çalışacak

  /*   useEffect(() => {
    console.log("followinfo:", followinfo);
  }); */

  return (
    <div>
      <div className="DetailContainer">
        <div className="ppDetail myProfile">
          {user && (
            <div>
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

              <button
                className={followinfo.buttonName}
                onClick={() => {
                  setFollowinfo({
                    ...followinfo,
                    isfollow: !followinfo.isfollow,
                    buttonName: followinfo.isfollow ? "follow" : "followed",
                  });
                }}
              >
                {followinfo.buttonName}
              </button>
            </div>
          )}
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
                slidesPerView={4.2}
                spaceBetween={1}
                mousewheel={true}
                freeMode={true}
                navigation={true}
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
          {user && <h1>{user.firstName}'s Collections</h1>}
        </div>
        <div className="cardsForProfile">
          {collections &&
            collections.map((collection) => (
              <a href="#" key={collection.id}>
                {" "}
                <div
                  className="ppDetailCard"
                  style={{
                    background: `url(${collection.imageUrl})`,
                    backgroundSize: "501px",
                    backgroundPosition: "59% 20%",
                    boxShadow: `9px 9px ${getRandomRenk()}`,
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
    </div>
  );
}

export default SocialDetail;
