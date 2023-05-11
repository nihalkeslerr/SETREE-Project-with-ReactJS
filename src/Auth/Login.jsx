import React, { useContext,useState } from "react";
import FormLogin from "./FormLogin";
import { GlobalContext } from "./ContextAuth/GlobalContext";
import axios from "axios";

const initialLoginvalues = {
  email: "",
  password: "",
};
  const API_URL = process.env.REACT_APP_URL;
function Login() {
  
  /*   const { loginInfo, setloginInfo } = useContext(GlobalContext); */
  const [loginInfo, setloginInfo] = useState(initialLoginvalues);
  const [loginStatus, setLoginStatus] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/login`, loginInfo);
      console.log(loginInfo)
      if (response.status === 200) {
        setLoginStatus("başarılı");
      } else {
        setLoginStatus("başarısız");
      }

      console.log("Response data: ", response.data);
    } catch (error) {
      console.log("Error occurred: ", error);
      setLoginStatus("başarısız");
    }
  };

  const onChangeInput = (e) => {
    setloginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <FormLogin onChangeInput={onChangeInput} loginInfo={loginInfo} />
        <button>Login</button>
      </form>
      {loginStatus && <p>Login {loginStatus}</p>}
    </div>
  );
}

export default Login;
