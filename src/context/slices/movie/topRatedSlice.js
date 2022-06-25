import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../../constants/constants';

// fetching thunk function
export const fetchTopRated = createAsyncThunk('movies/fetchTopRateds', async () => {
  const response = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  return response.data;
});

// the slice
export const topRatedSlice = createSlice({
  name: 'topRated',
  initialState: {
    status: '',
    list: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopRated.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTopRated.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchTopRated.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    });
  }
});

export default topRatedSlice.reducer;
