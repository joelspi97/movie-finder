import { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import Movie from './Movie';
import axios, { Canceler } from 'axios';
import '../scss/components/MovieList.scss';
import OmdbResponseJson from '../interfaces/omdbJson';

function MovieList() {
  const [movies, setMovies] = useState<Array<any>>([]);
  const [query, setQuery] = useState<string>('');
  const [movieNotFound, setMovieNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const lastMovie = createRef();

  useEffect(() => {
    let cancel: Canceler;
    const API_KEY: string = 'bc9de2ce&';
    let MOVIES_URL: string = 'http://www.omdbapi.com/?&apikey='.concat(API_KEY);
    setLoading(true);

    if (query.length > 2) {
      MOVIES_URL = MOVIES_URL.concat(`s=${query}`);
      axios({
        method: 'GET',
        url: MOVIES_URL,
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
        .then(res => {
          console.log(res.data);
  
          if(res.data.Error) {
            setMovieNotFound(true);
            setMovies([]);
          } else {
            setMovieNotFound(false);
            setMovies(res.data.Search);
          }

          setLoading(false);
        })
        .catch(err => {
          if (axios.isCancel(err)) return;
          setMovies([]);
          console.error(err);
        });
    } else {
      setMovieNotFound(false);
      setMovies([]);
      return;
    };

    return () => cancel();
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
      
      {
        (movies.length === 0 && query.length < 3)
          ? <p className="text-white h2">The results of your search will appear here!</p> 
          : (loading 
              ? <div className="movie-list__loading">...</div> // Acá agregar un loading spinner
              : (movieNotFound 
                  ? <p className="text-white h2">We haven't found movie titles that contain that...</p>
                  : <ul className="movie-list__list">
                    {
                      movies.map((movie: any, index: number): JSX.Element => {
                        if (movies.length === index + 1) {
                          return (
                            <Movie 
                              ref={lastMovie}
                              key={movie.imdbID} 
                              title={movie.Title}
                              posterUrl={movie.Poster}
                              lastMovie={true}
                            />
                          )  
                        }
                        return (
                          <Movie 
                            key={movie.imdbID} 
                            title={movie.Title}
                            posterUrl={movie.Poster}
                          />
                        )
                      })
                    }
                    </ul> 
                )
            )
      }
    </div>
  );
};

export default connect(null, null)(MovieList);
