import React from 'react';
import PropTypes from 'prop-types';


export default function LeftArrow({click}) {
 
  return (
    <span className="flex absolute  lg:left-12 md:left-8 sm:left-2 left-2 h-96   text-3xl bg-gradient-to-r from-gray-dark to-transparent text-white items-center  hover:cursor-pointer hover:from-red-light pr-2 pl-2 z-[10]" onClick={()=> click()}>
      {'<'}
    </span>
  );
}

LeftArrow.propTypes={
click:PropTypes.func
}