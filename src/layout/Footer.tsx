import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../scss/layout/Footer.scss';

function Footer() {
    return (
        <footer className="footer container-fluid">
            <p className="footer__attribution rounded-pill mb-4 py-3 px-5">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
            <Row className="justify-content-around">
                <Col 
                    className="footer__link-wrapper d-flex flex-column justify-content-evenly rounded-pill mb-4 py-4 px-5" 
                    sm={12} md={5} lg={4}
                >
                    <p>Want to see the source code of this website?</p> 
                    <a href="https://github.com/joelspi97/movie-list"> Visit this project's GitHub repository!</a>
                </Col>
                <Col 
                    className="footer__link-wrapper d-flex flex-column justify-content-evenly rounded-pill mb-4 py-4 px-5" 
                    sm={12} md={5} lg={4}
                >
                    <p>Want to see more pages I made?</p>
                    <a href="https://joelspinelli.herokuapp.com/"> Check my portfolio!</a>
                </Col>
            </Row>
            <p className="fw-bold mb-0">
                Made by Joel Spinelli with React, TypeScript, Redux, 
                <span role="img" aria-label="love"> ❤️ </span>
                and
                <span role="img" aria-label="happy pigs"> 🐷</span>
            </p>
        </footer>
    );
};

export default connect(null, null)(Footer);
