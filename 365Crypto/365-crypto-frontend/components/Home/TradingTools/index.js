import React from "react";
import styles from "./TradingTools.module.css";
import PrimaryButton from "../common/PrimaryButton";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

const TradingTools = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={`row ${styles.upperDiv}`}>
        <div>
          <h1 className={`col-8 ${styles.trendingTools}`}>Trending Tools</h1>
        </div>
      </div>

      <div className={`row ${styles.lowerDiv}`}>
        <div className={`col-md-3 ${styles.forumDiv}`}>
          <Link href="/charting-tools">
            <div className={`row ${styles.cardDiv}`}>
              <div className={`col-5 ${styles.imageDiv}`}>
                <div className={styles.image}>
                  <div className={styles.img}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}
                    >
                      <Image
                        src="/tradingtools-4.png"
                        alt="Charting Tools"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-7 ${styles.infoDiv}`}>
                <div className={styles.toolNameDiv}>
                  <div>
                    <h1 className={styles.toolName}>Charting Tools</h1>
                  </div>
                </div>
                <div className={styles.arrowButtonDiv}>
                  <div className={styles.arrowButton}>
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className={`col-md-3 ${styles.forumDiv}`}>
          <Link href="/crypto-bots">
            <div className={`row ${styles.cardDiv}`}>
              <div className={`col-5 ${styles.imageDiv}`}>
                <div className={styles.image}>
                  <div className={styles.img}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}
                    >
                      <Image
                        src="/tradingtools-2.png"
                        alt="Crypto Bots"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-7 ${styles.infoDiv}`}>
                <div className={styles.toolNameDiv}>
                  <div className={styles.toolName}>Crypto Bots</div>
                </div>
                <div className={styles.arrowButtonDiv}>
                  <div className={styles.arrowButton}>
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className={`col-md-3 ${styles.forumDiv}`}>
          <Link href="/crypto-tax">
            <div className={`row ${styles.cardDiv}`}>
              <div className={`col-5 ${styles.imageDiv}`}>
                <div className={styles.image}>
                  <div className={styles.img}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}
                    >
                      <Image
                        src="/tradingtools-3.png"
                        alt="Crypto Tax Solutions"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-7 ${styles.infoDiv}`}>
                <div className={styles.toolNameDiv}>
                  <div
                    style={{ marginBottom: "-1vw" }}
                    className={styles.toolName}
                  >
                    Crypto Tax <br />
                    Solutions
                  </div>
                </div>
                <div className={styles.arrowButtonDiv}>
                  <div className={styles.arrowButton}>
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className={`col-md-3 ${styles.forumDiv}`}>
          <a
            className={`row ${styles.cardDiv}`}
            href={process.env.FORUM_URL}
            target="_blank"
          >
            <div className={`col-5 ${styles.imageDiv}`}>
              <div className={styles.image}>
                <div className={styles.img}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <Image
                      src="/tradingtools-1.png"
                      alt="Forum"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-7 ${styles.infoDiv}`}>
              <div className={styles.toolNameDiv}>
                <div className={styles.toolName}>Forum</div>
              </div>

              <div className={styles.arrowButtonDiv}>
                <div className={styles.arrowButton}>
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TradingTools;
