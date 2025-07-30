import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './SkillSlice';

export const Store = configureStore({
  reducer: {
    skills: skillsReducer,
  },
});