import { MovieAction } from "../interfaces/response.interface";
import CurrentMovieDetails from "../interfaces/movieDetails.interface";

const detailsInitialState: CurrentMovieDetails = {
  backdrop_path: null,
  genres: null,
  homepage: null,
  overview: null,
  poster_path: null,
  release_date: null,
  runtime: null,
  tagline: null,
  title: null,
  vote_average: null,
  vote_count: null
};

export default function movieDetailsReducer(detailsState = detailsInitialState, action: MovieAction): CurrentMovieDetails {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return {
        ...detailsState,
        backdrop_path: action.payload.backdrop_path,
        genres: action.payload.genres,
        homepage: action.payload.homepage,
        overview: action.payload.overview,
        poster_path: action.payload.poster_path,
        release_date: action.payload.release_date,
        runtime: action.payload.runtime,
        tagline: action.payload.tagline,
        title: action.payload.title,
        vote_average: action.payload.vote_average,
        vote_count: action.payload.vote_count,
      }

    case 'ERASE_MOVIE_DETAILS':
      return {
        ...detailsState,
        backdrop_path: null,
        genres: null,
        homepage: null,
        overview: null,
        poster_path: null,
        release_date: null,
        runtime: null,
        tagline: null,
        title: null,
        vote_average: null,
        vote_count: null,
      }

    default:
      return detailsState;
  };
};
