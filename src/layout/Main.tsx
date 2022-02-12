import { connect } from 'react-redux';
import MovieList from '../components/MovieList';
import DetailedMovie from '../components/DetailedMovie';

function Main() {
    return (
        <main className="container-fluid">
            <MovieList />
            <DetailedMovie />
        </main>
    );
};

export default connect(null, null)(Main);
