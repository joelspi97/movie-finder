import { MovieAction } from "../interfaces/movieRedux.interface";
import axios from "axios";
import { setLoading, setError } from "./responseActions";
import { BASE_URL, API_KEY } from "../constants";
import MovieDetails from "../interfaces/movieDetails.interface";

export function setMovieDetails(payload: MovieDetails): MovieAction {
  return {
    type: 'SET_MOVIE_DETAILS',
    payload
  };
};

export function getDetails(currentMovieId: string) {
  return (dispatch: any) => {
    dispatch(setLoading(true));
    dispatch(setError({value: false}));
    
    let url = BASE_URL.concat(`/movie/${currentMovieId}`)
    let controller = new AbortController();

    axios.get<MovieDetails>(url, {
        params: { api_key: API_KEY },
        signal: controller.signal
    })
      .then(res => {
        dispatch(setMovieDetails(res.data));
      })
      .catch(err => {
        console.error(err);
        dispatch(setError({value: true, code: err.response.status}));
      })
      .finally(() => {
        setLoading(false);
      })
  }
};
