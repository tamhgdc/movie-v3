import { gql } from '@apollo/client';

export const CORE_MOVIE_FIELDS = gql`
  fragment MovieFields on movie {
    results {
      id
      title
      poster_path
      adult
      release_date
      original_title
      original_language
      vote_average
      media_type
    }
  }
`;
export const CORE_TV_FIELDS = gql`
  fragment TvFields on tv {
    results {
      id
      title
      poster_path
      adult
      first_air_date
      name
      original_language
      vote_average
      media_type
    }
  }
`;
