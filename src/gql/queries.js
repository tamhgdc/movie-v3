import { gql } from '@apollo/client';

import { API_KEY } from '../constants/constants';

export const getNowPlayingMovies = (id) => gql`
  query getMovies {
    now_playing
      @rest(
        type: "NowPlayingMovie"
        path: "${id}${API_KEY}"
      ) {
      results {
        id
        title
        backdrop_path
        adult
        overview
        release_date
        # genre_ids
        original_title
        original_language
        # popularity
        vote_average
        # first_air_date
      }
    }
  }
`;

export const getTopRatedMovies = (id) => gql`
  query getMovies {
    top_rated
      @rest(
        type: "movie"
        path: "${id}${API_KEY}"
      ) {
      results {
        id
        title
        # backdrop_path
        poster_path
        adult
        # overview
        release_date
        # genre_ids
        original_title
        original_language
        # popularity
        vote_average
        # first_air_date
      }
    }
  }
`;
export const getUpcomingMovies = (id) => gql`
  query getMovies {
    upcoming
      @rest(
        type: "movie"
        path: "${id}${API_KEY}"
      ) {
      results {
        id
        title
        # backdrop_path
        poster_path
        adult
        # overview
        release_date
        # genre_ids
        original_title
        original_language
        # popularity
        vote_average
        # first_air_date
      }
    }
  }
`;
export const getPopularMovies = (id) => gql`
  query getMovies {
    popular
      @rest(
        type: "movie"
        path: "${id}${API_KEY}"
      ) {
      results {
        id
        title
        # backdrop_path
        poster_path
        adult
        # overview
        release_date
        # genre_ids
        original_title
        original_language
        # popularity
        vote_average
        # first_air_date
      }
    }
  }
`;
export const getTrendingMovies = (id) => gql`
  query getMovies {
    trending
      @rest(
        type: "movie"
        path: "${id}${API_KEY}"
      ) {
      results {
        id
        title
        # backdrop_path
        poster_path
        adult
        # overview
        release_date
        # genre_ids
        original_title
        name
        original_language
        # popularity
        vote_average
        first_air_date
        media_type
      }
    }
  }
`;
