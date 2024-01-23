import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Canvas,useFrame, } from "@react-three/fiber";
import { Clone , Preload, useGLTF,useTexture  } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
import{fadeIn, zoomIn} from"../utils/motion"
import {projects} from "../assets/project"
import { FaRegWindowMaximize,FaGithub  } from "react-icons/fa";
import { IconContext } from "react-icons";
import { TypingText } from "./TypingText";

const ProjectDisplay = ({ isMobile })=> {
 const [active, setActive] = useState(projects[0]);
 const [isAnimating, setIsAnimating] = useState(true);


  return (
 <div className="self-center flex flex-row items-start justify-between w-full h-full 
 rounded-[43px] bg-gradient-to-l from-blue-500 to-70%">
    {/* Left section with 1:2 ratio */}
    <div className="flex-1 flex flex-col items-start justify-between w-[32vw] h-full">
        
        <TypingText 
          className="self-center text-[48px] md:text-[64px] leading-[59px] pl-[45px] lg:pl-0 "
          text={"Projects"}
          />
        <div className="pb-32 ml-16"  >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4 '>
              {projects.map((proj,id) => (
                <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: id * 0.05 }} // Stagger the animation
                  key={id}
                  onClick={() => {
                    setActive(proj);
                    setIsAnimating(!isAnimating);
                  }}
                >
                  <p className={`  text-secondary hover:text-white text-[18px] font-medium cursor-pointer
                  ${
                    active.title === proj.title ? "text-white text-[24px]" : "text-secondary" 
                  } `} >{proj.title}</p>
                </motion.li>
              ))}
            </ul>
            </div>

          </div>

    {/* Right section with 2:2 ratio */}
    <motion.div 
    key={isAnimating}
     initial={{ opacity: 0, y: -20 }}
     animate={{ opacity: 1, y: 0 } }
     exit={{ opacity: 0, y: -20 }}
     transition={{ duration: 0.4 }}
    className="flex-2 flex flex-col items-start  justify-between w-[64vw] h-full">
   {active!==null && 
   <motion.div  
   
   className=" self-center flex flex-col xl:flex-row  items-start h-full justify-between w-full "  >
  <motion.div 
  
  className="flex flex-col items-start  justify-center w-full h-full px-12">
<p variants={fadeIn("", "", 1, 5)}
          className="self-center text-[18px] md:text-[24px]  pl-[45px] lg:pl-0 ">{active.description}</p>
          <p variants={fadeIn("", "", 1, 5)}
          className="self-center text-[24px] md:text-[32px]  pl-[45px] lg:pl-0 pt-5">{active.tools}</p>
          <div className="flex flex-row items-center justify-between w-full px-32 pt-16" >
          {active.sourceCode && 
            <a
            href={active.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block no-underline  "
            >
            <button
            className="flex flex-row items-center p-3  
                border border-solid border-white rounded-[10px] hover:bg-white hover:text-secondary ">
                    <p  className="text-[16px] md:text-[24px] pr-3" >Source Code</p>
          <IconContext.Provider  value={{ className: 'w-[28px] h-[28px] object-contain' }}>
          <FaGithub/>
        </IconContext.Provider>
        </button></a>
          }
          {active.visit && 
          <a
          href={active.visit}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block no-underline  "
          >
          <button
          className="flex flex-row items-center p-3  
              border border-solid border-white rounded-[10px] hover:bg-white hover:text-secondary ">
                  <p  className="text-[16px] md:text-[24px] pr-3" >Visit</p>
        <IconContext.Provider  value={{ className: 'w-[28px] h-[28px] object-contain' }}>
        <FaRegWindowMaximize/>
      </IconContext.Provider>
      </button></a>
          }
          </div>
</motion.div>
<div className=" p-3  max-w-content h-full ">
<div   className="  bg-cover bg-no-repeat bg-center w-[300px] h-full rounded-[43px] " style={{ backgroundImage: `url(${active.image})` }} >
</div>

</div>
    </motion.div>
    }
    </motion.div>
  </div>
    
  );
}

export default ProjectDisplay;
