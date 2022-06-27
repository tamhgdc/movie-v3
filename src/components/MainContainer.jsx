import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import MovieCard from './MovieCard';
import './style.css';

import { MOVIE_ROUTE, TV_ROUTE } from '../routes.js';

export default function MainContainer({ data, title, type }) {
  const navigate = useNavigate();
  return (
    <div className="lg:mx-12 md:mx-8 sm:mx-2 mx-2  my-6 ">
      {title && (
        <div className="mb-5 flex flex-col gap-2">
          <h1 className="text-4xl text-white uppercase">{title}</h1>
          <div className="border-b-4 border-b-red-light w-20"></div>
        </div>
      )}
      <div className="flex overflow-x-scroll  mb-14 cusScroll ">
        <LeftArrow />
        <div className="flex gap-3 ">
          {data?.map((item) => {
            return (
              <MovieCard
                key={item.id}
                name={item.name || item.original_title}
                date={item.first_air_date || item.release_date}
                image={item.poster_path}
                rate={item.vote_average}
                country={item.original_country || item.original_language}
                click={() => navigate(`${type === 'tv' ? TV_ROUTE : MOVIE_ROUTE}/${item.id}`)}
                media={item.media_type}
              />
            );
          })}
        </div>
        <RightArrow />
      </div>
    </div>
  );
}

MainContainer.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string
};
