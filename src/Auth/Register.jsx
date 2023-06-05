import React, { useContext, useState } from "react";
import FormRegister from "./FormRegister";
import axios from "axios";
import { GlobalContext } from "./ContextAuth/GlobalContext";
import "./Auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const { registermInfo, setregisterInfo } = useContext(GlobalContext);

  const API_URL = process.env.REACT_APP_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/register`, registermInfo)
      .then((response) => {
        if (response.data.succeeded === true) {
          console.log("API response:", response.data);
          toast.success("Register Successful!");
          window.location.href = "/login";
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error("API error:", error);
        toast.error("Connected Error")
      });
  };

  const onChangeInput = (e) => {
    setregisterInfo({ ...registermInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="h1Head">Sign Up</h1>
        <FormRegister
          onChangeInput={onChangeInput}
          registermInfo={registermInfo}
        />
        <button className="btn">Sign Up</button>
      </form>
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

export default Register;
