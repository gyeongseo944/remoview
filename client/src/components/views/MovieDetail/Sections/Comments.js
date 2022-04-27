import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { Button, Input } from "antd";
const { TextArea } = Input;

function Comments({ refreshFnc, commentLists, movieId }) {
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");

  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      movieId: movieId,
    };

    Axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        refreshFnc(res.data.result);
        setCommentValue("");
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p>Comments</p>
      <hr />
      {/* Commnents Lists*/}
      {commentLists.length > 0 &&
        commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment movieId={movieId} commentValue={comment} refreshFnc={refreshFnc} />
                <ReplyComment parentCommentId={comment._id} commentLists={commentLists} movieId={movieId} refreshFnc={refreshFnc} />
              </React.Fragment>
            )
        )}
      {/* Root Comments Form*/}
      {window.localStorage.userId ? (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea style={{ width: "100%", borderRadius: "5px" }} onChange={handleClick} value={CommentValue} placeholder="코멘트를 작성해주세요" />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      ) : (
        <div>
          <p style={{ marginTop: "20px", color: "gray" }}> 코멘트는 로그인 후 이용 가능합니다. </p>
        </div>
      )}
    </div>
  );
}

export default Comments;
