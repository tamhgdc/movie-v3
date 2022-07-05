import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Menu({ data }) {
  const [genre, setGenre] = useState('genres');
  const [show, setShow] = useState(false);
  const menuRef = useRef();
  const handleClick = () => {
    if (event.currentTarget !== menuRef.current) {
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
    <div className="min-w-72">
      <button
        className=" text-gray mx-3  font-bold uppercase focus:text-light"
        onClick={() => setShow((prev) => !prev)}>
        {genre}
      </button>
      {/* menu items */}
      {show && (
        <div id="menu" className="absolute bg-dark w-full lg:mt-4 mt-2 rounded p-1" ref={menuRef}>
          <ul>
            {data?.map((item) => {
              return (
                <li
                  key={item.id}
                  className="hover:bg-primary px-1 py-0.5 cursor-pointer my-1 text-xs text-gray"
                  onClick={() => setGenre(item.name)}>
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
