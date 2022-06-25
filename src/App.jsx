import { Routes, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Footer from './layouts/Footer';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import SingIn from './pages/SignIn/SingIn';
import { HOME_ROUTE, MOVIE_ROUTE, SIGN_IN_ROUTE, SING_UP_ROUTE, TV_ROUTE } from './routes';
import Movie from './pages/SingleMovie/Movie';
import Shows from './pages/Tv/Shows';
import SingleTv from './pages/Tv/SingleTv/SingleTv';
import { fetchPopulars } from './context/slices/movie/popularSlice';
import { fetchUpcomings } from './context/slices/movie/upcomingSlice';
import { fetchTrendings } from './context/slices/movie/trendingSlice';
import { fetchTopRated } from './context/slices/movie/topRatedSlice';
import { fetchNowPlaying } from './context/slices/movie/nowPlayingSlice';

function App() {
  let url = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPopulars());
    dispatch(fetchUpcomings());
    dispatch(fetchTrendings());
    dispatch(fetchTopRated());
    dispatch(fetchNowPlaying());
  }, [dispatch]);

  return (
    <div className="bg-gray-dark2">
      <Navbar />
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={SIGN_IN_ROUTE} element={<SingIn />} />
        <Route path={`${MOVIE_ROUTE}/:movieId`} element={<Movie />} />
        <Route path={TV_ROUTE} element={<Shows />} />
        <Route path={`${TV_ROUTE}/:tvId`} element={<SingleTv />} />
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
