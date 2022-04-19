import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";

export default function (SpecificComponent, option, adminRoute = null) {
  // option 정의
  // null => 아무나 출입이 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입 불가능한 페이지

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    let user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          //isAuth (사용자) 가 false (로그인 하지 않은 상태) 일때
          if (option) {
            // option 이 true(로그인한 유저만 들어갈 수 있는 페이지) 라면
            navigate("/login"); // 로그인페이지로 이동
          }
        } else {
          //로그인 한 상태
          if (adminRoute == true && !response.payload.isAdmin) {
            // 관리자 전용 페이지인데 isAdmin(관리자 여부) 가 false인 경우
            navigate("/"); // 랜딩페이지로 이동
          } else {
            if (option === false) {
              // 로그인이 되어있는 상태에서 로그인 유저는 출입 불가능한 페이지 접근시
              navigate("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}
