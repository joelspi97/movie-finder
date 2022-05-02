import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../scss/components/PageNotFound.scss';

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h2>Page Not Found</h2>
      <p>Error 404</p>
      <Link to="/">Go back</Link>
    </div>
  );
};

export default connect(null, null)(PageNotFound);
