import Image from "next/image";
import React from "react";
import CommonButton from "@shared/CommonButton";
import styles from "./index.module.css";

const BannerTop = ({ videoUrl }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src="/tv-2.png" alt="banner" />

        <div className={styles.videoContainer}>
          {videoUrl && (
            <video autoPlay loop className={styles.video} muted>
              <source src={videoUrl} />
            </video>
          )}
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div>
          <h6 className={styles.title}>Cientos de títulos a tu</h6>
          <h6 className={styles.title}>alcance</h6>
        </div>
        <div className={styles.descriptionContainer}>
          <h6 className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </h6>
          <h6 className={styles.description}>
            elit. Ut elit tellus, luctus nec ullamcorper mattis,
          </h6>
          <h6 className={styles.description}>pulvinar dapibus leo.</h6>
        </div>
        <div className={styles.buttonContainer}>
          <CommonButton title={"Ver librería"} />
        </div>
      </div>
    </div>
  );
};

export default BannerTop;
