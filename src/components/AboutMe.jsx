import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { JellyfishCanvas } from "./Jellyfish";
import { TypingText } from "./TypingText";
import { Link, useNavigate } from "react-router-dom";

const AboutMe = ({ isMobile }) => {
  const [isHover, setIsHover] = useState(false);
  const buttons = [
    { ml: "0", text: "Projects", link: "projects" },
    { ml: "32", text: "Art", link: "artWorks" },
    { ml: "48", text: "Info", link: "info" },
  ];
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <div
        className="self-center flex flex-row items-start justify-between w-full h-full 
  rounded-[43px] bg-gradient-to-l from-blue-500 to-70%"
      >
        {/* Left section with 1:2 ratio */}
        <div className="flex-1 flex flex-col items-start justify-center w-[32vw] h-full">
          <div className="self-center w-[30vw] h-[40vh]">
            <JellyfishCanvas
              meshOnclick={(e) => {
                console.log(e);
              }}
              isRotatetion={isHover}
              cameraSetting={{ zoom: 50 }}
            />
          </div>
          <TypingText
            className="self-center text-[48px] md:text-[64px] leading-[92px] pl-0 sm:pl-[45px] "
            text={"About Me"}
          />
        </div>
        {/* Right section with 2:2 ratio */}
        <div className="flex-2 flex flex-col items- justify-center w-[64vw] h-full">
          {buttons.map((b, k) => {
            return (
              <motion.button
                key={k}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: k * 0.1 }}
                className={`ml-${b.ml} text-[#DDCFCF] hover:text-white text-[18px] font-medium cursor-pointer`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <Link
                  to={`/${b.link}`}
                  onClick={(e) => {
                    e.preventDefault();
                    // navigate({l.link}, { state: nanoid() });
                    navigate(`/${b.link}`);
                  }}
                >
                  <p className=" text-[64px]">{b.text}</p>
                </Link>
              </motion.button>
            );
          })}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AboutMe;
