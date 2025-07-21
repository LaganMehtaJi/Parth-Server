import './App.css'
import {Routes,Route} from "react-router-dom";
import Hero from "../src/Hero/index.jsx";
import Home from "../src/Home/index.jsx";
import Form from "../src/Form/index.jsx";
function App() {


  return (
    <>
   <Routes>
    <Route path='/' element={<Hero/>} />
    <Route path='/home' element={<Home/>} />
     <Route path='/form' element={<Form/>} />
   </Routes>
    </>
  )
}

export default App
