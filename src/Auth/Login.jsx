import React, { useContext, useState } from "react";
import FormLogin from "./FormLogin";
import { GlobalContext } from "./ContextAuth/GlobalContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL = process.env.REACT_APP_URL;
function Login() {
  const { loginInfo, setloginInfo, setLoginStatus, setToken } =
    useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/login`, loginInfo)
      .then((response) => {
        if (response.data.succeeded === true) {
          toast.success("Login Successful!"); 
          localStorage.setItem("token", response.data.token);
          setToken(localStorage.getItem("token"));
          window.location.href = "/";
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Connected Error");
      });
  };

  const onChangeInput = (e) => {
    setloginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="h1Head">Login</h1>
        <FormLogin onChangeInput={onChangeInput} loginInfo={loginInfo} />
        <button className="btn">Login</button>
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

export default Login;
