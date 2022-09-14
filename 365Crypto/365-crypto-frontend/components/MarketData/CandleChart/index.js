import React, { useEffect } from "react";
import styles from "./index.module.css";
import ExchabgesDropdown from "./ExchangesDropdown";
import Chart from "./Chart";
import dynamic from "next/dynamic";
import Skeleton from "@material-ui/lab/Skeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CandleChart = ({ spotGraphData: { coinDataList, isLoading } }) => {
  return (
    <div className={styles.wrapperDiv}>
      <div className={styles.candleChartDiv}>
        <div className={styles.titleDiv}>
          {isLoading ? (
            <div className={styles.skeletonDiv}>
              <Skeleton
                variant="rect"
                width={"100%"}
                height={"100%"}
                style={{ background: "#1b1a20" }}
              />
            </div>
          ) : (
            <div className={styles.title}>
              {coinDataList.symbol} Candle Chart
            </div>
          )}
        </div>
        <ExchabgesDropdown />
        <div className={` ${styles.candleStickChartDiv}`}>
          <Chart />
        </div>
      </div>
    </div>
  );
};

CandleChart.propTypes = {
  spotGraphData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  spotGraphData: state.spotGraphData,
});
export default connect(mapStateToProps, {})(CandleChart);
