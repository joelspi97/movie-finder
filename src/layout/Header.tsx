import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import movieListLogo from '../assets/movie-list-logo.png';
import '../scss/layout/Header.scss';

function Header() {
  return (
    <header className="header container-fluid">
      <Link className="me-2 me-sm-0" to="/" title="Link back to home">
        <img src={movieListLogo} alt="Movie List Logo - Link back to home" />
      </Link>
      <h1>Movie Finder</h1>
    </header>
  );
};

export default connect(null, null)(Header);
