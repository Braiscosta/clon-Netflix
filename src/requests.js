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

export default requests;
