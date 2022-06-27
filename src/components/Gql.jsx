import React from 'react';
import { useQuery } from '@apollo/client';

import { getNowPlayingMovies } from '../gql/queries.js';

export default function Gql() {
  const { loading, error, data } = useQuery(getNowPlayingMovies('/movie/now_playing?api_key='));
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return <div className="text-white">{data}</div>;
}
