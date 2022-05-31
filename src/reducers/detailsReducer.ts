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
      const updatedState = { ...detailsState };
      Object.keys(updatedState).forEach(key => {
        (updatedState as any)[key] = action.payload[key];
      });

      return {
        ...updatedState
      }

    case 'ERASE_MOVIE_DETAILS':
      const emptyState = { ...detailsState };
      Object.keys(emptyState).forEach(key => {
        (emptyState as any)[key] = null;
      });

      return {
        ...emptyState        
      }

    default:
      return detailsState;
  };
};
