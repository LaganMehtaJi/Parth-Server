// src/redux/educationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:5000/student/education";

export const fetchEducation = createAsyncThunk("education/fetchAll", async () => {
  const res = await axios.get(API_BASE);
  return res.data;
});

export const addEducation = createAsyncThunk("education/add", async (data) => {
  const res = await axios.post(API_BASE, data);
  return res.data;
});

export const updateEducation = createAsyncThunk("education/update", async ({ id, formData }) => {
  const res = await axios.put(`${API_BASE}/${id}`, formData);
  return res.data;
});

export const deleteEducation = createAsyncThunk("education/delete", async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
  return id;
});

// Slice
const educationSlice = createSlice({
  name: "education",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(addEducation.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateEducation.fulfilled, (state, action) => {
        const index = state.list.findIndex((edu) => edu._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })

      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.list = state.list.filter((edu) => edu._id !== action.payload);
      });
  },
});

export default educationSlice.reducer;
