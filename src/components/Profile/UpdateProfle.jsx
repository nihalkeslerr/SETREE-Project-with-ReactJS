import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";
import sign from "../ASSETS/icons/sign.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [passwordStatus, setPasswordStatus] = useState(null);

  useEffect(() => {
    setUser(null);
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
      });
  };

  const toggleProfile = () => {
    seteditProfile(true);
    setChangePassword(false);
  };
  const togglePassword = () => {
    seteditProfile(false);
    setChangePassword(true);
  };

  return (
    <div className="container">
      <div className="UpdateContain">
        <div className="editButon">
          <button onClick={toggleProfile}>Edit Profile</button>
          <button onClick={togglePassword}>Change Password</button>
        </div>
        <div className="">
          {editProfile && (
            <form onSubmit={handleSubmit}>
              <h1 className="h1Head">Edit Profile</h1>
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
              <button className="btn">Update</button>
            </form>
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
              <button className="btn">Change Password</button>
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
