export const Endpoints = {
  MOVIES: 'discover/movie',
  TV_SHOWS: 'discover/tv',
  MOVIE_ID: (movie_id: string) => `movie/${movie_id}`,
  TV_SHOW_ID: (series_id: string) => `tv/${series_id}`,
  TRENDS: 'trending/all/day?language=en-US',
  IMAGE_BASE: 'https://image.tmdb.org/t/p/',
  SEARCH: 'search/multi',
};
