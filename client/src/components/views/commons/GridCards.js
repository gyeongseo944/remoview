import React, { useState } from "react";
import { Col } from "antd";

function GridCards(props) {
  const [Visibility, setVisivility] = useState("hidden");
  let imgPath = "";
  props.image === null ? (imgPath = "/img/no_img.png") : (imgPath = props.image);
  const styles = {
    width: "100%",
    height: "320px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    textAlign: "center",
    paddingTop: "110px",
    visibility: Visibility,
  };
  if (props.page === "moviePage") {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <div
              style={{ width: "100%", height: "320px", backgroundImage: `url('${imgPath}')`, backgroundSize: "100% 100%" }}
              onMouseEnter={() => {
                setVisivility("visible");
              }}
              onMouseLeave={() => {
                setVisivility("hidden");
              }}
            >
              <div style={styles}>
                <h1 style={{ color: "white" }}>{props.movieName}</h1>
                <p style={{ color: "white" }}>View Detail &gt;</p>
              </div>
            </div>
          </a>
        </div>
      </Col>
    );
  } else if (props.page === "detailPage") {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <div
            style={{ width: "100%", height: "320px", backgroundImage: `url('${imgPath}')`, backgroundSize: "100% 100%" }}
            onMouseEnter={() => {
              setVisivility("visible");
            }}
            onMouseLeave={() => {
              setVisivility("hidden");
            }}
          >
            <div style={styles}>
              <h1 style={{ color: "white" }}>{props.characterName}</h1>
              <h3 style={{ color: "white" }}>
                <span style={{ color: "gray" }}>Actored by &gt; </span>
                {props.actorName}
              </h3>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default GridCards;
