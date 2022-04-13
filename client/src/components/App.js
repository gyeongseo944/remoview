// import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  //Link
} from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import MovieDetail from "./views/MovieDetail/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div style={{ paddingTop: "48px" }}></div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/movie/:movieId" element={<MovieDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
