import { cloneElement, createContext, useState } from "react";
import axios from "axios";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_URL;
  const [collections, setCollections] = useState(null);
  const [collectionsself, setCollectionself] = useState(null);
  const [user, setUser] = useState(null);
  const [followerObjects, setFollowers] = useState([]);
  const [followingsObjects, setFollowings] = useState([]);
  const [otheruser, setOtheruser] = useState(null);
  const ID = localStorage.getItem("ID");
  const [personalID, setPersonalID] = useState();
  const [goals, setGoals] = useState([]);
  const [collItem, setCollItem] = useState([]);
  const [collDetail, setCollDetail] = useState({});
  const [Goalisloading, setGoalisloading] = useState(true);
  const [followingsisloading, setFollowingsisloading] = useState(true);
  const [collectionisloading, setCollectionisloading] = useState(true);
  const colors = [
    "#FFCFC0",
    "#BDDFFF",
    "#F9FFB2",
    "#BCFFBF",
    "#C9C0FF",
    "#FFBDF8",
  ];
  let renkIndex = 0;

  const colorsForGoal = [
    "#ffb299",
    "#a7d1f9",
    "#91d5e2",
    "#8ad4a2",
    "#c9c1fa",
    "#efb8e9",
  ];
  const openColors = [
    "#fff7f5",
    "#f8fcff",
    "#f5fdff",
    "#f2fff6",
    "#f9f8ff",
    "#fff5fe",
  ];

  const fetchCollectionsData = async (userid) => {
    setCollections(null);
    setCollectionisloading(true);
    try {
      let reqUrl = `${API_URL}/getCollections/${userid}`;

      const response = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response for collection ", response);

      if (userid == ID) {
        setCollectionself(response.data.collections);
      } else {
        setCollections(response.data.collections);
      }
    } catch (error) {
      console.log("hataa: ");
      console.log(error);
    }
    finally {
      setCollectionisloading(false);
    }
  };
  const fetchGoals = () => {
    setGoals([]);
    setGoalisloading(true);
    axios
      .get(`${API_URL}/getGoals/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedGoals = response.data.goals;
        console.log("goallar çekildi:", fetchedGoals);

        // Her bir goal için getGoalDetail() fonksiyonunu çağır
        fetchedGoals.forEach((goal) => {
          getGoalDetail(goal.id);
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setGoalisloading(false);
      });
  };

  const getGoalDetail = (id) => {
    axios
      .get(`${API_URL}/getGoalDetail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("goalitem: ", response.data.goal);
        // Burada goal detail verilerini işleyebilirsiniz
        const goalItemData = response.data.goal;
        // goals dizisini güncelle
        setGoals((prevGoals) => [...prevGoals, goalItemData]);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // goals dizisini goal.goalItems.length değerine göre sırala
  goals.sort((a, b) => b.goalItems.length - a.goalItems.length);

  const toggleGoalItems = (goalId) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            showAllItems: !goal.showAllItems,
          };
        }
        return goal;
      })
    );
  };

  const getFollowersData = async (userid = null) => {
    setFollowers(null);
    try {
      let reqUrl = `${API_URL}/getFollowers/`;
      if (userid != null) {
        reqUrl = `${API_URL}/getFollowers?id=${userid}`;
      }
      const response = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response for followers ", response);
      setFollowers(response.data.followerObjects);
    } catch (error) {
      console.log("hataa: ");
      console.log(error);
    }
  };

  const getFollowingsData = async (userid) => {
    setFollowings(null);
    setFollowingsisloading(true);
    try {
      let reqUrl = `${API_URL}/getFollowings/`;
      if (userid != null) {
        reqUrl = `${API_URL}/getFollowings?id=${userid}`;
      }
      const response = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response for followings ", response);
      setFollowings(response.data.followingObjects);
    } catch (error) {
      console.log("hataa: ");
      console.log(error);
    } finally {
      setFollowingsisloading(false);
    }
  };

  const FollowUser = async () => {
    try {
      let reqUrl = `${API_URL}/follow/${user.id}`;
      const response = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response: ", response);
    } catch (error) {
      console.log("follow hataasıo: ");
      console.log(error);
    }
  };

  const UnfollowUser = async () => {
    try {
      let reqUrl = `${API_URL}/unfollow/${user.id}`;
      const response = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response: ", response);
    } catch (error) {
      console.log("unfollow hataasıııı: ");
      console.log(error);
    }
  };

  const getRandomColor = (index) => {
    const renkIndex = index % colors.length;
    return colors[renkIndex];
  };

  const getColor = (index) => {
    const renkIndex = index % colorsForGoal.length;
    return colorsForGoal[renkIndex];
  };
  const getOpenColor = (index) => {
    const renkIndex = index % openColors.length;
    return openColors[renkIndex];
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
    getColor,
    FollowUser,
    UnfollowUser,
    ID,
    personalID,
    setPersonalID,
    colors,
    getOpenColor,
    getRandomColor,
    collectionsself,
    setCollectionself,
    goals,
    setGoals,
    fetchGoals,
    toggleGoalItems,
    collItem,
    setCollItem,
    collDetail,
    setCollDetail,
    Goalisloading,
    setGoalisloading,
    followingsisloading,
    setFollowingsisloading,
    collectionisloading,
    setCollectionisloading
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
