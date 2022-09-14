import React from "react";
import Image from "next/image";
import styles from "./index.module.css";
import CommonButton from "@shared/CommonButton";

const Introduction = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/YOYGreen.png"
          alt="YOY"
          layout="fill"
        />
      </div>

      <div>
        <h6 className={styles.title}>
          TV en vivo, películas, series, radio y más…
        </h6>
      </div>

      <div className={styles.descriptionContainer}>
        <h6 className={styles.description}>
          Disfruta de todo el contenido con tu
        </h6>
        <h6 className={styles.description}>suscripción Coppel Digital</h6>
      </div>

      <div>
        <div className={styles.subscribeButton}>
          <CommonButton title={"Suscribirme"} />
        </div>
        <div className={styles.instructionContainer}>
          <div className={styles.arrowImageContainer}>
            <Image
              className={styles.arrowImage}
              src={"/whiteArrowCropped.png"}
              alt="arrow"
              layout="fill"
            />
          </div>
          <div className={styles.instructionDiv}>
            <h6 className={styles.instruction}>
              Inicia tu prueba gratuita de 7 días
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
