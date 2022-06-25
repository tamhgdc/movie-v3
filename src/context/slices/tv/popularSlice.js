import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../../constants/constants';

// fetching thunk function
export const fetchPopulars = createAsyncThunk('tv/fetchPopulars', async () => {
  const response = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  return response.data;
});

// the slice
export const popularSlice = createSlice({
  name: 'tv/popular',
  initialState: {
    list: null,
    error: null,
    status: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPopulars.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPopulars.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPopulars.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    });
  }
});

export default popularSlice.reducer;
