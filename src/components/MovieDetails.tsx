import { useEffect, useLayoutEffect, Dispatch } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import { getDetails, eraseMovieDetails } from '../actions/detailsActions';
import { IMAGE_BASE_URL } from '../constants';
import CurrentMovieDetails from '../interfaces/movieDetails.interface';
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

    // if (!title) fijarse que hongo esto
    return () => eraseMovieDetails();
  }, []);
  
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if(errorCode === 404) {
      navigate('404');
    };
    return () => eraseMovieDetails();
  }, [errorCode]);
  
  return (
    <div className="movie-details container-fluid">
      <Row className="mb-5">
        <Link className="movie-details__link" to="/">Go back</Link>
      </Row>
      {
        loading && <div className='h1'>Loading...</div>
      }

      {
        error && <div>Error</div>
      }

      {
        (!loading && !error) && (
          <>
            <Row className="justify-content-evenly">
              <Col lg={5} className="mb-4 mb-lg-0 px-0">
                <div className="movie-details__header rounded-pill">
                  <h2>{title}</h2>
                  <div>{vote_average}</div>
                </div>
                <p className="text-center text-lg-start">{overview}</p>
              </Col>
              <Col lg={5} className="text-center">
                <img 
                  src={poster_path ? IMAGE_BASE_URL.concat(poster_path) : undefined} 
                  alt={`${title} poster`} 
                />
              </Col>
            </Row>
          </>
        )
      }
      {
        //agregar géneros, link a la página de la película (si tiene), runtime, cantidad de gente que voto por ese puntaje, 
        //tagline como subtítulo, fecha de estreno, poner imagen backdrop con baja opacidad de fondo
      }
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
