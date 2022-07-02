import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import logo from '../assets/images/logo.png';
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
  } = useQuery(getMovieGenres('/genre/movie/list?api_key='), { fetchPolicy: 'network-only' });
  return (
    <div className="h-14 bg-gray-dark2 py-0 sticky top-0 z-20">
      <div className="lg:px-12 md:px-8 px-3 py-2 flex items-center justify-between ">
        <div className="flex gap-5 items-center ">
          <Link to={HOME_ROUTE}>
            <img
              src={logo}
              alt="logo"
              className="h-10 rounded hidden lg:block md:block sm:block "
              onClick={() => setactive('/')}
            />
          </Link>
          <ul className="text-white text-sm font-bold flex lg:flex-row md:flex-row sm:flex-row flex-row  gap-3 items-center lg:flex md:flex sm:flex ">
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
          <div className="bg-black bg-opacity-70 border-2 px-2 py-1 font-semibold  rounded-full flex items-center hidden lg:flex md:hidden sm:hidden">
            <input
              type="text"
              className="bg-gray-dark2 outline-none px-2 text-white"
              placeholder="Search"
            />
            <i className="ri-search-line ri-lg text-white"></i>
          </div>
          <button
            className="min-w-52 text-white border-red-light hover:border-white hover:bg-opacity-80  bg-red-light ml-2 px-4 py-1 border font-bold"
            onClick={() => navigate('/signin')}>
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
