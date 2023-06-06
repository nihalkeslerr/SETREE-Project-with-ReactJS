import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Social() {
  const {
    token,
    API_URL,
    user,
    setUser,
    getFollowingsData,
    followingsObjects,
  } = useContext(GlobalContext);
  const dataFetchedRef = useRef(false);

  const [searchQuery, setSearchQuery] = useState(
    {
      keyword:""
    }
  );

  useEffect(() => {
    setUser(null);
    const fetchUserData = async (userid = null) => {
      try {
        const reqUrl = `${API_URL}/getUser/`;
        if (userid != null) {
          reqUrl = `${API_URL}/getUser/${userid}`;
        }
        const response = await axios.get(reqUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      /*       if (dataFetchedRef.current) return;
      dataFetchedRef.current = true; */
      getFollowingsData();
    }
  }, [user]); // user state'i değiştiğinde çalışacak

  const searchInput = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
        axios
      .post(`${API_URL}/search`, searchQuery, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.succeeded === true) {
          console.log("Searchingg......", response);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Connected Error");
      });
  };
  console.log("searchQuery", searchQuery);


  return (
    <div>
      <div className="container social">
        <div className="search" >
            <input
              placeholder="Search Friends"
              onChange={searchInput}
              autoFocus
              name="keyword"
            ></input>
            <button type="submit"></button>
        </div>
        <div className="listhead">
          <h1>Followings</h1>
        </div>

        <div className="profiles">
          {followingsObjects &&
            followingsObjects.map((following) => (
              <div className="profile" key={following.id}>
                <div className="flex">
                  <div>
                    <NavLink
                      className="prop"
                      to={{
                        pathname: "/SocialDetail",
                        state: { followingId: following.id },
                      }}
                    >
                      <div
                        className="profileimg"
                        style={{
                          backgroundImage: `url(${following.imageUrl})`,
                        }}
                      ></div>
                      <div>
                        <p>
                          {following.firstName} {following.lastName}
                        </p>
                        <p>
                          <span>{following.listCount}</span> List -{" "}
                          <span>{following.followers.length}</span> Followers
                        </p>
                      </div>
                    </NavLink>
                  </div>

                  {/*  <div>
                    <button>Follow</button>
                  </div> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Social;
