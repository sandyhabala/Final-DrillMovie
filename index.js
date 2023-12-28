const moviesDiv = document.getElementById("movies");

const apiKey = "1bfdbff05c2698dc917dd28c08d41096";

const getMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
  );

  const movies = await response.json();
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
        <div class="movie-poster" ondblclick="viewMovie(${id})">
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
const searchMoviePopup = document.getElementById("search-movie-popup");

const viewMovie = async (id) => {
  moviePopup.style.display = "block";
  popupOverlay.style.display = "block";
  const movie = await movieInfo(id);

  popupContainer.innerHTML = popupContent(
    movie.title,
    movie.overview,
    movie.popularity,
    movie.backdrop_path,
    movie.vote_count,
    movie.vote_average
  );

  const movies = await relatedMovies(id);

  relatedMoviesContainer.innerHTML = movies
    .map(({ title, backdrop_path, id }) => {
      return moviePoster(title, backdrop_path, id);
    })
    .join("");

  searchMoviePopup.style = "hidden";
};

const closeMoviePopup = () => {
  moviePopup.style.display = "none";
  popupOverlay.style.display = "none";
};

const closeSearchMoviePopup = () => {
  searchMoviePopup.style.display = "none";
  popupOverlay.style.display = "none";
};

const search = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

const searchQuery = document.getElementById("search-query");

let searchInputValue = "";

searchInput.addEventListener("input", () => {
  searchInputValue = searchInput.value;
});

search.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movies = await searchMovies(searchInputValue);
  searchMoviePopup.style.display = "block";
  popupOverlay.style.display = "block";

  searchQuery.innerHTML = searchInputValue;
  searchResults.innerHTML = movies
    .map(({ title, backdrop_path, id }) => {
      return moviePoster(title, backdrop_path, id);
    })
    .join("");
});
