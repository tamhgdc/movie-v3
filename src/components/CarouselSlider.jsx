import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import { PICTURE_URL } from '../constants/constants';
import { MOVIE_ROUTE, TV_ROUTE } from '../routes';

export default function CarouselSlider({ data }) {
  const navigate = useNavigate();
  return (
    <Carousel
      showThumbs={false}
      autoPlay={true}
      showStatus={false}
      infiniteLoop={true}
      showIndicators={false}>
      {data?.map((i) => {
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
            className="xl:h-[80vh] lg:h-full md:h-80 sm:h-80  sm:px-10 lg:px-12 md:px-8 py-10 grid lg:grid-cols-3 md:grid-cols-2   justify-center items-end ">
            {/* details */}
            <div className="text-white order-1 lg:order-none  p-2 flex flex-col gap-1  ">
              <h1 className="text-xl lg:text-3xl md:text-2xl capitalize w-full  text-left">
                {i.name || i.original_name || i.title}
              </h1>
              <p className="flex gap-2 items-center self-start mt-5">
                <span className="text-yellow-400 fill-current">
                  {Array.from({ length: parseInt(i.vote_average / 2) }, (_, i) => i + 1).map(
                    (r) => {
                      return <i key={r} className="ri-star-s-fill text-yellow"></i>;
                    }
                  )}
                </span>
                <span className="px-1 py-0 text-md">
                  {i.first_air_date?.slice(0, 4) || i.release_date?.slice(0, 4)}
                </span>
                <span className="border px-1 py-0 text-xs ">{i.adult ? '18+' : '12+'}</span>
                <span className="border px-1 py-0 text-xs uppercase ">{i.original_language}</span>
                <span className="border px-1 py-0 text-xs uppercase ">{i.media_type}</span>
                {i.original_country?.map((o) => {
                  return (
                    <span key={o} className="border px-1 py-0 text-sm font-bold">
                      {o}
                    </span>
                  );
                })}
              </p>
              <p className="hidden md:block lg:block self-start text-left">
                {i.overview?.slice(0, 156)}...
              </p>
              <p className="flex gap-4 mt-6 min-w-96 ">
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
                  onClick={() => {}}
                />
              </p>
            </div>
            <div />
          </div>
        );
      })}
    </Carousel>
  );
}

CarouselSlider.propTypes = {
  data: PropTypes.array
};

CarouselSlider.defaultProps = {
  data: []
};
