import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Dialog from "./Dialog";
import Loading from "./Loading";
import { TypingText } from "./TypingText";

const Art = ({ isMobile }) => {
  const [year, setYear] = useState(2023); // Initial year
  const [loading, setLoading] = useState(false);
  const [imgset, setImgset] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageDetail, setImageDetail] = useState({});
  const years = [...Array(5).keys()].map((x) => x + 2019).reverse();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setImgset(null);
        setLoading(true);
        const response = await axios.get(
          `https://yung-chingl-backend-4b5485e26e46.herokuapp.com/artPortfolio/findByYear/${year}`
        );
        setImgset(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        // Set loading to false after the request completes (either success or error)
        setLoading(false);
      }
    };

    fetchData(); // Call the function when the component mounts or when `year` changes
  }, [year]);

  return (
    <div
      className="self-center flex flex-row items-start justify-between w-full h-full 
  rounded-[43px] "
    >
      {/* Left section with 1:2 ratio */}
      <div className="flex-1 flex flex-col items-start justify-between w-[32vw] h-full">
        <TypingText
          className="self-center text-[48px] md:text-[64px] leading-[59px] pl-[45px] lg:pl-0 "
          text={"Artworks"}
        />

        <div className="pb-32 ml-16">
          <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4 ">
            {years.map((yr, id) => (
              <motion.li
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: id * 0.1 }} // Stagger the animation
                onClick={() => {
                  setYear(yr);
                }}
              >
                <p
                  className={`  text-secondary hover:text-white text-[18px] font-medium cursor-pointer
                  ${
                    year === yr ? "text-white text-[24px]" : "text-secondary"
                  } `}
                >
                  {yr}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right section with 2:2 ratio */}
      <div className="flex-2 flex flex-col items-start  justify-between w-[64vw] h-full">
        {/* Conditionally render the Loading component based on the 'loading' state */}
        <AnimatePresence>
          {loading ? (
            <Loading />
          ) : (
            imgset !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
                exit={{
                  opacity: 0,
                  transition: { ease: "easeOut", duration: 0.8 },
                }}
                className="grid grid-cols-4 gap-4 overflow-auto scrollbar-[hidden] w-full "
              >
                {imgset.map((i, k) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: k * 0.1 }} // Stagger the animation
                    className="  bg-cover bg-no-repeat bg-center h-[200px] max-w-content rounded-[43px] "
                    style={{ backgroundImage: `url(${i.image})` }}
                    onClick={() => {
                      setImageDetail(i);
                      setIsDialogOpen(true);
                    }}
                  />
                ))}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        content={
          <div
            className="flex flex-col items-center max-w-content h-[100vh]> w-full"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setIsDialogOpen(false);
              }
            }}
          >
            <img
              className={`max-w-fit  object-cover 
  ${
    imageDetail.description !== ""
      ? "px-9 pt-9 pb-6 h-[calc(100vh-60px)]"
      : "h-[100vh] p-9"
  }`}
              src={imageDetail.image}
              alt={imageDetail.title}
            />
            {imageDetail.description !== "" && (
              <p className="text-center text-[16px] text-secondary bg-white w-full">
                {imageDetail.description}
              </p>
            )}
          </div>
        }
      />
    </div>
  );
};

export default Art;
