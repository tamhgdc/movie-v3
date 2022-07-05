import React from 'react';
import PropTypes from 'prop-types';

export default function RightArrow({ click }) {
  return (
    <span
      className="lg:flex md:flex sm:hidden hidden absolute lg:right-12 md:right-8 sm:right-2 right-2 pr-2 pl-2 h-96  text-3xl bg-gradient-to-l from-gray-dark to-transparent text-light items-center hover:cursor-pointer hover:from-primary from-danger"
      onClick={() => click()}>
      {'>'}
    </span>
  );
}

RightArrow.propTypes = {
  click: PropTypes.func
};
