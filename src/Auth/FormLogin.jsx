import React from "react";

function FormLogin(props) {
  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={props.onChangeInput}
        value={props.loginInfo.email}
      />{" "}
      <br />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={props.onChangeInput}
        value={props.loginInfo.password}
      />
    </div>
  );
}

export default FormLogin;
