import React, { useContext, useState } from "react";
import FormRegister from "./FormRegister";
import axios from "axios";
import { GlobalContext } from "./ContextAuth/GlobalContext";

function Register() {
  const { registermInfo, setregisterInfo } = useContext(GlobalContext);

  const API_URL = process.env.REACT_APP_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios ile POST isteği gönderme
    axios
      .post(`${API_URL}/register`, registermInfo)
      .then((response) => {
        console.log("API yanıtı:", response.data);

      })
      .catch((error) => {
        console.error("API hatası:", error);
      });
  };

  const onChangeInput = (e) => {
    setregisterInfo({ ...registermInfo, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <FormRegister
          onChangeInput={onChangeInput}
          registermInfo={registermInfo}
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
