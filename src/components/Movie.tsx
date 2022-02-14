import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../scss/components/Movie.scss';
import dummyImg from '../assets/tmdb-logo.svg';

function Movie() {
    return (
        <li className="movie rounded">
            <Link to="details">
                <img src={dummyImg} alt="" />
                <div>
                    <h2>Movie Title</h2>
                    <ul>
                        <li>Genre 1</li>
                        <li>Genre 2</li>
                        <li>Genre 3</li>
                    </ul>
                </div>
                <div>4.6/5</div>
            </Link>
        </li>
    );
};

export default connect(null, null)(Movie);
