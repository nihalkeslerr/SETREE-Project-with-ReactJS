import React, { useContext, useEffect, useState } from "react";
import FormRegister from "./FormRegister";
import axios from "axios";
import { GlobalContext } from "./ContextAuth/GlobalContext";
import "./Auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function Register() {
  const { registermInfo, setregisterInfo } = useContext(GlobalContext);
  const [registerIsloading, setRegisterIsloading] = useState(false);

  const API_URL = process.env.REACT_APP_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterIsloading(true);
    axios
      .post(`${API_URL}/register`, registermInfo)
      .then((response) => {
        if (response.data.succeeded === true) {
          console.log("API response:", response.data);
          toast.success("Register Successful!");
          window.location.href = "/login";
        } else {
          toast.error(response.data.message);
          console.log("API response:", response.data);
        }
      })
      .catch((error) => {
        console.error("API error:", error);
        toast.error("Connected Error");
      })
      .finally(() => {
        setRegisterIsloading(false);
      })
  };

  const onChangeInput = (e) => {
    setregisterInfo({ ...registermInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("registermInfo", registermInfo);
  })

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className="h1Head">Sign Up</h1>
        <FormRegister
          onChangeInput={onChangeInput}
          registermInfo={registermInfo}
        />
        <div className="buttonLoad">
          <button className="btn">Sign Up</button>
           {registerIsloading && (
          <Stack spacing={2} direction="row">
            <CircularProgress sx={{ color: "#596ed3" }} size={20} />
          </Stack>
      )}
        </div>
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
