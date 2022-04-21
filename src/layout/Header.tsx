import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import movieListLogo from '../assets/movie-list-logo.png';
import '../scss/layout/Header.scss';
import tmdbAttributionLogo from '../assets/tmdb-attribution-logo.svg';

function Header() {
  return (
    <header className="header container-fluid">
      <Link className="me-2 me-sm-0 rounded" to="/" title="Link back to home">
        <img src={movieListLogo} alt="Movie List Logo - Link back to home" />
      </Link>
      <h1>Movie Finder</h1>
      <img className="attribution-logo" src={tmdbAttributionLogo} alt="The Movie Database Logo" />
    </header>
  );
};

export default connect(null, null)(Header);
