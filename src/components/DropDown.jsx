import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

import { SEARCH_ROUTE } from '../routes.js';

export default function DropDown({ data, click }) {
  const [genre, setGenre] = useState('genres');
  const [show, setShow] = useState(false);
  const navigate=useNavigate();
  const mref = useRef(null);

  const handleClick = () => {
    if (mref.current && !mref.current.contains(event.target)) {
      setShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [show]);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-[9rem] rounded-sm border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-gray-100 focus:ring-indigo-500 capitalize"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setShow((prev) => !prev)}>
          {genre}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillrull="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {/* menu items */}
      {show && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-full rounded-sm shadow-lg bg-dark  focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          ref={mref}
          id="menu">
          <div className="py-1" role="none">
            {data?.map((g, i) => (
              <button
                key={g.id}
                onClick={() => {
                  setGenre(g.name);
                  setShow(false);
                  // TODO?? you can close menu on selection by click();
                  click();
                  navigate(`${SEARCH_ROUTE}/${g.name}`);
                }}
                className="text-gray-700 block px-3 py-1 text-sm hover:bg-secondary w-full text-left"
                role="menuitem"
                tabIndex="-1"
                id={`menu-item-${i}`}>
                {g.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

DropDown.propTypes = {
  data: PropTypes.array,
  click: PropTypes.func
};

DropDown.defaultProps = {
  data: []
};
