import { useState } from "react";
import axios from "../axios";
import Youtube from "react-youtube";
import useWindowSize from "../hooks/useWindowsSize";
const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Item({ movie, firstDate, handleClick, scrollRef, setClick }) {
  const [hovered, setHovered] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [size] = useWindowSize();

  const handleMouse = async (movie) => {
    try {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailer(trailerurl.data.results[0]?.key);
      setHovered(true);
    } catch (error) {}
  };

  const opts = {
    width: "100%",
    height: "300px",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      rel: 0,
      showinfo: 0,
    },
  };

  let noMobile;
  if (size.width > 600) {
    noMobile = true;
  }

  const endVideo = () => {
    setTrailer("");
  };

  return (
    <>
      {noMobile ? (
        <li
          onMouseEnter={() => {
            handleMouse(movie);
          }}
          onMouseLeave={() => {
            setHovered(false);
            setTrailer("");
          }}
        >
          <div className="related-movie">
            <div className="video-container">
              {movie.backdrop_path ? (
                <img
                  className="movie-img"
                  src={`${baseImgUrl}${movie.backdrop_path}`}
                  alt={movie.name}
                />
              ) : (
                <img className="movie-img" src="film.png" alt={movie.name} />
              )}
              {hovered && trailer && (
                <Youtube
                  videoId={trailer}
                  onEnd={endVideo}
                  onError={endVideo}
                  opts={opts}
                />
              )}
            </div>
            <div
              className="info-related"
              onClick={() => {
                handleClick(movie);
                setClick(false);
              }}
            >
              <div className="movie-name">
                {movie?.name || movie?.original_title}
              </div>
              <div className="movie-points">
                {movie?.vote_average.toFixed(1)} puntos
              </div>
              <div className="movie-year">{firstDate.getFullYear()}</div>
              <div className="info-button">
                <img src="info.png" alt="more-info"></img>
              </div>
            </div>
          </div>
        </li>
      ) : (
        <li>
          <div
            style={{ width: "100%" }}
            onClick={() => {
              handleClick(movie);
              setClick(false);
            }}
          >
            <img
              style={{ width: "100%", borderRadius: 5 }}
              src={`${baseImgUrl}${movie.poster_path}`}
              alt={movie.name}
            />
          </div>
        </li>
      )}
    </>
  );
}

export default Item;
