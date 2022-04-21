import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../scss/layout/Footer.scss';

function Footer() {
  return (
    <footer id="footer" className="footer container-fluid">
      <a 
        aria-label="This project uses the The Movie Database API but is not endorsed or certified by The Movie Database. Follow this link to visit the The Movie Database website"
        className="footer__attribution rounded-pill mb-4 py-3 px-5"
        href="https://www.themoviedb.org/" 
        rel="noreferrer"
        target="_blank" 
        title="Visit the TMDb website"
      >
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </a>
      <Row className="justify-content-around">
        <Col
          className="footer__link-wrapper d-flex flex-column justify-content-evenly align-items-center rounded-pill mb-4 py-4 px-5"
          sm={12} md={5} lg={4}
        >
          <p>Want to see the source code of this website?</p>
          <a 
            className="d-inline-block rounded" 
            href="https://github.com/joelspi97/movie-list"
            rel="noreferrer"
            target="_blank"
          > 
            Visit this project's GitHub repository!
          </a>
        </Col>
        <Col
          className="footer__link-wrapper d-flex flex-column justify-content-evenly align-items-center rounded-pill mb-4 py-4 px-5"
          sm={12} md={5} lg={4}
        >
          <p>Want to see more pages I made?</p>
          <a 
            className="d-inline-block rounded" 
            href="https://joelspinelli.herokuapp.com/"
            rel="noreferrer"
            target="_blank"
          > 
            Check my portfolio!
          </a>
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
