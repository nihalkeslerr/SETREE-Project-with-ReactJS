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
    ID,
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
    getRandomColor,
  } = useContext(GlobalContext);

  const dataFetchedRef = useRef(false);
  const location = useLocation();
  const followingId = location.state?.followingId;
  console.log("ID", ID);
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

  const toggleFollow = () => {
    axios
      .get(`${API_URL}/follow/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("TAKİP Cevabı Geldi.", response);
        const succeeded = response.data.succeeded;
        console.log("succeeded:", succeeded);
        if (succeeded === true) {
          console.log("Takip isteği başarılı");
          setUser((prevUser) => {
            return {
              ...prevUser,
              followers: [...prevUser.followers, parseInt(ID)],
            };
          });
        } else {
          axios
            .get(`${API_URL}/unfollow/${user.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log("unTAKİP Cevabı Geldi.", response);
              console.log(
                "succeeded status for unfollow:",
                response.data.succeeded
              );
              setUser((prevUser) => {
                return {
                  ...prevUser,
                  followers: prevUser.followers.filter(
                    (followerId) => followerId !== parseInt(ID)
                  ),
                };
              });
            })
            .catch((error) => {
              console.error("Takipten çıkarken bir HATA oluştu.", error);
            });
        }
      })
      .catch((error) => {
        console.error("Takip ederken bir HATA oluştu.", error);
      });
  };
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
                  className={
                    user.followers.includes(parseInt(ID))
                      ? "followed"
                      : "follow"
                  }
                  onClick={toggleFollow}
                >
                  {user.followers.includes(parseInt(ID))
                    ? "Following"
                    : "Follow"}
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
              collections.map((collection, index) => (
                <a href="#" key={collection.id}>
                  {" "}
                  <div
                    className="ppDetailCard"
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
      </div>



  );
}

export default SocialDetail;
