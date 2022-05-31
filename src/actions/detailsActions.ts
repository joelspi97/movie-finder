import { MovieAction } from "../interfaces/response.interface";
import axios from "axios";
import { setLoading, setError } from "./responseActions";
import { BASE_URL, API_KEY } from "../constants";
import CurrentMovieDetails from "../interfaces/movieDetails.interface";
import { Dispatch } from "react";

export function setMovieDetails(payload: CurrentMovieDetails): MovieAction {
  return {
    type: 'SET_MOVIE_DETAILS',
    payload
  };
};

export function eraseMovieDetails(): MovieAction {
  return {
    type: 'ERASE_MOVIE_DETAILS'
  };
}

let abortController: AbortController;
export function getDetails(currentMovieId: string): Dispatch<MovieAction> {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();
  
  return (dispatch: any) => {
    let url = BASE_URL.concat(`/movie/${currentMovieId}`)
    
    dispatch(setLoading(true));
    dispatch(setError({ value: false, code: undefined }));

    axios.get<CurrentMovieDetails>(url, {
        params: { api_key: API_KEY },
        signal: abortController.signal
    })
      .then(res => {
        console.log(res.data);
        dispatch(setMovieDetails(res.data));
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        console.error(err);
        dispatch(setError({ value: true, code: err.response.status }));
      })
      .finally(() => {
        dispatch(setLoading(false));
      })
  };
}
