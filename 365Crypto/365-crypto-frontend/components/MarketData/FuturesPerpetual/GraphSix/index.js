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
import { getOiVolumeData } from "../../../../actions/MarketDataGraph";
import EmptyDataHandler from "../../../Layout/common/EmptyDataHandler";

const GraphSix = ({
  marketDataGraph: {
    graphState,
    oiVolumeDataList,
    exchangeName,
    exchangeId,
    futuresPerpetualName,
    isLoadingGraphSix,
    openInterestHistoryDataList,
  },
  getOiVolumeData,
}) => {
  const [coinState, setCoinState] = useState("");
  const [coinList, setCoinSList] = useState("");
  const [pairId, setPairIdState] = useState("");
  const [timeState, setTimeState] = useState("");
  const [graphData, setGraphData] = useState({
    volumeData: [],
    openInterestData: [],
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
    if (graphState === "all" || graphState === "six") {
      //set graph data
      setGraphData({
        ...graphData,
        volumeData:
          oiVolumeDataList &&
          oiVolumeDataList.map(
            (item) => item && item.volume && (item.volume / 1000000).toFixed(5)
          ),
        openInterestData:
          oiVolumeDataList &&
          oiVolumeDataList.map(
            (item) =>
              item &&
              item.openInterest &&
              (item.openInterest / 1000000).toFixed(5)
          ),
        coinPriceData:
          oiVolumeDataList &&
          oiVolumeDataList.map(
            (item) => item && item.price && item.price.toFixed(5)
          ),
        timeData:
          oiVolumeDataList &&
          oiVolumeDataList.map(
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
  }, [oiVolumeDataList]);

  useEffect(() => {
    //set coin dropdown state and list
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
    getOiVolumeData(
      timeState,
      futuresPerpetualName,
      exchangeId,
      item.pair._id,
      "six"
    );
  };
  //Time Dropdown
  const setTimeStateFunction = (item) => {
    setTimeState(item.title);
    getOiVolumeData(
      item.title,
      futuresPerpetualName,
      exchangeId,
      pairId,
      "six"
    );
  };

  const state = {
    series: [
      {
        name: "Volume",
        type: "column",
        data: graphData.volumeData && sliceMeasure(graphData.volumeData),
      },
      {
        name: "Open Interest",
        type: "area",
        data:
          graphData.openInterestData &&
          sliceMeasure(graphData.openInterestData),
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
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
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
          left: 10,
        },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        offsetX: 15,
      },
      fill: {
        type: "solid",
        opacity: [0.85, 0.25, 1],
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
          min: graphData.volumeData && Math.min(...graphData.volumeData),
          decimalsInFloat: 1,
          seriesName: "Volume",
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: true,
            offsetX: -5,
            color: "#fff",
          },
          labels: {
            offsetX: -68,
            style: {
              colors: "#2a9df4",
              fontSize: "10px",
            },
          },
          title: {
            text: "Volume & Open Interest(M)",
            style: {
              color: "#fff",
            },
          },
        },
        {
          tickAmount: 5,
          decimalsInFloat: 1,
          min:
            graphData.openInterestData &&
            Math.min(...graphData.openInterestData),
          seriesName: "Open Interest",
          show: true,
          labels: {
            offsetX: 64,
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
      {isLoadingGraphSix === true ? (
        <GraphSkeleton />
      ) : (
        <div>
          <div className={`${styles["sub-div"]}`}>
            <div className={`${styles["title-div"]}`}>
              {exchangeName} {coinState} {futuresPerpetualName} open interest
              and volume
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
            {oiVolumeDataList && oiVolumeDataList.length === 0 ? (
              <div className={`${styles["noData-div"]}`}>
                <EmptyDataHandler type="futurePerpetualGraphs" />
              </div>
            ) : (
              <div id="chart">
                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="line"
                  height="265"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

GraphSix.propTypes = {
  marketDataGraph: PropTypes.object.isRequired,
  getOiVolumeData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  marketDataGraph: state.marketDataGraph,
});
export default connect(mapStateToProps, { getOiVolumeData })(GraphSix);
