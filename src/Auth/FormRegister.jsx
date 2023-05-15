import React from "react";

function FormRegister(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Firstname"
        name="firstName"
        onChange={props.onChangeInput}
        value={props.registermInfo.firstame}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="Lastname"
        name="lastName"
        onChange={props.onChangeInput}
        value={props.registermInfo.lastName}
      />
      <br />
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={props.onChangeInput}
        value={props.registermInfo.username}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={props.onChangeInput}
        value={props.registermInfo.email}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={props.onChangeInput}
        value={props.registermInfo.password}
      />
    </div>
  );
}

export default FormRegister;
