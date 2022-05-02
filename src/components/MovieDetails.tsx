import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../constants';
import '../scss/components/MovieDetails.scss';
import { DetailsState } from '../interfaces/movieRedux.interface';
import { getDetails } from '../actions/detailsActions';
import { useLayoutEffect } from 'react';
import { useNavigate } from "react-router-dom";


function MovieDetails(props: DetailsState | any) {    
  const navigate = useNavigate();
  const { currentMovieId } = useParams();

  useLayoutEffect(() => {
    getDetails(currentMovieId);
  }, []);
  
  const { loading,
          error,
          errorCode,
          getDetails,
          title,
          vote_average,
          overview,
          poster_path } = props;
    
  if(errorCode === 404) {
    navigate('404');
  };

  return (
    <div className="movie-details container-fluid">
      {
        loading && <div>Loading...</div>
      }

      {
        error && <div>Error</div>
      }

      {
        (!loading && !error) && (
          <>
            <Row className="mb-5">
              <Link className="movie-details__link" to="/">Go back</Link>
            </Row>
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
                  src={ IMAGE_BASE_URL.concat(poster_path)} 
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
  getDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
