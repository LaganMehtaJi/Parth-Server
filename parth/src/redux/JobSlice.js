// src/redux/JobSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getJobs } from '../Utils/JobApi';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async ({ page, limit }) => {
  const data = await getJobs(page, limit);
  return data;
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    list: [],
    page: 1,
    limit: 5,
    totalPages: 1,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetJobs(state) {
      state.list = [];
      state.page = 1;
      state.totalPages = 1;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = [...state.list, ...action.payload.jobs];
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetJobs } = jobSlice.actions;
export default jobSlice.reducer;
