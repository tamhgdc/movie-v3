import { gql } from '@apollo/client';

import { API_KEY } from '../constants/constants';
import { CORE_MOVIE_FIELDS, CORE_TV_FIELDS } from './fragments.js';

// movies
export const getNowPlayingMovies = (id) => gql`
  ${CORE_MOVIE_FIELDS}
  query getMovies {
    now_playing
      @rest(
        type: "movie"
        path: "${id}${API_KEY}"
      ) {
      ...MovieFields
    }
  }
`;

export const getTopRatedMovies = (id) => gql`
  ${CORE_MOVIE_FIELDS}
  query getMovies {
    top_rated
      @rest(
        type: "movie"
        path: "${id}${API_KEY}"
      ) {
     ...MovieFields
    }
  }
`;
export const getUpcomingMovies = (id) => gql`
  ${CORE_MOVIE_FIELDS}
  query getMovies {
    upcoming
      @rest(
        type: "movie"
        path: "${id}${API_KEY}"
      ) {
         ...MovieFields
    }
  }
`;
export const getPopularMovies = (id) => gql`
  ${CORE_MOVIE_FIELDS}
  query getMovies {
    popular
      @rest(
        type: "movie"
        path: "${id}${API_KEY}"
      ) {
        ...MovieFields
    }
  }
`;

// trending
export const getTrending = (id) => gql`
  query getAllTrending {
    trending
      @rest(
        type: "trending",
        path: "${id}${API_KEY}"
      ) {
      results {
        id
        title
        backdrop_path
        adult
        overview
        release_date
        original_title
        name
        original_language
        vote_average
        first_air_date
        media_type
      }
    }
  }
`;

// tv
export const getOnAirTv = (id) => gql`
  ${CORE_TV_FIELDS}
  query getTv {
   onAir
      @rest(
        type: "tv"
        path: "${id}${API_KEY}"
      ) {
      ...TvFields
    }
  }
`;
export const getOnAirTodayTv = (id) => gql`
  ${CORE_TV_FIELDS}
  query getTv {
   onAirToday
      @rest(
        type: "tv"
        path: "${id}${API_KEY}"
      ) {
       ...TvFields
    }
  }
`;
export const getTopRatedTv = (id) => gql`
  ${CORE_TV_FIELDS}
  query getTv {
   top_rated
      @rest(
        type: "tv"
        path: "${id}${API_KEY}"
      ) {
       ...TvFields
    }
  }
`;
export const getPopularTv = (id) => gql`
  ${CORE_TV_FIELDS}
  query getTv {
   popular
      @rest(
        type: "tv"
        path: "${id}${API_KEY}"
      ) {
       ...TvFields
    }
  }
`;

// genres
export const getMovieGenres = (id) => gql`
  ${CORE_TV_FIELDS}
  query getGenre {
   genres
      @rest(
        type: "tvGenre"
        path: "${id}${API_KEY}"
      ) {
     genres{
     id 
     name
     }
    }
  }
`;
