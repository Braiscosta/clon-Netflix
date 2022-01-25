import { useEffect, useState } from "react";
import axios from "../axios";

const API_KEY = "587d5c96b4a13d9043c3a42c31f201a8";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-EN`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-EN`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-EN`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-EN`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-EN`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-EN`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-EN`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&language=en-EN`,
  fetchUpcoming: `/tv/on_the_air?api_key=${API_KEY}&with_genres=99&language=en-EN&page=2`,
};

function useBannerMovie() {
  const [bannerMovie, setBannerMovie] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const request = await axios.get(requests.fetchTrending);

      setBannerMovie(
        request.data?.results[
          Math.floor(Math.random() * (request.data.results.length - 0))
        ]
      );
    }

    getMovies();
  }, []);

  return [bannerMovie, setBannerMovie];
}

function useListMovies() {
  const [trendingMovies, SetTrendingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [documentariesMovies, setDocumentariesMovies] = useState([]);
  useEffect(() => {
    async function getMovies() {
      const responseTrending = await axios.get(requests.fetchTrending);
      SetTrendingMovies(responseTrending.data.results);

      const responseTop = await axios.get(requests.fetchTopRated);
      setTopMovies(responseTop.data.results);

      const responseAction = await axios.get(requests.fetchActionMovies);
      setActionMovies(responseAction.data.results);

      const responseRomance = await axios.get(requests.fetchRomanceMovies);
      setRomanceMovies(responseRomance.data.results);

      const responseComedy = await axios.get(requests.fetchComedyMovies);
      setComedyMovies(responseComedy.data.results);

      const responseHorror = await axios.get(requests.fetchHorrorMovies);
      setHorrorMovies(responseHorror.data.results);

      const responseDocumentaries = await axios.get(
        requests.fetchDocumentaries
      );
      setDocumentariesMovies(responseDocumentaries.data.results);
    }
    getMovies();
  }, []);

  return [
    trendingMovies,
    topMovies,
    actionMovies,
    romanceMovies,
    comedyMovies,
    horrorMovies,
    documentariesMovies,
  ];
}

export { useBannerMovie, useListMovies };
