import { connect } from 'react-redux';
import Movie from './Movie';
import LoadingAnimation from './LoadingAnimation';
import ErrorMessage from './ErrorMessage';
import '../scss/components/MovieList.scss';

function MovieList() {
    const test = [{xd:'xd'}, {xd:'lol'}, {xd:'xd'}, {xd:'lol'}, {xd:'xd'}, {xd:'lol'}, {xd:'xd'}, {xd:'lol'}];

    const loadingNextPage = true;

    return (
        <ul className="movie-list">
            {
                test.map((objeto: { xd: string }): JSX.Element => {
                    return (
                    <Movie key={objeto.xd} />
                    )
                })
            }

            {
                // Agregar acá un loading spinner
                loadingNextPage && (
                    <div className="movie-list__loading">...</div>
                )
            }
        </ul>
    );
};

export default connect(null, null)(MovieList);
