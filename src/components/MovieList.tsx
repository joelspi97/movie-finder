import { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import Movie from './Movie';
import axios, { Canceler } from 'axios';
import '../scss/components/MovieList.scss';

function MovieList() {
  const loadingNextPage = true;
  const [movies, setMovies] = useState<Array<any>>([]);
  const [query, setQuery] = useState<string>('');

  const lastMovie = createRef();

  useEffect(() => {
    let MOVIES_URL: string;
    const API_KEY: string = 'bc9de2ce&';
    if (query.length > 2) {
      MOVIES_URL = 'http://www.omdbapi.com/?s='.concat(query).concat('&apikey=').concat(API_KEY);
    } else {
      MOVIES_URL = 'http://www.omdbapi.com/?s='.concat('avengers').concat('&apikey=').concat(API_KEY);
    };

    let cancel: Canceler;
    axios({
      method: 'GET',
      url: MOVIES_URL,
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        console.log(res.data);
        setMovies(res.data.Search);
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        
        console.error(err);
        setMovies([]);
      });
    return () => cancel();
  }, [query]);

  return (
    <div className="movie-list">
      <div className="movie-list__text-wrapper">
        <h2>Welcome!</h2>
        <p>This website will help you to find information about movies you're interested in.</p>
        <p className="mb-5" id="search-bar-instructions">Use the search bar to search for particular titles.</p>
      </div>
      <input 
        aria-labelledby="search-bar-instructions"
        className="movie-list__search-bar rounded"
        type="text" 
        placeholder="Search movies by title..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul className="movie-list__list">
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

        {
          // Acá agregar un loading spinner
          loadingNextPage && (
            <div className="movie-list__loading">...</div>
          )
        }
      </ul>
    </div>
  );
};

export default connect(null, null)(MovieList);
