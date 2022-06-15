import { useEffect, useLayoutEffect, Dispatch, useMemo, FormEvent, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import { getDetails, eraseMovieDetails } from '../actions/detailsActions';
import { IMAGE_BASE_URL } from '../constants';
import { setToken, eraseToken, getRequestToken, createSessionId, rateMovie, setHasVoted } from '../actions/voteActions';
import CurrentMovieDetails from '../interfaces/movieDetails.interface';
import errorIcon from '../assets/red-x.svg';
import '../scss/components/MovieDetails.scss';

interface MovieDetailsProps extends CurrentMovieDetails {
  loading: boolean;
  error: boolean;
  errorCode: number;
  getDetails: Dispatch<string>;
  eraseMovieDetails: Dispatch<void>;
  getRequestToken: Dispatch<void>;
  token: string;
  setToken: Dispatch<string>;
  eraseToken: any;
  createSessionId: Dispatch<string>;
  rateMovie: Function;
  sessionId: string;
  hasVoted: boolean;
  setHasVoted: Dispatch<boolean>;
}

function MovieDetails(props: MovieDetailsProps) {    
  const { loading,
          error,
          errorCode,
          backdrop_path,
          genres,
          homepage,
          overview,
          poster_path,
          release_date,
          runtime,
          tagline,
          title,
          vote_average,
          vote_count,
          getDetails,
          eraseMovieDetails,
          getRequestToken,
          token,
          setToken,
          eraseToken,
          createSessionId,
          rateMovie,
          sessionId,
          hasVoted,
          setHasVoted } = props;
          
  // API call to GET movie details
  const { currentMovieId } = useParams();
  useEffect(() => {
    getDetails(currentMovieId!);

    return () => eraseMovieDetails();
  }, [currentMovieId]);
  // /API call to GET movie details

  // Redirection in case of 404 error
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (errorCode === 404) {
      navigate('404');
    }

    return () => eraseMovieDetails();
  }, [errorCode]);
  // /Redirection in case of 404 error

  // TMDb authentication
  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  
  let query = useQuery();
  let userPermission = (query.get('approved') === 'true');

  useEffect(() => {
    if (token) {
      // Esta url va a haber que modificarla una vez que la página esté subida
      window.open(`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/details/${currentMovieId}`, '_blank');
    }
    
    if (userPermission) {
      let currentToken = query.get('request_token') as string;
      setToken(currentToken);
      
      if (!sessionId) {
        createSessionId(token);
      }
    };
    
    return () => {
      eraseToken();
    };
  }, [token]);
  // /TMDb authentication
  
  // User vote handling
  const [userRating, setUserRating] = useState<string>('1');

  useEffect(() => {
    setHasVoted(false);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    rateMovie(sessionId, currentMovieId, userRating);
  }
  // /User vote handling

  return (
    <div className="movie-details container-fluid pt-5">
      {
        (backdrop_path && !loading && !error) && (
          <img 
            className="movie-details__background-image"
            src={IMAGE_BASE_URL.concat(backdrop_path)} 
            alt="" 
          />
        )
      }
      <div className="movie-details__z-index">
        <Row>
          <Link className="movie-details__link" to="/">Go back</Link>
        </Row>

        {
          (!loading && !error) && (
            <>
              <Row className="justify-content-evenly mt-5">
                <Col lg={5} className="mb-4 mb-lg-0 px-0">
                  <div className="movie-details__header rounded-pill">
                    <h2>{title}</h2>
                    <div className="movie-details__score">
                      <span>Rating: {vote_average}</span>
                      <span className="fst-italic h4 mb-0 ms-3">({vote_count} votes)</span>
                    </div>
                  </div>
                  <div className="movie-details__body">
                    <h3 className="movie-details__tagline">{tagline}</h3>
                    <p className="text-center text-lg-start">{overview}</p>
                    <div className="movie-details__movie-data">
                      {release_date && <p><span className="fw-bold">Released on: </span>{release_date}</p>}
                      {runtime && <p><span className="fw-bold">Runtime: </span>{runtime} minutes</p>}
                      {
                        genres && (
                          <div className="movie-details__genres">
                            <p>Genres: </p>
                            <div>
                              {genres.map((genre, index) => {
                                if(index === genres.length - 1) {
                                  return <span key={genre.id}>{genre.name}</span>
                                }
                                return <span key={genre.id}>{genre.name} - </span>
                              })}
                            </div>
                          </div>
                        )
                      }
                    </div>
                    {
                      homepage && (
                        <div className="text-center">
                          <a 
                            className="movie-details__link"
                            href={homepage} 
                            rel="noreferrer"
                            target="_blank" 
                          >
                            Visit this movie official website
                          </a>
                        </div>
                      )
                    }
                    <div className="movie-details__user-vote">
                      {!hasVoted && <h4>Do you want to rate this movie?</h4>}
                      {
                        !hasVoted && ( 
                          sessionId
                          ? (
                            <form className="movie-details__vote-form rounded-pill" onSubmit={e => handleSubmit(e)}>
                              <div className="movie-details__select-wrapper">
                                <select 
                                  className="movie-details__link" 
                                  name="vote" 
                                  // id="user-vote" Para hacer accesible este input habría que agregarle algún label o algo
                                  onChange={e => setUserRating(e.target.value)}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                </select>
                              </div>
                              <button className="movie-details__link" type="submit">Submit</button>
                            </form>
                          )
                          : (
                            <>
                              <p className="my-4">
                                To rate a movie you need to give us permission from your TMDb account.
                                <br />
                                Follow the link below to open TMDb, and press the "Approve" button.
                              </p>
                              <button 
                                className="movie-details__link"
                                onClick={() => getRequestToken()}  
                                >
                                Click here to vote!
                              </button>
                            </>
                          )
                        )
                      }

                      {
                        hasVoted && (
                          <p className='mb-4'>Your vote has been succesfully submitted!</p>
                        )
                      }
                      
                    </div>
                  </div>
                </Col>
                <Col lg={5} className="text-center">
                  <img 
                    className="movie-details__poster"
                    src={poster_path ? IMAGE_BASE_URL.concat(poster_path) : undefined} 
                    alt={`${title} poster`} 
                  />
                </Col>
              </Row>
            </>
          )
        }

        { 
          error && (
            <div className="error movie-details__error text-center h-100 d-flex flex-column justify-content-center align-items-center">
              <img className="mb-5" src={errorIcon} alt="" />
              <p className="text-white mb-5">
                An error has ocurred. 
                <br />
                Please, refresh the page or try again later.
              </p> 
            </div>
          ) 
        }

        {
          loading && (
            <div className='loading text-center h-100 d-flex flex-column justify-content-center align-items-center'>
              <div className='spinner'></div>
            </div>
          )
        }
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    loading: state.response.loading,
    error: state.response.error,
    errorCode: state.response.errorCode,

    backdrop_path: state.details.backdrop_path,
    genres: state.details.genres,
    homepage: state.details.homepage,
    overview: state.details.overview,
    poster_path: state.details.poster_path,
    release_date: state.details.release_date,
    runtime: state.details.runtime,
    tagline: state.details.tagline,
    title: state.details.title,
    vote_average: state.details.vote_average,
    vote_count: state.details.vote_count,

    token: state.vote.token,
    sessionId: state.vote.sessionId,
    hasVoted: state.vote.hasVoted
  };
}

const mapDispatchToProps = {
  getDetails,
  eraseMovieDetails,
  getRequestToken,
  setToken,
  eraseToken,
  createSessionId,
  rateMovie,
  setHasVoted
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
