import React from "react";

function FormRegister(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="firstname"
        name="firstName"
        onChange={props.onChangeInput}
        value={props.registermInfo.firstame}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="username"
        name="username"
        onChange={props.onChangeInput}
        value={props.registermInfo.username}
      />
      <br />
      <input
        type="text"
        placeholder="lastname"
        name="lastName"
        onChange={props.onChangeInput}
        value={props.registermInfo.lastName}
      />
      <br />
      <input
        type="text"
        placeholder="email"
        name="email"
        onChange={props.onChangeInput}
        value={props.registermInfo.email}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={props.onChangeInput}
        value={props.registermInfo.password}
      />
    </div>
  );
}

export default FormRegister;
