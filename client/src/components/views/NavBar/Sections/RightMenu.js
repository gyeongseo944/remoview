/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
// import axios from "axios";
// import { USER_SERVER } from "../../../Config";
import { logoutUser } from "../../../../_actions/user_action";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

function RightMenu(props) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    // axios.get(`${USER_SERVER}/logout`).then((response) => {
    //   if (response.status === 200) {
    //     window.localStorage.removeItem("userId");
    //     navigate("/login");
    //   } else {
    //     alert("Logout Failed");
    //   }
    // });
    dispatch(logoutUser()).then((res) => {
      if (res.payload.logoutSuccess) {
        window.localStorage.removeItem("userId");
        // navigate("/");
        window.location.replace("/");
      } else {
        alert("Logout Failed");
      }
    });
  };

  if (!window.localStorage.userId) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">
            <span className="navbarFont">Sign in</span>
          </a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">
            <span className="navbarFont">Sign out</span>
          </a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>
            <span className="navbarFont">Logout</span>
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
