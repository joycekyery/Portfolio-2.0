import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { IconContext } from "react-icons";
import { TypingText } from "./TypingText";
import Tooltip from "./Tooltip";

const Info = ({ isMobile }) => {
  const links = [
    {
      link: "https://github.com/joycekyery",
      text: "Github",
      icon: <FaGithub />,
    },
    {
      link: "https://www.linkedin.com/in/yung-ching-lin/",
      text: "Linkedin",
      icon: <FaLinkedin />,
    },
  ];
  return (
    <div
      className="self-center flex flex-row items-center justify-center w-full h-full  
 rounded-[43px] bg-gradient-to-l from-blue-500 to-70%"
    >
      <TypingText
        className="self-center text-[48px] md:text-[64px] leading-[59px] pr-3"
        text={"Info"}
      />
      <div className="self-center flex flex-col items-start justify-center  h-full">
        {links.map((l, k) => {
          return (
            <a
              key={k}
              href={l.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block no-underline  w-fit"
            >
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: k * 0.1 }} // Stagger the animation
                className="flex flex-row items-center p-3  
          border border-solid border-white rounded-[10px] hover:bg-white hover:text-secondary "
              >
                <IconContext.Provider
                  value={{ className: "w-[28px] h-[28px] object-contain" }}
                >
                  {l.icon}
                </IconContext.Provider>
                <p className="text-[16px] md:text-[24px] pl-3">{l.text}</p>
              </motion.button>
            </a>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: links.length * 0.1 }}
        >
          <Tooltip text={"Copied!"} mouseEnter={false}>
            <button
              onClick={() => {
                navigator.clipboard.writeText("7a.joyce.lin@gmail.com");
              }}
              className="flex flex-row items-center p-3 
                border border-solid border-white rounded-[10px] hover:bg-white hover:text-secondary "
            >
              <IconContext.Provider
                value={{ className: "w-[28px] h-[28px] object-contain" }}
              >
                <FaEnvelope />
              </IconContext.Provider>
              <p className="text-[16px] md:text-[24px] pl-3">Email</p>
            </button>
          </Tooltip>
        </motion.div>
      </div>
    </div>
  );
};

export default Info;
