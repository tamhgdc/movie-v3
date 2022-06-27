import React from 'react';

export default function RightArrow() {
  return (
    <span className="flex absolute lg:right-12 md:right-8 sm:right-2 right-2 pr-2 pl-2 h-96  text-3xl bg-gradient-to-l from-gray-dark to-transparent text-white items-center hover:cursor-pointer hover:from-red-light ">
      {'>'}
    </span>
  );
}
