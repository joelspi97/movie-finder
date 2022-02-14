import { connect } from 'react-redux';

function PageNotFound() {
    return (
        <>
            <h1>Page Not Found</h1>
            <p>Error code 404</p>
        </>
    );
};

export default connect(null, null)(PageNotFound);
