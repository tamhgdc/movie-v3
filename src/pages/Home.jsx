import { useQuery } from '@apollo/client';

import MainContainer from '../components/MainContainer';
import CarouselSlider from '../components/CarouselSlider';
import Button from '../components/Button';

// gql
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getTrending,
  getPopularMovies
} from '../gql/queries.js';

function Home() {
  // now playing movie
  const {
    loading: nowLoading,
    error: nowError,
    data: nowData
  } = useQuery(getNowPlayingMovies('/movie/now_playing?api_key='));
  // upcoming movies
  const {
    data: upcomingData
    // error: upError,
    // loading: upLoading
  } = useQuery(getUpcomingMovies('/movie/upcoming?api_key='));
  // topRated movies
  const {
    // loading: topLoading,
    // error: topError,
    data: topData
  } = useQuery(getTopRatedMovies('/movie/top_rated?api_key='));
  // popular movies
  const {
    // loading: popLoading,
    // error: popError,
    data: popData
  } = useQuery(getPopularMovies('/movie/popular?api_key='));
  // popular movies
  const {
    // loading: trendingLoading,
    // error: trendingError,
    data: trendingData
  } = useQuery(getTrending('/trending/all/week?api_key='));

  return (
    <div className="bg-dark">
      {nowLoading && <h1 className="text-5xl text-light">{nowLoading}</h1>}
      {nowError && <h1 className="text-5xl text-light ">{nowError}</h1>}
      {/* carousel */}
      <CarouselSlider data={trendingData?.trending?.results} />
      {/* Featured Movies Shows */}
      <div className="lg:mx-12 md:mx-12 sm:mx-2 mx-2  my-6  flex gap-5 mb-5">
        <Button text="Featured" css="px-3 py-1 " />
        <Button text="Movies" css="px-3 py-1  bg-dark border-dark" />
        <Button text="Shows" css="px-3 py-1  bg-dark border-dark" />
      </div>
      <MainContainer title="" data={nowData?.now_playing?.results} />

      {/* Popular Movies  */}
      <MainContainer title="Popular" data={popData?.popular?.results} />

      {/* upcomings Movies  */}
      <MainContainer title="Upcoming" data={upcomingData?.upcoming.results} />

      {/* top rated Movies  */}
      <MainContainer title="top rated" data={topData?.top_rated.results} />
    </div>
  );
}

export default Home;
