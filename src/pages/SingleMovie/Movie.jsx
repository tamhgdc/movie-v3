import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Button from '../../components/Button';
import MainContainer from '../../components/MainContainer';
import CastCard from '../../components/CastCard';
import { API_KEY, BASE_URL, PICTURE_URL } from '../../constants/constants';
import { getMovieCredits } from '../../gql/queries.js';

export default function Movie() {
  const [videos, setVideos] = useState();
  const [similar, setSimilar] = useState();
  const [details, setDetails] = useState();
  // const [showCast, setshowCast] = useState(false);
  const params = useParams();
  const { data } = useQuery(getMovieCredits(`/movie/${params.movieId}/credits?api_key=`), {
    fetchPolicy: 'network-only'
  });
  const producer = data?.credits?.crew?.filter(
    (x) =>
      x.job?.toLocaleLowerCase() === 'producer' ||
      x.job?.toLocaleLowerCase() === 'executive producer'
  );
  useEffect(() => {
    fetch(`${BASE_URL}/movie/${params.movieId}/videos?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
    fetch(`${BASE_URL}/movie/${params.movieId}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setDetails(data));
    fetch(`${BASE_URL}/movie/${params.movieId}/similar?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setSimilar(data));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params.movieId]);

  return (
    <div className="text-white">
      {/* video */}
      <div className="lg:h-screen md:h-96 sm:h-80 h-60">
        <iframe
          src={`https://www.youtube.com/embed/${videos?.results[0]?.key}?autoplay=1`}
          frameBorder="0"
          allowFullScreen
          className=" w-full lg:px-24 md:px-16 sm:px-2 lg:h-[90vh] md:h-96 sm:h-72 h-60"
          poster={`${PICTURE_URL}/x6FsYvt33846IQnDSFxla9j0RX8.jpg`}
          loading="lazy"
        />
      </div>
      {/* End video */}
      <div className="lg:px-24 md:px-16 sm:px-4 px-3 py-10 flex flex-col lg:items-start md:items-start items-center sm:items-center gap-x-10 lg:flex-row sm:flex-col md:flex-row">
        <div className="lg:h-96 h-80 sm:h-90 py-2 sm:hidden lg:block md:block">
          <img
            src={`${PICTURE_URL}${details?.poster_path}`}
            className="h-80 lg:w-72 md:w-72 w-full object-cover object-top"
            loading="lazy"
          />
        </div>
        <div className="w-full flex flex-col lg:flex-col md:flex-col sm:flex-col justify-between h-full">
          <h1 className="text-xl lg:text-4xl md:text-2xl ">
            {details?.original_title} ({details?.release_date.slice(0, 4)})
          </h1>
          <div className="flex flex-wrap justify-between w-full my-5 flex-col lg:flex-row">
            <span className="flex items-center gap-1 text-gray lg:text-lg text-sm">
              <span className="flex items-center gap-1 text-gray  mr-5">
                <i className="ri-user-fill"></i>
                {details?.adult ? '18+' : '12+'}
              </span>
              <i className="ri-time-line"></i>
              {Math.floor(details?.runtime / 60)}hr {details?.runtime % 60}min
            </span>

            <span className="flex items-center gap-1 text-gray lg:text-lg text-sm ">
              <i className="ri-user-smile-line"></i>
              {details?.genres.map((g) => g.name).join(', ')}
            </span>
            <span className="flex items-center gap-1 text-gray lg:text-lg text-sm">
              <i className="ri-earth-line"></i>
              {details?.production_countries.map((c) => c.name).join(', ')}
            </span>
          </div>
          <p className="w-4/5">{details?.overview}</p>
          {/* casts and crews */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1  mt-5">
            <CastCard data={producer} title="producers" css="mb-5 col-span-3" />
            <CastCard
              data={data?.credits?.cast}
              title="casts"
              css="col-span-3 mb-5 lg:mr-12 md:mr-8 sm:mr-4"
            />
          </div>
          {/* buttons */}
          <div className="flex  mt-1 gap-1 flex-wrap">
            <Button text="Play" icon="play-fill" css="lg:w-52 md:w-24 flex justify-center py-1" />
            <Button text="My List" icon="add-line" css="lg:w-52 md:w-24 flex justify-center py-1" />
            <Button text="Share" icon="share-fill" css="lg:w-52 md:w-24 flex justify-center py-1" />
          </div>
        </div>
      </div>
      {/* related movies */}
      <MainContainer title="related" data={similar?.results} />
    </div>
  );
}
