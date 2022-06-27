import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { PICTURE_URL } from '../../constants/constants';
import Button from '../../components/Button';
import MainContainer from '../../components/MainContainer';
import { TV_ROUTE, MOVIE_ROUTE } from '../../routes';

// gql
import {
  getOnAirTodayTv,
  getTopRatedMovies,
  getOnAirTv,
  getTrendingTv,
  getPopularMovies
} from '../../gql/queries.js';

export default function Shows() {
  const navigate = useNavigate();

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
  } = useQuery(getTopRatedMovies('/tv/top_rated?api_key='));
  // popular tv/movie
  const {
    // loading: popLoading,
    // error: popError,
    data: popData
  } = useQuery(getPopularMovies('/tv/popular?api_key='));
  // trending tv/movie
  const {
    // loading: trendingLoading,
    // error: trendingError,
    data: trendingData
  } = useQuery(getTrendingTv('/trending/all/week?api_key='));

  return (
    <div className="bg-gray-dark2">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        showStatus={false}
        infiniteLoop={true}
        showIndicators={false}>
        {trendingData?.trendingTv?.results?.map((i) => {
          return (
            <div
              key={i.id}
              style={{
                backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.99),
           transparent),url(${PICTURE_URL}${i.backdrop_path}) `,
                backgroundPosition: 'center top',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
              className="xl:h-[80vh] lg:h-full md:h-80 sm:h-80  sm:px-10 lg:px-12 md:px-8 py-10 grid lg:grid-cols-3 md:grid-cols-2   justify-center items-end">
              {/* details */}
              <div className="text-white order-1 lg:order-none  self-center p-2 flex flex-col gap-1 bg-gray-800 bg-opacity-0">
                <h1 className="text-3xl self-start">{i.name || i.original_name || i.title}</h1>
                <p className="flex gap-2 items-center self-start mt-5">
                  <span className="text-yellow-400 fill-current">
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-line"></i>
                  </span>{' '}
                  <span>{i.first_air_date?.slice(0, 4)}</span>
                  <span className="border px-1 py-0 text-sm font-bold">T</span>
                  <span>2h 14m</span>
                  {i.origin_country?.map((o) => {
                    return (
                      <span key={o} className="border px-1 py-0 text-sm font-bold">
                        {o}
                      </span>
                    );
                  })}
                </p>
                <p className="hidden md:block lg:block self-start text-left">
                  {i.overview.slice(0, 156)}...
                </p>
                <p className="flex gap-4 mt-6 min-w-96">
                  {' '}
                  <Button
                    text="Play Now"
                    icon="play-circle-fill"
                    css="lg:px-5 px-2 py-2 lg:w-52 md:w-28 w-26 text-sm"
                    click={() =>
                      navigate(`${i.media_type === 'tv' ? TV_ROUTE : MOVIE_ROUTE}/${i.id}`)
                    }
                  />
                  <Button
                    text="My List"
                    icon="add-circle-fill"
                    css="lg:px-5 px-2 py-2 lg:w-52 md:w-28 w-26 text-sm"
                  />
                </p>
              </div>
              <div />
            </div>
          );
        })}
      </Carousel>
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
