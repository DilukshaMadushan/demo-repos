import React from "react";
import styles from "./index.module.css";

const PlayButton = ({ title }) => {
  return (
    <div className={styles.container}>
      <i className="fa fa-play"></i>
      <h6 className={styles.title}>{title}</h6>
    </div>
  );
};

export default PlayButton;
