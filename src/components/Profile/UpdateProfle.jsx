import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";

function UpdateProfle() {
  const { token, API_URL, user, setUser, ID } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
  });
  const [updateStatus, setUpdateStatus] = useState(null);
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
           setUpdateStatus("Update succesfull");

        setUser(response.data.user);
      } catch (error) {
          console.log(error);
          setUpdateStatus("Update not succesfull");
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
    
  const handleSubmit =  (e) => {
    e.preventDefault();
       axios
      .post(
        `${API_URL}/updateUser`,
         formData ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
        console.log("User Başarıyla güncellendi", response);

      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
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
               {updateStatus && <p>Login {updateStatus}</p>}
      </form>
    </div>
  );
}

export default UpdateProfle;
