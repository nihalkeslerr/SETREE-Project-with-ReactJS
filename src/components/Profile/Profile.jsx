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
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import eyeIcon from "../ASSETS/icons/eye.png";
import heartIcon from "../ASSETS/icons/heart.png";
import heartColorIcon from "../ASSETS/icons/heartColor.png";

function Profile() {
  const {
    token,
    API_URL,
    user,
    setUser,
    setCollections,
    followerObjects,
    followingsObjects,
    fetchCollectionsData,
    getFollowersData,
    getFollowingsData,
    getRandomColor,
    collectionsself,
    collectionisloading,
  } = useContext(GlobalContext);

  const [openFav, setopenFav] = useState(false);
  const [userloading, setUserloading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [favCollections, setFavCollections] = useState(null);
  const [favColloading,setFavColloading] =  useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const OpenFavs = () => {
    setopenFav((prev) => !prev);
   
    
  };

 useEffect(() => {
   console.log("favCollections:", favCollections);
 }, [favCollections]);
  
  useEffect(() => {
     setFavColloading(true);
   axios
      .get(`${API_URL}/getLikedCollections/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          console.log(
            "Liked Collections:---------------------- ",
            response.data
          );
          setFavCollections(response.data.collections);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setFavColloading(false);
      });
 }, []);
  
  
  useEffect(() => {
    setCollections(null);
    setUser(null);
  }, []);

  useEffect(() => {
    setUser(null);
    setUserloading(true);
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
      } finally {
        setUserloading(false);
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
          {userloading && (
            <div className="loading">
              <Stack spacing={2} direction="row">
                <CircularProgress sx={{ color: "#596ed3" }} size={100} />
              </Stack>
            </div>
          )}
          {user && (
            <div>
              <NavLink to="/updateprofile">
                <button className="Edit">Edit Profile</button>
              </NavLink>
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
        
        <h1>{openFav ? "Favorites" : "Your Collections"} /</h1>
        <button
          onClick={OpenFavs}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p>{!openFav ? "Favorites" : "My Collections"}</p>
          <img src={isHovered ? heartIcon : heartColorIcon} alt="" />
        </button>
      </div>
      {collectionisloading && (
        <div className="loading">
          <Stack spacing={2} direction="row">
            <CircularProgress sx={{ color: "#596ed3" }} size={100} />
          </Stack>
        </div>
      )}

      {openFav && (
        <div className="cardsForProfile">
          {favCollections &&
            favCollections.map((collection, index) => (
              <NavLink
                to={{
                  pathname: "/collectionDetail",
                  state: { collectionID: collection.id },
                }}
                key={collection.id}
              >
                <div
                  className="cardContainerDetail"
                  style={{
                    backgroundColor: `${getRandomColor(index)}`,
                  }}
                >
                  {" "}
                  <div
                    className="ppDetailCard health"
                    style={{
                      background: `url(${collection.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "59% 20%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    
                    <div className="label" style={{ marginTop: "150px" }}>
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
      )}

      {!openFav && (
        <div className="cardsForProfile">
          {collectionsself &&
            collectionsself.map((collection, index) => (
              <NavLink
                to={{
                  pathname: "/collectionDetail",
                  state: { collectionID: collection.id },
                }}
                key={collection.id}
              >
                <div
                  className="cardContainerDetail"
                  style={{
                    backgroundColor: `${getRandomColor(index)}`,
                  }}
                >
                  {" "}
                  <div
                    className="ppDetailCard health"
                    style={{
                      background: `url(${collection.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "59% 20%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="label" style={{ marginTop: "150px" }}>
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
      )}
    </div>
  );
}

export default Profile;
