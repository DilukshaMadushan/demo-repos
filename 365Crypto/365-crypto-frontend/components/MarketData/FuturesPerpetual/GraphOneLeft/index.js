import { useState, useEffect } from "react";
import styles from "./index.module.css";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GraphSkeleton from "./GraphSkeleton";
import EmptyDataHandler from "../../../Layout/common/EmptyDataHandler";

const GraphOneLeft = ({
  marketDataGraph: {
    openInterestHistoryDataList,
    exchangeName,
    futuresPerpetualName,
    isLoadingFuturePerpetual,
  },
}) => {
  const [graphData, setGraphData] = useState({
    categories: [],
    data: [],
  });

  //convert price to million billion
  const priceMeasure = (priceArray) => {
    if (priceArray) {
      const minValue = Math.min(...priceArray);
      const minLength = minValue.toFixed(0).toString().length;

      if (minLength >= 10) {
        let measuredPrice = priceArray.map(
          (item) => item && (item / 1000000000).toFixed(5)
        );
        return measuredPrice;
      }
      if (minLength < 10) {
        let measuredPrice = priceArray.map(
          (item) => item && (item / 1000000).toFixed(5)
        );
        return measuredPrice;
      }
    }
  };
  // set graph data
  useEffect(() => {
    setGraphData({
      ...graphData,
      categories:
        openInterestHistoryDataList &&
        openInterestHistoryDataList
          .slice(0, 10)
          .map((item) => item && item.pair && item.pair.symbolCode),
      data:
        openInterestHistoryDataList &&
        openInterestHistoryDataList
          .slice(0, 10)
          .map((item) => item && item.openInterest && item.openInterest),
    });
  }, [openInterestHistoryDataList]);

  const state = {
    series: [
      {
        name:
          Math.min(...graphData.data).toFixed(0).length >= 10
            ? "Open Interest(B)"
            : "Open Interest(M)",
        data: priceMeasure(graphData.data),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        type: "bar",
        foreColor: "#FFFFFF",
      },
      plotOptions: {
        bar: {
          borderRadius: 1,
          horizontal: true,
          columnWidth: "100%",
          barHeight: "80%",
        },
      },
      grid: {
        show: false,
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
        row: {
          colors: undefined,
          opacity: 0.5,
        },
        column: {
          colors: undefined,
          opacity: 0.5,
        },
        padding: {
          top: 0,
          right: 10,
          bottom: 0,
          left: 10,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        colors: ["#008FFB"],
      },
      xaxis: {
        title: {
          text:
            Math.min(...graphData.data).toFixed(0).length >= 10
              ? "In Billions"
              : "In Millions",
        },
        labels: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: true,
        },
        categories: graphData.categories,
      },
      yaxis: {
        show: true,

        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
            fontSize: "10px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
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
      {isLoadingFuturePerpetual === true ? (
        <GraphSkeleton />
      ) : (
        <div id="chart">
          <div className={`${styles["title-div"]}`}>
            {exchangeName} {futuresPerpetualName} open interests(24h)
          </div>
          <div id="chart">
            {openInterestHistoryDataList &&
            openInterestHistoryDataList.length === 0 ? (
              <div className={`${styles["noData-div"]}`}>
                <EmptyDataHandler type="futurePerpetualGraphs" />
              </div>
            ) : (
              <ApexCharts
                options={state.options}
                series={state.series}
                type="bar"
                height="270"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

GraphOneLeft.propTypes = {
  marketDataGraph: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  marketDataGraph: state.marketDataGraph,
});
export default connect(mapStateToProps, {})(GraphOneLeft);
