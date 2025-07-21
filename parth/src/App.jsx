import './App.css'
import {Routes,Route} from "react-router-dom";
import Hero from "../src/Hero/index.jsx";
function App() {


  return (
    <>
   <Routes>
    <Route path='/' element={<Hero/>} />
   </Routes>
    </>
  )
}

export default App
