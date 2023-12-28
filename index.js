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

const relatedMovies = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
  );

  const movies = await response.json();

  return movies.results;
};

const moviePoster = (title, backdrop_path, id) => {
  return `
        <div class="movie-poster" onclick="viewMovie(${id})">
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

const popupContent = (
  title,
  overview,
  popularity,
  backdrop_path,
  vote_count,
  vote_average
) => {
  return `
    <div class="popup-content">
      <div>
        <h1>${title}</h1>

        
        <h4>Overview:</h4>
        <p>${overview}</p> 
        
        <h4>Popularity</h4>
        <h5>${popularity}</h5>
        
        <h4>Votes:</h4>
        <p>${vote_count}</p>

        <h4>Vote average:</h4>
        <p>${vote_average}</p>
      </div>
      <img src="http://image.tmdb.org/t/p/w500${backdrop_path}">
    </div>
    
  `;
};

const moviePopup = document.getElementById("movie-popup");
const popupOverlay = document.getElementById("popup-overlay");
const popupContainer = document.getElementById("popup-container");
const relatedMoviesContainer = document.getElementById("related-movies");

const viewMovie = async (id) => {
  moviePopup.style.display = "block";
  popupOverlay.style.display = "block";
  console.log(id);
  currentMovie = await movieInfo(id);

  popupContainer.innerHTML = popupContent(
    currentMovie.title,
    currentMovie.overview,
    currentMovie.popularity,
    currentMovie.backdrop_path,
    currentMovie.vote_count,
    currentMovie.vote_average
  );

  const similarMovies = await relatedMovies(id);

  console.log(similarMovies);

  const mappedMovies = similarMovies.map(({ title, backdrop_path, id }) => {
    return moviePoster(title, backdrop_path, id);
  });

  relatedMoviesContainer.innerHTML = mappedMovies.join("");

  console.log(currentMovie);
};

const closeMoviePopup = () => {
  moviePopup.style.display = "none";
  popupOverlay.style.display = "none";
};
