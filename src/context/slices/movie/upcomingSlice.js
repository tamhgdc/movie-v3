import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../../constants/constants';

// fetching thunk function
export const fetchUpcomings = createAsyncThunk('movies/fetchupcomings', async () => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  return response.data;
});

// the slice
export const upcomingSlice = createSlice({
  name: 'upcoming',
  initialState: {
    status: '',
    list: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpcomings.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUpcomings.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchUpcomings.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    });
  }
});

export default upcomingSlice.reducer;
