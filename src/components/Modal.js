import { useRef, useState } from "react";
import Youtube from "react-youtube";
import "./modal.css";
const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Modal({
  movie,
  bounding,
  largeRow,
  scrollModal,
  setIsHovered,
  setTrailerUrl,
  handleClick,
  trailerUrl,
  topRow,
  opts,
}) {
  const videoRef = useRef(null);
  const [muteSrc] = useState("mute.ico");

  /* Estilos de modal */
  let firstSlide;
  if (bounding.x <= 60) {
    firstSlide = "first-slide";
  }
  let lastSlide;
  if (window.innerWidth - (bounding.width + bounding.x) < 80) {
    lastSlide = "last-slide";
  }

  let modalStyle;
  largeRow
    ? (modalStyle = {
        height: bounding.height,
        top: scrollModal,
        left: bounding.left,
        width: bounding.width,
      })
    : (modalStyle = {
        minHeight: bounding.height,
        top: scrollModal,
        left: bounding.left,
        width: bounding.width,
      });
  /*  */

  let unMute = true;
  const mute = (e, videoRef) => {
    unMute = !unMute;

    unMute
      ? videoRef.current?.internalPlayer?.mute()
      : videoRef.current?.internalPlayer?.unMute();

    if (unMute) {
      e.target.src = "mute.ico";
    } else {
      e.target.src = "unMute.ico";
    }
  };

  const endVideo = () => {
    setTrailerUrl("");
  };

  const firstDate = new Date(movie?.first_air_date || movie.release_date);
  const imgBackdrop = `${baseImgUrl}${movie.backdrop_path}`;
  const imgPoster = `${baseImgUrl}${movie.poster_path}`;

  return (
    <div
      className={`${
        largeRow ? "modal-mini-large" : topRow ? "modal-top" : "modal-mini"
      } ${firstSlide} ${lastSlide}`}
      style={modalStyle}
      onMouseLeave={() => {
        setTimeout(() => {
          setIsHovered(false);
        }, 300);
        setTrailerUrl("");
      }}
      /*  onMouseEnter={() => {
        setIsHovered(true);
      }} */
    >
      {movie.backdrop_path ? (
        <img
          className={largeRow ? "movie-img-large" : "movie-img"}
          src={largeRow ? imgPoster : imgBackdrop}
          alt={movie.name}
        />
      ) : (
        <img
          className={largeRow ? "movie-img-large" : "movie-img"}
          src="film.png"
          alt={movie.name}
        />
      )}

      {trailerUrl ? (
        <div className={largeRow ? "video-container-large" : "video-container"}>
          <div className="mute-modal">
            <img
              src={muteSrc}
              alt="mute/unMute"
              onClick={(e) => mute(e, videoRef)}
            />
          </div>
          <Youtube
            ref={videoRef}
            videoId={trailerUrl}
            onEnd={endVideo}
            onError={endVideo}
            opts={opts}
          />
        </div>
      ) : (
        <div className={largeRow ? "video-container-large" : "video-container"}>
          {movie.backdrop_path ? (
            <img
              className={largeRow ? "movie-img-large" : "movie-img"}
              src={largeRow ? imgPoster : imgBackdrop}
              alt={movie.name}
            />
          ) : (
            <img
              className={largeRow ? "movie-img-large" : "movie-img"}
              src="film.png"
              alt={movie.name}
            />
          )}
        </div>
      )}
      <div
        className={
          largeRow ? "description-container-large" : "description-container"
        }
        onClick={() => {
          handleClick(movie);
        }}
      >
        <div className="movie-name">{movie?.name || movie?.original_title}</div>
        <div className="info-flex">
          <div className="movie-points">{movie?.vote_average} points</div>
          <div className="movie-year">{firstDate.getFullYear()}</div>
          <div className="info-button">
            <img src="info.png" alt="more-info"></img>
          </div>
          {/* <div className="arrow-box">more info</div> */}
          {/* <div> {truncate(movie.overview, 200)}</div> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
