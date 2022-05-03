import { useRef, useCallback, useEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import Movie from './Movie';
import { IMAGE_BASE_URL } from '../constants';
import { getList, getNextPage, setQuery, resetMovies } from '../actions/listActions';
import { SearchResult} from '../interfaces/movieList.interface';
import '../scss/components/MovieList.scss';

interface MovieListProps {
  loading: boolean;
  error:  boolean;
  query: string;
  pageNumber: number;
  movies: SearchResult[];
  movieNotFound: boolean;
  hasMore: boolean; 
  resetMovies: Dispatch<void>;
  getList: Function;
  getNextPage: Dispatch<void>; 
  setQuery: Dispatch<string>;
}

function MovieList(props: MovieListProps) {
  const { loading,
          error,
          query,
          pageNumber,
          movies,
          movieNotFound,
          hasMore, 
          resetMovies,
          getList, 
          getNextPage, 
          setQuery } = props;
  
  useEffect(() => {
    resetMovies();
  }, [query]);
  
  useEffect(() => {
    getList(query, pageNumber);
  }, [query, pageNumber]);
  
  const observerRef = useRef<IntersectionObserver>();
  const lastMovie = useCallback((node: HTMLLIElement) => {
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
        (movies.length > 0 && !error && !movieNotFound) && (
          <ul className="movie-list__list">
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
                      score={movie.vote_average}
                    />
                  )  
                }
                return (
                  <Movie 
                    key={movie.id}
                    id={movie.id} 
                    title={movie.title}
                    posterUrl={IMAGE_BASE_URL.concat(movie.poster_path)}
                    score={movie.vote_average}
                  />
                )
              })
            }
          </ul>
        )
      }

      { error && <p className="text-white h2">There was an error with your search, please try again later</p> }

      { movieNotFound && <p className="text-white h2">We haven't found movie titles that contain that. Please try typing something different</p> }
      
      {
        // Acá agregar un loading spinner
      }
      { loading && <div className="movie-list__loading">...</div> }
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    loading: state.response.loading,
    error: state.response.error,

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
  setQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
