import React from "react";
import { IoThermometer } from "react-icons/io5";
import styles from "./index.module.css";
import Linkify from "react-linkify";

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const MobileCard = ({ item, index }) => {
  let originalDescription = item.description;
  let convertedDescription = originalDescription.replace(/(\r\n|\n|\r)/gm, "");

  return (
    <div key={index} className={`col-md-6  m-0 p-0 ${styles.cardDiv}`}>
      <div className={` ${styles.card}`}>
        <div className={` ${styles.upperDiv}`}>
          <div className={` ${styles.upperLeftDiv}`}>
            <div className={` ${styles.eventIconDiv}`}>
              <img
                className={` ${styles.eventIcon}`}
                src={IMAGE_BASE_URL + item.topicId.image}
                alt={`${item.topicId.topic} Coin`}
              />
            </div>
            <div className={` ${styles.platformIconDiv}`}>
              <img
                className={` ${styles.platformIcon}`}
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
            </div>
          </div>
          <div className={` ${styles.upperRightDiv}`}>
            <div className={` ${styles.dateDiv}`}>
              {new Intl.DateTimeFormat("en-GB", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }).format(new Date(item.date))}
            </div>
            <div className={` ${styles.titleDiv}`}>{item.title}</div>
          </div>
        </div>
        <div className={` ${styles.lowerDiv}`}>
          <div className={` ${styles.lowerLeftDiv}`}>
            <div
              className={
                item.thumbnail === null ? styles.noneImgDiv : styles.imgDiv
              }
            >
              <img
                className={` ${styles.img}`}
                src={item.thumbnail}
                alt={`${item.topicId.topic} Coin`}
              />
            </div>
          </div>
          <div
            className={
              item.thumbnail === null
                ? styles.noImgLowerRightDiv
                : styles.lowerRightDiv
            }
          >
            <div className={` ${styles.descripDiv}`}>
              <p className={` ${styles.para}`}>
                <Linkify>{item.description}</Linkify>
              </p>
            </div>
            <div className={` ${styles.footerDiv}`}>
              <div className={` ${styles.coinBtnDiv}`}>
                {item.coins.map((coin) => (
                  <button className={` ${styles.coinBtn}`}>
                    {coin.symbol}
                  </button>
                ))}
              </div>
              <div className={` ${styles.SeeMoreDiv}`}>
                <a
                  className={` ${styles.SeeMore}`}
                  href={item.link}
                  target="_blank"
                >
                  See More
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={` ${styles.SeeMoreMobileDiv}`}>
          <a
            className={` ${styles.SeeMoreMobile}`}
            href={item.link}
            target="_blank"
          >
            See More
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;
