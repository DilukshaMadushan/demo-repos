import React, { Component } from "react";
import styles from "./index.module.css";
// import ApexChart from 'apexcharts'
// import dynamic from 'next/dynamic';
// const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import dynamic from "next/dynamic";
// import { Component } from 'devextreme-react/core/component'
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const GraphicalSynopsisChart = ({ common: { darkThemeState } }) => {
  const series = [
    {
      //   data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
      //     min: 10,
      //     max: 60
      //   })
      data: [2, 5, 3, 4, 8, 6, 4, 5],
    },
  ];
  const options = {
    chart: {
      id: "fb",
      group: "social",
      type: "line",
      height: 160,
    },
    colors: ["#008FFB"],
  };

  return (
    <div className={`${styles["grapicDiv"]}`}>
      <div
        className={
          darkThemeState
            ? `${styles["gCompDiv"]}`
            : `${styles["gCompDivLight"]}`
        }
      >
        <text className={`${styles["apexTextDiv"]}`}>Graphical Synopsis</text>
        <div>
          <div id="wrapper">
            <div id="chart-line">
              <ReactApexChart
                options={options}
                series={series}
                type="line"
                height={250}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
GraphicalSynopsisChart.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(GraphicalSynopsisChart);
