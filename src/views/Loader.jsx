import React from "react";
import { motion } from "framer-motion";

const loadingContainer = {
  width: "4rem",
  height: "4rem",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center", 
};

const loadingCircle = {
  display: "block",
  width: "1rem",
  height: "1rem",
  backgroundColor: "#3A36DB",
  borderRadius: "50%", 
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 2.5,
    },
  },
  end: {
    transition: {
      staggerChildren: 2.5,
      delay: 20, 
      when: "afterChildren", 
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "60%",
  },
};
const loadingCircleTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: 'easeInOut',
};

const Loader = () => {

    const addDelay = () => {
        setTimeout(() => {
          console.log("Pasar a la siguiente página");
        }, 8000); 
      };
    
  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
      <div className="fixed w-full h-full bg-white opacity-100" />
      <motion.div
        style={loadingContainer}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
        onAnimationComplete={addDelay}
      >
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
      </motion.div>
    </div>
  );
};

export default Loader;
