import "./movie.css";
import useWindowSize from "../hooks/useWindowsSize";
/* import { forwardRef } from "react"; */
const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Movie({
  movie,
  largeRow,
  top,
  topRow,
  coordinate,
  handleMouse,
  setMovie,
  handleClick,
  setIsHovered,
}) {
  const [size] = useWindowSize();

  let noMobile;
  if (size.width > 1400) {
    noMobile = true;
  }

  let topImg;
  if (top === 0) {
    topImg = "one.png";
  } else if (top === 1) {
    topImg = "two.png";
  } else if (top === 2) {
    topImg = "three.png";
  } else if (top === 3) {
    topImg = "four.png";
  } else if (top === 4) {
    topImg = "five.png";
  } else if (top === 5) {
    topImg = "six.png";
  } else if (top === 6) {
    topImg = "seven.png";
  } else if (top === 7) {
    topImg = "eight.png";
  } else if (top === 8) {
    topImg = "nine.png";
  } else {
    topImg = "nine.png";
  }

  let timer;

  return (
    <>
      {noMobile ? (
        <div
          className="content"
          id={`${coordinate}${top}`}
          onMouseEnter={() => {
            timer = setTimeout(() => {
              handleMouse(movie, top);
              setMovie(movie);
            }, 300);
          }}
          onMouseLeave={() => {
            clearTimeout(timer);
          }}
        >
          {topRow && (
            <div className="top">
              <img src={topImg} alt={top} />
            </div>
          )}
          <div className={topRow && "top-img"}>
            {movie.backdrop_path ? (
              <img
                className={`slider-img ${largeRow && "slider-img-large"}`}
                src={`${baseImgUrl}${
                  largeRow || topRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            ) : (
              <img
                className={`slider-img ${largeRow && "slider-img-large"}`}
                src="film.png"
                alt={movie.name}
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className="content"
          id={`${coordinate}${top}`}
          onClick={() => {
            handleClick(movie);
          }}
        >
          {topRow && (
            <div className="top">
              <img src={topImg} alt={top} />
            </div>
          )}
          <div className={topRow && "top-img"}>
            {movie.backdrop_path ? (
              <img
                className={`slider-img ${largeRow && "slider-img-large"}`}
                src={`${baseImgUrl}${
                  largeRow || topRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            ) : (
              <img
                className={`slider-img ${largeRow && "slider-img-large"}`}
                src="film.png"
                alt={movie.name}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Movie;
