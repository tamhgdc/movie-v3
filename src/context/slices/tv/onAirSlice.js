import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../../constants/constants';

// fetching thunk function
export const fetchOnAir = createAsyncThunk('tv/fetchOnAir', async () => {
  const response = await axios.get(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);
  return response.data;
});

// the slice
export const onAirSlice = createSlice({
  name: 'tv/onAir',
  initialState: {
    list: null,
    error: null,
    status: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOnAir.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchOnAir.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchOnAir.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    });
  }
});

export default onAirSlice.reducer;
