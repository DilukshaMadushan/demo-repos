import React from "react";
import styles from "./index.module.css";
import Skeleton from "@material-ui/lab/Skeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const CARD_LIST = [
  { id: "price", title: "Price ($)", data: "" },
  { id: "volume", title: "24h volume($)", data: "" },
  { id: "marketCap", title: "Market cap($)", data: "" },
  { id: "high", title: "24h high($)", data: "" },
  { id: "low", title: "24h low($)", data: "" },
  { id: "allTimeHigh", title: "All time high($)", data: "" },
  { id: "allTimeLow", title: "All time low($)", data: "" },
  { id: "circulatingSupply", title: "Circulating supply", data: "" },
  { id: "maxSupply", title: "Max supply", data: "" },
];

const DataCards = ({ spotGraphData: { coinDataList, isLoading } }) => {
  //convert price to million billion
  const priceMeasure = (priceValues) => {
    if (priceValues === null) {
      return "-";
    }
    if (priceValues === 0) {
      return priceValues.toFixed(2);
    }
    if (priceValues) {
      const length = priceValues.toFixed(0).toString().length;
      let measuredPrice;

      if (length >= 9) {
        let value = (priceValues / 1000000000).toFixed(2);
        measuredPrice = `${value.toString()}B`;
      }
      if (length < 9) {
        let value = (priceValues / 1000000).toFixed(2);
        measuredPrice = `${value.toString()}M`;
      }
      if (length < 6) {
        let value = priceValues.toFixed(2);
        measuredPrice = `${value.toString()}`;
      }
      return measuredPrice;
    }
  };

  //set api data into CARD_LIST
  if (coinDataList) {
    CARD_LIST.map((item, index) => {
      item.data = priceMeasure(coinDataList[CARD_LIST[index].id]);
    });
  }

  return (
    <div className={`row p-0  ${styles["main-div"]}`}>
      <div className={`${styles["title-div"]}`}>
        {isLoading === true ? (
          <div className="row">
            <div className={`col-1 p-0 ${styles["coinImg"]}`}>
              <Skeleton
                variant="circle"
                width={"100%"}
                height={"100%"}
                style={{ background: "#1b1a20" }}
              />
            </div>
            <div className={`col-11 p-0 ${styles["coinTitle"]}`}>
              <Skeleton
                variant="rect"
                width={"100%"}
                height={"70%"}
                style={{ background: "#1b1a20" }}
              />
            </div>
          </div>
        ) : (
          <text>
            <img
              className={`${styles["img-style"]}`}
              src={coinDataList && IMAGE_BASE_URL + coinDataList.image}
            />
            {coinDataList && coinDataList.name} Overview
          </text>
        )}
      </div>
      <div className={`${styles["cards-div"]}`}>
        <div className={`row p-0  ${styles["cards-gap"]}`}>
          {CARD_LIST.map((item, id) => (
            <div key={id} className={`col-sm-4 p-0 ${styles["cards-col"]}`}>
              {isLoading === true ? (
                <div className={`${styles["dataDiv"]}`}>
                  <Skeleton
                    variant="rect"
                    width={"100%"}
                    height={"100%"}
                    style={{ background: "#1b1a20" }}
                  />
                </div>
              ) : (
                <div className={`row ${styles["card-div"]}`}>
                  {item.title}
                  <div className={styles.data}>{item.data}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={`row p-0 ${styles["mobile-cards-gap"]}`}>
          <div className={`col-6 p-0 ${styles["mobile-cards-col"]}`}>
            {isLoading === true ? (
              <div className={`${styles["mobileDataDiv"]}`}>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={"100%"}
                  style={{ background: "#1b1a20" }}
                />
              </div>
            ) : (
              <div className={`row ${styles["mobile-card-div"]}`}>
                Price ($)
                <div className={styles.data}>{CARD_LIST[0].data}</div>
              </div>
            )}
          </div>
          <div className={`col-6 p-0 ${styles["mobile-cards-col"]}`}>
            {isLoading === true ? (
              <div className={`${styles["mobileDataDiv"]}`}>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={"100%"}
                  style={{ background: "#1b1a20" }}
                />
              </div>
            ) : (
              <div className={`row ${styles["mobile-card-div"]}`}>
                24 Hr volume($)
                <div className={styles.data}>{CARD_LIST[1].data}</div>
              </div>
            )}
          </div>
          <div className={`col-6 p-0 ${styles["mobile-cards-col"]}`}>
            {isLoading === true ? (
              <div className={`${styles["mobileDataDiv"]}`}>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={"100%"}
                  style={{ background: "#1b1a20" }}
                />
              </div>
            ) : (
              <div className={`row ${styles["mobile-card-div"]}`}>
                Market cap
                <div className={styles.data}>{CARD_LIST[2].data}</div>
              </div>
            )}
          </div>
          <div className={`col-6 p-0 ${styles["mobile-cards-col"]}`}>
            {isLoading === true ? (
              <div className={`${styles["mobileDataDiv"]}`}>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={"100%"}
                  style={{ background: "#1b1a20" }}
                />
              </div>
            ) : (
              <div className={`row ${styles["mobile-card-div"]}`}>
                24H high
                <div className={styles.data}>{CARD_LIST[3].data}</div>
              </div>
            )}
          </div>
          <div className={`col-6 p-0 ${styles["mobile-cards-col"]}`}>
            {isLoading === true ? (
              <div className={`${styles["mobileDataDiv"]}`}>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={"100%"}
                  style={{ background: "#1b1a20" }}
                />
              </div>
            ) : (
              <div className={`row ${styles["mobile-card-div"]}`}>
                24H low
                <div className={styles.data}>{CARD_LIST[4].data}</div>
              </div>
            )}
          </div>
          <div className={`col-6 p-0 ${styles["mobile-cards-col"]}`}>
            {isLoading === true ? (
              <div className={`${styles["mobileDataDiv"]}`}>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={"100%"}
                  style={{ background: "#1b1a20" }}
                />
              </div>
            ) : (
              <div className={`row ${styles["mobile-card-div"]}`}>
                All time high
                <div className={styles.data}>{CARD_LIST[5].data}</div>
              </div>
            )}
          </div>
          <div className={`col-6 p-0 ${styles["mobile-cards-col"]}`}>
            {isLoading === true ? (
              <div className={`${styles["mobileDataDiv"]}`}>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={"100%"}
                  style={{ background: "#1b1a20" }}
                />
              </div>
            ) : (
              <div className={`row ${styles["mobile-card-div"]}`}>
                All time low
                <div className={styles.data}>{CARD_LIST[6].data}</div>
              </div>
            )}
          </div>
          <div className={`col-6 p-0 ${styles["mobile-cards-col"]}`}>
            {isLoading === true ? (
              <div className={`${styles["mobileDataDiv"]}`}>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={"100%"}
                  style={{ background: "#1b1a20" }}
                />
              </div>
            ) : (
              <div className={`row ${styles["mobile-card-div"]}`}>
                Circulating suply
                <div className={styles.data}>{CARD_LIST[7].data}</div>
              </div>
            )}
          </div>
          {isLoading === true ? (
            <div className={`row p-0 ${styles["mobileSingleDataDiv"]}`}>
              <Skeleton
                variant="rect"
                width={"100%"}
                height={"100%"}
                style={{ background: "#1b1a20" }}
              />
            </div>
          ) : (
            <div className={`row ${styles["mobile-single-card-div"]}`}>
              Max suply
              <div className={styles.data}>{CARD_LIST[8].data}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

DataCards.propTypes = {
  spotGraphData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  spotGraphData: state.spotGraphData,
});
export default connect(mapStateToProps, {})(DataCards);
