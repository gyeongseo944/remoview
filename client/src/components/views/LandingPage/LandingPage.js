import React, { useEffect, useState } from "react";
import Auth from "../../../hoc/auth";
import { API_URL, API_KEY, IMG_URL } from "../../Config";
import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovie, setMainMovie] = useState(Object);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const mainEndPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`;
    fetchMainMovies(mainEndPoint);
    const listEndPoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`;
    fetchMoviesList(listEndPoint);
  }, []);

  const fetchMainMovies = (ep) => {
    fetch(ep)
      .then((res) => res.json())
      .then((res) => {
        setMainMovie(res.results[0]);
      });
  };
  const fetchMoviesList = (ep) => {
    fetch(ep)
      .then((res) => res.json())
      .then((res) => {
        setMovies([...Movies, ...res.results]);
        setCurrentPage(res.page);
        // console.log(res.results.length);
        if (res.results.length < 20) {
          document.getElementById("movieList").innerHTML = "<h2>No more now playing movies</h2>";
          document.getElementById("movieList").style.width = "85%";
          document.getElementById("movieList").style.margin = "1rem auto";
        }
      });
  };

  const loadMoreItems = () => {
    const listEndPoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage + 1}&region=KR`;
    fetchMoviesList(listEndPoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* Main Image*/}
      <MainImage
        image={`${IMG_URL}w1280${MainMovie.backdrop_path}`}
        title={MainMovie.title ? MainMovie.title : MainMovie.original_title}
        description={MainMovie.overview}
        page="landing"
      />
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2 style={{ fontFamily: "Courier New", letterSpacing: "1px", fontWeight: "bold", fontSize: "24px" }}>Now Playing Movies</h2>
        <hr style={{ height: "2px", background: "#999999", border: "none", marginBottom: "15px" }} />

        {/* Movie grid cards */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  page={"moviePage"}
                  image={movie.poster_path ? `${IMG_URL}w500${movie.poster_path}` : null}
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
        <div id="movieList" style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <button onClick={loadMoreItems}>Load More</button>
        </div>
      </div>
    </div>
  );
}

export default Auth(LandingPage, null);
