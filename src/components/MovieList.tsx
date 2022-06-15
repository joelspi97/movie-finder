import { useRef, useCallback, useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import Movie from './Movie';
import { IMAGE_BASE_URL } from '../constants';
import { getList, getNextPage, setQuery, resetMovies, setListSelected } from '../actions/listActions';
import { SearchResult} from '../interfaces/movieList.interface';
import errorIcon from '../assets/red-x.svg';
import movieNotFoundIcon from '../assets/worried.svg';
import '../scss/components/MovieList.scss';

interface MovieListProps {
  loading: boolean;
  error:  boolean;
  errorCode: number;
  query: string;
  pageNumber: number;
  movies: SearchResult[];
  movieNotFound: boolean;
  hasMore: boolean; 
  resetMovies: Dispatch<void>;
  getList: Function;
  getNextPage: Dispatch<void>; 
  setQuery: Dispatch<string>;
  setListSelected: Dispatch<boolean>;
}


function MovieList(props: MovieListProps) {
  const { loading,
    error,
    errorCode,
    query,
    pageNumber,
    movies,
    movieNotFound,
    hasMore, 
    resetMovies,
    getList, 
    getNextPage, 
    setQuery,
    setListSelected } = props;
    
  // API call
  useEffect(() => {
    resetMovies();
  }, [query]);
  
  useEffect(() => {
    getList(query, pageNumber);
  }, [query, pageNumber]);
  // /API call

  // Keyboard accessibility
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'enter') {
      const movieList = event.target as HTMLElement;
      const firstMovie = movieList.children[0].children[0];
      (firstMovie as HTMLAnchorElement).focus();
      setListSelected(true);
      
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === 'escape') {
          setListSelected(false);
          movieList.focus();
          document.removeEventListener('keydown', handleEscKey);
        }
      }

      document.addEventListener('keydown', handleEscKey);
    }
  }
  // /Keyboard accessibility
  
  // Inifinite scrolling
  const observerRef = useRef<IntersectionObserver>();
  const lastMovie = useCallback((node: HTMLAnchorElement) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) { 
        getNextPage();
        console.log(pageNumber)
      };
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);
  // /Inifinite scrolling

  return (
    <div className="movie-list pt-5">
      <div className="movie-list__text-wrapper">
        <h2>Welcome!</h2>
        <p className="mb-5" id="search-bar-instructions">Use this search bar to filter for specific titles.</p>
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
        (movies.length > 0 && !error && !movieNotFound) && (
          <>
            <span className="visually-hidden" aria-live="assertive">Movie list has finished loading</span>
            <ul 
              aria-label='Movie list. Press enter to navigate, and escape once you want to leave this section.'
              className='movie-list__list' 
              tabIndex={movies.length > 0 ? 0 : -1} 
              onKeyDown={(e: any) => handleKeyDown(e)}
            >
              {
                movies.map((movie: any, index: number): JSX.Element => {                
                  if (movies.length === index + 1) {
                    return (
                      <Movie 
                        ref={lastMovie}
                        key={movie.id} 
                        id={movie.id}
                        title={movie.title}
                        posterUrl={IMAGE_BASE_URL.concat(movie.poster_path)}
                      />
                    )  
                  }
                  return (
                    <Movie 
                      key={movie.id}
                      id={movie.id} 
                      title={movie.title}
                      posterUrl={IMAGE_BASE_URL.concat(movie.poster_path)}
                    />
                  )
                })
              }
            </ul>
          </>
        )
      }

      { 
        error && (
          <div className="error mt-5 d-flex flex-column justify-content-center align-items-center">
            <img className="mb-5" src={errorIcon} alt="" />
            {
              errorCode === 422 
                ? <p className="text-white h2" aria-live="assertive">Please, avoid starting searchs with a blank space. Try again.</p> 
                : (
                  <p className="text-white h2" aria-live="assertive">
                    There was an error with your search. 
                    <br />
                    Please, try again later.
                    {
                      errorCode && <><br /> {`(error code ${errorCode})`}</>
                    }
                  </p>
                )
            }
          </div>
        )
      }

      { 
        (movieNotFound && !error) && (
          <div className="error mt-5 d-flex flex-column justify-content-center align-items-center">
            <img className="mb-5" src={movieNotFoundIcon} alt="" />
            <p className="text-white h2" aria-live="assertive">
              We haven't found movie titles that contain that. 
              <br />
              Please try typing something different.
            </p>
          </div>
        ) 
      }
      
      {
        loading && (
          <div className="loading text-center h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="spinner mb-0">
              <span className="visually-hidden" aria-live="assertive">Loading</span>
            </div>
          </div>
        )
      }
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    loading: state.response.loading,
    error: state.response.error,
    errorCode: state.response.errorCode,

    query: state.list.query,
    pageNumber: state.list.pageNumber,
    movies: state.list.movies,
    movieNotFound: state.list.movieNotFound,
    hasMore: state.list.hasMore
  };
}

const mapDispatchToProps = {
  resetMovies,
  getList,
  getNextPage,
  setQuery,
  setListSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
