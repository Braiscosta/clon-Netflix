import Youtube from "react-youtube";
import useWindowSize from "../hooks/useWindowsSize";
import "./banner.css";
import useVideoBanner from "../hooks/useVideoBanner";
import { useRef, useState } from "react";
const imgUrl = "https://image.tmdb.org/t/p/original";

function Banner({ movie, opts }) {
  /*  const [trailerUrl, setTrailerUrl] = useState(""); */
  const videoRef = useRef(null);
  const [muteSrc] = useState("mute.ico");
  const [trailerUrlBanner, setTrailerUrlBanner] = useVideoBanner(
    movie,
    videoRef
  );
  const [size] = useWindowSize();

  let noMobile;
  if (size.width > 600) {
    noMobile = true;
  }

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
    setTrailerUrlBanner("");
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const firstDate = new Date(movie?.first_air_date || movie?.release_date);

  return (
    <>
      <div className="netflix">
        <header className="banner">
          {trailerUrlBanner && noMobile && (
            <>
              <div className="mute-modal-banner">
                <img
                  src={muteSrc}
                  alt="mute/unMute"
                  onClick={(e) => mute(e, videoRef)}
                />
              </div>
              <Youtube
                videoId={trailerUrlBanner}
                ref={videoRef}
                onEnd={endVideo}
                onError={endVideo}
                opts={opts}
              />
            </>
          )}
          <img
            className="banner-img"
            alt={movie?.name}
            src={
              noMobile
                ? `${imgUrl}${movie.backdrop_path}`
                : `${imgUrl}${movie.poster_path}`
            }
          ></img>
          <div className="banner-vertical">
            <div className="banner-horizontal">
              <div className="banner-info">
                <div className="banner-name">
                  {movie?.name || movie?.original_title}
                </div>
                <div className="banner-points">
                  {movie?.vote_average} points
                </div>
                <div className="banner-year">{firstDate.getFullYear()}</div>
              </div>
              <div className="banner-description">
                {noMobile
                  ? truncate(movie?.overview, 300)
                  : truncate(movie?.overview, 100)}
              </div>

              {/* <div className="banner-buttons">
                <a href="a" className="banner-watch-button">
                  + Info
                </a>
              </div> */}
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Banner;
