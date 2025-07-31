// redux/certificateSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/student';

// Async Thunks
export const fetchCertificates = createAsyncThunk(
  'certificates/fetch',
  async () => {
    const response = await axios.get(`${API_BASE}/certificates`);
    return response.data;
  }
);

export const addCertificate = createAsyncThunk(
  'certificates/add',
  async (formData) => {
    const response = await axios.post(`${API_BASE}/certificates`, formData);
    return response.data;
  }
);

export const updateCertificate = createAsyncThunk(
  'certificates/update',
  async ({ id, formData }) => {
    await axios.put(`${API_BASE}/certificates/${id}`, formData);
    return { id, ...formData };
  }
);

export const deleteCertificate = createAsyncThunk(
  'certificates/delete',
  async (id) => {
    await axios.delete(`${API_BASE}/certificates/${id}`);
    return id;
  }
);

const certificateSlice = createSlice({
  name: 'certificates',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCertificate.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  },
});

export default certificateSlice.reducer;
