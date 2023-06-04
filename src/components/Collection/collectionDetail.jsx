import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import axios from "axios";
import image from "../ASSETS/icons/image.png";
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
      .post(
        `${API_URL}/createCollectionItem`,
        createItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
        if (response.data.succeded == true) {
           console.log("Collection Item Başarıyla oluşturuldu", response);
        fetchCollectionDetail();
      fetchItemsByCollection();
        }
        else {
          console.log("Collection Item oluşturulurken hata meydana geldi", response.data.error);
        }
       
      })
      .catch((error) => {
        console.error(error);
      });
  };

    const handleText = (e) => {
    e.preventDefault();
    setCreateItem({ ...createItem, type: "text" });
    console.log("createItem", createItem);

    axios
      .post(
        `${API_URL}/createCollectionItem`,
        createItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
        if (response.data.succeded == true) {
           console.log("Collection Item Başarıyla oluşturuldu", response);
        fetchCollectionDetail();
      fetchItemsByCollection();
        }
        else {
          console.log("Collection Item oluşturulurken hata meydana geldi", response.data.error);
        }
       
      })
      .catch((error) => {
        console.error(error);
      });
  };
    const handleImage = (e) => {
    e.preventDefault();
    setCreateItem({ ...createItem, type: "image" });
    console.log("createItem", createItem);

    axios
      .post(
        `${API_URL}/createCollectionItem`,
        createItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
        if (response.data.succeded == true) {
           console.log("Collection Item Başarıyla oluşturuldu", response);
        fetchCollectionDetail();
      fetchItemsByCollection();
        }
        else {
          console.log("Collection Item oluşturulurken hata meydana geldi", response.data.error);
        }
       
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const onChangeTitle = (e) => {
    setCreateItem({ ...createItem, [e.target.name]: e.target.value });
  };
  console.log("createItem", createItem);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    const maxSizeInBytes = 1000 * 1024; // 1MB

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
          const imagePreview = document.getElementById("imagePreviewColl");
          imagePreview.innerHTML = `<img class="imgPreview" src="${resizedDataURL}" alt="Preview" />`;
          setCreateItem({...createItem, content:resizedDataURL})
        };

        img.src = event.target.result;
      }
    };

    reader.readAsDataURL(file);
  };

  console.log("imageDataURL:", imageDataURL); // Görüntünün URL'sini konsola yazdırır

  const toggleTitle = () => {
    setCreateTitlePart((prevIsCreating) => !prevIsCreating);
    setCreateTextPart(false);
    setCreateImagePart(false);
    setCreateItem({ ...createItem, type: "title" });
  };
  const toggleText = () => {
    setCreateTitlePart(false);
    setCreateTextPart((prevIsCreating) => !prevIsCreating);
    setCreateImagePart(false);
        setCreateItem({ ...createItem, type: "text" });
  };
  const toggleImage = () => {
    setCreateTitlePart(false);
    setCreateTextPart(false);
    setCreateImagePart((prevIsCreating) => !prevIsCreating);
            setCreateItem({ ...createItem, type: "image" });
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
                  <div id="imagePreviewColl">Preview</div>
                  <input
                    className="imageFile"
                    type="file"
                    name="content"
                    accept="image/*"
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
    </div>
  );
}

export default CollectionDetail;
