import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';

// import info from '../popular.json';
import { API_KEY, BASE_URL, PICTURE_URL } from '../../constants/constants';
import Button from '../../components/Button';
import MovieCard from '../../components/MovieCard';
import { TV_ROUTE } from '../../routes';

export default function Shows() {
  const [popular, setPopular] = useState();
  const [upcoming, setUpcoming] = useState();
  const [nowplaying, setNowplaying] = useState();
  const [trending, setTrending] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setPopular(data));
    fetch(`${BASE_URL}/tv/upcoming?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setUpcoming(data));
    fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setNowplaying(data));
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setTrending(data));
  }, []);

  // scroll
  function wheeling(e) {
    e.preventDefault();
    // e.stopPropagation();

    // const el = document.querySelector('#elem');
    // el.scrollBy({
    //   left: e.deltaY < 0 ? -30 : 30
    // behavior: 'smooth'
    // });
  }

  return (
    <div className="bg-gray-dark2">
      <Carousel showThumbs={false} autoPlay={true} showStatus={false} infiniteLoop={true}>
        {trending?.results?.map((i) => {
          return (
            <div
              key={i.id}
              style={{
                backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.99),
           transparent),url(${PICTURE_URL}${i.backdrop_path}) `,
                height: '90vh',
                backgroundPosition: 'center top',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
              className=" h-full  px-24 py-10 grid lg:grid-cols-3 md:grid-cols-2   justify-center items-end">
              {/* details */}
              <div className="text-white order-1 lg:order-none  self-center p-2 flex flex-col gap-1 bg-gray-800 bg-opacity-0">
                <h1 className="text-5xl self-start">{i.name || i.original_name || i.title}</h1>
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
                <p className="flex gap-4 mt-6">
                  {' '}
                  <Button
                    text="Play Now"
                    icon="play-circle-fill"
                    css="px-5 py-2"
                    click={() => navigate(`${TV_ROUTE}/${i.id}`)}
                  />
                  <Button text="My List" icon="add-circle-fill" css="px-5 py-2" />
                </p>
              </div>
              <div />
            </div>
          );
        })}
      </Carousel>
      {/* Featured Movies Shows */}
      <div className="mx-24  my-6 ">
        <div className=" flex gap-5 mb-5">
          <Button text="Featured" css="px-3 py-1 " />
          <Button text="Movies" css="px-3 py-1  bg-dark border-dark" />
          <Button text="Shows" css="px-3 py-1  bg-dark border-dark" />
        </div>
        <div
          className="flex overflow-x-scroll scroll  mb-14  scrollbar-hide before:content-['<'] before:absolute before:bg-dark2  before:bg-gradient-to-r before:from-gray-dark to-transparent before:h-96 before:w-8 before:flex before:items-center before:text-3xl before:text-white before:justify-center after:content-['>'] after:absolute after:bg-dar  after:bg-gradient-to-l after:from-gray-dark to-transparent after:h-96 after:w-8 after:flex after:items-center after:text-3xl after:text-white after:justify-center after:right-24 "
          id="elem"
          onWheel={(e) => wheeling(e)}>
          <div className="flex gap-3 ">
            {trending?.results?.map((x) => {
              return (
                <MovieCard
                  key={x.id}
                  name={x.name || x.title}
                  date={x.first_air_date}
                  image={x.poster_path}
                  rate={x.vote_average}
                  country={x.origin_country}
                  click={() => navigate(`${TV_ROUTE}/${x.id}`)}
                  id={x.id}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Popular Movies  */}
      <div className="mx-24  my-6 ">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-4xl text-white">POPULAR MOVIES</h1>
          <div className="border-b-4 border-b-red-light w-20"></div>
        </div>
        <div
          className="flex overflow-x-scroll scroll  mb-14  scrollbar-hide before:content-['<'] before:absolute before:bg-dark2  before:bg-gradient-to-r before:from-gray-dark to-transparent before:h-96 before:w-8 before:flex before:items-center before:text-3xl before:text-white before:justify-center after:content-['>'] after:absolute after:bg-dar  after:bg-gradient-to-l after:from-gray-dark to-transparent after:h-96 after:w-8 after:flex after:items-center after:text-3xl after:text-white after:justify-center after:right-24 "
          id="elem"
          onWheel={wheeling}>
          <div className="flex gap-3">
            {popular?.results?.map((x) => {
              return (
                <MovieCard
                  key={x.id}
                  name={x.name}
                  date={x.first_air_date}
                  image={x.poster_path}
                  rate={x.vote_average}
                  country={x.origin_country}
                  click={() => navigate(`${TV_ROUTE}/${x.id}`)}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Trending Movies  */}
      <div className="mx-24  my-6 ">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-4xl text-white">UPCOMING MOVIES</h1>
          <div className="border-b-4 border-b-red-light w-20"></div>
        </div>
        <div
          className="flex overflow-x-scroll scroll  mb-14  scrollbar-hide before:content-['<'] before:absolute before:bg-dark2  before:bg-gradient-to-r before:from-gray-dark to-transparent before:h-96 before:w-8 before:flex before:items-center before:text-3xl before:text-white before:justify-center after:content-['>'] after:absolute after:bg-dar  after:bg-gradient-to-l after:from-gray-dark to-transparent after:h-96 after:w-8 after:flex after:items-center after:text-3xl after:text-white after:justify-center after:right-24 "
          id="elem"
          onWheel={wheeling}>
          <div className="flex gap-3">
            {upcoming?.results?.map((x) => {
              return (
                <MovieCard
                  key={x.id}
                  name={x.name}
                  date={x.first_air_date}
                  image={x.poster_path}
                  rate={x.vote_average}
                  country={x.origin_country}
                  click={() => navigate(`${TV_ROUTE}/${x.id}`)}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Suggested For You Movies  */}
      <div className="mx-24  my-6 ">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-4xl text-white">TOP RATED</h1>
          <div className="border-b-4 border-b-red-light w-20"></div>
        </div>
        <div
          className="flex overflow-x-scroll scroll  mb-14  scrollbar-hide before:content-['<'] before:absolute before:bg-dark2  before:bg-gradient-to-r before:from-gray-dark to-transparent before:h-96 before:w-8 before:flex before:items-center before:text-3xl before:text-white before:justify-center after:content-['>'] after:absolute after:bg-dar  after:bg-gradient-to-l after:from-gray-dark to-transparent after:h-96 after:w-8 after:flex after:items-center after:text-3xl after:text-white after:justify-center after:right-24 "
          id="elem"
          onWheel={wheeling}>
          <div className="flex gap-3">
            {nowplaying?.results?.map((x) => {
              return (
                <MovieCard
                  key={x.id}
                  name={x.name || x.title}
                  date={x.first_air_date}
                  image={x.poster_path}
                  rate={x.vote_average}
                  country={x.origin_country}
                  click={() => navigate(`${TV_ROUTE}/${x.id}`)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
