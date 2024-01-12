import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Canvas,useFrame, } from "@react-three/fiber";
import { Clone , Preload, useGLTF,useTexture  } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
import { JellyfishCanvas } from "./Jellyfish";
import{fadeIn} from"../utils/motion"
useGLTF.preload("./jellyfish/jellyfish_icon.gltf");

const Home = ({ isMobile })=> {
 const [isHover,setIsHover]=useState(false)

  return (
    <div >
    <div className="flex items-center justify-center w-screen h-screen ">
          <div className=" flex flex-col items-start justify-between w-[96vw] h-[93vh] z-[10]" >
          <motion.p variants={fadeIn("", "", 1, 5)}
          className=' text-[64px] md:text-[128px] leading-[92px] pl-[45px]'>YUNG-CHING LIN</motion.p>
        <button className=" self-end pr-[58px] text-secondary hover:text-white text-[18px] font-medium cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}> 
    <motion.p variants={fadeIn("", "", 1, 5)}
          className=' text-[48px] md:text-[64px]'>About me</motion.p>
  </button>
      </div>
      
    </div>
    <div  className="flex items-center justify-center w-screen h-screen  fixed top-0 left-0 " > 
          <JellyfishCanvas meshOnclick={(e)=>{console.log(e)}} isRotatetion={isHover}/>
          
          </div></div>
    
  );
}

export default Home;
