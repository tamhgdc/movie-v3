import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../../constants/constants';

// fetching thunk function
export const fetchTrendings = createAsyncThunk('movies/fetchTrendings', async () => {
  const response = await axios.get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
  return response.data;
});

// the slice
export const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    status: '',
    list: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrendings.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTrendings.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchTrendings.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    });
  }
});

export default trendingSlice.reducer;
