import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";
import axios from "axios";
import image from "../ASSETS/icons/image.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import heartIcon from "../ASSETS/icons/heart.png";
import heartColorIcon from "../ASSETS/icons/heartColor.png";
function CollectionDetail() {
  const {
    token,
    ID,
    API_URL,
    user,
    setUser,
    personalID,
    setPersonalID,
    collItem,
    setCollItem,
    collDetail,
    setCollDetail,
  } = useContext(GlobalContext);

  const location = useLocation();
  const collectionID = location.state?.collectionID;

  const [imageDataURL, setImageDataURL] = useState(null);

  const [createTitlePart, setCreateTitlePart] = useState(null);
  const [createTextPart, setCreateTextPart] = useState(null);
  const [createImagePart, setCreateImagePart] = useState(null);

  const [itemIsloading, setItemIsloading] = useState(true);
  const [collItemIsloading, setCollItemIsloading] = useState(true);
  const [createisloading, setCreateisloading] = useState(false);
  const [likeloading, setLikeloading] = useState(false);
  const cloud_name = "dlo8tndg7";
  const [myData, setMyData] = useState(null);
  const [createItem, setCreateItem] = useState({
    content: "",
    type: "",
    collectionId: collectionID,
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const fetchCollectionDetail = async () => {
    setCollDetail([]);
    try {
      setCollItemIsloading(true);
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
    } finally {
      setCollItemIsloading(false);
    }
  };

  const fetchItemsByCollection = async () => {
    setCollItem([]);
    try {
      setItemIsloading(true);
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
    } finally {
      setItemIsloading(false);
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
    setCreateisloading(true);
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
      })
      .finally(() => {
        setCreateisloading(false);
      });
  };

  const handleText = (e) => {
    e.preventDefault();
    setCreateItem({ ...createItem, type: "text" });
    console.log("createItem", createItem);
    setCreateisloading(true);
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
      })
      .finally(() => {
        setCreateisloading(false);
      });
  };
  const handleImage = (e) => {
    e.preventDefault();
    setCreateItem({ ...createItem, type: "image" });
    console.log("createItem", createItem);
    setCreateItem({ ...createItem, content: imageDataURL });
    setCreateisloading(true);
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
      })
      .finally(() => {
        setCreateisloading(false);
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

  useEffect(() => {
    setMyData(null);
    const fetchMyData = async () => {
      try {
        let reqUrl = `${API_URL}/getUser/`;
        const response = await axios.get(reqUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.user);
        setMyData(response.data.user);
        console.log("myData:", myData);
        
      } catch (error) {
        console.log(error);
      } 
    };
    fetchMyData();
  }, []);

  useEffect(() => {
    console.log("myData:", myData);
  })

  const toggleLikeCollection = () => {
      // Update the local state immediately
  setMyData((prevUser) => {
    if (prevUser.likedCollections.includes(collDetail.id)) {
      // If the collection is already liked, remove it
      return {
        ...prevUser,
        likedCollections: prevUser.likedCollections.filter(
          (likeCollId) => likeCollId !== collDetail.id
        ),
      };
    } else {
      // If the collection is not liked, add it
      return {
        ...prevUser,
        likedCollections: [...prevUser.likedCollections, collDetail.id],
      };
    }
  });
    
    setLikeloading(true);
    axios
      .get(`${API_URL}/likeACollection/${collDetail.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("LIKE Cevabı Geldi.", response);
        const succeeded = response.data.succeeded;
        console.log("succeeded:", succeeded);
        
        if (succeeded === true) {
          console.log("LIKE isteği başarılı");
          toast.info("Liked!");
          setMyData((prevUser) => {
            return {
              ...prevUser,
              likedCollections: [...prevUser.likedCollections, parseInt(ID)],
            };
          });
        } else {
          setLikeloading(true);
          axios
            .get(`${API_URL}/dislikeACollection/${collDetail.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              toast.info("Disliked!");
              console.log("DISLIKED Cevabı Geldi.", response);
              console.log(
                "succeeded status for DISLIKED:",
                response.data.succeeded
              );
              setMyData((prevUser) => {
                return {
                  ...prevUser,
                  likedCollections: prevUser.likedCollections.filter(
                    (likeCollId) => likeCollId !== parseInt(ID)
                  ),
                };
              });
            })
            .catch((error) => {
              console.error("Dislike olurken bir HATA oluştu.", error);
            })
            .finally(() => {
              setLikeloading(false);
            });
        }
      })
      .catch((error) => {
        console.error("Takip ederken bir HATA oluştu.", error);
      })
      .finally(() => {
        setLikeloading(false);
      });
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
              <div className="likeBtn">
                <button
                  onClick={toggleLikeCollection}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src={myData && (
                    myData.likedCollections.includes(collDetail.id)
                      ? heartColorIcon
                      : heartIcon
                  )
                    } alt="" />
                </button>
                
              </div>
              <p> {collDetail.title}</p>
              <p className="tag"># {collDetail.tag}</p>
              {collItemIsloading && (
                <div className="loading">
                  <Stack spacing={2} direction="row">
                    <CircularProgress sx={{ color: "#596ed3" }} size={20} />
                  </Stack>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="CollExplanation">
          {collDetail.userId == ID && (
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
       )}
          

          <div className="CreatingItem">
            {createTitlePart && (
              <div className="import">
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
                {createisloading && (
                  <Stack spacing={2} direction="row">
                    <CircularProgress sx={{ color: "#596ed3" }} size={20} />
                  </Stack>
                )}
              </div>
            )}
            {createTextPart && (
              <div className="importText">
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
                {createisloading && (
                  <Stack spacing={2} direction="row">
                    <CircularProgress sx={{ color: "#596ed3" }} size={20} />
                  </Stack>
                )}
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
                {createisloading && (
                  <Stack spacing={2} direction="row">
                    <CircularProgress sx={{ color: "#596ed3" }} size={20} />
                  </Stack>
                )}
              </div>
            )}
          </div>

          <div>
            {itemIsloading && (
              <div className="loading">
                <Stack spacing={2} direction="row">
                  <CircularProgress sx={{ color: "#596ed3" }} size={100} />
                </Stack>
              </div>
            )}
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
