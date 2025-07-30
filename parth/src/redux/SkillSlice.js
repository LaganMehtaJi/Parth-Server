import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const response = await axios.get('http://localhost:5000/api/skills');
  return response.data;
});

export const addSkill = createAsyncThunk('skills/addSkill', async (skillData) => {
  const response = await axios.post('http://localhost:5000/student/skills', skillData);
  return response.data;
});

export const updateSkill = createAsyncThunk('skills/updateSkill', async ({ id, ...skillData }) => {
  const response = await axios.put(`http://localhost:5000/student/skills/${id}`, skillData);
  return response.data;
});

export const deleteSkill = createAsyncThunk('skills/deleteSkill', async (id) => {
  await axios.delete(`http://localhost:5000/student/skills/${id}`);
  return id;
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchSkills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
    
      .addCase(addSkill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
    
      .addCase(updateSkill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(skill => skill._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      .addCase(deleteSkill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(skill => skill._id !== action.payload);
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default skillsSlice.reducer;