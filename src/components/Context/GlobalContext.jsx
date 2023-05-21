import { cloneElement, createContext, useState } from "react";
import axios from "axios";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_URL;
  const [collections, setCollections] = useState(null);
  const [user, setUser] = useState(null);
  const [followerObjects, setFollowers] = useState([]);
  const [followingsObjects, setFollowings] = useState([]);
  const [otheruser, setOtheruser] = useState(null);
  const ID = localStorage.getItem("ID");
  const [personalID, setPersonalID] = useState();
  const renkler = [
    "#FFCFC0",
    "#BDDFFF",
    "#F9FFB2",
    "#BCFFBF",
    "#C9C0FF",
    "#FFBDF8",
  ];
  let renkIndex = 0;

  const fetchCollectionsData = async (userid) => {
    //setCollections(null);
    console.log("username for profillllll: ", user.firstName);
    console.log("collections setted to null:", collections);
    try {
      console.log("istek colleciton için gidiyooooo");
      let reqUrl = `${API_URL}/getCollections/${userid}`;

      const response = await axios.get(reqUrl, {
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
  console.log("collections:", collections);
  const getFollowersData = async (userid = null) => {
    //setFollowers(null);
    try {
      console.log("Followerslar geliyor");
      let reqUrl = `${API_URL}/getFollowers/`;
      if (userid != null) {
        reqUrl = `${API_URL}/getFollowers?id=${userid}`;
      }
      console.log("Followerslar için userid: ", userid);
      const response = await axios.get(reqUrl, {
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

  const getFollowingsData = async (userid) => {
    //setFollowings(null);
    try {
      console.log("Followings geliyor");
      let reqUrl = `${API_URL}/getFollowings/`;
      if (userid != null) {
        reqUrl = `${API_URL}/getFollowings?id=${userid}`;
      }
      const response = await axios.get(reqUrl, {
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

  const FollowUser = async () => {
    try {
      console.log("follow isteği gidiyorrrrrr");
      let reqUrl = `${API_URL}/follow/${user.id}`;
      const response = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("follow isteği tamamlandı... :) ");
      console.log("response: ", response);
    } catch (error) {
      console.log("follow hataasıo: ");
      console.log(error);
    }
  };

  const UnfollowUser = async () => {
    try {
      console.log("unfollow isteği gidiyorrrrrr");
      let reqUrl = `${API_URL}/unfollow/${user.id}`;
      const response = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("unfollow isteği tamamlandı... :) ");
      console.log("response: ", response);
    } catch (error) {
      console.log("unfollow hataasıııı: ");
      console.log(error);
    }
  };

  const getRandomRenk = () => {
    const renk = renkler[renkIndex];
    renkIndex = (renkIndex + 1) % renkler.length;
    return renk;
  };

  const values = {
    token,
    API_URL,
    collections,
    setCollections,
    user,
    setUser,
    followerObjects,
    setFollowers,
    followingsObjects,
    setFollowings,
    fetchCollectionsData,
    getFollowersData,
    getFollowingsData,
    otheruser,
    setOtheruser,
    FollowUser,
    UnfollowUser,
    ID,
    personalID,
    setPersonalID,
    renkler,
    getRandomRenk,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
