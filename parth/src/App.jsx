import './App.css'
import {Routes,Route} from "react-router-dom";
import Hero from "../src/Hero/index.jsx";
import Home from "../src/Home/index.jsx";
function App() {


  return (
    <>
   <Routes>
    <Route path='/' element={<Hero/>} />
    <Route path='/home' element={<Home/>} />
    
   </Routes>
    </>
  )
}

export default App
