import React, { useEffect, useState } from "react";
import Auth from "../../../hoc/auth";
import Axios from "axios";
import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";
import { IMG_URL } from "../../Config";
import { Row } from "antd";

function LikedMovies() {
  const [Movies, setMovies] = useState([]);
  const [MainMovie, setMainMovie] = useState(Object);

  const variables = {
    userFrom: window.localStorage.userId,
  };

  useEffect(() => {
    Axios.post("/api/thumbs/getLikedList", variables).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setMovies([...Movies, ...res.data.list]);
        setMainMovie(res.data.list[Math.floor(Math.random() * res.data.list.length)]);
      } else {
        alert("request error");
      }
    });
  }, []);
  if (Movies.length === 0) {
    return (
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0)39%,
      rgba(0,0,0,0)41%,rgba(0,0,0,0.65)100%)`,
          backgroundImage: `url('/img/op.png')`,
          height: "700px",
          backgroundSize: "100%,cover",
          backgroundPosition: "center,center",
          width: "100%",
          position: "relative",
        }}
      >
        <div>
          <div style={{ position: "absolute", maxWidth: "650px", bottom: "3rem", marginLeft: "4rem" }}>
            <h1 style={{ color: "white", fontSize: "50px", fontWeight: "bold" }}>Oops;</h1>
            <p style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>
              You didn't press thumbs up for any movies.
              <br /> Go to the movie category and click thumbs up button for your favorite movie
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%", margin: "0" }}>
        {/* Main Image*/}
        <MainImage image={`${IMG_URL}w1280${MainMovie.movieImg}`} title={MainMovie.movieTitle} page="likeList" date={MainMovie.createdAt} />
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <h2 style={{ fontFamily: "Courier New", letterSpacing: "1px", fontWeight: "bold", fontSize: "24px" }}>Movies you like</h2>
          <hr style={{ height: "2px", background: "#999999", border: "none", marginBottom: "15px" }} />

          {/* Movie grid cards */}
          <Row gutter={[16, 16]}>
            {Movies &&
              Movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    page={"moviePage"}
                    image={movie.moviePost ? `${IMG_URL}w500${movie.moviePost}` : null}
                    movieId={movie.movieId}
                    movieName={movie.movieTitle}
                  />
                </React.Fragment>
              ))}
          </Row>
        </div>
      </div>
    );
  }
}

export default Auth(LikedMovies, true);
