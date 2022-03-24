import { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import Movie from './Movie';
import LoadingAnimation from './LoadingAnimation';
import ErrorMessage from './ErrorMessage';
import '../scss/components/MovieList.scss';
import axios, { Canceler } from 'axios';

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
    <>
      <h2>Explicacion de la pagina</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, officiis.</p>
      <input 
        type="text" 
        placeholder="Search movies by title..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul className="movie-list">
        {
          movies.map((movie: any, index: number): JSX.Element => {
            if (movies.length === index + 1) {
              return (
                <Movie 
                  ref={lastMovie}
                  key={movie.imdbID} 
                  title={movie.Title}
                  posterUrl={movie.Poster}
                  year={movie.Year}
                />
              )  
            }
            return (
              <Movie 
                key={movie.imdbID} 
                title={movie.Title}
                posterUrl={movie.Poster}
                year={movie.Year}
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
    </>
  );
};

export default connect(null, null)(MovieList);
