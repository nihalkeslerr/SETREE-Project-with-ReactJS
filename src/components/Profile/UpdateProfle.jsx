import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";
import sign from "../ASSETS/icons/sign.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function UpdateProfle() {
  const { token, API_URL, user, setUser, ID } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
  });
  const [editProfile, seteditProfile] = useState(true);
  const [changePassword, setChangePassword] = useState(false);

  const [formDataPass, setFormDataPass] = useState({
    oldPassword: "",
    password: "",
  });
  const [changePhoto, setChangePhoto] = useState({
    newUrl: "",
  });
  const cloud_name = "dlo8tndg7";
  const [imageDataURL, setImageDataURL] = useState(null);
  const [updateloading, setUpdateloading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let reqUrl = `${API_URL}/getUser/`;

        const response = await axios.get(reqUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.user);
        setUser(response.data.user);
        console.log("user:", user);
        setImageDataURL(user.imageUrl);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("formdata:", { ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateloading(true);
    axios
      .post(`${API_URL}/updateUser`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.succeeded === true) {
          console.log("User Başarıyla güncellendi", response);
          toast.success("Updated Successfully!");
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Connected Error");
      })
      .finally(() => {
        setUpdateloading(false);
      });
  };

  const handleInputChangePass = (e) => {
    setFormDataPass({
      ...formDataPass,
      [e.target.name]: e.target.value,
    });
    console.log("formdataPass:", {
      ...formDataPass,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPass = (e) => {
    e.preventDefault();
    setUpdateloading(true);
    axios
      .post(`${API_URL}/updatePassword`, formDataPass, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
        if (response.data.succeeded === true) {
          console.log("Şifre güncellendi", response);
          toast.success("Password Changed Successfully!");
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Connected Error");
      })
      .finally(() => {
        setUpdateloading(false);
      });
  };

  const toggleProfile = () => {
    seteditProfile(true);
    setChangePassword(false);
    var element = document.querySelector(".profileBtn");
    if (element) {
      element.style.backgroundColor = "#9facef";
      element.style.color = "#fff";
    }
    var element2 = document.querySelector(".passwordBtn");
    if (element2) {
      element2.style.backgroundColor = "#fff";
      element2.style.color = "#9facef";
    }
  };
  const togglePassword = () => {
    seteditProfile(false);
    setChangePassword(true);

    var element = document.querySelector(".profileBtn");
    if (element) {
      element.style.backgroundColor = "#fff";
      element.style.color = "#9facef";
    }
    var element2 = document.querySelector(".passwordBtn");
    if (element2) {
      element2.style.backgroundColor = "#9facef";
      element2.style.color = "#fff";
    }
  };

  const handleChangePhoto = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/updateProfileImage`, changePhoto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
        if (response.data.succeeded === true) {
          console.log("Updated Profile Photo", response);
          toast.success("Profile photo Changed Successfully!");
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Connected Error");
      });
  };

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
        setImageDataURL(response.data.url);
        console.log("ImageDataURL:", imageDataURL);
      })
      .catch((err) => console.log(err));
  };

  console.log("imageDataURL:", imageDataURL); // Görüntünün URL'sini konsola yazdırır

  useEffect(() => {
    setChangePhoto({
      newUrl: imageDataURL,
    });
  }, [imageDataURL]);

  return (
    <div className="container">
      <div className="UpdateContain">
        <div className="editButon">
          <button className="profileBtn" onClick={toggleProfile}>
            Edit Profile
          </button>
          <button className="passwordBtn" onClick={togglePassword}>
            Change Password
          </button>
        </div>
        <div className="">
          {editProfile && (
            <div>
              <h1 className="h1Head">Edit Profile</h1>
              <div className="changePhoto">
                <div
                  className="profileimgEdit"
                  style={{
                    backgroundImage: `url(${imageDataURL})`,
                  }}
                ></div>
                <div className="UploadImage">
                  <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <div>
                  <button onClick={handleChangePhoto}>Change Photo</button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Firstname"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Lastname"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <br />
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                />
                <label className="labelradio" htmlFor="female">
                  Kadın
                </label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                />
                <label className="labelradio" htmlFor="male">
                  Erkek
                </label>
                <br />
                <div className="buttonLoad">
                  <button className="btn">Update</button>
                  {updateloading && (
                    <Stack spacing={2} direction="row">
                      <CircularProgress sx={{ color: "#596ed3" }} size={20} />
                    </Stack>
                  )}
                </div>
              </form>
            </div>
          )}

          {changePassword && (
            <form onSubmit={handleSubmitPass}>
              <h1 className="h1Head">Change Password</h1>
              <input
                type="password"
                placeholder="Old Password"
                name="oldPassword"
                onChange={handleInputChangePass}
              />
              <br />
              <input
                type="password"
                placeholder="New Password"
                name="password"
                onChange={handleInputChangePass}
              />
              <br />
              <br />
              <div className="buttonLoad">
                  <button className="btn">Change Password</button>
                  {updateloading && (
                    <Stack spacing={2} direction="row">
                      <CircularProgress sx={{ color: "#596ed3" }} size={20} />
                    </Stack>
                  )}
                </div>
            </form>
          )}
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

export default UpdateProfle;
