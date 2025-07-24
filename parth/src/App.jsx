import './App.css'
import {Routes,Route} from "react-router-dom";
import Hero from "../src/Hero/HowItStarts.jsx";
import Home from "../src/Home/index.jsx";
import Dashboard from './dashboard/index.jsx'
import Admin from "../src/adminDashboard/admin.jsx";
import Email from './Home/Email.jsx';
import JobsCards from './Home/JobCards.jsx';
import Message from './Home/Message.jsx';
import Notifications from './Home/Notifications.jsx';
function App() {


  return (
    <>
   <Routes>
    <Route path='/' element={<Hero/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/email'element={<Email/>}/>
    <Route path="/jobs"element={<JobsCards/>}/>
     <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/admin' element={<Admin/>} />
       <Route path='/messaging' element={<Message/>} />
       <Route path="/notifications"element={<Notifications/>}/>
   </Routes>
    </>
  )
}

export default App
