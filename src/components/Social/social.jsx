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
import Tag from "../ASSETS/icons/tag.png";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function Social() {
  const {
    token,
    API_URL,
    user,
    setUser,
    getFollowingsData,
    followingsObjects,
    followingsisloading,
  } = useContext(GlobalContext);
  const dataFetchedRef = useRef(false);

  const [searchQuery, setSearchQuery] = useState({
    keyword: "",
  });
  const [results, setResults] = useState(null);
  const [searchIsloading, setSearchIsloading] = useState(false);

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

  const searchInputChange = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
    // Query boşsa arama işlemini gerçekleştirme
    if (e.target.value === "") {
      console.log(" searchInputChange query boş");
      setResults(null);
    }
    searchInput();
  };

  const searchInput = (e) => {
    if (searchQuery.keyword === "") {
      // Query boş ise arama işlemini gerçekleştirme
      setResults(null);
      console.log("searchInput query boş");
      return;
    } else {
      setSearchIsloading(true);
      axios
        .post(`${API_URL}/search`, searchQuery, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.succeeded === true) {
            console.log(
              `Searching...... for ${searchQuery.keyword} this`,
              response.data.searchResults
            );
            setResults(response.data.searchResults);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setSearchIsloading(false);
        });
    }
  };

  console.log("searchQuery", searchQuery);
  console.log(`${searchQuery.keyword} araması için result:`, results);

  return (
    <div>
      <div className="container social">
        <div>
          <div className="search">
            <input
              placeholder="Search Friends"
              onChange={searchInputChange}
              autoFocus
              value={searchQuery.keyword}
              name="keyword"
            ></input>
            <button type="submit"></button>
          </div>
          {searchIsloading && (
            <div className="loading">
              <Stack spacing={2} direction="row">
                <CircularProgress sx={{ color: "#596ed3" }} size={80} />
              </Stack>
            </div>
          )}
          <div>
            {results &&
            ((results.tags && results.tags.length > 0) ||
              (results.users && results.users.length > 0)) ? (
              <ul className="results">
                {results.users &&
                  results.users.length > 0 &&
                  results.users.map((user) => (
                    <li key={user.id}>
                      <NavLink
                        className="prop"
                        to={{
                          pathname: "/SocialDetail",
                          state: { followingId: user.id },
                        }}
                      >
                        <div
                          className="profileimgSearch"
                          style={{
                            backgroundImage: `url(${user.imageUrl})`,
                          }}
                        ></div>
                        <div className="searchInfo">
                          <p>
                            {user.firstName} {user.lastName}
                          </p>
                          <p>
                            <span>{user.listCount}</span> List -{" "}
                            <span>{user.followers.length}</span> Followers
                          </p>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                {results.tags &&
                  results.tags.length > 0 &&
                  results.tags.map((tag) => (
                    <li key={tag.id}>
                      <NavLink className="prop"
                        to={{
                          pathname: "/CollectionsByTag",
                          state: { tagTitle: tag.title },
                        }}>
                        <div className="searchTag">
                          <img src={Tag} />
                          <div>
                            <p>{tag.title}</p>
                             <p>
                            <span>{tag.collectionIdsCount}</span> Collections
                          </p>
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
        <div className="listhead">
          <h1>Followings</h1>
        </div>
        {followingsisloading && (
          <div className="loading">
            <Stack spacing={2} direction="row">
              <CircularProgress sx={{ color: "#596ed3" }} size={80} />
            </Stack>
          </div>
        )}

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
