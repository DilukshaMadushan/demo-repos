import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";
import { FaSadTear } from "react-icons/fa";

const EmptyDataHandler = ({ type }) => {
  const classes = `${styles.skeleton} ${styles[type]}`;

  return (
    <div className={classes}>
      <div className={`row p-0 m-0 ${styles["subDiv"]}`}>
        <div className={`${styles["titleDiv"]}`}>No data available</div>
        <div className={`${styles["iconDiv"]}`}>
          <FaSadTear />
        </div>
      </div>
    </div>
  );
};

EmptyDataHandler.propTypes = {
  type: PropTypes.string.isRequired,
};

export default EmptyDataHandler;
