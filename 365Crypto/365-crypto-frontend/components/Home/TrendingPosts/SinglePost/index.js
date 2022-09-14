import React from "react";
import styles from "./index.module.css";

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const SinglePost = ({ item }) => {
  return (
    <a className={styles.cardAnchor} href={item.link} target="_blank">
      <div className={styles.card}>
        <div className={styles.imagecontainer}>
          <div
            className={
              item.thumbnail ? styles.imageDiv : styles.defaultImageDiv
            }
          >
            <img
              className={item.thumbnail ? styles.image : styles.defaultImage}
              src={
                item.thumbnail === null && item.platform === "reddit"
                  ? IMAGE_BASE_URL + item.image
                  : item.thumbnail === null && item.platform === "twitter"
                  ? IMAGE_BASE_URL + item.image
                  : item.thumbnail === null && item.platform === "youtube"
                  ? IMAGE_BASE_URL + item.image
                  : item.thumbnail !== null
                  ? item.thumbnail
                  : ""
              }
              alt={`${item.topicId.topic} Coin`}
            />
          </div>
        </div>

        <div className={styles.cardcontent}>
          <div className={styles.buttonset}>
            <button className={styles.button}>
              {new Intl.DateTimeFormat("pt-BR").format(new Date(item.date))}
            </button>
            <img
              className={styles.socialicon}
              src={
                item.platform === "reddit"
                  ? "/reddit-logo.png"
                  : item.platform === "twitter"
                  ? "/twitter-logo.png"
                  : item.platform === "youtube"
                  ? "/youtube-logo.png"
                  : ""
              }
              alt={
                item.platform === "reddit"
                  ? "Reddit"
                  : item.platform === "twitter"
                  ? "Twitter"
                  : item.platform === "youtube"
                  ? "Youtube"
                  : ""
              }
            />
            {item.coins.map((coin, index) => (
              <button key={index} className={styles.buttonbtc}>
                {coin.symbol}
              </button>
            ))}
          </div>
          <div className={styles.title}>{item.title}</div>
          <p className={styles.expert}>{item.description}</p>
        </div>
      </div>
    </a>
  );
};

export default SinglePost;
