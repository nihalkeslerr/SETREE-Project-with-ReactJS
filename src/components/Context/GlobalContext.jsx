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

  const fetchCollectionsData = async () => {
    try {
      console.log("istek colleciton için gidiyooooo");
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
  const getFollowersData = async () => {
    try {
      console.log("Followerslar geliyor");
      const response = await axios.get(`${API_URL}/getFollowers`, {
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

  const getFollowingsData = async () => {
    try {
      console.log("Followings geliyor");
      const response = await axios.get(`${API_URL}/getFollowings`, {
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
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
