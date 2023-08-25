'use client'
const spring = {
    type: "spring",
    stiffness: 400,
    damping: 28
  };
  
  const getVariants = (mouseXPosition, mouseYPosition) => ({
    default: {
      opacity: 1,
      height: 10,
      width: 10,
      fontSize: "16px",
      backgroundColor: "#1e91d6",
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    project: {
      opacity: 1,
      backgroundColor: "#fff",
      color: "#000",
      height: 80,
      width: 80,
      fontSize: "18px",
      x: mouseXPosition - 32,
      y: mouseYPosition - 32,
      transition: spring
    },
    contact: {
      opacity: 1,
      backgroundColor: "#FFBCBC",
      color: "#000",
      height: 64,
      width: 64,
      fontSize: "32px",
      x: mouseXPosition - 48,
      y: mouseYPosition - 48,
      transition: spring
    },
    time: {
        opacity: 1,
        backgroundColor: "#fff",
        color: "#000",
        height: 64,
        width: 64,
        fontSize: "32px",
        x: mouseXPosition - 48,
        y: mouseYPosition - 48,
        transition: spring
      }
  });
  
  export { getVariants, spring };
  