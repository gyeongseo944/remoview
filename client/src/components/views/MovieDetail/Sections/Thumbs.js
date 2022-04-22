import React, { useEffect, useState } from "react";
import Axios from "axios";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import "./thumbs.css";

function Thumbs({ movieId, userFrom, movieInfo }) {
  const [LikeNum, setLikeNum] = useState(0);
  const [DislikeNum, setDislikeNum] = useState(0);
  const [Liked, setLiked] = useState(false);
  const [Disliked, setDisliked] = useState(false);

  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
  };

  useEffect(() => {
    Axios.post("/api/thumbs/num", variables).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setLikeNum(res.data.likeNum);
        setDislikeNum(res.data.dislikeNum);
      } else {
        alert("숫자에러");
      }
    });
    Axios.post("/api/thumbs/liked", variables).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setLiked(res.data.liked);
        setDisliked(res.data.disliked);
      } else {
        alert("정보에러");
      }
    });
  }, []);

  const onClickLike = () => {
    if (Liked) {
      Axios.post("/api/thumbs/removeLike", variables).then((res) => {
        if (res.data.success) {
          setLikeNum(LikeNum - 1);
          setLiked(false);
        } else {
          alert("like remove error");
        }
      });
    } else {
      Axios.post("/api/thumbs/addLike", variables).then((res) => {
        if (res.data.success) {
          setLikeNum(LikeNum + 1);
          setLiked(true);
        } else {
          alert("like add error");
        }
      });
    }
  };
  const onClickDislike = () => {
    if (Disliked) {
      Axios.post("/api/thumbs/removeDislike", variables).then((res) => {
        if (res.data.success) {
          setDislikeNum(DislikeNum - 1);
          setDisliked(false);
        } else {
          alert("dislike remove error");
        }
      });
    } else {
      Axios.post("/api/thumbs/addDislike", variables).then((res) => {
        if (res.data.success) {
          setDislikeNum(DislikeNum + 1);
          setDisliked(true);
        } else {
          alert("like add error");
        }
      });
    }
  };
  if (!window.localStorage.userId) {
    return (
      <div>
        <button className={"btn" + (Liked ? " btnTrue" : " btnFalse")} style={{ marginRight: "15px", cursor: "default" }} disabled>
          <LikeOutlined /> {LikeNum}
        </button>
        <button className={"btn" + (Disliked ? " btnTrue" : " btnFalse")} style={{ cursor: "default" }} disabled>
          <DislikeOutlined /> {DislikeNum}
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className={"btn" + (Liked ? " btnTrue" : " btnFalse") + (Disliked ? " disabled" : "")}
          onClick={onClickLike}
          style={{ marginRight: "15px" }}
          disabled={Disliked ? true : false}
          title={Disliked ? "싫어하는 리스트의 영화는 좋아하는 영화리스트에 넣을 수 없습니다" : false}
        >
          <LikeOutlined /> {LikeNum}
        </button>
        <button
          className={"btn" + (Disliked ? " btnTrue" : " btnFalse") + (Liked ? " disabled" : "")}
          onClick={onClickDislike}
          disabled={Liked ? true : false}
          title={Liked ? "좋아요한 영화는 싫어하는 영화리스트에 넣을 수 없습니다" : false}
        >
          <DislikeOutlined /> {DislikeNum}
        </button>
      </div>
    );
  }
}

export default Thumbs;
