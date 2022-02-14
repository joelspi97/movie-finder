import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../scss/components/MovieDetails.scss';
import dummyImg from '../assets/dummy-image.png';

function MovieDetails() {
    return (
        <div className="movie-details container-fluid">
            <Row className="mb-5">
                <div className="movie-details__link-wrapper">
                    <Link to="/">Go back</Link>
                </div>
            </Row>
            <Row className="justify-content-evenly">
                <Col lg={5} className="mb-4 mb-lg-0">
                    <div className="movie-details__header rounded-pill">
                        <h2>MovieDetails</h2>
                        <div>4.6/5</div>
                    </div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor delectus dolorem laudantium omnis odit asperiores natus magni quibusdam corrupti ullam iusto, placeat perspiciatis est cum, autem voluptatibus ex totam aspernatur.</p>
                </Col>
                <Col lg={5} className="text-center">
                    <img src={dummyImg} alt="" />
                </Col>
            </Row>
        </div>
    );
};

export default connect(null, null)(MovieDetails);
