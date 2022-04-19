import React, { useEffect, useState } from "react";
import Axios from "axios";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

function Thumbs({ movieId, userFrom, movieInfo }) {
  const [LikeNum, setLikeNum] = useState(0);
  const [DislikeNum, setDislikeNum] = useState(0);
  const [Liked, setLiked] = useState(false);
  const [Disliked, setDisliked] = useState(false);
  const bntStyles = { backgroundColor: "white", border: "none", fontSize: "40px", cursor: "pointer" };

  useEffect(() => {
    // const movieTitle = movieInfo.title;
    // const moviePost = movieInfo.backdrop_path;
    let variables = {
      userFrom,
      movieId,
    };
    Axios.post("/api/thumbs/num", variables).then((res) => {
      if (res.data.success) {
        setLikeNum(res.data.likeNum);
        setDislikeNum(res.data.dislikeNum);
      } else {
        alert("숫자에러");
      }
    });
    Axios.post("/api/thumbs/liked", variables).then((res) => {
      if (res.data.success) {
        setLiked(res.data.liked);
        setDisliked(res.data.disliked);
      } else {
        alert("정보에러");
      }
    });
  }, []);

  return (
    <div>
      <button style={bntStyles}>
        <LikeOutlined /> {LikeNum}
      </button>
      <button style={bntStyles}>
        <DislikeOutlined /> {DislikeNum}
      </button>
    </div>
  );
}

export default Thumbs;
