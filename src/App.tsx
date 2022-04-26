import { connect } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './layout/Header';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import PageNotFound from './components/PageNotFound';
import Footer from './layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="skip-link-container">
        <a className="rounded" href="#footer">Skip to footer</a>
      </div>
      <Header />
      <main className="main container-fluid pt-5">
        <Routes>
          <Route path='/' element={<MovieList />} />
          <Route path='details/:currentMovieId' element={<MovieDetails />} />
          <Route path='404' element={<PageNotFound />} />
          <Route path='*' element={<Navigate replace to='404' />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default connect(null, null)(App);
