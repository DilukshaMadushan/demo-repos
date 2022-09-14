import React from "react";
import styles from "./index.module.css";

const TrailerButton = ({ title }) => {
  return (
    <div className={styles.container}>
      <h6 className={styles.title}>{title}</h6>
    </div>
  );
};

export default TrailerButton;
