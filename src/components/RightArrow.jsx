import React from 'react';

export default function RightArrow() {
  return (
    <span className="flex absolute right-24 pr-2 pl-2 h-96  text-3xl bg-gradient-to-l from-gray-dark to-transparent text-white items-center hover:cursor-pointer hover:from-red-light ">
      {'>'}
    </span>
  );
}
