import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../Context/GlobalContext";

function ChangePassword() {
  const { token, API_URL, user, setUser, ID } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    oldPassword:"",
    password:""
  });
  const [passwordStatus, setPasswordStatus] = useState(null);

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
        `${API_URL}/updatePassword`,
         formData ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Başarılı bir şekilde gönderildiğinde burada işlemler yapabilirsiniz
          console.log("Şifre güncellendi", response);
           setPasswordStatus("Change password succesfull");

      })
      .catch((error) => {
          console.error(error);
             setPasswordStatus("Change password not succesfull");
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="h1Head">Change Password</h1>
        <input
          type="password"
          placeholder="Old Password"
          name="oldPassword"
          onChange={handleInputChange}
        />
        <br />
        <input
          type="password"
          placeholder="New Password"
          name="password"
          onChange={handleInputChange}
        />
        <br />

        <br />
              <button className="btn">Change Password</button>
               {passwordStatus && <p>Changing Password {passwordStatus}</p>}
      </form>
    </div>
  );
}

export default ChangePassword;
