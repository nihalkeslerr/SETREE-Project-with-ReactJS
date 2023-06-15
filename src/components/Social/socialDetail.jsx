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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import eyeIcon from "../ASSETS/icons/eye.png";
import heartIcon from "../ASSETS/icons/heart.png";

function SocialDetail() {
  const {
    token,
    ID,
    API_URL,
    collections,
    user,
    setUser,
    followerObjects,
    followingsObjects,
    fetchCollectionsData,
    getFollowersData,
    getFollowingsData,
    getRandomColor,
    collectionisloading,
  } = useContext(GlobalContext);

  const dataFetchedRef = useRef(false);
  const location = useLocation();
  const followingId = location.state?.followingId;
  console.log("ID", ID);
  const [userloading, setUserloading] = useState(true);
  const [followloading, setFollowloading] = useState(false);

  useEffect(() => {
    setUser(null);
    setUserloading(true);
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
      } finally {
        setUserloading(false);
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
    setFollowloading(true);
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
          toast.info("Followed!");
          setUser((prevUser) => {
            return {
              ...prevUser,
              followers: [...prevUser.followers, parseInt(ID)],
            };
          });
        } else {
          setFollowloading(true);
          axios
            .get(`${API_URL}/unfollow/${user.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              toast.info("Unfollowed!");
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
            })
            .finally(() => {
              setFollowloading(false);
            });
        }
      })
      .catch((error) => {
        console.error("Takip ederken bir HATA oluştu.", error);
      })
      .finally(() => {
        setFollowloading(false);
      });
  };
  /*   useEffect(() => {
    console.log("followinfo:", followinfo);
  }); */

  return (
    <div>
      <div className="DetailContainer">
        <div className="ppDetail myProfile">
          {userloading && (
            <div className="loading">
              <Stack spacing={2} direction="row">
                <CircularProgress sx={{ color: "#596ed3" }} size={100} />
              </Stack>
            </div>
          )}
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
              {!(user.id == ID) && (
                <div className="buttonLoad">
                  <div>
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
                  <div className="loading">
                    {followloading && (
                      <Stack spacing={2} direction="row">
                        <CircularProgress sx={{ color: "#596ed3" }} size={20} />
                      </Stack>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
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
                          pathname: (follower.id == ID) ? "/profile" : "/SocialDetail",
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
        {collectionisloading && (
          <div className="loading">
            <Stack spacing={2} direction="row">
              <CircularProgress sx={{ color: "#596ed3" }} size={100} />
            </Stack>
          </div>
        )}
        <div className="cardsForProfile">
          {collections &&
            collections.map((collection, index) => (
              <NavLink
                to={{
                  pathname: "/collectionDetail",
                  state: { collectionID: collection.id },
                }}
                key={collection.id}
              >
                {" "}
                <div
                  className="cardContainerDetail"
                  style={{
                    backgroundColor: `${getRandomColor(index)}`,
                  }}
                >
                  <div
                    className="ppDetailCard"
                    style={{
                      background: `url(${collection.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "59% 20%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="label" style={{ marginTop: "100px" }}>
                      <label>{collection.title}</label>
                    </div>
                  </div>
                  <div className="CollIcon">
                    <img src={heartIcon} alt="" />
                    <span style={{ marginRight: "15px" }}>
                      {collection.likeCount}
                    </span>
                    <img src={eyeIcon} alt="" />
                    <span>{collection.viewCount}</span>
                  </div>
                </div>
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SocialDetail;
