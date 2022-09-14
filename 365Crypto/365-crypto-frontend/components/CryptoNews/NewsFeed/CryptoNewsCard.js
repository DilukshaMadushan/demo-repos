import React from "react";
import styles from "./index.module.css";

const CryptoNewsCard = ({ item }) => {
  return (
    <div className={`${styles.singleNewsDiv}`}>
      <div className={`${styles.upperDiv}`}>
        <div className={`${styles.imageDiv}`}>
          <img
            className={`${styles.image}`}
            src={item.image_url}
            alt="News Feed Image"
          />
        </div>
        <div className={`${styles.infoDiv}`}>
          <div className={`${styles.newsDiv}`}>
            <div className={`${styles.newsTitle}`}>{item.title}</div>
            <div className={`${styles.newsDiscrip}`}>{item.text}</div>
          </div>

          <div className={`${styles.coinBtnDiv}`}>
            {item.tickers.map((ticker, index) => (
              <button key={index} className={`${styles.coinBtb}`}>
                {ticker.symbol}
              </button>
            ))}
          </div>
          <div className={`${styles.othersDiv}`}>
            <div className={`${styles.dateDiv}`}>
              <span className={`${styles.date}`}>
                {new Intl.DateTimeFormat("en-GB", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                }).format(new Date(item.date))}
              </span>
            </div>
            <div
              className={
                item.sentiment === "Positive"
                  ? styles.positiveStatusDiv
                  : item.sentiment === "Negative"
                  ? styles.negativeStatusDiv
                  : item.sentiment === "Neutral"
                  ? styles.neutralStatusDiv
                  : ""
              }
            >
              {"| "}
              {item.sentiment}
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.lowerDiv}`}>
        <div className={`${styles.mobileDateDiv}`}>
          <span className={`${styles.date}`}>
            {new Intl.DateTimeFormat("en-GB", {
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            }).format(new Date(item.date))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CryptoNewsCard;
