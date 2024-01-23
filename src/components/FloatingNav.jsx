import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineMenu } from "react-icons/md";
import { IconContext } from "react-icons";

const FloatingNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navbarRef = useRef(null);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <motion.div className="absolute left-1 z-[999]" ref={navbarRef}>
        <motion.button
          className="border border-solid border-white hover:bg-white hover:text-secondary rounded-full p-4 cursor-pointer"
          whileTap={{ scale: 0.9 }}
          onClick={toggleExpansion}
        >
          <IconContext.Provider value={{ className: 'w-[28px] h-[28px] object-contain' }}>
            <MdOutlineMenu />
          </IconContext.Provider>
        </motion.button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 left-0 mt-12 p-4 bg-secondary text-white rounded-md shadow-md min-w-20"
            >
              {/* Your list of links */}
              <ul >
                <li>
                  <a href="#">Link 1</a>
                </li>
                <li>
                  <a href="#">Link 2</a>
                </li>
                {/* Add more links as needed */}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FloatingNavbar;
