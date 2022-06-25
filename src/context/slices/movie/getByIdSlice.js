import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../../constants/constants';

// fetching thunk function
export const getMovieById = createAsyncThunk('movies/fetchTrendings', async () => {
  const response = await axios.get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
  return response.data;
});

// the slice
export const trendingSlice = createSlice({
  name: 'singleMovie',
  initialState: {
    status: '',
    list: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getMovieById.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'success';
    });
    builder.addCase(getMovieById.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    });
  }
});

export default trendingSlice.reducer;
