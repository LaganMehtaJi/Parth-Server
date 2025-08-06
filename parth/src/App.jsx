import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "../src/Login/Login.jsx";
import Hero from "./Hero/index.jsx";
import Home from "./Home/index.jsx";
import Dashboard from './dashboard/index.jsx';
import Admin from "./adminDashboard/admin.jsx";
import Email from './Home/Email.jsx';
import JobsCards from './Home/JobCards.jsx';
import Message from './Home/Message.jsx';
import Notifications from './Home/Notifications.jsx';
import Main from "./dashboard/main";
import Header  from "./dashboard/ResumeBuilder/Header.jsx"; 
import Index from './dashboard/Projects/Index.jsx';
import Certificate from './dashboard/Certificates/Certificate.jsx';
import Voluntary from './dashboard/Voluntary/Voluntary.jsx';
import Skills from './dashboard/Skills/Skills.jsx';
import Education from './dashboard/Education/Education.jsx';
import Experience from './dashboard/Experince/Experince.jsx';
import Jobs from './dashboard/Job/Jobs.jsx';
import OTP from './Login/Otp.jsx';
import History from './dashboard/History/History.jsx';
import Portfilio from './dashboard/Portfilio/Portfilio.jsx';
import ColorSelector from './dashboard/Portfilio/ColorSelection.jsx';

function App() {
  return (
    <Routes>
      <Route path='/:type' element={<Login/>} />
      <Route path='/' element={<Hero />} />
      <Route path='/home' element={<Home />} />
      <Route path='/email' element={<Email />} />
      <Route path='/jobs' element={<JobsCards />} />
      <Route path='/admindash' element={<Admin />} />
      <Route path='/messaging' element={<Message />} />
      <Route path='/notifications' element={<Notifications />} />
      <Route path="/otp"element={<OTP/>}/>
      <Route path="/color"element={<ColorSelector/>}/>

    
      <Route path='/dashboard' element={<Dashboard />}>
        <Route index element={<Main />} />
        <Route path='Resumebuilder' element={<Header/>} />
        <Route path='projects'element={<Index/>}/>
        <Route path='certificates'element={<Certificate/>}/>
        <Route path='voluntaring'element={<Voluntary/>}/>
        <Route path='skill'element={<Skills/>}/>
        <Route path="education"element={<Education/>}/>
        <Route path="experience"element={<Experience/>}/>
        <Route path="job"element={<Jobs/>}/>
         <Route path="setting"element={<History/>}/>
         <Route path="portfolio"element={<Portfilio/>}/>

      </Route>
    </Routes>
  );
}

export default App;
