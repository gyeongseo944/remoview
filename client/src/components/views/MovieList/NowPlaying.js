import React, { useEffect, useState } from "react";
import Auth from "../../../hoc/auth";
import { API_URL, API_KEY, IMG_URL } from "../../Config";
import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function NowPlayingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovie, setMainMovie] = useState(Object);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const mainEndPoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`;
    fetchMainMovies(mainEndPoint);
  }, []);

  const fetchMainMovies = (ep) => {
    fetch(ep)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        if (res.page == 1) {
          setMainMovie(res.results[0]);
        }
        setMovies([...Movies, ...res.results]);
        setCurrentPage(res.page);
        if (res.results.length < 20) {
          document.getElementById("movieList").innerHTML = "<h2>No more movies</h2>";
          document.getElementById("movieList").style.width = "85%";
          document.getElementById("movieList").style.margin = "1rem auto";
        }
      });
  };
  const loadMoreItems = () => {
    const listEndPoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage + 1}&region=KR`;
    fetchMainMovies(listEndPoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* Main Image*/}
      <MainImage image={`${IMG_URL}w1280${MainMovie.backdrop_path}`} title={MainMovie.original_title} description={MainMovie.overview} page="now_playing" />
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Now Playing Movies</h2>
        <hr />

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

export default Auth(NowPlayingPage, null);
