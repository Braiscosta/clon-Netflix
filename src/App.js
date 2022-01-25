import "./App.css";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import Row from "./components/Row";
import { useState } from "react";
import { useRef } from "react";
import { useBannerMovie, useListMovies } from "./hooks/remoteHooks";

function App() {
  const [bannerMovie] = useBannerMovie();
  const [
    trendingMovies,
    topMovies,
    actionMovies,
    romanceMovies,
    comedyMovies,
    horrorMovies,
    documentariesMovies,
  ] = useListMovies();

  /* Opciones de video */
  const opts = {
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      rel: 0,
      showinfo: 0,
    },
  };
  /*  */

  /* Toggle mute/unMute video */
  const videoRef = useRef(null);
  const [muteSrc] = useState("mute.ico");

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
  /*  */

  return (
    <div className="app">
      <Nav />
      <Banner
        movie={bannerMovie}
        mute={mute}
        opts={opts}
        videoRef={videoRef}
        muteSrc={muteSrc}
      />
      <div className="row-container">
        <Row
          opts={opts}
          coordinate={"a"}
          title="Trending Now"
          movies={trendingMovies}
          mute={mute}
          videoRef={videoRef}
          muteSrc={muteSrc}
        />
        <Row
          opts={opts}
          coordinate={"b"}
          title="Action"
          movies={actionMovies}
          mute={mute}
          videoRef={videoRef}
          muteSrc={muteSrc}
        />
        <Row
          opts={opts}
          coordinate={"c"}
          title="Top Films"
          movies={topMovies}
          topRow
          mute={mute}
          videoRef={videoRef}
          muteSrc={muteSrc}
        />

        <Row
          opts={opts}
          coordinate={"d"}
          title="Romance"
          movies={romanceMovies}
          mute={mute}
          videoRef={videoRef}
          muteSrc={muteSrc}
        />
        <Row
          opts={opts}
          coordinate={"e"}
          title="Comedy"
          movies={comedyMovies}
          mute={mute}
          videoRef={videoRef}
          muteSrc={muteSrc}
        />
        <Row
          opts={opts}
          coordinate={"f"}
          title="Horror"
          movies={horrorMovies}
          largeRow
          mute={mute}
          videoRef={videoRef}
          muteSrc={muteSrc}
        />
        <Row
          opts={opts}
          coordinate={"g"}
          title="Documentaries"
          movies={documentariesMovies}
          mute={mute}
          videoRef={videoRef}
          muteSrc={muteSrc}
        />
      </div>
      {bannerMovie?.length <= 0 &&
        trendingMovies?.length <= 0 &&
        topMovies?.length <= 0 &&
        actionMovies?.length <= 0 &&
        romanceMovies?.length <= 0 &&
        comedyMovies?.length <= 0 &&
        horrorMovies?.length <= 0 &&
        documentariesMovies?.length <= 0 && (
          <div className="loading">
            <img src="logo.png" alt="loading"></img>
          </div>
        )}
    </div>
  );
}

export default App;
