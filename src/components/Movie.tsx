import { forwardRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../scss/components/Movie.scss';
import imageNotAvailable from '../assets/no-image.png';

interface MovieProps {
  id: number;
  title: string;
  posterUrl: string;
  listSelected: boolean;
};

const Movie = forwardRef((props: MovieProps, ref?: React.Ref<HTMLAnchorElement>) => {
  const { id,
          title, 
          posterUrl,
          listSelected } = props;

  return (
    <li>
      <Link 
        aria-label={title}
        className="movie rounded"
        tabIndex={listSelected ? 1 : -1} 
        title="Go to details page"
        to={`details/${id}`}
        ref={ref}
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

function mapStateToProps(state: any) {
  return {
    listSelected: state.list.listSelected
  }
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(Movie);
