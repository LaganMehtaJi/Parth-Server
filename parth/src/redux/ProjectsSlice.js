
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: JSON.parse(localStorage.getItem('projects')) || [],
  copiedId: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push({ ...action.payload, id: Date.now() });
      localStorage.setItem('projects', JSON.stringify(state.projects));
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
        localStorage.setItem('projects', JSON.stringify(state.projects));
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      localStorage.setItem('projects', JSON.stringify(state.projects));
    },
    toggleFeatured: (state, action) => {
      const project = state.projects.find(p => p.id === action.payload);
      if (project) {
        project.featured = !project.featured;
        localStorage.setItem('projects', JSON.stringify(state.projects));
      }
    },
    copyLink: (state, action) => {
      state.copiedId = action.payload;
      setTimeout(() => {
        state.copiedId = null;
      }, 2000);
    },
  },
});

export const { addProject, updateProject, deleteProject, toggleFeatured, copyLink } = projectsSlice.actions;
export default projectsSlice.reducer;
