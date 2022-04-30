import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Radio, Comment, Avatar, Alert, Button } from "antd";
import Moment from "moment";
import "./Sections/comment.css";
import Auth from "../../../hoc/auth";
import Comments from "./Sections/Comments";

function CommentsList() {
  const [CommentsList, setCommentsList] = useState([]);
  const [RadioValue, setRadioValue] = useState("all");
  const variables = {
    writer: window.localStorage.userId,
    type: RadioValue,
  };
  useEffect(() => {
    Axios.post("/api/comment/getUserComments", variables).then((res) => {
      if (res.data.success) {
        setCommentsList(res.data.comments);
      } else {
        alert("코멘트 정보를 가져오는데 실패했습니다.");
      }
    });
  }, [RadioValue]);
  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };
  const refreshFnc = (newCom) => {
    setCommentsList(CommentsList.concat(newCom));
  };

  return (
    <div>
      {/** Main Image */}
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0)39%,
    rgba(0,0,0,0)41%,rgba(0,0,0,0.65)100%)`,
          backgroundImage: `url('/img/comment.png')`,
          height: "550px",
          backgroundSize: "100%,cover",
          backgroundPosition: "center 70%",
          width: "100%",
          position: "relative",
        }}
      >
        <div>
          <div style={{ position: "absolute", maxWidth: "800px", bottom: "3rem", marginLeft: "4rem" }}>
            <h1 style={{ color: "white", fontSize: "40px", fontWeight: "bold" }}>Check out your all comments here!!</h1>
          </div>
        </div>
      </div>
      {/** Review Contents */}
      <div style={{ width: "85%", margin: "2rem auto" }}>
        <div>
          <h2 style={{ fontFamily: "Courier New", letterSpacing: "1px", fontWeight: "bold", fontSize: "24px", float: "left" }}>Your Comments</h2>
          <Radio.Group onChange={onRadioChange} defaultValue="all" style={{ float: "right" }}>
            <Radio.Button value="all">All comments</Radio.Button>
            <Radio.Button value="reply">Reply only</Radio.Button>
            <Radio.Button value="no">No reply</Radio.Button>
          </Radio.Group>
          <hr style={{ height: "2px", background: "#999999", border: "none", marginBottom: "15px", clear: "both" }} />
        </div>
        {CommentsList.length > 0 && CommentsList.map((comment, index) => <Comments key={index} comentValue={comment} />)}
      </div>
    </div>
  );
}

export default Auth(CommentsList, true);
