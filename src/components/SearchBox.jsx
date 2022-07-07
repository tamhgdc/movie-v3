import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SEARCH_ROUTE } from '../routes';

export default function SearchBox() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = () => {
    event.preventDefault();
    navigate(`${SEARCH_ROUTE}/${term}`);
    // setTerm('');
  };
  return (
    <form
      onSubmit={() => handleSubmit()}
      className="border border-primary lg:flex md:flex sm:hidden hidden items-center gap-1 rounded-sm ">
      <input
        type="text"
        className="bg-primary outline-none px-2 py-0.5 focus:border-secondary border-primary border"
        placeholder="Search"
        value={term}
        onChange={() => setTerm(event.target.value)}
        required
      />
      <i
        className={`text-lg ${
          term === '' ? 'ri-search-line' : 'ri-close-fill'
        } mr-1 w-6 h-6 flex items-center justify-center cursor-pointer`}
        onClick={() => setTerm('')}></i>
    </form>
  );
}
