const moviesDiv = document.getElementById("movies");

const apiKey = "1bfdbff05c2698dc917dd28c08d41096";

const getMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
  );

  const movies = await response.json();
  console.log(movies.results);
  return movies.results;
};

const searchMovies = async (title) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`
  );

  const movies = await response.json();
  return movies.results;
};

const movieInfo = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  );

  const movieInfo = await response.json();

  return movieInfo;
};

const getSimilarMovies = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
  );

  const movies = await response.json();

  return movies.results;
};

const moviePoster = (title, backdrop_path, id) => {
  return `
        <div class="movie-poster" onclick="togglePopup(${id})">
            <div class="movie-poster-content">
              <img src="http://image.tmdb.org/t/p/w500${backdrop_path}" alt=${backdrop_path}>
              <h3>${title}</h3>
            </div>
        </div>
          `;
};

const renderMovies = async () => {
  const movies = await getMovies();
  moviesDiv.innerHTML = movies
    .map(({ title, backdrop_path, id }) => {
      return moviePoster(title, backdrop_path, id);
    })
    .join("");
};

renderMovies();
