import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMG_URL } from "../../Config";
import Auth from "../../../hoc/auth";
import Axios from "axios";
import { useParams } from "react-router-dom";
import MainImage from "../commons/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import Thumbs from "./Sections/Thumbs";
import Comments from "./Sections/Comments";
import { Row } from "antd";

function MovieDetail() {
  const { movieId } = useParams();
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  const variables = {
    movieId: movieId,
  };

  useEffect(() => {
    const endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
    const endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`;
    fetch(endPointInfo)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
      });
    fetch(endPointCrew)
      .then((res) => res.json())
      .then((res) => {
        setCasts(res.cast);
      });
    Axios.post("/api/comment/getComments", variables).then((res) => {
      if (res.data.success) {
        setCommentLists(res.data.comments);
      } else {
        alert("코멘트 정보를 가져오는데에 실패했습니다.");
      }
    });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };
  const refreshFnc = (newCom) => {
    setCommentLists(CommentLists.concat(newCom));
  };

  return (
    <div>
      {/* Header */}
      <MainImage
        image={Movie.backdrop_path ? `${IMG_URL}w1280${Movie.backdrop_path}` : `${IMG_URL}w1280${Movie.poster_path}`}
        title={Movie.title}
        description={Movie.overview}
      />
      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie Info */}
        <MovieInfo movie={Movie} />
        <br />
        {/* Actors Grid */}
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
          <button onClick={toggleActorView}> See Actors </button>
        </div>
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    page="detailPage"
                    image={cast.profile_path ? `${IMG_URL}w500${cast.profile_path}` : null}
                    characterName={cast.character}
                    actorName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
        <div style={{ textAlign: "center" }}>
          <Thumbs movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem("userId")} />
        </div>
        <div style={{ width: "100%" }}>
          <Comments refreshFnc={refreshFnc} commentLists={CommentLists} movieId={movieId} />
        </div>
      </div>
    </div>
  );
}

export default Auth(MovieDetail, null);
