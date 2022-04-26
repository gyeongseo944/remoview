import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import { useSelector } from "react-redux";
import Axios from "axios";

function SingleComment({ movieId, commentValue, refreshFnc }) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      movieId: movieId,
      responseTo: commentValue._id,
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
      <Comment
        actions={actions}
        author={commentValue.writer.name}
        avatar={<Avatar src="/img/profile.png" alt={commentValue.writer.name} />}
        content={<p>{commentValue.content}</p>}
      />
      {OpenReply && (
        <form style={{ display: "flex", marginLeft: "45px" }} onSubmit={onSubmit}>
          <textarea style={{ width: "100%", borderRadius: "5px" }} onChange={onHandleChange} value={CommentValue} placeholder="코멘트를 작성해주세요" />
          <br />
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
      <br />
    </div>
  );
}

export default SingleComment;
