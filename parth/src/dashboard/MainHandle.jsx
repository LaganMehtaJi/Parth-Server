
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
import Jobs from "./Job/Jobs";
import History from "./History/History";
import Portfilio from "./Portfilio/Portfilio";
import Animation from "./Portfilio/TemplateSelector";
import TemplateSelector from "./Portfilio/TemplateSelector";


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
        <Route path="job"element={<Jobs/>}/>
        <Route path="setting"element={<History/>}/>
        <Route path="portfilio"element={<Portfilio/>}/>
        <Route path="resume"element={<R/>}/></Routes>
        

      
      </Route>
    </Routes>
  );
};
export default MainHandler;
