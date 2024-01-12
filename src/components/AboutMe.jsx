import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Canvas,useFrame, } from "@react-three/fiber";
import { Clone , Preload, useGLTF,useTexture  } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
import { JellyfishCanvas } from "./Jellyfish";
import{fadeIn, zoomIn} from"../utils/motion"
useGLTF.preload("./jellyfish/jellyfish_icon.gltf");

const AboutMe = ({ isMobile })=> {
 const [isHover,setIsHover]=useState(false)

  return (
    <div className="flex flex-col items-start justify-center w-screen h-screen ">
 <div className="self-center flex flex-row items-start justify-between w-[96vw] h-[93vh] z-[10] 
 rounded-[43px] bg-gradient-to-l from-blue-500 to-70%">
    {/* Left section with 1:2 ratio */}
    <div className="flex-1 flex flex-col items-start justify-center w-[32vw] h-full">
        <div className="self-center w-[30vw] h-[40vh]">
      <JellyfishCanvas meshOnclick={(e)=>{console.log(e)}} isRotatetion={isHover} cameraSetting={{zoom: 50}}/>
      </div>
      <motion.p variants={fadeIn("", "", 1, 5)}
          className='self-center text-[48px] md:text-[64px] leading-[92px] pl-0 sm:pl-[45px] '>About Me</motion.p>
          </div>

    {/* Right section with 2:2 ratio */}
    <div className="flex-2 flex flex-col items- justify-center w-[64vw] h-full">
    <button className="ml-0 text-[#DDCFCF] hover:text-white text-[18px] font-medium cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}> 
    <motion.p variants={fadeIn("", "", 1, 5)}
          className=' text-[64px]'>Projects</motion.p>
  </button>
  <button className="ml-16 text-[#DDCFCF] hover:text-white text-[18px] font-medium cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}> 
    <motion.p variants={fadeIn("", "", 1, 5)}
          className=' text-[64px]'>Education</motion.p>
  </button>
  <button className="ml-32 text-[#DDCFCF] hover:text-white text-[18px] font-medium cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}> 
    <motion.p variants={fadeIn("", "", 1, 5)}
          className=' text-[64px]'>Art</motion.p>
  </button>
  <button className="ml-48 text-[#DDCFCF] hover:text-white text-[18px] font-medium cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}> 
    <motion.p variants={fadeIn("", "", 1, 5)}
          className=' text-[64px]'>Contact</motion.p>
  </button>
    </div>
  </div>
    </div>
    
  );
}

export default AboutMe;
