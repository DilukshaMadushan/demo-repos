import React from "react";
import GraphThree from "./GraphThree";
import GraphFour from "./GraphFour";
import GraphFive from "./GraphFive";
import GraphSix from "./GraphSix";
import GraphOneLeft from "./GraphOneLeft";
import GraphTwoRight from "./GraphTwoRight";

import styles from "./index.module.css";

const FuturesPerpetual = () => {
  return (
    <div>
      <div className={`${styles["main-div"]}`}>
        <div className={`row p-0  ${styles["graph-gap"]}`}>
          <div className={`col-md-6 p-0 ${styles["graph-col"]}`}>
            <div className={`${styles["graph-div"]}`}>
              <GraphOneLeft />
            </div>
          </div>
          <div className={`col-md-6 p-0 ${styles["graph-col"]}`}>
            <div
              className={`${styles["graph-div"]}`}
              style={{
                marginLeft: "auto",
              }}
            >
              <GraphTwoRight />
            </div>
          </div>
        </div>

        <div className={`row p-0  ${styles["graph-gap"]}`}>
          <div className={`col-md-6 p-0 ${styles["graph-col"]}`}>
            <div className={`${styles["graph-div"]}`}>
              <GraphThree />
            </div>
          </div>
          <div className={`col-md-6 p-0 ${styles["graph-col"]}`}>
            <div
              className={`${styles["graph-div"]}`}
              style={{
                marginLeft: "auto",
              }}
            >
              <GraphFour />
            </div>
          </div>
        </div>
        <div className={`row p-0 m-0`}>
          <div className={`col-md-6 p-0 ${styles["graph-col"]}`}>
            <div className={`${styles["graph-div"]}`}>
              <GraphFive />
            </div>
          </div>
          <div className={`col-md-6 p-0 ${styles["graph-col"]}`}>
            <div
              className={`${styles["graph-div"]}`}
              style={{
                marginLeft: "auto",
              }}
            >
              <GraphSix />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturesPerpetual;
