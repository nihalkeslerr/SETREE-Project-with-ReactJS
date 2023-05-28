import React, { useContext, useState, useEffect, useRef } from "react";
import Footer from "../Footer/footer";
import CollectionDetail from "./collectionDetail";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";
import plusIcon from "../ASSETS/icons/plusIcon.png";
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
  } = useContext(GlobalContext);

  const [createCollData, setCreateCollData] = useState({
    title: "",
    tagReq: "",
    isPublic: false,
    imageUrl: "",
  });

  const [imageDataURL, setImageDataURL] = useState(null);
  const dataFetchedRef = useRef(false);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
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
    const reader = new FileReader();

    const maxSizeInBytes = 1000 * 1024; // 1MB

/*     if (file.size > maxSizeInBytes) {
      console.log(
        "Seçilen resim çok büyük. Lütfen daha küçük bir resim seçin."
      );
      // İstenilen boyutu aşan resim seçildiğinde kullanıcıya uyarı verebilirsiniz.
      alert("Seçilen resim çok büyük. Lütfen daha küçük bir resim seçin.");
      event.target.value = null; // Seçimi kaldırmak için input değerini null olarak ayarlıyoruz

      return;
    } */

  reader.onload = function (event) {
    if (event.target.readyState === FileReader.DONE) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 800;
        const maxHeight = 600;

        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            width = maxWidth;
            height = Math.round(maxWidth * (img.height / img.width));
          } else {
            height = maxHeight;
            width = Math.round(maxHeight * (img.width / img.height));
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const resizedDataURL = canvas.toDataURL("image/jpeg", 0.7); // Resim kalitesini 0 ile 1 arasında ayarlayabilirsiniz

        setImageDataURL(resizedDataURL);
        const imagePreview = document.getElementById("imagePreview");
        imagePreview.innerHTML = `<img class="imgPreview" src="${resizedDataURL}" alt="Preview" />`;
      };

      img.src = event.target.result;
    }
  };

    reader.readAsDataURL(file);
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
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
        console.log("Collection cevap geldi", response);
        fetchCollectionsData(user.id);
      })
      .catch((error) => {
        console.error("Collection oluşturulamadı", error);
      });
  };

  const toggleCreateCollection = () => {
    setShowCreateCollection(!showCreateCollection);
  };

  return (
    <div>
      <div className="createGoal">
        <button onClick={toggleCreateCollection}>
          NEW COLLECTION
          <img src={plusIcon} alt="" />
        </button>
        {showCreateCollection && (
          <div className="createCollection">
            <p>Collection Creation</p>
            <br />
            <label className="labelText">Choose Your Image</label>
            <br />
            <div className="UploadImage">
              <div id="imagePreview">Preview</div>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <br />
            <label className="labelText" htmlFor="tag">
              Add Tag
            </label>
            <br />
            <input
              type="text"
              name="tagReq"
              onChange={handleInputChange}
            />{" "}
            <br />
            <label className="labelText nameColl" htmlFor="name">
              Give a Name Your Collection
            </label>
            <br />
            <input type="text" name="title" onChange={handleInputChange} />
            <br />
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
            <br />
            <input
              onClick={(e) => {
                toggleCreateCollection();
              }}
              type="button"
              value="Back"
              className="BackBtn"
            />
            <input
              onClick={(e) => {
                createCollection(e);
                toggleCreateCollection();
              }}
              type="button"
              value="Create"
              className="crecolBtn"
            />
          </div>
        )}
      </div>
      {!showCreateCollection && (
        <div className="container collection">
          <div className="cards">
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
                    className="card health"
                    style={{
                      background: `url(${collection.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "59% 20%",
                      boxShadow: `9px 9px ${getRandomColor(index)}`,
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div
                      className="count"
                      style={{ backgroundColor: "rgb(255 202 166)" }}
                    >
                      <label>{collection.itemCount}</label>
                    </div>
                    <div className="label ">
                      <label>{collection.title}</label>
                    </div>
                  </div>
                </NavLink>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Collection;
