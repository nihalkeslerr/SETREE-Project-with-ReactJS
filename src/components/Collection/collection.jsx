import React, { useContext, useState, useEffect, useRef } from "react";
import Footer from "../Footer/footer";
import CollectionDetail from "./collectionDetail";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";
import plusIcon from "../ASSETS/icons/plusIcon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eyeIcon from "../ASSETS/icons/eye.png"
import heartIcon from "../ASSETS/icons/heart.png"
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
function Collection() {
  const {
    token,
    API_URL,
    collections,
    setCollections,
    collectionsself,
    setCollectionself,
    user,
    setUser,
    fetchCollectionsData,
    ID,
    personalID,
    setPersonalID,
    getRandomColor,
    collectionisloading,
  } = useContext(GlobalContext);
  const imagePreview = document.getElementById("imagePreview");
  const [createCollData, setCreateCollData] = useState({
    title: "",
    tagReq: "",
    isPublic: false,
    imageUrl: "",
  });
  const preset_key = "dbcxdjud";
  const cloud_name = "dlo8tndg7";
  const [imageDataURL, setImageDataURL] = useState(null);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
    const [createisloading, setCreateisloading] = useState(false);

  useEffect(() => {
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
        if (userid == null) {
          localStorage.setItem("ID", response.data.user.id);
          setPersonalID(localStorage.getItem("ID"));
          console.log("ID", personalID);
        }
        setUser(response.data.user);
        console.log("user:", response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCollectionsData(user.id);
    }
  }, [user]); // user state'i değiştiğinde çalışacak

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dbcxdjud");
    formData.append("folder", "Setree"); // Klasör adını belirtin
    console.log("formDATA:", formData);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((response) => {
        console.log(response);
        setImageDataURL(response.data.secure_url);
        console.log("ImageDataURL:", imageDataURL);
      })
      .catch((err) => console.log(err));
  };

  console.log("imageDataURL:", imageDataURL); // Görüntünün URL'sini konsola yazdırır

  useEffect(() => {
    setCreateCollData({
      ...createCollData,
      imageUrl: imageDataURL,
    });
  }, [imageDataURL]);

  useEffect(() => {
    console.log("createCollData:", createCollData);
  }, [createCollData]);

  const handleInputChange = (e) => {
    const value =
      e.target.type === "radio" ? e.target.value === "true" : e.target.value;
    setCreateCollData({
      ...createCollData,
      [e.target.name]: value,
    });
    console.log("createCollData", {
      ...createCollData,
      [e.target.name]: value,
    });
  };

  const createCollection = (e) => {
    e.preventDefault();
     setCreateisloading(true);
    axios
      .post(
        `${API_URL}/createCollection`,
        {
          title: createCollData.title,
          tagReq: createCollData.tagReq,
          isPublic: createCollData.isPublic,
          imageUrl: createCollData.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.succeded === true) {
          console.log("Collection cevap geldi", response);
          toast.success("Collection Successfully Created!");
        } else {
          toast.error(response.data.error);
        }

        fetchCollectionsData(user.id);
      })
      .catch((error) => {
        console.error("Collection oluşturulamadı", error);
        toast.error("Connected Error");
      })
      .finally(() => {
          setCreateisloading(false);
      })
  };

  const toggleCreateCollection = () => {
    setShowCreateCollection(!showCreateCollection);
  };

  return (
    <div className="forBack">
      <div className="createGoal">
        <button onClick={toggleCreateCollection}>
          NEW COLLECTION
          <img src={plusIcon} alt="" />
        </button>
        {showCreateCollection && (
          <div className="OutSide">
            <h1 className="h1Head">Creating Collection</h1>
            <div className="createCollection">
              <div>
                <input
                  type="text"
                  name="title"
                  onChange={handleInputChange}
                  placeholder="Title"
                />{" "}
                <br />
                <input
                  type="text"
                  name="tagReq"
                  onChange={handleInputChange}
                  placeholder="Tag"
                />
              </div>
              <br />

              <div className="UploadImage">
                <div id="imagePreview">
                  {imageDataURL && (
                    <img class="imgPreview" src={imageDataURL} alt="Preview" />
                  )}
                  {!imageDataURL && "Preview"}
                </div>
                <input
                  className="imageFile"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
              </div>
              <br />
            </div>

            <div className="BottomSide">
              <input
                type="radio"
                id="public"
                name="isPublic"
                value="true"
                onChange={handleInputChange}
              />
              <label className="labelPublic" htmlFor="female">
                Public
              </label>
              <input
                type="radio"
                id="private"
                name="isPublic"
                value={false}
                onChange={handleInputChange}
              />
              <label className="labelPublic" htmlFor="male">
                Private
              </label>

              <input
                onClick={(e) => {
                  createCollection(e);
                  toggleCreateCollection();
                }}
                type="button"
                value="Create"
                className="crecolBtn"
              />
              {createisloading && (
          <Stack spacing={2} direction="row">
            <CircularProgress sx={{ color: "#596ed3" }} size={20} />
          </Stack>
      )}
            </div>
          </div>
        )}
      </div>
              {collectionisloading && (
          <div className="loading">
            <Stack spacing={2} direction="row">
              <CircularProgress sx={{ color: "#596ed3" }} size={80} />
            </Stack>
          </div>
        )}
      <div className="container collection">
        <div className="cards">
          {!showCreateCollection &&
            collectionsself &&
            collectionsself.map((collection, index) => (
              <NavLink
                to={{
                  pathname: "/collectionDetail",
                  state: { collectionID: collection.id },
                }}
                key={collection.id}
              >
               <div className="cardContainer" style={{
                  backgroundColor: `${getRandomColor(index)}`,
                }}>
                   <div
                  className="card health"
                  style={{
                    background: `url(${collection.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "59% 20%",
                    backgroundRepeat: "no-repeat",
                  }}
                > 
                  <div
                    className="count"
                    style={{
                  backgroundColor: `${getRandomColor(index)}`,
                }}
                  >
                    <label >{collection.itemCount}</label>
                  </div>
                  <div className="label ">
                    <label>{collection.title}</label>
                  </div>
                  </div>
                  <div className="CollIcon">
                    <img src={heartIcon} alt="" />
                    <span style={{marginRight:"15px"}}>{collection.likeCount }</span>
                    <img src={eyeIcon} alt="" />
                     <span>{collection.viewCount }</span>
                  </div>

               </div>
              </NavLink>
            ))}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Collection;
