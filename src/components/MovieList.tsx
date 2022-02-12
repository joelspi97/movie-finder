import { connect } from 'react-redux';
import Movie from './Movie';
import LoadingAnimation from './LoadingAnimation';
import ErrorMessage from './ErrorMessage';

function MovieList() {
    const test = [{xd:'xd'}, {xd:'lol'}];
    const loading = true;
    const error = true;

    return (
        <ul>
            {
                test.map((objeto: { xd: string }): JSX.Element => {
                    return (
                    <Movie key={objeto.xd} />
                    )
                })
            }
            { loading && <LoadingAnimation /> }
            { error && <ErrorMessage /> }
        </ul>
    );
};

export default connect(null, null)(MovieList);
