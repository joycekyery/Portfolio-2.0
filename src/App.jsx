import { BrowserRouter ,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import FluidBackground from "./components/FluidBackground";


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/" exact  element={<Home/>}/>
        <Route path="/test" exact  element={<Home/>} /> 
    </Routes>
    </BrowserRouter>
  );
}

export default App;
