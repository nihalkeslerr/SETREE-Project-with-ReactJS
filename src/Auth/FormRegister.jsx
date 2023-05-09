import React from "react";

function FormRegister(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="firstname"
        name="firstName"
        onChange={props.onChangeInput}
        value={props.form.firstName}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="username"
        name="userName"
        onChange={props.onChangeInput}
        value={props.form.userName}
      />
      <br />
      <input
        type="text"
        placeholder="lastname"
        name="lastName"
        onChange={props.onChangeInput}
        value={props.form.lastName}
      />
      <br />
      <input
        type="text"
        placeholder="email"
        name="email"
        onChange={props.onChangeInput}
        value={props.form.email}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={props.onChangeInput}
        value={props.form.password}
      />
    </div>
  );
}

export default FormRegister;
