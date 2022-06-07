import { MovieAction } from "../interfaces/responseAndActions.interface";
import { MovieList } from "../interfaces/movieList.interface";

const listInitialState: MovieList = {
    movies: [],
    movieNotFound: false,
    hasMore: false,
    query: '',
    pageNumber: 1,
    listSelected: false
};

export default function listReducer(listState = listInitialState, action: MovieAction): MovieList {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...listState,
        movies: Array.from( new Set([...listState.movies, ...action.payload]) )   
      };

    case 'RESET_MOVIES':
      return {
        ...listState,
        movies: [],
        pageNumber: 1
      };

    case 'SET_QUERY':
      return {
        ...listState,
        query: action.payload,
      };

    case 'GET_NEXT_PAGE':
      return {
        ...listState,
        pageNumber: listState.pageNumber + 1
      };

    case 'SET_MOVIE_NOT_FOUND':
      return {
        ...listState,
        movieNotFound: action.payload
      };

    case 'SET_HAS_MORE':
      return {
        ...listState,
        hasMore: action.payload
      };

    case 'SET_LIST_SELECTED':
      return {
        ...listState,
        listSelected: action.payload
      };

    default:
      return listState;
  };
};
