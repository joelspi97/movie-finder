import { connect } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Main from './layout/Main';
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
      <Main>
        <Routes>
          <Route path='/' element={<MovieList />} />
          <Route path='details' element={<MovieDetails />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
};

export default connect(null, null)(App);
