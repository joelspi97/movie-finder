import { forwardRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../scss/components/Movie.scss';

interface MovieProps {
  title: string;
  posterUrl: string;
  lastMovie?: boolean;
};

const Movie = forwardRef((props: MovieProps, ref?: any) => {
  const { title, 
          posterUrl,
          lastMovie } = props;

  return (
    <li ref={ref}>
      <Link 
        aria-label={title}
        className={`movie rounded ${lastMovie ? 'movie--last' : ''} `} 
        to="details"
      >
        <img src={posterUrl} alt={`${title} poster`} />
        <h2>{ title }</h2>
      </Link>
    </li>
  );
});

export default connect(null, null, null, { forwardRef: true })(Movie);
