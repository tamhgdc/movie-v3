import { useQuery } from '@apollo/client';

import Button from '../../components/Button';
import MainContainer from '../../components/MainContainer';
import CarouselSlider from '../../components/CarouselSlider';

// gql
import {
  getOnAirTodayTv,
  getPopularTv,
  getOnAirTv,
  getTrending,
  getTopRatedTv
} from '../../gql/queries.js';

export default function Shows() {
  // airing today tv
  const {
    // loading: nowLoading,
    // error: nowError,
    data: airingTodayData
  } = useQuery(getOnAirTodayTv('/tv/airing_today?api_key='));
  // on air tv
  const {
    // error: upError,
    // loading: upLoading
    data: onAirsData
  } = useQuery(getOnAirTv('/tv/on_the_air?api_key='));
  // top rated tv/movie
  const {
    // loading: topLoading,
    // error: topError,
    data: topData
  } = useQuery(getTopRatedTv('/tv/top_rated?api_key='));
  // popular tv/movie
  const {
    // loading: popLoading,
    // error: popError,
    data: popData
  } = useQuery(getPopularTv('/tv/popular?api_key='));
  // trending tv/movie
  const {
    // loading: trendingLoading,
    // error: trendingError,
    data: trendingData
  } = useQuery(getTrending('/trending/all/week?api_key='));

  return (
    <div className="bg-gray-dark2">
      {/* carousel */}
      <CarouselSlider data={trendingData?.trending?.results} />
      {/* Featured Movies Shows */}
      <div className=" flex gap-5 lg:mx-12 md:mx-8 mx-3  my-6 mb-5">
        <Button text="Featured" css="px-3 py-1 " />
        <Button text="Movies" css="px-3 py-1  bg-dark border-dark" />
        <Button text="Shows" css="px-3 py-1  bg-dark border-dark" />
      </div>
      <MainContainer title="" data={airingTodayData?.onAirToday?.results} type="tv" />
      {/* Popular Movies  */}
      <MainContainer title="popular" data={popData?.popular?.results} type="tv" />
      {/* Trending Movies  */}
      <MainContainer title="on air" data={onAirsData?.onAir?.results} type="tv" />
      {/* TOP RATED For You Movies  */}
      <MainContainer title="top rated" data={topData?.top_rated?.results} type="tv" />
    </div>
  );
}
