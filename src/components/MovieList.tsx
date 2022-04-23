import { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import Movie from './Movie';
import axios from 'axios';
import '../scss/components/MovieList.scss';
import TmdbResponseJson from '../interfaces/tbdbJson';

function MovieList() {
  const [movies, setMovies] = useState<Array<any>>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [movieNotFound, setMovieNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';
  
  //
  //
  // Hacer un hook con todo esto
  
  const API_KEY = '291a10a46f07867159009943d2d6daa0';
  const BASE_URL = 'https://api.themoviedb.org/3/';
  let currentUrl: string;

  //Este bloque aca afuera esta raro
  if (query.length > 0) {
    currentUrl = BASE_URL.concat(`search/movie?query=${query}`).concat(`&api_key=${API_KEY}`);
  } else {
    currentUrl = BASE_URL.concat(`movie/popular?page=${pageNumber}`).concat(`&api_key=${API_KEY}`);
  }
  //
  
  useEffect(() => {
    setLoading(true);
    setApiError(false);
    setPageNumber(1);
    setHasMore(true);
    let controller = new AbortController;
    
    axios.get<TmdbResponseJson>(currentUrl, {
      signal: controller.signal
    })
    .then(res => {
      console.log(res.data);

      if (res.data.page === res.data.total_pages) setHasMore(false);
      
      if(res.data.results.length === 0) {
        setMovieNotFound(true);
        setMovies([]);
      } else {
        setMovieNotFound(false);
        setMovies(res.data.results);
      }

      setLoading(false);
    })
    .catch(err => {
      if (axios.isCancel(err)) return;
      
      setApiError(true);
      setMovies([]);
      console.error(err);
    });
    
    return () => controller.abort();
  }, [query]);
  
  //
  //
  //

  function getNextPage(): void {
    console.log(pageNumber);
    currentUrl = currentUrl.concat(`&page=${pageNumber}`); // Esto no funca, en parte porque la busqueda por defecto no podria funcionar de por si

    axios.get<TmdbResponseJson>(currentUrl)
      .then(res => {
        if (res.data.page === res.data.total_pages) setHasMore(false);

        setMovies(prevMovies => [...prevMovies, res.data.results]);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const observerRef = useRef<IntersectionObserver>();
  const lastMovie = useCallback((node: HTMLLIElement) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) { 
        console.log(pageNumber);
        setPageNumber(prevPageNumber => prevPageNumber + 1); // Esto no funca..?
        console.log(pageNumber);
        getNextPage();
      };
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="movie-list">
      <div className="movie-list__text-wrapper">
        <h2>Welcome!</h2>
        <p>This website features an infinite scroll that gets data from a RESTful API</p>
        <p className="mb-5" id="search-bar-instructions">Use the search bar to filter for particular titles.</p>
      </div>
      <input 
        aria-labelledby="search-bar-instructions"
        className="movie-list__search-bar rounded"
        type="text" 
        placeholder="Search movies by title..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      
      { apiError && <p className="text-white h2">There was an error with your search, please try again later</p> }

      {
        // Acá agregar un loading spinner
      }
      { loading && <div className="movie-list__loading">...</div> }

      { movieNotFound && <p className="text-white h2">We haven't found movie titles that contain that. Please try typing something different</p> }

      {
        (movies.length > 0 && !apiError && !loading && !movieNotFound) && (
          <ul className="movie-list__list">
            {
              movies.map((movie: any, index: number): JSX.Element => {                
                if (movies.length === index + 1) {
                  return (
                    <Movie 
                      key={movie.id} 
                      title={movie.title}
                      posterUrl={IMAGE_BASE_URL.concat(movie.poster_path)}
                      ref={lastMovie}
                    />
                  )  
                }
                return (
                  <Movie 
                    key={movie.id} 
                    title={movie.title}
                    posterUrl={IMAGE_BASE_URL.concat(movie.poster_path)}
                  />
                )
              })
            }
          </ul>
        )
      }
    </div>
  );
};

export default connect(null, null)(MovieList);
