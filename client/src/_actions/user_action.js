import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(userData) {
  const request = axios
    .post("/api/user/login", userData)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
  // console.log("?");
}
