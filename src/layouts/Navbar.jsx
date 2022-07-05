import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import logo from '../assets/images/logo.svg';
import { HOME_ROUTE, TV_ROUTE } from '../routes';
import { getMovieGenres } from '../gql/queries.js';
import Menu from '../components/Menu';
import NAVLink from '../components/NavLink';

function Navbar() {
  const [active, setactive] = useState('/');
  const navigate = useNavigate();
  const {
    // loading: trendingLoading,
    // error: trendingError,
    data: genreData
  } = useQuery(getMovieGenres('/genre/movie/list?api_key='));
  return (
    <div className="lg:h-[10vh] md:h-[10vh] h-[8vh]  bg-dark py-0 sticky top-0 z-20">
      <div className="lg:px-12 md:px-8 px-3 py-3 flex items-center justify-between ">
        <div className="flex gap-5 items-center ">
          <Link to={HOME_ROUTE}>
            <img
              src={logo}
              alt="logo"
              className="h-10 rounded hidden lg:block md:block sm:block "
              onClick={() => setactive('/')}
            />
          </Link>
          <ul className="text-gray text-sm font-semibold flex lg:flex-row md:flex-row sm:flex-row flex-row  gap-3 items-center lg:flex md:flex sm:flex ">
            <li className=" px-2 " onClick={() => setactive(HOME_ROUTE)}>
              <NAVLink to={HOME_ROUTE} text="Movies" active={active} />
            </li>
            <li className="border-l px-2" onClick={() => setactive(TV_ROUTE)}>
              <NAVLink to={TV_ROUTE} text="tv shows" active={active} />
            </li>
            <li className="border-l px-3 relative ">
              <Menu data={genreData?.genres?.genres} />
            </li>
          </ul>
        </div>
        <div className=" p-1 lg:flex md:flex sm:hidden hidden items-center">
          {/* search button */}
          <div className="bg-dark focus:border focus:border-gray border-gray border  px-2 py-1 font-semibold  rounded-full flex items-center hidden lg:flex md:hidden sm:hidden">
            <input
              type="text"
              className="bg-dark outline-none px-2 text-gray"
              placeholder="Search"
            />
            <i className="ri-search-line ri-lg text-gray"></i>
          </div>
          <button
            className="min-w-52 text-light border-primary hover:border-gray hover:bg-opacity-80  bg-primary ml-2 px-4 py-1 border font-semibold rounded"
            onClick={() => navigate('/signin')}>
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
