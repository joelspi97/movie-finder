import { connect } from 'react-redux';
import LoadingAnimation from '../components/LoadingAnimation';
import ErrorMessage from '../components/ErrorMessage';

interface MainProps {
    children: JSX.Element;
};

function Main(props: MainProps) {
    const { children } = props;

    const loading = false;
    const error = false;

    return (
        <main className="container-fluid">
            { children }
            { loading && <LoadingAnimation /> }
            { error && <ErrorMessage /> }
        </main>
    );
};

export default connect(null, null)(Main);
