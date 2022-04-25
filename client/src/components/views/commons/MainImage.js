import React from "react";
import Moment from "moment";

//es6 비구조화할당 >> 비구조화할당 미사용시 (props)를 사용하여 props.image << 이런식으로 작성
function MainImage({ image, title, description, page, date }) {
  let mainTitle = "";
  if (page === "landing" || page === "popular") {
    mainTitle = "The most popular movie in korea";
  } else if (page === "now_playing") {
    mainTitle = "Now playing movie in korea";
  } else if (page === "top_rated") {
    mainTitle = "Top rated movie in korea";
  } else if (page === "upcoming") {
    mainTitle = "Upcoming movie in korea";
  } else if (page === "likeList" && date) {
    mainTitle = "You iiked this movie at : " + Moment(date).format("MMMM Do YYYY");
  } else if (page === "dislikeList" && date) {
    mainTitle = "You disliked this movie at : " + Moment(date).format("MMMM Do YYYY");
  }
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0)39%,
      rgba(0,0,0,0)41%,rgba(0,0,0,0.65)100%)`,
        backgroundImage: `url('${image}')`,
        backgroundColor: "#1c1c1c",
        height: "550px",
        backgroundSize: "100%,cover",
        backgroundPosition: "center,center",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div style={{ position: "absolute", maxWidth: "500px", bottom: "2rem", marginLeft: "2rem" }}>
          <h2 style={{ color: "white" }}>{mainTitle}</h2>
          <h1 style={{ color: "white" }}>{title}</h1>
          <p style={{ color: "white", fontSize: "1rem" }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
