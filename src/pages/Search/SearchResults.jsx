import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { BASE_URL, API_KEY } from '../../constants/constants.js';
import { MOVIE_ROUTE, TV_ROUTE, PERSON_ROUTE } from '../../routes';
import MovieCard from '../../components/MovieCard';

export default function SearchResults() {
  const [result, setResult] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${params.query}`)
      .then((res) => res.json())
      .then((data) => setResult(data));
  }, [params.query]);

  return (
    <div className="lg:px-12 md:px-8 px-4 text-light">
      <h1 className="my-10 text-2xl">
        Search results for <span className="text-success">{params.query}</span>
      </h1>
      <div className="grid grid-cols-4 gap-3 ">
        {/* left side */}
        <div className="col-span-1 border rounded-sm p-5">leftside</div>
        {/* right side */}
        <div className="col-span-3  rounded-sm p-5 flex flex-col pb-0">
          <div className="flex flex-wrap gap-3">
            {result?.results?.map((res) => {
              return (
                <MovieCard
                  key={res.id}
                  image={res.poster_path || res.backdrop_path || res.profile_path}
                  name={res.name || res.title}
                  date={res.release_date || res.first_air_date}
                  rate={res.vote_average}
                  media={res.media_type}
                  country={res.country || res.original_language || res.known_for_department}
                  click={() =>
                    navigate(
                      `${
                        res.media_type === 'tv'
                          ? TV_ROUTE
                          : res.media_type === 'movie'
                          ? MOVIE_ROUTE
                          : PERSON_ROUTE
                      }/${res.id}`
                    )
                  }
                />
              );
            })}
          </div>
          {/* TODO: pagination functionality and effects */}
          <div className="mt-5 border p-5 flex gap-3 justify-center items-center">
            <i className=" ri-arrow-left-s-line p-1 bg-primary h-7 w-7 flex items-center justify-center rounded-sm"></i>
            <span className="p-1 bg-secondary border-b-2 hover:border-primary border-dark h-7 w-7 flex items-center justify-center rounded-sm hover:cursor-pointer ">
              1
            </span>
            <span className="p-1 border-b-2 hover:border-primary border-dark  h-7 w-7 flex items-center justify-center rounded-sm hover:cursor-pointer ">
              2
            </span>
            <span className="p-1 border-b-2 hover:border-primary border-dark  h-7 w-7 flex items-center justify-center rounded-sm hover:cursor-pointer ">
              3
            </span>
            <i className="ri-arrow-right-s-line p-1 bg-primary h-7 w-7 flex items-center justify-center rounded-sm hover:cursor-pointer "></i>
          </div>
        </div>
      </div>
    </div>
  );
}
