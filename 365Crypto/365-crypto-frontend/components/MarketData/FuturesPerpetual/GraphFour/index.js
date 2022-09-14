import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import dynamic from "next/dynamic";
import CoinDropDownBtn from "../CoinDropDownBtn";
import TimeDropDownBtn from "../TimeDropDownBtn";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import GraphSkeleton from "./GraphSkeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOiVolumeData } from "../../../../actions/MarketDataGraph";
import EmptyDataHandler from "../../../Layout/common/EmptyDataHandler";

const GraphFour = ({
  marketDataGraph: {
    graphState,
    oiVolumeDataList,
    exchangeName,
    exchangeId,
    futuresPerpetualName,
    isLoadingGraphFour,
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
    if (graphState === "all" || graphState === "four") {
      //set graph data
      setGraphData({
        ...graphData,
        volumeData:
          oiVolumeDataList &&
          oiVolumeDataList.map(
            (item) => item && item.volume && (item.volume / 1000000).toFixed(5)
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
      "four"
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
      "four"
    );
  };

  const state = {
    series: [
      {
        name: "Volume",
        type: "area",
        data: graphData.volumeData && sliceMeasure(graphData.volumeData),
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
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        offsetX: 15,
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
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "solid",
        opacity: [0.35, 1],
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
      markers: {
        size: 0,
      },
      yaxis: [
        {
          show: true,
          tickAmount: 5,
          min: graphData.volumeData && Math.min(...graphData.volumeData),
          decimalsInFloat: 2,
          title: {
            text: "Volume(M)",
          },
          labels: {
            style: {
              fontSize: "10px",
            },
          },
        },
        {
          tickAmount: 5,
          min: graphData.coinPriceData && Math.min(...graphData.coinPriceData),
          decimalsInFloat: 1,
          opposite: true,
          title: {
            text: "Price",
          },
          labels: {
            style: {
              fontSize: "10px",
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
      {isLoadingGraphFour === true ? (
        <GraphSkeleton />
      ) : (
        <div>
          <div className={`${styles["title-div"]}`}>
            {exchangeName} {coinState} {futuresPerpetualName} volume
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
      )}
    </div>
  );
};

GraphFour.propTypes = {
  marketDataGraph: PropTypes.object.isRequired,
  getOiVolumeData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  marketDataGraph: state.marketDataGraph,
});
export default connect(mapStateToProps, { getOiVolumeData })(GraphFour);
