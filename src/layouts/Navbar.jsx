import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { HOME_ROUTE, TV_ROUTE } from '../routes';
import Button from '../components/Button';
import DropDown from '../components/DropDown';
import SearchBox from '../components/SearchBox';
import logo from '../assets/images/logo.svg';
import { getMovieGenres } from '../gql/queries.js';

export default function Navbar() {
  const [menu, setmenu] = useState(false);
  const humburgerRef = useRef();
  const activeClass =
    'bg-primary px-3 py-1 rounded-sm h-full w-full hover:bg-secondary hover:text-light';
  const deactiveClass =
    'px-3 py-1 h-full w-full hover:px-3 hover:py-1 hover:bg-secondary rounded-sm hover:text-light ';

  const {
    // loading: trendingLoading,
    // error: trendingError,
    data: genreData
  } = useQuery(getMovieGenres('/genre/movie/list?api_key='));
  const closeMenu = () => setmenu(false);
  const handleClick = () => {
    if (humburgerRef.current && !humburgerRef.current.contains(event.target)) {
      closeMenu();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [menu]);
  return (
    <nav className="h-[50px] bg-dark  border-b border-danger text-light lg:px-12 md:px-8  flex sticky top-0 z-20 relative ">
      {/* logo */}
      <NavLink to={HOME_ROUTE} className="text-3xl w-12 flex items-center justify-center">
        <img src={logo} alt="logo" />
      </NavLink>
      {/* navigation */}
      <ul
        className={` ${
          menu ? 'absolute top-[50px] left-0 z-20 h-32 w-full m-0 flex flex-col ' : 'hidden'
        }  gap-2 items-end lg:items-center pr-2 justify-center  capitalize bg-dark lg:flex md:flex md:items-center gap-2 `}
        ref={humburgerRef}>
        <li className="   border border-dark rounded-sm " onClick={() => closeMenu()}>
          <NavLink
            to={HOME_ROUTE}
            className={({ isActive }) =>
              isActive ? `${activeClass} "bg-primary"` : `${deactiveClass}`
            }>
            Home
          </NavLink>
        </li>
        <li className=" border border-dark rounded-sm " onClick={() => closeMenu()}>
          <NavLink
            to={TV_ROUTE}
            className={({ isActive }) =>
              isActive ? `${activeClass} "bg-primary"` : `${deactiveClass}`
            }>
            tv shows
          </NavLink>
        </li>
        <li className="min-w-[7rem] rounded-sm relative">
          <DropDown data={genreData?.genres?.genres} click={closeMenu} />
        </li>
      </ul>

      <div className="absolute lg:right-12 md:right-8 right-3 flex items-center  gap-2 h-full">
        <i
          className="ri ri-menu-2-line text-3xl cursor-pointer lg:hidden md:hidden block"
          onClick={() => setmenu((prev) => !prev)}></i>
        <SearchBox />
        {/* login/signup */}
        <NavLink to="/signin" className="lg:block md:block sm:hidden hidden">
          <Button
            text="Sign in"
            css="px-3 hover:bg-secondary hover:text-dark hover:border-secondary mt-0 "
          />
        </NavLink>
      </div>
    </nav>
  );
}
