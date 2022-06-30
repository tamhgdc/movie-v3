import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Menu({ data }) {
  const [genre, setGenre] = useState('genres');
  const [show, setShow] = useState(false);
  return (
    <div className="w-full">
      <button
        className=" text-white px-3  font-bold uppercase focus:text-red-light"
        data-dropdown-toggle="menu"
        onClick={() => setShow((prev) => !prev)}>
        {genre}
      </button>
      {/* menu items */}
      {show && (
        <div id="menu" className="absolute bg-gray-dark w-full mt-4 rounded p-1">
          <ul>
            {data?.map((item) => {
              return (
                <li
                  key={item.id}
                  className="hover:bg-red-light px-1 py-0.5 cursor-pointer my-1 text-xs"
                  onClick={() => {
                    setShow((prev) => !prev);
                    setGenre(item.name);
                  }}>
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

Menu.propTypes = {
  data: PropTypes.array
};

Menu.defaultProps = {
  data: []
};
