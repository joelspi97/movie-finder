import { connect } from 'react-redux';
import attributionLogo from '../assets/tmdb-logo.svg';

function Footer() {
  return (
    <footer className="container-fluid">
      This product uses the TMDB API but is not endorsed or certified by TMDB.
      <img src={attributionLogo} alt="The Movie Database logo" />
      <div className="project-padding">
                <p className="footer__paragraph">
                    Want to see the source code of this website? 
                    <a className="footer__link" href="https://github.com/joelspi97/movie-list"> Visit this project's GitHub repository</a>
                </p>
                <p className="footer__paragraph">
                    Want to see more pages I made? 
                    <a className="footer__link" href="https://joelspinelli.herokuapp.com/"> Check my portfolio!</a>
                </p>
                <p className="footer__paragraph">
                    Made by Joel Spinelli with React, TypeScript, Redux, 
                    <span role="img" aria-label="love">❤️ </span>
                    and
                    <span role="img" aria-label="happy pigs"> 🐷</span>
                </p>
            </div>
    </footer>
  )
};

export default connect(null, null)(Footer);
