import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './SkillSlice';
import certificateReducer from "./certificateSlice";
import experinceReducer from './ExperinceSlice';
import educationReducer from './EducationSlice'

export const Store = configureStore({
  reducer: {
    skills: skillsReducer,
    certificates:certificateReducer,
    experince:experinceReducer,
    education:educationReducer
  },
});