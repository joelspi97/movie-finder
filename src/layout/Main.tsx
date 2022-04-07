import { connect } from 'react-redux';
import LoadingAnimation from '../components/LoadingAnimation';
import ErrorMessage from '../components/ErrorMessage';
import { Suspense } from 'react';

interface MainProps {
  children: JSX.Element;
};

function Main(props: MainProps) {
  const { children } = props;

  const loading = false;
  const error = false;

  return (
    <main className="main container-fluid pt-5">
      {/* <Suspense fallback={<LoadingAnimation />}>
        {children}
      </Suspense> */}
      {children}
      {loading && <LoadingAnimation />}
      {error && <ErrorMessage />}
    </main>
  );
};

export default connect(null, null)(Main);
