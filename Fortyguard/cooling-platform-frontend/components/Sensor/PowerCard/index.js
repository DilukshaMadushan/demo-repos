import React, { useEffect, useState } from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PowerCard = ({
  common: { darkThemeState },
  sensor: { isLoading, selectedDataList },
}) => {
  const [graphData, setGraphData] = useState({
    seriesData: [],
  });

  useEffect(() => {
    if (selectedDataList) {
      setGraphData({
        ...graphData,
        seriesData:
          selectedDataList && selectedDataList.map((item) => item.powerUsage),
      });
    }
  }, [selectedDataList]);

  const state = {
    series: graphData.seriesData && graphData.seriesData,
    options: {
      chart: {
        type: "radialBar",
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#aeaeae50",
            strokeWidth: "100%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: 2,
              left: 0,
              color: "#999",
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "1vw",
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ["Average Results"],
    },
  };

  return (
    <div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
      <div className={darkThemeState ? dark.card : light.card}>
        <div className={darkThemeState ? dark.title : light.title}>
          4G Coverage
        </div>

        <div className={darkThemeState ? dark.chart : light.chart} id="chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="radialBar"
          />
        </div>
        <div className={darkThemeState ? dark.status : light.status}>
          Average
        </div>
      </div>
    </div>
  );
};

PowerCard.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  sensor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
  sensor: state.sensor,
});

export default connect(mapStateToProps, {})(PowerCard);
