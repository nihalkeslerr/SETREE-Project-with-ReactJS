import React, {  useState } from "react";
import FormRegister from "./FormRegister";


const initialformvalues = {
  firstName: "",
  userName: "",
  lastName: "",
  email: "",
  password: "",
};

function Register() {
  const [form, setForm] = useState(initialformvalues);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(" Form:", form);


  };

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <FormRegister onChangeInput={onChangeInput} form={form} />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
