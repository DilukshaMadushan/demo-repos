import React from "react";
import styles from "./index.module.css";
import second from "next/image";

const CategoryCard = ({ src }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div
          className={styles.cardBTT}
          style={{
            backgroundImage: `linear-gradient(
              0deg,
              rgba(7, 0, 46, 0.8) 0%,
              rgba(7, 0, 46, 0.5) 20%,
              rgba(146, 144, 181, 0.8) 35%,
              rgba(146, 144, 181, 0.8) 50%,
              rgba(146, 144, 181, 0.8) 65%,
              rgba(7, 0, 46, 0.5) 80%,
              rgba(7, 0, 46, 0.8) 100%
            ),
            url("${src.src}")`,
          }}
        >
          {/* <img src={src.src} /> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
