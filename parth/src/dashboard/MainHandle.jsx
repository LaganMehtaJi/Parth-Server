
import Layout from "./Layout"; 
import Main from "./main";
import Index from "./Projects/Index";
import Certificate from "./Certificates/Certificate";


import { Header } from "./ResumeBuilder/Header";
import { Routes, Route } from "react-router-dom";


export const MainHandler = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Main />} /> 
        <Route path="resumebuilder" element={<Header/>} />
        <Route path="projects" element={<Index/>}/>
        <Route path="certificates" element={<Certificate/>}/>

      
      </Route>
    </Routes>
  );
};
export default MainHandler;
