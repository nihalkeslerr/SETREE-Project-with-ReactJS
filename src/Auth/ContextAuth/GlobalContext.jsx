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

  const values = {
    registermInfo,
    setregisterInfo,
    loginInfo,
    setloginInfo,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
