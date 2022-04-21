import { useState, useLayoutEffect, createRef } from 'react';
import { connect } from 'react-redux';
import Movie from './Movie';
import axios from 'axios';
import '../scss/components/MovieList.scss';
import OmdbResponseJson from '../interfaces/omdbJson'; // Adaptar esto a tmdb

function MovieList() {
  const [movies, setMovies] = useState<Array<any>>([]);
  const [query, setQuery] = useState<string>('');
  const [movieNotFound, setMovieNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);

  const lastMovie = createRef();

  useLayoutEffect(() => {
    const API_KEY = '291a10a46f07867159009943d2d6daa0';
    let moviesUrl: string = 'https://api.tvmaze.com/';
    let controller = new AbortController;
    setLoading(true);
    setApiError(false);

    if (query.length > 0) {
      moviesUrl = moviesUrl.concat(`search/shows?q=${query}`).concat(`?api_key=${API_KEY}`);
    } else {
      moviesUrl = moviesUrl.concat('shows?page=1').concat(`?api_key=${API_KEY}`);
    }

    axios({
      method: 'GET',
      url: moviesUrl,
      signal: controller.signal
    })
      .then(res => {
        console.log(res.data);

        if(res.data.length === 0) {
          setMovieNotFound(true);
          setMovies([]);
        } else {
          setMovieNotFound(false);
          setMovies(res.data);
        }
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        
        setApiError(true);
        setMovies([]);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [query]);

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

      { movieNotFound && <p className="text-white h2">We haven't found series titles that contain that. Please try typing something different</p> }

      {
        (movies.length > 0 && !apiError && !loading && !movieNotFound) && (
          <ul className="movie-list__list">
            {
              movies.map((movie: any, index: number): JSX.Element => {                
                if (movies.length === index + 1) {
                  return (
                    <Movie 
                      key={movie.show ? movie.show.id : movie.id} 
                      title={movie.show ? movie.show.name : movie.name}
                      posterUrl={movie.hasOwnProperty('image') 
                                  ? (movie.show 
                                      ? movie.show.image.medium
                                      : movie.image.medium 
                                    )
                                  : null 
                                }
                      lastMovie={true}
                      ref={lastMovie}
                    />
                  )  
                }
                return (
                  <Movie 
                    key={movie.show ? movie.show.id : movie.id} 
                    title={movie.show ? movie.show.name : movie.name}
                    posterUrl={movie.hasOwnProperty('image') 
                                ? (movie.show 
                                    ? movie.show.image.medium
                                    : movie.image.medium
                                    ) 
                                : null
                              }
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
