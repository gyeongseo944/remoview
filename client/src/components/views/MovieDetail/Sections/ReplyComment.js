import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment({ parentCommentId, commentLists, refreshFnc, movieId }) {
  const [CommentNumber, setCommentNumber] = useState(0);
  const [OpenReply, setOpenReply] = useState(false);

  useEffect(() => {
    let commentNum = 0;

    commentLists.map((comment) => {
      if (comment.responseTo === parentCommentId) {
        commentNum++;
      }
    });
    setCommentNumber(commentNum);
  }, [commentLists, parentCommentId]);

  let renderReplyComment = (parentCommentId) => {
    return commentLists.map(
      (comment, index) =>
        comment.responseTo === parentCommentId && (
          <div key={index} style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment movieId={movieId} commentValue={comment} refreshFnc={refreshFnc} />
            <ReplyComment parentCommentId={comment._id} commentLists={commentLists} movieId={movieId} refreshFnc={refreshFnc} />
          </div>
        )
    );
  };
  const onHandleChange = () => {
    setOpenReply(!OpenReply);
  };
  return (
    <div>
      {CommentNumber > 0 && (
        <p style={{ fontSize: "14px", margin: 0, color: "gray", cursor: "pointer", marginBottom: "10px" }} onClick={onHandleChange}>
          View {CommentNumber} more comment
        </p>
      )}
      {OpenReply && renderReplyComment(parentCommentId)}
      {/* {renderReplyComment(parentCommentId)} */}
    </div>
  );
}

export default ReplyComment;
