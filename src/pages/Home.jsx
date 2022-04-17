import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import info from '../popular.json';
import { PICTURE_URL } from '../constants/constants';
import Button from '../components/Button';
import MovieCard from '../components/MovieCard';

function Home() {
  return (
    <div className="bg-gray-dark2">
      <Carousel>
        {info.results.map((i) => {
          return (
            <div
              key={i.id}
              style={{
                backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.99),
           transparent),url(${PICTURE_URL}${i.backdrop_path}) `,
                height: '100vh',
                backgroundPosition: 'center top',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
              className=" h-full  px-24 py-10 grid lg:grid-cols-3 md:grid-cols-2   justify-center items-end">
              {/* details */}
              <div className="text-white order-1 lg:order-none  self-center p-2 flex flex-col gap-1 bg-gray-800 bg-opacity-0">
                <h1 className="text-5xl self-start">{i.name || i.original_name}</h1>
                <p className="flex gap-2 items-center self-start mt-5">
                  <span className="text-yellow-400 fill-current">
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-line"></i>
                  </span>{' '}
                  <span>{i.first_air_date.slice(0, 4)}</span>
                  <span className="border px-1 py-0 text-sm font-bold">T</span>
                  <span>2h 14m</span>
                  {i.origin_country.map((o) => {
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
                <p className="flex gap-4 mt-6">
                  {' '}
                  <Button text="Play Now" icon="play-circle-fill" css="px-5 py-2" />
                  <Button text="My List" icon="add-circle-fill" css="px-5 py-2" />
                </p>
              </div>
              <div />
            </div>
          );
        })}
      </Carousel>
      {/* Featured Movies Shows */}
      <div className="mx-24  my-4 ">
        <div className=" flex gap-5 mb-5">
          <Button text="Featured" css="px-3 py-1 " />
          <Button text="Movies" css="px-3 py-1  bg-dark border-dark" />
          <Button text="Shows" css="px-3 py-1  bg-dark border-dark" />
        </div>
        <div className="flex overflow-x-scroll  mb-14  scrollbar-hide">
          <div className="flex gap-3">
            {info.results.map((x) => {
              return (
                <MovieCard
                  key={x.id}
                  name={x.name}
                  date={x.first_air_date}
                  image={x.poster_path}
                  rate={x.vote_average}
                  country={x.origin_country}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Popular Movies  */}
      <div className="mx-24  my-4 ">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-4xl text-white">POPULAR MOVIES</h1>
          <div className="border-b-4 border-b-red-light w-20"></div>
        </div>
        <div className="flex overflow-x-scroll  mb-14  scrollbar-hide">
          <div className="flex gap-3">
            {info.results.map((x) => {
              return (
                <MovieCard
                  key={x.id}
                  name={x.name}
                  date={x.first_air_date}
                  image={x.poster_path}
                  rate={x.vote_average}
                  country={x.origin_country}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Trending Movies  */}
      <div className="mx-24  my-4 ">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-4xl text-white">TRENDING MOVIES</h1>
          <div className="border-b-4 border-b-red-light w-20"></div>
        </div>
        <div className="flex overflow-x-scroll  mb-14  scrollbar-hide">
          <div className="flex gap-3">
            {info.results.map((x) => {
              return (
                <MovieCard
                  key={x.id}
                  name={x.name}
                  date={x.first_air_date}
                  image={x.poster_path}
                  rate={x.vote_average}
                  country={x.origin_country}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Suggested For You Movies  */}
      <div className="mx-24  my-4 ">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-4xl text-white">SUGGESTED FOR YOU</h1>
          <div className="border-b-4 border-b-red-light w-20"></div>
        </div>
        <div className="flex overflow-x-scroll  mb-14  scrollbar-hide">
          <div className="flex gap-3">
            {info.results.map((x) => {
              return (
                <MovieCard
                  key={x.id}
                  name={x.name}
                  date={x.first_air_date}
                  image={x.poster_path}
                  rate={x.vote_average}
                  country={x.origin_country}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
