import React, { useState } from "react";
import Axios from "axios";
import { Comment, Avatar, Alert, Button } from "antd";
import Moment from "moment";
import "./comment.css";
import { useSelector } from "react-redux";

function Comments({ comentValue }) {
  const user = useSelector((state) => state.user);
  const [AlertOpen, setAlertOpen] = useState(false);
  const onDeleteCheck = (e) => {
    let text = document.getElementById(comentValue._id);
    AlertOpen ? (text.innerHTML = "Delete this comment") : (text.innerHTML = "Cancel delete");
    setAlertOpen(!AlertOpen);
  };
  const onDeleteHandler = (id) => {
    let variables = {
      _id: id,
      writer: user.userData._id,
    };
    Axios.post("/api/comment/deleteComment", variables).then((res) => {
      if (res.data.success) {
        window.location.reload();
      } else {
        Alert("comment를 삭제하는데 실패했습니다.");
      }
    });
  };

  return (
    <div>
      <Comment
        avatar={<Avatar src="/img/user.png" alt={comentValue.writer.name} />}
        content={<p style={{ fontWeight: "bold", fontSize: "16px" }}>{comentValue.content}</p>}
        datetime={Moment(comentValue.createdAt).format("YYYY-MM-DD")}
      />
      <a href={`/movie/${comentValue.movieId}`} style={{ display: "block", width: "200px" }}>
        <p style={{ fontSize: "14px", margin: 0, color: "gray", cursor: "pointer", marginBottom: "10px" }}>└ View this comment movie </p>
      </a>
      <button id={comentValue._id} className="deleteBtn" onClick={onDeleteCheck}>
        Delete this comment
      </button>
      {AlertOpen && (
        <Alert
          showIcon
          description={
            <p style={{ margin: "0" }}>
              Comment 를 삭제 하시겠습니까 ? <br /> comment 삭제 시 해당 comment의 답글은 movie page에서 볼 수 없으며, 해당 user의 comment page에서만 확인
              가능합니다
            </p>
          }
          type="error"
          action={
            <Button
              size="small"
              danger
              onClick={() => {
                onDeleteHandler(comentValue._id);
              }}
            >
              Delete
            </Button>
          }
        />
      )}
    </div>
  );
}

export default Comments;
