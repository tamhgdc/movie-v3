import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Button from '../../../components/Button';
import MainContainer from '../../../components/MainContainer';
import CastCard from '../../../components/CastCard';
import VideoModal from '../../../components/VideoModal';

import { API_KEY, BASE_URL, PICTURE_URL } from '../../../constants/constants';
import { getTvCredits } from '../../../gql/queries.js';
import svg from '../../../assets/images/pulse.svg';

export default function SingleTv() {
  const [videos, setVideos] = useState();
  const [similar, setSimilar] = useState();
  const [details, setDetails] = useState();
  const [show, setShow] = useState(false);

  const params = useParams();
  // const tvModalRef = useRef(null);

  useEffect(() => {
    fetch(`${BASE_URL}/tv/${params.tvId}/videos?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
    fetch(`${BASE_URL}/tv/${params.tvId}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setDetails(data));
    fetch(`${BASE_URL}/tv/${params.tvId}/similar?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setSimilar(data.results));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params.tvId]);

  const { data } = useQuery(getTvCredits(`/tv/${params.tvId}/credits?api_key=`), {
    fetchPolicy: 'network-only'
  });

  const producer = data?.credits?.crew?.filter(
    (x) =>
      x.job?.toLocaleLowerCase() === 'producer' ||
      x.job?.toLocaleLowerCase() === 'executive producer'
  );

  const el = document.getElementById('modal');
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
  return (
    <div className="text-light">
      {/* video */}
      {videos?.results?.length > 0 && (
        <VideoModal videos={videos?.results[0]} click={() => handleClick} id="modal" show={show} />
      )}
      {/* End video */}
      <div
        style={{
          backgroundImage: `url(${PICTURE_URL}${details?.backdrop_path})` || { svg },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImageRepeat: 'no-repeat',
          load: 'eager'
        }}
        className="lg:h-[calc(100vh-10vh)]   w-full flex flex-col lg:justify-center md:justify-end justify-end"
        loading="eager">
        <div className="lg:px-12 md:px-8 sm:px-4 px-4 py-10 flex flex-col lg:items-center md:items-center items-center sm:items-center gap-10 lg:flex-row sm:flex-col md:flex-row lg:justify-start">
          <div className="flex flex-col justify-between place-self-center self-center h-full  p-5 lg:w-[500px]  w-96  bg-opacity-80 lg:ml-5 bg-dark rounded-lg">
            <h1 className="text-xl lg:text-4xl md:text-2xl ">
              {details?.original_title || details?.name} ({details?.first_air_date?.slice(0, 4)})
            </h1>
            <div className="flex flex-wrap justify-between w-full my-5 flex-col lg:flex-row">
              <span className="flex items-center gap-1 text-gray lg:text-lg text-sm">
                <span className="flex items-center gap-1 text-primsary  mr-5">
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
      <MainContainer title="related" data={similar} />
    </div>
  );
}
