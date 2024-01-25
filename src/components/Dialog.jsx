import { IoMdCloseCircle } from "react-icons/io";
import { IconContext } from "react-icons";
import { motion, AnimatePresence } from "framer-motion";

const Dialog = ({ isOpen, onClose, content = () => {} }) => {
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {/* // Overlay to cover the entire screen */}
      {isOpen && (
        <motion.div
          className={`fixed inset-0 ${
            isOpen ? "block" : "hidden"
          } w-screen h-screen  z-[9999]
      backdrop-blur-md backdrop-filter bg-opacity-30 bg-white
      `}
          transition={{
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dialog content */}
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 flex flex-row items-center p-3  
               rounded-[10px] hover:bg-white hover:text-secondary "
          >
            <IconContext.Provider
              value={{ className: "w-[28px] h-[28px] object-contain" }}
            >
              <IoMdCloseCircle />
            </IconContext.Provider>
          </button>
          <div
            className="flex items-center justify-center h-full w-full"
            onClick={handleClickOutside}
          >
            {/* Dialog content goes here */}
            {content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
