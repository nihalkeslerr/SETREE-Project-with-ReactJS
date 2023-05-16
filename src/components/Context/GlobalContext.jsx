import { createContext, useState } from "react";
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

  const fetchCollectionsData = async () => {
    setCollections(null);
    try {
      console.log("istek colleciton için gidiyooooo");
      let reqUrl = `${API_URL}/getCollections/${user.id}`;
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
  const getFollowersData = async (userid = null) => {
    setFollowers(null);
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
    setFollowings(null);
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
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
