import React, { useContext, useState } from "react";
import FormLogin from "./FormLogin";
import { GlobalContext } from "./ContextAuth/GlobalContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
const API_URL = process.env.REACT_APP_URL;
function Login() {
  const { loginInfo, setloginInfo, setLoginStatus, setToken } =
    useContext(GlobalContext);
  const [loginIsloading, setLoginIsloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginIsloading(true);
    axios
      .post(`${API_URL}/login`, loginInfo)
      .then((response) => {
        if (response.data.succeeded === true) {
          toast.success("Login Successful!"); 
          localStorage.setItem("token", response.data.token);
          setToken(localStorage.getItem("token"));
          window.location.href = "/collection";
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Connected Error");
      })
      .finally(() => {
        setLoginIsloading(false);
      })
  };

  const onChangeInput = (e) => {
    setloginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="h1Head">Login</h1>
        <FormLogin onChangeInput={onChangeInput} loginInfo={loginInfo} />
        <div className="buttonLoad">
        <button className="btn">Login</button>
         {loginIsloading && (
          <Stack spacing={2} direction="row">
            <CircularProgress sx={{ color: "#596ed3" }} size={20} />
          </Stack>
      )}</div>
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
