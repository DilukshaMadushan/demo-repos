import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

const BannerBottom = props => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h3>
          Obtén acceso ilimitado con tu membresía
          <b> Coppel Digital</b>
        </h3>
        <button>Planes</button>
      </div>
    </div>
  );
};

BannerBottom.propTypes = {};

export default BannerBottom;
