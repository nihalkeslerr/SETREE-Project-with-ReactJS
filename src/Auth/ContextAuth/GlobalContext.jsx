import { createContext, useState } from "react";

export const GlobalContext = createContext();

const initialRegistervalues = {
  firstName: "",
  username: "",
  lastName: "",
  email: "",
  password: "",
};
const initialLoginvalues = {
  email: "",
  password: "",
};

const initialSatate = {
  registerForm: initialRegistervalues,
  loginForm: initialLoginvalues,
};

export const GlobalProvider = ({ children }) => {
  const [registermInfo, setregisterInfo] = useState(initialSatate.registerForm);
  const [loginInfo, setloginInfo] = useState(initialSatate.loginForm);
  const [loginStatus, setLoginStatus] = useState(null);
  const [token, setToken] = useState(null);

  const values = {
    registermInfo,
    setregisterInfo,
    loginInfo,
    setloginInfo,
    loginStatus,
    setLoginStatus,
    token,
    setToken,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
