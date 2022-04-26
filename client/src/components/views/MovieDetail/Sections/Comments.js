import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

function Comments({ refreshFnc, commentsList, movieId }) {
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
    console.log(variables);
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
      {commentsList.length > 0 &&
        commentsList.map(
          (comment, index) => !comment.responseTo && <SingleComment key={index} movieId={movieId} commentValue={comment} refreshFnc={refreshFnc} />
        )}
      {/* Root Comments Form*/}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea style={{ width: "100%", borderRadius: "5px" }} onChange={handleClick} value={CommentValue} placeholder="코멘트를 작성해주세요" />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comments;
