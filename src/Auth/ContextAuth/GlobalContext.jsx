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
  username: "",
  password: "",
};

const initialSatate = {
  registerForm: initialRegistervalues,
  loginForm: initialLoginvalues,
};

export const GlobalProvider = ({ children }) => {
  const [registermInfo, setregisterInfo] = useState(initialSatate.registerForm);

  const values = {
    registermInfo,
    setregisterInfo,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
