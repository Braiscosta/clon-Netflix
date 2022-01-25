import { useEffect, useState } from "react";
import axios from "../axios";

function useVideoBanner(movie, videoRef) {
  const [trailerUrlBanner, setTrailerUrlBanner] = useState("");

  useEffect(() => {
    async function fetchData() {
      let trailerUrlBanner = await axios.get(
        `/movie/${movie?.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      const { results } = trailerUrlBanner.data;

      setTimeout(() => {
        setTrailerUrlBanner(results[0]?.key);
      }, 2000);

      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          videoRef.current?.internalPlayer?.pauseVideo();
        } else {
          videoRef.current?.internalPlayer?.playVideo();
        }
      });
      return () => {
        window.removeEventListener("scroll", null);
      };
    }
    fetchData();
  }, [movie.id, videoRef]);
  return [trailerUrlBanner, setTrailerUrlBanner];
}

export default useVideoBanner;
