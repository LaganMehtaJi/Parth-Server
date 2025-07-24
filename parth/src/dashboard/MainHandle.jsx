
import Layout from "./Layout"; 
import Main from "./main";
import { Header } from "./ResumeBuilder/Header";
import { Routes, Route } from "react-router-dom";

export const MainHandler = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Main />} /> 
        <Route path="resumebuilder" element={<Header/>} />
      
      </Route>
    </Routes>
  );
};
export default MainHandler;
