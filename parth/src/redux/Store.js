import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from './SkillSlice';
import certificateReducer from "./CertificateSlice";
import experinceReducer from './ExperinceSlice';
import educationReducer from './EducationSlice';
import projectsReducer from './ProjectsSlice';
import jobReducer from './JobSlice';


export const Store = configureStore({
  reducer: {
    skills: skillsReducer,
    certificates:certificateReducer,
    experience:experinceReducer,
    education:educationReducer,
    projects:projectsReducer,
    jobs:jobReducer
  },
});