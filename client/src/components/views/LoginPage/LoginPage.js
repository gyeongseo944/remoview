import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../../../_actions/user_action";
require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);
function LoginPage() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch;
  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onPassHandler = (e) => {
    setPassword(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      email: Email,
      Password: Password,
    };
    // axios.post("/api/user/login", body).then((res) => {
    //   console.log(res);
    // });
    dispatch(loginUser(body));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPassHandler} />
        <br />
        <button type="submit"> Login </button>
      </form>
    </div>
  );
}

export default LoginPage;
