import React, { useRef, useEffect, useState } from "react";
import styles from "./dark.module.css";
import axios from "axios";
import SelectBox from "devextreme-react/select-box";
import {
  PolarChart,
  CommonSeriesSettings,
  Series,
  ArgumentAxis,
  ValueAxis,
  Margin,
  Export,
} from "devextreme-react/polar-chart";
// import { windSources, windRoseData } from "./data.js";
//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
const WindRoseChart = ({
  map: { searchedCity, heatPoints, loading, type, date },
}) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     periodValues: windRoseData[0].values,
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  // }

  var argMap = {
    "0.0": "N",
    "22.5": "NNE",
    "45.0": "NE",
    "67.5": "ENE",
    "90.0": "E",
    "112.5": "ESE",
    "135.0": "SE",
    "157.5": "SSE",
    "180.0": "S",
    "202.5": "SSW",
    "225.0": "SW",
    "247.5": "WSW",
    "270.0": "W",
    "292.5": "WNW",
    "315.0": "NW",
    "337.5": "NNW",
  };
  // const [position, setPosition] = useState(searchedCity);
  let {lg, lat} =searchedCity
  const [windData, setwindData] = useState();
  const [periodValues, setperiodValues] = useState();
  // let periodValues = [];
  let windSources = [
    { value: "val1", name: "1.3-4 m/s" },
    { value: "val2", name: "4-8 m/s" },
    { value: "val3", name: "8-13 m/s" },
    { value: "val4", name: "13-19 m/s" },
    { value: "val5", name: "19-25 m/s" },
    { value: "val6", name: "25-32 m/s" },
    { value: "val7", name: "32-39 m/s" },
    { value: "val8", name: "39-47 m/s" },
  ];
  // console.log("searched city",position);
  useEffect(() => {
    // getHeatPoints(date);
    async function fetchData() {
      async function fetchMyAPI() {
        const res = await axios.get(
          `https://power.larc.nasa.gov/api/application/windrose/point?Longitude=${lg}&latitude=${lat}&start=19900101&end=20141231&format=JSON`
        );
        // response = await res.json()
        setwindData(res.data.properties.parameter.WR10M);
        let resPeriodValues = [];
        // setperiodValues([]);
  
        for (var key in res.data.properties.parameter.WR10M) {
          if (key != "ALL") {
            if (res.data.properties.parameter.WR10M.hasOwnProperty(key)) {
              // console.log("key",typeof key);
              let values = {
                arg: argMap[key],
                val1: res.data.properties.parameter.WR10M[key].CLASSES.CLASS_1,
                val2: res.data.properties.parameter.WR10M[key].CLASSES.CLASS_2,
                val3: res.data.properties.parameter.WR10M[key].CLASSES.CLASS_3,
                val4: res.data.properties.parameter.WR10M[key].CLASSES.CLASS_4,
                val5: res.data.properties.parameter.WR10M[key].CLASSES.CLASS_5,
                val6: res.data.properties.parameter.WR10M[key].CLASSES.CLASS_6,
                val7: res.data.properties.parameter.WR10M[key].CLASSES.CLASS_7,
                val8: res.data.properties.parameter.WR10M[key].CLASSES.CLASS_8,
              };
  
              resPeriodValues.push(values);
            }
          }
        }
  
        // setperiodValues(resPeriodValues);
        return resPeriodValues;
        // periodValues=resPeriodValues;
      }
  
      // await fetchMyAPI();
      let pVals=await fetchMyAPI();
      console.log("realoaded");
      setperiodValues(pVals);
      console.log("NEw values",periodValues);
    }
    fetchData()
  }, [searchedCity]);

  return (
    <div className={`${styles["main-div"]}`}>
      <div className={`${styles["text-div"]}`}>
        <text className={`${styles["blue-text"]}`}>Wind.&nbsp;</text>
        <text>Seasonal Patterns</text>
      </div>
      <div id="chart-demo" className={`${styles["wind-img-div"]}`}>
       
        <PolarChart
          className={styles.radarChart}
          // width={50}
          // height={50}
          // id="radarChart"
          // palette="Soft"
          color="blue"
          dataSource={periodValues}
          // onLegendClick={this.onLegendClick}
          // title="Wind Rose, Philadelphia PA"
        >
          <CommonSeriesSettings type="stackedbar" className="commonSeries" />
          {windSources.map((item) => (
            <Series key={item.value} valueField={item.value} name={item.name} />
          ))}
          {/* <Margin bottom={0} left={0} right={0} top={0} /> */}
          <ArgumentAxis
            discreteAxisDivisionMode="crossLabels"
            firstPointOnStartAngle={false}
          />
          <ValueAxis valueMarginsEnabled={true} />
          <Export enabled={false} />
        </PolarChart>
      </div>
    </div>
  );

  // onLegendClick({ target: series }) {
  //   if (series.isVisible()) {
  //     series.hide();
  //   } else {
  //     series.show();
  //   }
  // }

  // handleChange({ value }) {
  //   this.setState({ periodValues: value });
  // }
};
const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps)(WindRoseChart);
