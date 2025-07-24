import './App.css'
import { Routes, Route } from "react-router-dom";
import Hero from "./Hero/index.jsx";
import Home from "./Home/index.jsx";
import Dashboard from './dashboard/index.jsx';
import Admin from "./adminDashboard/admin.jsx";
import Email from './Home/Email.jsx';
import JobsCards from './Home/JobCards.jsx';
import Message from './Home/Message.jsx';
import Notifications from './Home/Notifications.jsx';
import Main from "./dashboard/main";
import { Header } from "./dashboard/ResumeBuilder/Header.jsx"; 

function App() {
  return (
    <Routes>
      <Route path='/' element={<Hero />} />
      <Route path='/home' element={<Home />} />
      <Route path='/email' element={<Email />} />
      <Route path='/jobs' element={<JobsCards />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/messaging' element={<Message />} />
      <Route path='/notifications' element={<Notifications />} />

    
      <Route path='/dashboard' element={<Dashboard />}>
        <Route index element={<Main />} />
        <Route path='Resumebuilder' element={<Header/>} />
      </Route>
    </Routes>
  );
}

export default App;
