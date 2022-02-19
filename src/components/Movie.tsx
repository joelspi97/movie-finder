import { forwardRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../scss/components/Movie.scss';

interface MovieProps {
  title: string;
  posterUrl: string;
  year: string;
};

const Movie = forwardRef((props: MovieProps, ref?: any) => {
  const { title, 
          posterUrl, 
          year } = props;

  return (
    <li ref={ref} className="movie rounded">
      <Link to="details">
        <img src={posterUrl} alt={`${title} poster`} />
        <div className="movie__body">
          <h2>{ title }</h2>
          <ul>
            <li>Genre 1,</li>
            <li>Genre 2,</li>
            <li>Genre 3</li>
          </ul>
        </div>
        <div className="movie__score">
          <h2>Year</h2>
          <p>{ year }</p>
        </div>
      </Link>
    </li>
  );
});

export default connect(null, null, null, { forwardRef: true })(Movie);
