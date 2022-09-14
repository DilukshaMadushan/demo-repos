import React from "react";
import styles from "./loadingStyles.module.css";
import Skeleton from "@material-ui/lab/Skeleton";

const CryptoNewsLoadingComp = () => {
  return (
    <div>
      <div className={`${styles.newsFeedDiv}`}>
        <div className={`${styles.loadingCard}`}>
          <div className={`${styles.upperDiv}`}>
            <div className={`${styles.imageDiv}`}>
              <Skeleton
                style={{ background: "#232327" }}
                variant="rect"
                width={"100%"}
                height={"100%"}
              />
            </div>
            <div className={`${styles.infoDiv}`}>
              <div className={`${styles.newsDiv}`}>
                <div className={`${styles.newsTitle}`}>
                  <Skeleton
                    style={{ background: "#232327" }}
                    variant="text"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
                <div className={`${styles.newsDiscrip}`}>
                  <Skeleton
                    style={{ background: "#232327" }}
                    variant="text"
                    width={"100%"}
                    height={"100%"}
                  />
                  <Skeleton
                    style={{ background: "#232327" }}
                    variant="text"
                    width={"100%"}
                    height={"100%"}
                  />
                  <Skeleton
                    style={{ background: "#232327" }}
                    variant="text"
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              </div>
              <div className={`${styles.coinBtnDiv}`}>
                <button className={`${styles.coinBtbSkel}`}>
                  <Skeleton
                    style={{ background: "#232327" }}
                    variant="rect"
                    width={"100%"}
                    height={"100%"}
                  />
                </button>
              </div>
              <div className={`${styles.othersDiv}`}>
                <div className={`${styles.dateDiv}`}>
                  <span className={`${styles.date}`}>
                    <Skeleton
                      style={{ background: "#232327" }}
                      variant="text"
                      width={100}
                      height={20}
                    />
                  </span>
                </div>
                <div className={styles.neutralStatusDiv}>
                  <Skeleton
                    style={{ background: "#232327" }}
                    variant="text"
                    width={50}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.lowerDiv}`}>
            <div className={`${styles.mobileDateDiv}`}>
              <span className={`${styles.date}`}>
                <Skeleton
                  style={{ background: "#232327" }}
                  variant="text"
                  width={150}
                  height={20}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoNewsLoadingComp;
