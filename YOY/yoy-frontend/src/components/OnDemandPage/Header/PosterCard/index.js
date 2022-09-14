import React from "react";
import styles from "./index.module.css";
import PosterDetails from "./PosterDetails";

const PosterCard = ({ image, item, key }) => {
  return (
    <div className={styles.container} key={key}>
      <div
        className={styles.backgroundContainer}
        style={{
          backgroundImage: `linear-gradient(180deg, #09002E00 0%, #07002E 100%),url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className={styles.topLayerDiv}>
          <PosterDetails item={item} />
        </div>
      </div>
    </div>
  );
};

export default PosterCard;
