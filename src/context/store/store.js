import { configureStore } from '@reduxjs/toolkit';

import trendeingReducer from '../slices/movie/trendingSlice';
import popularReducer from '../slices/movie/popularSlice';
import upcomingReducer from '../slices/movie/upcomingSlice';
import topRatedReducer from '../slices/movie/topRatedSlice';
import nowReducer from '../slices/movie/nowPlayingSlice';
import tvPopularReducer from '../slices/tv/popularSlice';
import tvTopRatedReducer from '../slices/tv/topRatedSlice';
import tvOnAirReducer from '../slices/tv/onAirSlice';
import tvAiringTodayReducer from '../slices/tv/airingTodaySlice';

export default configureStore({
  reducer: {
    trending: trendeingReducer,
    popular: popularReducer,
    upcoming: upcomingReducer,
    topRated: topRatedReducer,
    now: nowReducer,
    // tvs
    tvPopular: tvPopularReducer,
    tvTopRated: tvTopRatedReducer,
    onAir: tvOnAirReducer,
    airingToday: tvAiringTodayReducer
  }
});
