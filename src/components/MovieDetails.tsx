import { useParams } from 'react-router-dom';
import useMovieDetails from '../hooks/useMovieDetails';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../constants';
import '../scss/components/MovieDetails.scss';

function MovieDetails() {  
  const { currentMovieId } = useParams();
  const { currentMovieDetails, 
          loading, 
          apiError  } = useMovieDetails(currentMovieId!);

  return (
    <div className="movie-details container-fluid">
      {
        loading && <div>Loading...</div>
      }

      {
        apiError && <div>Error</div>
      }

      {
        (!loading && !apiError) && (
          <>
            <Row className="mb-5">
              <Link className="movie-details__link" to="/">Go back</Link>
            </Row>
            <Row className="justify-content-evenly">
              <Col lg={5} className="mb-4 mb-lg-0 px-0">
                <div className="movie-details__header rounded-pill">
                  <h2>{currentMovieDetails?.title}</h2>
                  <div>{currentMovieDetails?.vote_average}</div>
                </div>
                <p className="text-center text-lg-start">{currentMovieDetails?.overview}</p>
              </Col>
              <Col lg={5} className="text-center">
                <img 
                  src={currentMovieDetails && IMAGE_BASE_URL.concat(currentMovieDetails.poster_path)} 
                  alt={`${currentMovieDetails?.title} poster`} 
                />
              </Col>
            </Row>
          </>
        )
      }
      {
        //agregar generos, link a la pagina de la pelicula (si tiene), runtime, cantidad de gente que voto por ese puntaje, 
        //tagline como subtitulo, fecha de estreno, poner imagen backdrop con baja opacidad de fondo
      }
    </div>
  );
};

export default connect(null, null)(MovieDetails);
