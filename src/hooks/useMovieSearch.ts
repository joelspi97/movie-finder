import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";
import SearchedMovies from "../interfaces/searchedMovies.interface";

export default function useMovieSearch(query: string, pageNumber: number) {
  const [movies, setMovies] = useState<Array<any>>([]);
  const [movieNotFound, setMovieNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
    
  useEffect(() => {
    setMovies([]);
  }, [query]);
  
  useEffect(() => {    
    setLoading(true);
    setApiError(false);
    setMovieNotFound(false);

    let controller = new AbortController();
    let currentUrl: string;
    if (query.length > 0) {
      currentUrl = BASE_URL.concat(`search/movie?query=${query}&page=${pageNumber}`).concat(`&api_key=${API_KEY}`);
    } else {
      currentUrl = BASE_URL.concat(`movie/popular?page=${pageNumber}`).concat(`&api_key=${API_KEY}`);
    }
    
    axios.get<SearchedMovies>(currentUrl, {
      signal: controller.signal
    })
    .then(res => {
      console.log(res);

      if(res.data.results.length === 0) {
        setMovieNotFound(true);
        setMovies([]);
      } else {
        setMovies(prevMovies => Array.from( new Set([...prevMovies, ...res.data.results]) ));
      }
      
      setHasMore(res.data.page !== res.data.total_pages);
    })
    .catch(err => {
      if (axios.isCancel(err)) return;
      
      setApiError(true);
      setMovies([]);
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    })
    
    return () => controller.abort();
  }, [query, pageNumber]);

  return { loading,
           apiError,
           movies,
           movieNotFound,
           hasMore };
}
