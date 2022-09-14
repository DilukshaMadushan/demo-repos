import React from "react";
import styles from "./index.module.css";

const AddCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.plusContainer}>
          <i className="fa fa-plus"></i>
        </div>
        <div className={styles.titleContainer}>
          <h6>Agregar</h6>
          <h6>nuevos</h6>
          <h6>titulos a</h6>
          <h6>mi lista</h6>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
