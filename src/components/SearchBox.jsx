import React, { useState } from 'react';

export default function SearchBox() {
  const [term, setTerm] = useState('');
  return (
    <div className="border border-primary lg:flex md:hidden sm:hidden hidden items-center gap-1 rounded-sm ">
      <input
        type="text"
        className="bg-primary outline-none px-2 py-0.5 focus:border-secondary border-primary border"
        placeholder="Search"
        value={term}
        onChange={() => setTerm(event.target.value)}
      />
      <i
        className={`text-lg ${
          term === '' ? 'ri-search-line' : 'ri-close-fill'
        } mr-1 w-6 h-6 flex items-center justify-center cursor-pointer`}
        onClick={() => setTerm('')}></i>
    </div>
  );
}
