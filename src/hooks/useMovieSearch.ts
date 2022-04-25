import { useEffect, useState } from "react";
import axios from "axios";
import TmdbResponse from "../interfaces/tmdbJson";

export default function useMovieSearch(query: string, pageNumber: number) {
  const [movies, setMovies] = useState<Array<any>>([]);
  const [movieNotFound, setMovieNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
    
  const API_KEY = '291a10a46f07867159009943d2d6daa0';
  const BASE_URL = 'https://api.themoviedb.org/3/';
  let currentUrl: string;

  if (query.length > 0) {
    currentUrl = BASE_URL.concat(`search/movie?query=${query}&page=${pageNumber}`).concat(`&api_key=${API_KEY}`);
  } else {
    currentUrl = BASE_URL.concat(`movie/popular?page=${pageNumber}`).concat(`&api_key=${API_KEY}`);
  }

  useEffect(() => {
    setMovies([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setApiError(false);
    setMovieNotFound(false);
    let controller = new AbortController;
    
    axios.get<TmdbResponse>(currentUrl, {
      signal: controller.signal
    })
    .then(res => {
      console.log(res.data);

      if(res.data.results.length === 0) {
        setMovieNotFound(true);
        setMovies([]);
      } else {
        setMovies(prevMovies => Array.from( new Set([...prevMovies, ...res.data.results]) ));
      }
      
      setHasMore(res.data.page !== res.data.total_pages);
      setLoading(false);
    })
    .catch(err => {
      if (axios.isCancel(err)) return;
      
      setApiError(true);
      setMovies([]);
      console.error(err);
    });
    
    return () => controller.abort();
  }, [query, pageNumber]);

  return { loading,
           apiError,
           movies,
           movieNotFound,
           hasMore };
}
