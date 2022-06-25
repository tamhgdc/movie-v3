import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import MovieCard from '../../../components/MovieCard';
import LeftArrow from '../../../components/LeftArrow';
import RightArrow from '../../../components/RightArrow';
import { API_KEY, BASE_URL, PICTURE_URL } from '../../../constants/constants';

import cred from '../../../credits.json';
import { TV_ROUTE } from '../../../routes';

export default function SingleTv() {
  const [videos, setVideos] = useState();
  const [similar, setSimilar] = useState();
  const [details, setDetails] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetch(`${BASE_URL}/tv/${params.tvId}/videos?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
    fetch(`${BASE_URL}/tv/${params.tvId}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setDetails(data));
    fetch(`${BASE_URL}/tv/${params.tvId}/similar?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setSimilar(data));
  }, [params.tvId]);

  return (
    <div className="text-white">
      {/* video */}
      <div className="lg:h-screen md:h-96 sm:h-80 h-60">
        <iframe
          src={`https://www.youtube.com/embed/${videos?.results[0]?.key}?autoplay=1`}
          frameBorder="0"
          allowFullScreen
          className=" w-full lg:px-24 md:px-16 sm:px-2 lg:h-screen md:h-96 sm:h-72 h-60"
          poster={`${PICTURE_URL}/x6FsYvt33846IQnDSFxla9j0RX8.jpg`}
        />
      </div>
      {/* End video */}
      <div className="lg:px-24 md:px-16 sm:px-4 px-3 py-10 flex flex-col lg:items-center md:items-start items-center sm:items-center gap-x-10 lg:flex-row sm:flex-col md:flex-row ">
        <div className="lg:h-96 h-80 sm:h-90 w-full py-2 sm:hidden lg:block md:block">
          <img
            src={`${PICTURE_URL}${details?.poster_path}`}
            className="h-80 lg:w-72 md:w-72 w-full object-cover object-top"
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row md:flex-col sm:flex-col justify-between h-full">
          <h1 className="text-xl lg:text-5xl md:text-2xl mt-5">
            {details?.original_name || details?.name} ({details?.last_air_date.slice(0, 4)})
          </h1>
          <div className="flex flex-wrap justify-between w-full my-5 flex-col lg:flex-row">
            <span className="flex items-center gap-1 text-gray lg:text-lg text-sm">
              <span className="flex items-center gap-1 text-gray text-lg">
                <i className="ri-user-fill"></i>
                {details?.adult ? '18+' : '12+'}
              </span>
              <i className="ri-user-smile-line"></i>
              {details?.genres?.map((g) => g.name).join(', ')} 💠
              <span className="flex items-center gap-1 text-gray lg:text-lg text-sm">
                {Math.floor(details?.episode_run_time[0] / 60)}hr{' '}
                {details?.episode_run_time[0] % 60}
                min
              </span>
            </span>
            <span className="flex items-center gap-1 text-gray lg:text-lg text-sm">
              <i className="ri-earth-line"></i>
              {details?.production_countries?.map((c) => c.name).join(', ')}
            </span>
          </div>
          <p className="w-4/5">{details?.overview}</p>
          {/* casts and crews */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1  mt-5">
            <div className="">
              <h1 className="text-3xl font-semibold">Director</h1>
              <h2 className="font-semibold">
                {cred.crew
                  .filter((crew) => crew.job.toLocaleLowerCase() === 'director')
                  .map((cr) => `${cr.name || cr.original_name}`)}
              </h2>
            </div>
            <div className="col-span-2">
              <h1 className="text-3xl font-semibold">Cast</h1>
              <span className="flex flex-wrap gap-x-1 font-semibold w-5/6">
                {cred.cast.slice(0, 10).map((cr) => {
                  return <h2 key={cr.id}>{cr.name},</h2>;
                })}
              </span>
            </div>
          </div>
          {/* buttons */}
          <div className="flex justify-between mt-1 gap-1 flex-wrap ">
            <Button text="Play" icon="play-fill" css="lg:w-52 md:w-28 flex justify-center py-1" />
            <Button text="My List" icon="add-line" css="lg:w-52 md:w-28 flex justify-center py-1" />
            <Button
              text="Trailer"
              icon="movie-2-line"
              css="lg:w-52 md:w-28 flex justify-center py-1"
            />
            <Button text="Share" icon="share-fill" css="lg:w-52 md:w-28 flex justify-center py-1" />
          </div>
        </div>
      </div>
      {/* related movies */}
      <div className="lg:mx-24 md:mx-16 sm:mx-2 mx-3 my-6 mt-10">
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-4xl text-white">RELATED</h1>
          <div className="border-b-4 border-b-red-light w-20"></div>
        </div>
        <div className="flex overflow-x-scroll  mb-14  scrollbar-hide">
          <LeftArrow />
          <div className="flex gap-3">
            {similar?.results?.map((x) => {
              return (
                <MovieCard
                  key={x.id}
                  name={x.name || x.original_title}
                  date={x.first_air_date}
                  image={x.poster_path}
                  rate={x.vote_average}
                  country={x.origin_country}
                  click={() => navigate(`${TV_ROUTE}/${x.id}`)}
                />
              );
            })}
          </div>
          <RightArrow />
        </div>
      </div>
    </div>
  );
}
