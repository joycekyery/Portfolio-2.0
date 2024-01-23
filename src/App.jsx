import { BrowserRouter ,Routes,Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import { useEffect, useState } from "react";
import {FluidBackgroundCanvas} from './components/FluidBackground.jsx'
import AboutMe from "./components/AboutMe.jsx";
import ProjectDisplay from "./components/ProjectDisplay.jsx";
import Info from "./components/Info.jsx";
import Art from "./components/Art.jsx";
import "../src/css/index.scss";
import Loading from "./components/Loading.jsx";
import FloatingNavbar from "./components/FloatingNav.jsx";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFluidLoaded, setIsFluidLoaded] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <BrowserRouter>
    
    {isFluidLoaded &&
    <div className="flex flex-col items-center justify-center w-screen h-screen" >
    <div className="box-border border border-white rounded-[43px] w-[96vw] h-[93vh] z-[100]">
    <FloatingNavbar/>
    <Routes>
        {/* <Route path="/" exact  element={<Home/>}/> */}
        {/* <Route path="/" exact  element={<AboutMe/>}/> */}
        {/* <Route path="/" exact  element={<ProjectDisplay/>}/> */}
        <Route path="/" exact  element={<Info/>}/>
        {/* <Route path="/" exact  element={<Art/>}/> */}
        {/* <Route path="/" exact  element={<Loading/>}/> */}
    </Routes>
    </div>
    </div>
    }
    
    <div className="flex items-center justify-center w-screen h-screen  fixed top-0 left-0 z-[-9999]"  >
    <FluidBackgroundCanvas onLoaded={()=>{ setIsFluidLoaded(true); }}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
