import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../../constants/constants';

// fetching thunk function
export const fetchNowPlaying = createAsyncThunk('movies/fetchNowPlaying', async () => {
  const response = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  return response.data;
});

// the slice
export const nowPlayingSlice = createSlice({
  name: 'nowPlaying',
  status: '',
  initialState: {
    list: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNowPlaying.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchNowPlaying.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchNowPlaying.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    });
  }
});

export default nowPlayingSlice.reducer;
