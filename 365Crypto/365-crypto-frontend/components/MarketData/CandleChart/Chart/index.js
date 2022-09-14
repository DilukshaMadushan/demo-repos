import React, { useState } from "react";
import { Themes } from "react-tradingview-widget";
import dynamic from "next/dynamic";
import styles from "./index.module.css";
const TradingViewWidget = dynamic(() => import("react-tradingview-widget"), {
  ssr: false,
});
import Skeleton from "@material-ui/lab/Skeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Chart = ({
  spotGraphData: { coinDataList, exchangeState, isLoading },
  exchange: { exchangeList },
}) => {
  let exchangeStatus;

  for (let index = 0; index < exchangeList.length; index++) {
    if (exchangeState === exchangeList[index]._id) {
      exchangeStatus = exchangeList[index].name.toUpperCase();
    }
  }

  return (
    <div className={`${styles.tradingviewWidgetDiv}`}>
      {!exchangeState ? (
        <Skeleton
          variant="rect"
          width={"100%"}
          height={"100%"}
          style={{ background: "#1b1a20" }}
        />
      ) : (
        <TradingViewWidget
          symbol={`${exchangeStatus}:${coinDataList.symbol}USDT`}
          theme={Themes.DARK}
          autosize="true"
          locale="en"
          interval="1"
          // hide_top_toolbar='true'
        />
      )}
    </div>
  );
};

Chart.propTypes = {
  spotGraphData: PropTypes.object.isRequired,
  exchange: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  spotGraphData: state.spotGraphData,
  exchange: state.exchange,
});
export default connect(mapStateToProps, {})(Chart);
