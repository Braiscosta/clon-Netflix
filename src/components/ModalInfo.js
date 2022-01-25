import "./modalinfo.css";
import Youtube from "react-youtube";
import Item from "./Item";
import { useEffect, useRef, useState, useCallback } from "react";
const baseImgUrl = "https://image.tmdb.org/t/p/original";

function ModalInfo({
  movie,
  setClick,
  casting,
  relatedMovies,
  video,
  setVideo,
  handleClick,

  opts,
}) {
  const [scrollModal, setScrollModal] = useState(false);
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const [muteSrc] = useState("mute.ico");

  let unMute = true;
  const mute = (e) => {
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

  /* Pausa de video Scroll */
  const onScroll = useCallback((event) => {
    event.target.scrollTop > 125 ? setScrollModal(true) : setScrollModal(false);
  }, []);

  useEffect(() => {
    const modalBig = scrollRef.current;
    modalBig.addEventListener("scroll", onScroll);
    return () => modalBig.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    if (scrollModal) {
      videoRef.current?.internalPlayer?.pauseVideo();
    } else {
      videoRef.current?.internalPlayer?.playVideo();
    }
  }, [scrollModal, videoRef]);

  let opacity;
  scrollModal ? (opacity = 0) : (opacity = 1);

  const onPause = () => {
    let display = "none";
    return display;
  };
  /*  */

  /* Soluciona problemas autoplay IOS */
  const onReady = () => {
    videoRef.current?.internalPlayer?.playVideo();
  };
  /*  */

  const endVideo = () => {
    setVideo("");
  };

  const firstDate = new Date(movie?.first_air_date || movie.release_date);

  return (
    <div className="cover" ref={scrollRef}>
      <div className="modal-big">
        <div className="close-modal" onClick={() => setClick(false)}>
          <img src="x.png" alt="close-modal" />
        </div>
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

          <div style={{ opacity: opacity }}>
            {video ? (
              <>
                <div className="mute-modal">
                  <img
                    src={muteSrc}
                    alt="mute/unMute"
                    onClick={(e) => mute(e, videoRef)}
                  />
                </div>
                <Youtube
                  ref={videoRef}
                  /* className="info-container-youtube" */
                  videoId={video}
                  onEnd={endVideo}
                  onError={endVideo}
                  onPause={onPause}
                  onReady={onReady}
                  opts={opts}
                />
              </>
            ) : (
              <div>
                {movie.backdrop_path ? (
                  <img
                    className="movie-img"
                    src={`${baseImgUrl}${movie.backdrop_path}`}
                    alt={movie.name}
                  />
                ) : (
                  <img className="movie-img" src="film.png" alt={movie.name} />
                )}
              </div>
            )}
          </div>

          <div className="info-horizontal"></div>
        </div>

        <div className="info-content-2">
          <h1 className="movie-name">{movie?.name || movie?.original_title}</h1>
          <h2 className="movie-points">
            {movie?.vote_average?.toFixed(1)} points
          </h2>
          <h2 className="movie-year">{firstDate.getFullYear()}</h2>
          <p> {movie.overview}</p>

          <h1 className="info-h1 cast">Cast</h1>
          {casting?.length > 0 ? (
            <ul className="casting-list">
              {casting.map(
                (character, index) =>
                  index < 10 && (
                    <li className="casting" key={index}>
                      {character.profile_path ? (
                        <div>
                          <img
                            alt={character.name}
                            src={`${baseImgUrl}${character.profile_path}`}
                          ></img>
                          {character.name}
                        </div>
                      ) : (
                        <div>
                          <img
                            alt={character.name}
                            src=" profile-casting.png"
                          ></img>
                          {character.name}
                        </div>
                      )}
                    </li>
                  )
              )}
            </ul>
          ) : (
            <p>Sorry is not available.</p>
          )}

          <h1 className="info-h1">Related movies</h1>
          {relatedMovies?.length > 0 ? (
            <ul className="movie-list">
              {relatedMovies.map(
                (movie, index) =>
                  index < 8 && (
                    <Item
                      setClick={setClick}
                      key={movie.id}
                      movie={movie}
                      firstDate={firstDate}
                      handleClick={handleClick}
                      scrollRef={scrollRef}
                    />
                  )
              )}
            </ul>
          ) : (
            <p>Sorry is not available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalInfo;
