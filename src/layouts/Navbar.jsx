import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { HOME_ROUTE, TV_ROUTE } from '../routes';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="h-12 bg-gray-dark2 py-0 sticky top-0 z-20">
      <div className="px-24 flex items-center justify-between">
        <div className="flex gap-5 items-center">
          <Link to={HOME_ROUTE}>
            <img src={logo} alt="logo" className="h-10 rounded " />
          </Link>
          {/* links list */}
          <ul className="text-white text-sm font-bold flex gap-3 items-center">
            <li className=" px-2 ">
              <Link
                to={HOME_ROUTE}
                className="hover:text-red-light ml-2 transition-all ease-in delay-50">
                HOME
              </Link>
            </li>
            <li className="border-l px-2">
              <Link
                to={HOME_ROUTE}
                className="hover:text-red-light ml-2 transition-all ease-in delay-50">
                GENRES
              </Link>
            </li>
            <li className="border-l px-2">
              <Link
                to={TV_ROUTE}
                className="hover:text-red-light ml-2 transition-all ease-in delay-50">
                SHOWS
              </Link>
            </li>
            <li className="border-l px-2">
              <Link
                to={HOME_ROUTE}
                className="hover:text-red-light ml-2 transition-all ease-in delay-50">
                PAGES
              </Link>
            </li>
          </ul>
        </div>
        <div className=" p-1 flex items-center">
          <div className="bg-black bg-opacity-70 border-2 px-2 py-1 font-semibold  rounded-full flex items-center">
            <input
              type="text"
              className="bg-gray-dark2 outline-none px-2 text-white"
              placeholder="Search"
            />
            <i className="ri-search-line ri-lg text-white"></i>
          </div>
          <button
            className=" text-white border-red-light hover:border-white hover:bg-opacity-80  bg-red-light ml-2 px-4 py-1 border font-bold"
            onClick={() => navigate('/signin')}>
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
