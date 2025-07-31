import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/student/experience";

export const fetchExperience = createAsyncThunk("experience/fetch", async () => {
  const res = await axios.get(API);
  return res.data;
});

export const addExperience = createAsyncThunk("experience/add", async (formData) => {
  const res = await axios.post(API, formData);
  return res.data;
});

export const updateExperience = createAsyncThunk("experience/update", async ({ id, formData }) => {
  const res = await axios.put(`${API}/${id}`, formData);
  return res.data;
});

export const deleteExperience = createAsyncThunk("experience/delete", async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});
const experienceSlice = createSlice({
  name: "experience",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        const idx = state.list.findIndex((item) => item._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload);
      });
  },
});

export default experienceSlice.reducer;
