import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import axios from "axios";
import image from "../ASSETS/icons/image.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CollectionDetail() {
  const {
    token,
    ID,
    API_URL,
    personalID,
    setPersonalID,
    collItem,
    setCollItem,
    collDetail,
    setCollDetail,
  } = useContext(GlobalContext);

  const location = useLocation();
  const collectionID = location.state?.collectionID;

  const [titleItem, setTitleItem] = useState(null);
  const [imageDataURL, setImageDataURL] = useState(null);

  const [createTitlePart, setCreateTitlePart] = useState(null);
  const [createTextPart, setCreateTextPart] = useState(null);
  const [createImagePart, setCreateImagePart] = useState(null);

  const preset_key = "dbcxdjud";
  const cloud_name = "dlo8tndg7";

  const [createItem, setCreateItem] = useState({
    content: "",
    type: "",
    collectionId: collectionID,
  });

  const fetchCollectionDetail = async () => {
    try {
      const reqUrl = `${API_URL}/getCollectionDetail/${collectionID}`;

      const response = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response: getCollectionDetail", response.data.collections);
      setCollDetail(response.data.collections);
      console.log("collDetail", response.data.collections);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItemsByCollection = async () => {
    try {
      const reqUrl = `${API_URL}/getItemsByCollection/${collectionID}`;

      const response = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCollItem(response.data.collectionItems);
      console.log(
        "response: getItemsByCollection",
        response.data.collectionItems
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (collectionID) {
      fetchCollectionDetail();
      fetchItemsByCollection();
    }
  }, [collectionID, API_URL, token]);

  console.log("collItem:", collItem);

  const handleTitle = (e) => {
    e.preventDefault();
    setCreateItem({ ...createItem, type: "title" });
    console.log("createItem", createItem);

    axios
      .post(`${API_URL}/createCollectionItem`, createItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
        if (response.data.succeded == true) {
          console.log("Collection Item Başarıyla oluşturuldu", response);
          toast.success("Title Added Successfully!");
          fetchCollectionDetail();
          fetchItemsByCollection();
        } else {
          console.log(
            "Collection Item oluşturulurken hata meydana geldi",
            response.data.error
          );
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Connected Error");
      });
  };

  const handleText = (e) => {
    e.preventDefault();
    setCreateItem({ ...createItem, type: "text" });
    console.log("createItem", createItem);

    axios
      .post(`${API_URL}/createCollectionItem`, createItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
        if (response.data.succeded == true) {
          console.log("Collection Item Başarıyla oluşturuldu", response);
          toast.success("Text Added Successfully!");
          fetchCollectionDetail();
          fetchItemsByCollection();
        } else {
          console.log(
            "Collection Item oluşturulurken hata meydana geldi",
            response.data.error
          );
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Connected Error");
      });
  };
  const handleImage = (e) => {
    e.preventDefault();
    setCreateItem({ ...createItem, type: "image" });
    console.log("createItem", createItem);
    setCreateItem({ ...createItem, content: imageDataURL });
    axios
      .post(`${API_URL}/createCollectionItem`, createItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
        if (response.data.succeded == true) {
          console.log("Collection Item Başarıyla oluşturuldu", response);
          toast.success("Image Added Successfully!");
          fetchCollectionDetail();
          fetchItemsByCollection();
        } else {
          console.log(
            "Collection Item oluşturulurken hata meydana geldi",
            response.data.error
          );
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Connected Error");
      });
  };

  const onChangeTitle = (e) => {
    setCreateItem({ ...createItem, [e.target.name]: e.target.value });
  };
  console.log("createItem", createItem);

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
        setCreateItem({ ...createItem, content: response.data.secure_url });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setCreateItem({ ...createItem, content: imageDataURL });
  }, [imageDataURL]);

  console.log("imageDataURL:", imageDataURL); // Görüntünün URL'sini konsola yazdırır

  const toggleTitle = () => {
    setCreateTitlePart((prevIsCreating) => !prevIsCreating);
    setCreateTextPart(false);
    setCreateImagePart(false);
    setCreateItem({ ...createItem, type: "title" });
    var element = document.querySelector(".titleBtn");
    if (element) {
      element.style.border = "1px solid gray";
    }
    var element = document.querySelector(".textBtn");
    if (element) {
      element.style.border = "1px solid white";
    }
    var element = document.querySelector(".imageBtn");
    if (element) {
      element.style.border = "1px solid white";
    }
  };
  const toggleText = () => {
    setCreateTitlePart(false);
    setCreateTextPart((prevIsCreating) => !prevIsCreating);
    setCreateImagePart(false);
    setCreateItem({ ...createItem, type: "text" });

    var element = document.querySelector(".titleBtn");
    if (element) {
      element.style.border = "1px solid white";
    }
    var element = document.querySelector(".textBtn");
    if (element) {
      element.style.border = "1px solid gray";
    }
    var element = document.querySelector(".imageBtn");
    if (element) {
      element.style.border = "1px solid white";
    }
  };
  const toggleImage = () => {
    setCreateTitlePart(false);
    setCreateTextPart(false);
    setCreateImagePart((prevIsCreating) => !prevIsCreating);
    setCreateItem({ ...createItem, type: "image" });

    var element = document.querySelector(".titleBtn");
    if (element) {
      element.style.border = "1px solid white";
    }
    var element = document.querySelector(".textBtn");
    if (element) {
      element.style.border = "1px solid white";
    }
    var element = document.querySelector(".imageBtn");
    if (element) {
      element.style.border = "1px solid gray";
    }
  };

  return (
    <div>
      <div className="collectionContainer">
        <div
          className="CollectionDetail"
          style={{ backgroundImage: `url(${collDetail.imageUrl})` }}
        >
          <div className="bgOpacity">
            <div className="collectionHead">
              <p> {collDetail.title}</p>
              <p className="tag">Tag: {collDetail.tag}</p>
            </div>
          </div>
        </div>

        <div className="CollExplanation">
          <div className="itemBtn">
            <button
              className="titleBtn"
              type="button"
              onClick={toggleTitle}
            ></button>
            <button
              className="textBtn"
              type="button"
              onClick={toggleText}
            ></button>
            <button
              className="imageBtn"
              type="button"
              onClick={toggleImage}
            ></button>
          </div>

          <div className="CreatingItem">
            {createTitlePart && (
              <div>
                <label htmlFor="TitleCollecITem"></label>
                <input
                  className="titleGoal TitleCollecITem"
                  onChange={onChangeTitle}
                  name="content"
                  type="text"
                  placeholder="Title"
                />
                <input
                  type="button"
                  className="buttonGoal buttonCollItem"
                  value="Create"
                  onClick={handleTitle}
                />
              </div>
            )}
            {createTextPart && (
              <div>
                <textarea
                  className=" textareColl"
                  onChange={onChangeTitle}
                  name="content"
                  type="Textarea"
                  placeholder="Text"
                />
                <input
                  type="button"
                  className="buttonGoal buttonCollItem"
                  value="Create"
                  onClick={handleText}
                />
              </div>
            )}

            {createImagePart && (
              <div className="ImagePart">
                <div className="ImagePart">
                  <div id="imagePreviewColl">
                    {" "}
                    {imageDataURL && (
                      <img
                        className="imgPreviewDetail"
                        src={imageDataURL}
                        alt="Preview"
                      />
                    )}
                    {!imageDataURL && "Preview"}
                  </div>
                  <input
                    className="imageFile"
                    type="file"
                    name="content"
                    onChange={handleFileChange}
                  />
                </div>
                <input
                  type="button"
                  className="buttonGoal buttonCollItem"
                  value="Create"
                  onClick={handleImage}
                />
              </div>
            )}
          </div>

          <div>
            {collItem.map((item) => {
              if (item.type === "image") {
                return (
                  <img
                    className="itemImage"
                    key={item.id}
                    src={item.content}
                    alt="Image"
                  />
                );
              } else if (item.type === "text") {
                return <p key={item.id}>{item.content}</p>;
              } else if (item.type === "title") {
                return <h1 key={item.id}>{item.content}</h1>;
              }
              return null;
            })}
          </div>
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

export default CollectionDetail;
