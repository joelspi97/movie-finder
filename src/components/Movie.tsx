import { forwardRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../scss/components/Movie.scss';
import imageNotAvailable from '../assets/no-image.png';

interface MovieProps {
  id: number;
  title: string;
  posterUrl: string;
};

const Movie = forwardRef((props: MovieProps, ref?: React.Ref<HTMLLIElement>) => {
  const { id,
          title, 
          posterUrl } = props;

  return (
    <li ref={ref}>
      <Link 
        aria-label={title}
        className="movie rounded" 
        title="Go to details page"
        to={`details/${id}`}
      >
        {
          posterUrl.includes('/null') 
            ? <img className="p-5" src={imageNotAvailable} alt="No poster available" />
            : <img src={posterUrl} alt={`${title} poster`} />
        }
        <div className="d-flex flex-column justify-content-center h-100">
          <h2>{title}</h2>
        </div>
      </Link>
    </li>
  );
});

export default connect(null, null, null, { forwardRef: true })(Movie);
