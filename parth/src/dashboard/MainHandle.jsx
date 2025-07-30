
import Layout from "./Layout"; 
import Main from "./main";
import Index from "./Projects/Index";
import Certificate from "./Certificates/Certificate";



import { Header } from "./ResumeBuilder/Header";
import { Routes, Route } from "react-router-dom";
import Voluntary from "./Voluntary/Voluntary";
import Skills from "./Skills/Skills";
import Education from "./Education/Education";
import Experience from "./Experince/Experince";


export const MainHandler = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Main />} /> 
        <Route path="resumebuilder" element={<Header/>} />
        <Route path="projects" element={<Index/>}/>
        <Route path="certificates" element={<Certificate/>}/>
        <Route path="voluntaring" element={<Voluntary/>}/>
        <Route path="skills"elements={<Skills/>}/>
        <Route path="education"element={<Education/>}/>
        <Route path="experience"element={<Experience/>}/>

      
      </Route>
    </Routes>
  );
};
export default MainHandler;
