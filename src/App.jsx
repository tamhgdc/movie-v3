import { Routes, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// local import
import Footer from './layouts/Footer';
// import Navbar from './layouts/Navbar';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import SingIn from './pages/SignIn/SingIn';
import {
  HOME_ROUTE,
  MOVIE_ROUTE,
  SIGN_IN_ROUTE,
  SING_UP_ROUTE,
  TV_ROUTE,
  SEARCH_ROUTE,
  PERSON_ROUTE
} from './routes';
import Movie from './pages/SingleMovie/Movie';
import Shows from './pages/Tv/Shows';
import SingleTv from './pages/Tv/SingleTv/SingleTv';
import SearchResults from './pages/Search/SearchResults';
import Person from './pages/Person/Person';

function App() {
  let url = useLocation();

  return (
    <div className="bg-dark">
      {/* <Navbar /> */}
      <Navbar />
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={SIGN_IN_ROUTE} element={<SingIn />} />
        <Route path={`${MOVIE_ROUTE}/:movieId`} element={<Movie />} />
        <Route path={TV_ROUTE} element={<Shows />} />
        <Route path={`${TV_ROUTE}/:tvId`} element={<SingleTv />} />
        <Route path={`${SEARCH_ROUTE}/:query`} element={<SearchResults />} />
        <Route path={`${PERSON_ROUTE}/:personId`} element={<Person />} />
      </Routes>
      {url.pathname !== SIGN_IN_ROUTE && url.pathname !== SING_UP_ROUTE && <Footer />}
    </div>
  );
}

App.propTypes = {
  location: PropTypes.string
};
App.defaultProps = {
  location: ''
};

export default App;
