import "./row.css";
import React, { useState } from "react";
import axios from "../axios";
import Modal from "./Modal";
import ModalInfo from "./ModalInfo";
import Slider from "./Slider";

export default function Row({
  title,
  movies,
  largeRow,
  topRow,
  coordinate,
  mute,
  opts,
  videoRef,
  muteSrc,
}) {
  const [click, setClick] = useState(false);
  const [casting, setCasting] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [video, setVideo] = useState("");
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [bounding, setBounding] = useState({});
  const [scrollModal, setScrollModal] = useState(0);
  const [movie, setMovie] = useState({});

  const handleClick = async (movie) => {
    try {
      const result = await axios.get(
        `/movie/${movie.id}/credits?api_key=fb34530271b349314af0de263d16ab5a`
      );
      const trailer = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      const relatedMovies = await axios.get(
        `/movie/${movie.id}/similar?api_key=fb34530271b349314af0de263d16ab5a`
      );

      console.log(result);

      setTimeout(() => {
        setVideo(trailer.data.results[0]?.key);
      }, 1);
      setClick(true);
      setMovie(movie);
      setCasting(result.data.cast);
      setRelatedMovies(relatedMovies.data.results);
      setTrailerUrl("");
      setIsHovered(false);
    } catch (error) {
      setClick(true);
      setCasting([]);
      setRelatedMovies([]);
      setVideo("");
    }
  };

  const handleMouse = async (movie, index) => {
    try {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    } catch (error) {}

    const modalRef = document.getElementById(`${coordinate}${index}`);
    const bounding = modalRef.getBoundingClientRect();
    const scrollModal = Math.floor(window.scrollY + bounding.y);

    setBounding(bounding);
    setScrollModal(scrollModal);
    setIsHovered(true);
  };

  click
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "initial");

  return (
    <div className="row">
      <h2 className="title">{title}</h2>
      {isHovered && !click && (
        <Modal
          bounding={bounding}
          movie={movie}
          largeRow={largeRow}
          topRow={topRow}
          scrollModal={scrollModal}
          setIsHovered={setIsHovered}
          setTrailerUrl={setTrailerUrl}
          handleClick={handleClick}
          trailerUrl={trailerUrl}
          mute={mute}
          opts={opts}
          videoRef={videoRef}
          muteSrc={muteSrc}
        ></Modal>
      )}
      {click && (
        <ModalInfo
          mute={mute}
          movie={movie}
          setClick={setClick}
          casting={casting}
          relatedMovies={relatedMovies}
          setVideo={setVideo}
          handleClick={handleClick}
          video={video}
          opts={opts}
          videoRef={videoRef}
          muteSrc={muteSrc}
        />
      )}
      <Slider
        movies={movies}
        handleClick={handleClick}
        handleMouse={handleMouse}
        setMovie={setMovie}
        largeRow={largeRow}
        topRow={topRow}
        coordinate={coordinate}
        setIsHovered={setIsHovered}
      />
    </div>
  );
}
