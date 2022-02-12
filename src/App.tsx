import { connect } from 'react-redux';
import Footer from './layout/Footer';
import Main from './layout/Main';
import Header from './layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
};

export default connect(null, null)(App);
