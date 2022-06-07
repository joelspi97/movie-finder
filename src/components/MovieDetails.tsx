import { useEffect, useLayoutEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import { getDetails, eraseMovieDetails } from '../actions/detailsActions';
import { IMAGE_BASE_URL } from '../constants';
import CurrentMovieDetails from '../interfaces/movieDetails.interface';
import errorIcon from '../assets/red-x.svg';
import '../scss/components/MovieDetails.scss';

interface MovieDetailsProps extends CurrentMovieDetails {
  loading: boolean;
  error: boolean;
  errorCode: number;
  getDetails: Dispatch<string>;
  eraseMovieDetails: Dispatch<void>;
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
          eraseMovieDetails } = props;
          
  const { currentMovieId } = useParams();
  useEffect(() => {
    getDetails(currentMovieId!);

    return () => eraseMovieDetails();
  }, []);
  
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if(errorCode === 404) {
      navigate('404');
    };

    return () => eraseMovieDetails();
  }, [errorCode]);

  useLayoutEffect(() => {
    const bodyElement = document.querySelector<HTMLBodyElement>('.body');
    
    if(!error && !loading && bodyElement) {
      bodyElement.style.height = 'auto';
    } else {
      return;
    }

    return () => {
      if (bodyElement) {
        bodyElement.style.height = '100%'
      }
    };
  }, [error, loading]);

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
                <Col lg={5} className="mb-4 mb-lg-0 px-0 xd">
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
                      {release_date && <p>Released on {release_date}</p>}
                      {runtime && <p>Runtime: {runtime} minutes</p>}
                      {
                        genres && (
                          <div className="movie-details__genres">
                            <h4>Genres: </h4>
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
                            className="movie-details__link movie-details__link--homepage"
                            href={homepage} 
                            rel="noreferrer"
                            target="_blank" 
                          >
                            Visit this movie official website
                          </a>
                        </div>
                      )
                    }
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
                There was an error trying to load the details of the movie. 
                <br />
                Please, try again later.
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
    vote_count: state.details.vote_count
  };
}

const mapDispatchToProps = {
  getDetails,
  eraseMovieDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
