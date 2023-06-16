import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eyeIcon from "../ASSETS/icons/eye.png";
import heartIcon from "../ASSETS/icons/heart.png";
import { NavLink } from "react-router-dom";
import Tag from "../ASSETS/icons/tag.png";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
function CollectionsByTag() {
  const {
    token,
    API_URL,
    collectionsByTag,
    setCollectionsByTag,
    getCollectionsByTag,
      getRandomColor,
    collectionisloading
  } = useContext(GlobalContext);
  const location = useLocation();
  const tagTitle = location.state?.tagTitle;
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (!dataFetchedRef.current) {
      getCollectionsByTag(tagTitle);
      dataFetchedRef.current = true;
    }
  });

  return (
    <div className="containerTag">
      <div className="tagTitle">
        <img src={Tag} alt="" />
        <p>{tagTitle}</p>
          </div>
           {collectionisloading && (
          <div className="loading">
            <Stack spacing={2} direction="row">
              <CircularProgress sx={{ color: "#596ed3" }} size={100} />
            </Stack>
          </div>
        )}
      <div className="container collection">
        <div className="cards">
          {collectionsByTag &&
            collectionsByTag.map((collection, index) => (
              <NavLink
                to={{
                  pathname: "/collectionDetail",
                  state: { collectionID: collection.id },
                }}
                key={collection.id}
              >
                <div
                  className="cardContainer"
                  style={{
                    backgroundColor: `${getRandomColor(index)}`,
                  }}
                >
                  <div
                    className="card health"
                    style={{
                      background: `url(${collection.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "59% 20%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="label ">
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

export default CollectionsByTag;
