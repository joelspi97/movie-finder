import { useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import Movie from './Movie';
import '../scss/components/MovieList.scss';
import useMovieSearch from '../hooks/useMovieSearch';

function MovieList() {
  const [query, setQuery] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';

  const { loading,
          apiError,
          movies,
          movieNotFound,
          hasMore } = useMovieSearch(query, pageNumber);

  const observerRef = useRef<IntersectionObserver>();
  const lastMovie = useCallback((node: HTMLLIElement) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) { 
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      };
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>): void {
    setQuery(e.target.value);
    setPageNumber(1);
  }

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
        onChange={handleSearch}
      />
      
      { apiError && <p className="text-white h2">There was an error with your search, please try again later</p> }

      {
        // Acá agregar un loading spinner
      }
      { loading && <div className="movie-list__loading">...</div> }

      { movieNotFound && <p className="text-white h2">We haven't found movie titles that contain that. Please try typing something different</p> }

      {
        (movies.length > 0 && !apiError && !movieNotFound) && (
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
