import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Button from '../../components/Button';
import MainContainer from '../../components/MainContainer';
import CastCard from '../../components/CastCard';
import VideoModal from '../../components/VideoModal';
import { API_KEY, BASE_URL, PICTURE_URL } from '../../constants/constants';
import { getMovieCredits } from '../../gql/queries.js';
import svg from '../../assets/images/pulse.svg';

export default function Movie() {
  const [videos, setVideos] = useState();
  const [similar, setSimilar] = useState();
  const [details, setDetails] = useState({ error: false });
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(getMovieCredits(`/movie/${params.movieId}/credits?api_key=`), {
    fetchPolicy: 'network-only'
  });
  const producer = data?.credits?.crew?.filter(
    (x) =>
      x.job?.toLocaleLowerCase() === 'producer' ||
      x.job?.toLocaleLowerCase() === 'executive producer'
  );
  useEffect(() => {
    fetch(`${BASE_URL}/movie/${params.movieId}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (Object.hasOwn(data, 'success')) {
          setDetails({ error: true, ...data });
        } else {
          setDetails({ error: false, ...data });
        }
      });
    fetch(`${BASE_URL}/movie/${params.movieId}/videos?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
    fetch(`${BASE_URL}/movie/${params.movieId}/similar?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setSimilar(data));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params.movieId]);

  const el = document.getElementById('mModal');
  const handleClick = (e) => {
    if (el !== e.currentTarget) {
      setShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [show]);

  if (details.error) {
    setTimeout(() => {
      if (details.error) {
        navigate('/');
      }
    }, 2500);
    return (
      <div className="h-[90vh] text-3xl text-danger flex items-center justify-center">
        Oops, something went wrong please check out later...
      </div>
    );
  }
  return (
    <div className="text-gray relative">
      {/* video */}
      {videos?.results?.length > 0 && (
        <VideoModal videos={videos?.results[0]} click={() => handleClick} id="mModal" show={show} />
      )}
      <div
        style={{
          backgroundImage: `url(${PICTURE_URL}${details?.backdrop_path})` || { svg },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImageRepeat: 'no-repeat'
        }}
        className="lg:h-[calc(100vh-10vh)]   w-full flex flex-col lg:justify-center md:justify-end justify-end"
        loading="eager">
        <div className="lg:px-12 md:px-8 sm:px-4 px-4 py-10 flex flex-col lg:items-center md:items-center items-center sm:items-center gap-10 lg:flex-row sm:flex-col md:flex-row lg:justify-start">
          <div className="flex flex-col justify-between place-self-center self-center h-full  p-5 lg:w-[500px]  w-96  bg-opacity-80 lg:ml-5 bg-dark rounded-lg">
            <h1 className="text-xl lg:text-4xl md:text-2xl ">
              {details?.original_title} ({details?.release_date?.slice(0, 4)})
            </h1>
            <div className="flex flex-wrap gap-4 w-full my-5 flex-col lg:flex-row">
              <span className="flex items-center gap-4 text-gray  text-sm">
                <span className="flex items-center  text-primsary ">
                  <i className="ri-user-fill text-warning"></i>
                  {details?.adult ? '18+' : '12+'}
                </span>
                {details?.runtime && (
                  <span className="flex items-center gap-1">
                    <i className="ri-time-line text-warning"></i>
                    {Math.floor(details?.runtime / 60)}hr {details?.runtime % 60}min
                  </span>
                )}
              </span>

              <span className="flex items-center gap-1 text-gray  text-sm ">
                <i className="ri-user-smile-line text-warning"></i>
                {details?.genres?.map((g) => (
                  <span key={g.id} className="border rounded-sm px-2 text-xs border-secondary">
                    {g.name}
                  </span>
                ))}
              </span>
              <span className="flex items-center gap-1 text-gray  text-sm">
                <i className="ri-earth-line text-warning "></i>
                {details?.production_countries?.map((c) => c.name).join(', ')}
              </span>
            </div>
            <p className="w-full">{details?.overview}</p>
            {/* buttons */}
            <div className="flex  mt-1 gap-1 w-full place-self-center ">
              <Button
                text="Trailer"
                icon="play-fill"
                css="lg:w-36 md:w-24 w-24 flex justify-center py-1 md:text-md  text-sm"
                click={() => setShow(true)}
              />
              <Button
                text="My List"
                icon="add-line"
                css="lg:w-36 md:w-24 w-24 flex justify-center py-1 md:text-md  text-sm"
              />
              <Button
                text="Share"
                icon="share-fill"
                css="lg:w-36 md:w-24 w-24 flex justify-center py-1 md:text-md  text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      {/* casts and crews */}
      <div className="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 grid-cols-1  mt-5 lg:px-12 md:px-8 sm:px-4 px-4">
        <CastCard data={producer?.slice(0, 1)} title="producer" css="mb-5 col-span-1" />
        <CastCard
          data={data?.credits?.cast}
          title="casts"
          css="col-span-5 mb-5 lg:mr-12 md:mr-8 sm:mr-4 w-full"
        />
      </div>
      {/* related movies */}
      <MainContainer title="related" data={similar?.results} />
    </div>
  );
}
