import { MovieAction } from '../interfaces/responseAndActions.interface';
import { BASE_URL, API_KEY } from '../constants';
import { Dispatch } from 'react';
import { SearchedMovies } from '../interfaces/movieList.interface';
import { setLoading, setError } from './responseActions';
import axios from 'axios';

export function setMovies(payload: any): MovieAction {
    return {
        type: 'SET_MOVIES',
        payload
    };
}

export function resetMovies(): MovieAction {
    return {
        type: 'RESET_MOVIES'
    };
}


export function setMovieNotFound(payload: boolean): MovieAction {
    return {
        type: 'SET_MOVIE_NOT_FOUND',
        payload
    };
}

export function setHasMore(payload: boolean): MovieAction {
    return {
        type: 'SET_HAS_MORE',
        payload
    };
}

export function getNextPage(): MovieAction {
    return {
        type: 'GET_NEXT_PAGE'
    };
}

export function setQuery(payload: string): MovieAction {
    return {
        type: 'SET_QUERY',
        payload
    };
}

export function setListSelected(payload: boolean): MovieAction {
    return {
        type: 'SET_LIST_SELECTED',
        payload
    };
}

let abortController: AbortController;
export function getList(query: string, pageNumber: number): Dispatch<MovieAction> {
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();
    
    let url: string;
    if (query.length > 0) {
        url = BASE_URL.concat(`search/movie?query=${query}&page=${pageNumber}`).concat(`&api_key=${API_KEY}`);
    } else {
        url = BASE_URL.concat(`movie/popular?page=${pageNumber}`).concat(`&api_key=${API_KEY}`);
    }

    return (dispatch: any) => {
      dispatch(setLoading(true));
      dispatch(setError({ value: false, code: undefined }));
      dispatch(setMovieNotFound(false));
  
      axios.get<SearchedMovies>(url, {
          signal: abortController.signal
      })
        .then(res => {
            if(res.data.results.length === 0) {
                dispatch(setMovieNotFound(true));
                dispatch(setMovies([]))
            } else {
                // console.log(res.data);
                dispatch(setMovies(res.data.results));
            }
      
            dispatch(setHasMore(res.data.page !== res.data.total_pages));
            dispatch(setLoading(false));
        })
        .catch(err => {
            if (axios.isCancel(err)) return;
            
            dispatch(setLoading(false));
            console.error(err);
            dispatch(setMovies([]));

            if (err.response) {
                dispatch(setError({ value: true, code: err.response.status }));
            } else {
                dispatch(setError({ value: true, code: undefined }));
            }
        })
    };
}
  