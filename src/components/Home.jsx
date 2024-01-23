import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas,useFrame, } from "@react-three/fiber";
import { Clone , Preload, useGLTF,useTexture  } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
import { JellyfishCanvas } from "./Jellyfish";
import{fadeIn} from"../utils/motion"
import Loading from "./Loading";
import { TypingText } from "./TypingText";
useGLTF.preload("./jellyfish/jellyfish_icon.gltf");

const Home = ({ isMobile })=> {
 const [isHover,setIsHover]=useState(false)
 const [isJellyfishLoaded, setIsJellyfishLoaded] = useState(false);

  return (
    <AnimatePresence>
    <div className="flex items-center justify-center w-full h-full ">
    {!isJellyfishLoaded ?
     <Loading />
    :
          <div className=" flex flex-col items-start justify-between w-full h-full" >
          <TypingText 
          className=' text-[64px] md:text-[128px] leading-[92px] pl-[50px]'
          text={"YUNG-CHING LIN"}
          />
        <button className=" self-end pr-[58px] text-secondary hover:text-white text-[18px] font-medium cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}> 
    <TypingText
          className=' text-[48px] md:text-[64px]'
          text={"About me"}
          animation={{hidden: {
            opacity: 0,
            y: 20,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.1,
              delay:"YUNG-CHING LIN".length*0.05
            },
          },}}
          />
    </button>
    </div>
    }
    </div>
    <div  className="flex items-center justify-center w-screen h-screen z-[-100] fixed top-0 left-0 " >
          <JellyfishCanvas meshOnclick={(e)=>{console.log(e)}} 
          isRotatetion={isHover} 
          onLoaded={()=>{setIsJellyfishLoaded(true);}}/>
    </div>
  </AnimatePresence>
    
  );
}

export default Home;
