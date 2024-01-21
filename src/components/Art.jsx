import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import{ fadeIn, zoomIn} from"../utils/motion"
import { FaRegWindowMaximize,FaGithub  } from "react-icons/fa";
import { IconContext } from "react-icons";
import { fakeImgSet } from "./fakeData";
import Dialog from "./Dialog";

const Art = ({ isMobile })=> {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageDetail, setImageDetail] = useState({});
  const years=[...Array(5).keys()]
  .map((x) => x + 2019).reverse()
 const [active, setActive] = useState(years[0]);

const imgset=fakeImgSet

  return (
    <div className="flex flex-col items-start justify-center w-screen h-screen " >
 <div className="self-center flex flex-row items-start justify-between w-[96vw] h-[93vh] z-[10]
  rounded-[43px] ">
    {/* Left section with 1:2 ratio */}
    <div className="flex-1 flex flex-col items-start justify-between w-[32vw] h-full">
        <motion.p variants={fadeIn("", "", 1, 5)}
          className="self-center text-[48px] md:text-[64px] leading-[47px] pl-[45px] lg:pl-0 ">
            Artworks
        </motion.p>
        <div className="pb-32 ml-16"  >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4 '>
              {years.map((yr,id) => (
                <li
                  key={id}
                  onClick={() => {
                    setActive(yr);
                  }}
                >
                  <p className={`  text-secondary hover:text-white text-[18px] font-medium cursor-pointer
                  ${
                    active === yr ? "text-white text-[24px]" : "text-secondary" 
                  } `} >{yr}</p>
                </li>
              ))}
            </ul>
            </div>
          </div>

    {/* Right section with 2:2 ratio */}
    <div className="flex-2 flex flex-col items-start  justify-between w-[64vw] h-full">
   {imgset!==null&&
   <div className="grid grid-cols-4 gap-4 overflow-auto scrollbar-[hidden] w-full "   >
    {imgset.map((i,k)=>
      (
<div  key={k} className="  bg-cover bg-no-repeat bg-center h-[200px] max-w-content rounded-[43px] "
 style={{ backgroundImage: `url(${i.image})` }} 
 onClick={()=>{
  setImageDetail(i);
  setIsDialogOpen(true);}}/>
      )
    )
    }
    </div>
    }
    </div>
  </div>
    <Dialog isOpen={isDialogOpen} onClose={() => {
    setIsDialogOpen(false)}} content={
      <div className="flex flex-col items-center max-w-content h-[100vh]> w-full">
<img
  className={`max-w-fit  object-cover 
  ${imageDetail.description!=="" ? "px-9 pt-9 pb-6 h-[calc(100vh-60px)]"
  : "h-[100vh] p-9"}`}
  src={imageDetail.image}
  alt={imageDetail.title}
/>
{imageDetail.description!==""&& 
<p className="text-center text-[16px] text-secondary bg-white w-full" >{imageDetail.description}</p>}
</div>

    } />
    </div>
    
  );
}

export default Art;
