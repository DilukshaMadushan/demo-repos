import React from "react";
import styles from "./index.module.css";
import { IoIosArrowForward } from "react-icons/io";

const NextButton = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;

  return (
    <div className={`${styles["transparent-area"]}`}>
      <div className={`${styles["customNext-btnDiv"]}`}>
        <button
          className={`${styles["customNext-btn"]}`}
          onClick={() => onClick()}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default NextButton;
