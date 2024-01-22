import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Canvas,useFrame, } from "@react-three/fiber";
import { Clone , Preload, useGLTF,useTexture  } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";
import{fadeIn, zoomIn} from"../utils/motion"
import { FaGithub,FaLinkedin,FaEnvelope     } from "react-icons/fa";
import { IconContext } from "react-icons";

const Info = ({ isMobile })=> {
 const [emailCopyTooltip, setEmailCopyTooltip] = useState(false)

  return (
    <div className="flex flex-col items-start justify-center w-screen h-screen ">
 <div className="self-center flex flex-row items-start justify-between w-[96vw] h-[93vh] z-[10] 
 rounded-[43px] bg-gradient-to-l from-blue-500 to-70%">
    {/* Left section with 1:2 ratio */}
    <div className="flex-1 flex flex-col items-start justify-between w-[32vw] h-full">
    <p variants={fadeIn("", "", 1, 5)}
          className="self-center text-[48px] md:text-[64px] leading-[47px] pl-[45px] lg:pl-0 ">Info</p>
          </div>

    {/* Right section with 2:2 ratio */}
    <div className="flex-2 flex flex-col items- justify-center w-[64vw] h-full ">
    <a
            href={"https://github.com/joycekyery"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block no-underline w-fit "
            >
            <button
            className="flex flex-row items-center p-3 
                border border-solid border-white rounded-[10px] hover:bg-white hover:text-secondary ">
          <IconContext.Provider  value={{ className: 'w-[28px] h-[28px] object-contain' }}>
          <FaGithub/>
        </IconContext.Provider>
                    <p  className="text-[16px] md:text-[24px] pl-3" >Github</p>
        </button></a>
        <a
            href={"https://www.linkedin.com/in/yung-ching-lin/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block no-underline  w-fit"
            >
            <button
            className="flex flex-row items-center p-3  
                border border-solid border-white rounded-[10px] hover:bg-white hover:text-secondary ">
          <IconContext.Provider  value={{ className: 'w-[28px] h-[28px] object-contain' }}>
          <FaLinkedin/>
        </IconContext.Provider>
                    <p  className="text-[16px] md:text-[24px] pl-3" >Linkedin</p>
        </button></a>
        <div>
        <span class={`tooltip rounded shadow-lg p-1 bg-white text-secondary absolute z-100 -mt-8 ${emailCopyTooltip?"":"hidden"}`}>Copied!</span>
        <button
        onClick={() => {
            setEmailCopyTooltip(true)
            navigator.clipboard.writeText('7a.joyce.lin@gmail.com')
          }}
            className="flex flex-row items-center p-3 
                border border-solid border-white rounded-[10px] hover:bg-white hover:text-secondary ">
          <IconContext.Provider  value={{ className: 'w-[28px] h-[28px] object-contain' }}>
          <FaEnvelope />
        </IconContext.Provider>
        <p  className="text-[16px] md:text-[24px] pl-3" >Email</p>
        </button>
        </div>
    </div>
  </div>
    </div>
    
  );
}

export default Info;
