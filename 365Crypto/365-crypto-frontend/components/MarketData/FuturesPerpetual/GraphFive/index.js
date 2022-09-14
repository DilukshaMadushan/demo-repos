import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import CoinDropDownBtn from "../CoinDropDownBtn";
import TimeDropDownBtn from "../TimeDropDownBtn";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import GraphSkeleton from "./GraphSkeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getShortLongData } from "../../../../actions/MarketDataGraph";
import EmptyDataHandler from "../../../Layout/common/EmptyDataHandler";

const GraphFive = ({
  marketDataGraph: {
    graphState,
    shortLongDataList,
    exchangeName,
    exchangeId,
    futuresPerpetualName,
    openInterestHistoryDataList,
    isLoadingLiquidation,
  },
  getShortLongData,
}) => {
  const [coinState, setCoinState] = useState("");
  const [coinList, setCoinSList] = useState("");
  const [pairId, setPairIdState] = useState("");
  const [timeState, setTimeState] = useState("");
  const [graphData, setGraphData] = useState({
    shortData: [],
    longData: [],
    coinPriceData: [],
    timeData: [],
  });
  //slice graph data
  const sliceMeasure = (priceValues) => {
    if (timeState === "1min") {
      return priceValues.slice(0, 120).reverse();
    }
    if (timeState === "5min") {
      return priceValues.slice(0, 144).reverse();
    }
    if (timeState === "15min") {
      return priceValues.slice(0, 96).reverse();
    }
    if (timeState === "1hr") {
      return priceValues.slice(0, 30).reverse();
    }
    if (timeState === "4hr") {
      return priceValues.slice(0, 30).reverse();
    }
    if (timeState === "12hr") {
      return priceValues.slice(0, 28).reverse();
    }
    if (timeState === "24hr") {
      return priceValues.slice(0, 480).reverse();
    }
  };

  useEffect(() => {
    if (graphState === "all" || graphState === "five") {
      //set graph data
      setGraphData({
        ...graphData,
        shortData:
          shortLongDataList &&
          shortLongDataList.map((item) =>
            (
              item &&
              item.liquidationShort &&
              item.liquidationShort / 1000
            ).toFixed(5)
          ),
        longData:
          shortLongDataList &&
          shortLongDataList.map((item) =>
            (
              item &&
              item.liquidationLong &&
              item.liquidationLong / 1000
            ).toFixed(5)
          ),
        coinPriceData:
          shortLongDataList &&
          shortLongDataList.map(
            (item) => item && item.price && item.price.toFixed(5)
          ),
        timeData:
          shortLongDataList &&
          shortLongDataList.map(
            (item) =>
              item &&
              item.dateTime &&
              new Intl.DateTimeFormat("en-GB", {
                month: "2-digit",

                day: "2-digit",

                year: "2-digit",

                hour: "numeric",

                minute: "numeric",
              }).format(new Date(item.dateTime))
          ),
      });

      if (graphState === "all") {
        //Time Dropdown set initial State
        setTimeState("1min");
      }
    }
  }, [shortLongDataList]);

  useEffect(() => {
    //Set coin dropdown state and list
    if (openInterestHistoryDataList.length > 0) {
      setCoinState(openInterestHistoryDataList[0].pair.symbolCode);
      setPairIdState(openInterestHistoryDataList[0].pair._id);
    }
    setCoinSList(openInterestHistoryDataList);
  }, [openInterestHistoryDataList]);

  //Coin Dropdown
  const setCoinStateFunction = (item) => {
    setCoinState(item.pair.symbolCode);
    setPairIdState(item.pair._id);
    getShortLongData(
      timeState,
      futuresPerpetualName,
      exchangeId,
      item.pair._id,
      "five"
    );
  };
  //Time Dropdown
  const setTimeStateFunction = (item) => {
    setTimeState(item.title);
    getShortLongData(
      item.title,
      futuresPerpetualName,
      exchangeId,
      pairId,
      "five"
    );
  };

  const state = {
    series: [
      {
        name: "Short",
        type: "column",
        data: graphData.shortData && sliceMeasure(graphData.shortData),
      },
      {
        name: "Long",
        type: "column",
        data: graphData.longData && sliceMeasure(graphData.longData),
      },
      {
        name: "Price",
        type: "line",
        data: graphData.coinPriceData && sliceMeasure(graphData.coinPriceData),
      },
    ],
    options: {
      chart: {
        height: "200%",
        type: "line",
        foreColor: "#fff",
        stacked: false,
        toolbar: {
          show: true,
          offsetX: -5,
          offsetY: 5,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
          },
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "100%",
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#232327",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },

        padding: {
          top: 0,
          right: 10,
          bottom: 0,
          left: -10,
        },
      },
      fill: {
        opacity: [1, 1, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: false,
        categories: sliceMeasure(graphData.timeData),
        labels: {
          show: true,
          rotate: -35,
          rotateAlways: true,
          maxHeight: 49,
          style: {
            fontSize: "9px",
            fontWeight: 600,
          },
        },
      },
      yaxis: [
        {
          show: true,
          tickAmount: 5,
          min: graphData.shortData && Math.min(...graphData.shortData),
          decimalsInFloat: 2,
          seriesName: "Short",
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: true,
            offsetX: 0,
            color: "#fff",
          },
          labels: {
            offsetX: -65,
            style: {
              colors: "#2a9df4",
              fontSize: "10px",
            },
          },
          title: {
            text: "Short &Long(K)",
            style: {
              color: "#fff",
            },
          },
        },
        {
          tickAmount: 5,
          decimalsInFloat: 2,
          min: graphData.longData && Math.min(...graphData.longData),
          seriesName: "Long",
          show: true,
          labels: {
            offsetX: 50,
            style: {
              colors: "#3DED97",
              fontSize: "10px",
            },
          },
        },

        {
          seriesName: "Coin",
          tickAmount: 5,
          min: graphData.coinPriceData && Math.min(...graphData.coinPriceData),
          decimalsInFloat: 1,
          opposite: true,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
            color: "#fff",
          },
          labels: {
            style: {
              color: "#fff",
              fontSize: "10px",
            },
          },
          title: {
            text: "Price",
            style: {
              color: "#fff",
            },
          },
        },
      ],
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        offsetX: 15,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined" && y !== null) {
              return y.toFixed(5);
            }
            return y;
          },
        },
      },
    },
  };

  return (
    <div className={`${styles["main-div"]}`}>
      {isLoadingLiquidation === true ? (
        <GraphSkeleton />
      ) : exchangeName === "Kucoin" ? (
        <div className={`${styles["noData-div"]}`}>
          <EmptyDataHandler type="futurePerpetualGraphs" />
        </div>
      ) : shortLongDataList && shortLongDataList.length === 0 ? (
        <div>
          <div className={`${styles["sub-div"]}`}>
            <div className={`${styles["title-div"]}`}>
              {exchangeName} {coinState} {futuresPerpetualName} liquidations
            </div>
            <div className={`${styles["btn-div"]}`}>
              <CoinDropDownBtn
                coinState={coinState}
                coinList={coinList}
                setCoinStateFunction={(item) => setCoinStateFunction(item)}
              />
              <TimeDropDownBtn
                timeState={timeState}
                setTimeStateFunction={(item) => setTimeStateFunction(item)}
              />
            </div>
            <div className={`${styles["noData-div"]}`}>
              <EmptyDataHandler type="futurePerpetualGraphs" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={`${styles["sub-div"]}`}>
            <div className={`${styles["title-div"]}`}>
              {exchangeName} {coinState} {futuresPerpetualName} liquidations
            </div>
            <div className={`${styles["btn-div"]}`}>
              <CoinDropDownBtn
                coinState={coinState}
                coinList={coinList}
                setCoinStateFunction={(item) => setCoinStateFunction(item)}
              />
              <TimeDropDownBtn
                timeState={timeState}
                setTimeStateFunction={(item) => setTimeStateFunction(item)}
              />
            </div>
            <div id="chart">
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="line"
                height="265"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

GraphFive.propTypes = {
  marketDataGraph: PropTypes.object.isRequired,
  getShortLongData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  marketDataGraph: state.marketDataGraph,
});
export default connect(mapStateToProps, { getShortLongData })(GraphFive);
