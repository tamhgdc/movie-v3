import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../../constants/constants';

// fetching thunk function
export const fetchOnAirToday = createAsyncThunk('tv/fetchOnAirToday', async () => {
  const response = await axios.get(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);
  return response.data;
});

// the slice
export const onAirTodaySlice = createSlice({
  name: 'tv/onAirToday',
  initialState: {
    list: null,
    error: null,
    status: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOnAirToday.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchOnAirToday.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchOnAirToday.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    });
  }
});

export default onAirTodaySlice.reducer;
