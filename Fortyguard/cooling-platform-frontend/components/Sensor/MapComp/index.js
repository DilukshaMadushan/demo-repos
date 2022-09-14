import dark from "./dark.module.css";
import light from "./light.module.css";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

//Hardcoded data array list
import { objArr } from "./dataPoints";
import SearchBox from "./SearchBox";
import ToggleButtons from "./ToggleButtons";
import ZoomButtons from "./ZoomButtons";
import { useRouter } from "next/router";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getLocationPoints,
  getSensorArrayDetails,
} from "../../../actions/Sensor";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5kcmVsaXZ5IiwiYSI6ImNrdmtqMmh4dTBxeGwycW4xbWNhemJlNWsifQ.1MNWkNAY7IE32ZDYt7b5sw";

const MapComp = ({
  getLocationPoints,
  getSensorArrayDetails,
  sensor: { isLoading, sensorDataList },
  common: { darkThemeState },
}) => {
  const mapContainerRef = useRef(null);
  const canvasRef = useRef(null);

  const [zoom, setZoom] = useState(2);
  const [points, setPoints] = useState([]);
  const { pathname } = useRouter();

  useEffect(() => {
    getLocationPoints();
  }, []);

  useEffect(() => {
    getSensorArrayDetails(sensorDataList && sensorDataList[0].name);
  }, [sensorDataList]);

  useEffect(() => {
    if (sensorDataList) {
      //MapBox intial data adding
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: [
          sensorDataList[0].location.lon,
          sensorDataList[0].location.lat,
        ],
        zoom: zoom,
        attributionControl: false,
      });

      map.on("load", () => {
        // Add an image to use as a custom marker
        map.loadImage(
          "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
          (error, image) => {
            if (error) throw error;
            map.addImage("custom-marker", image);
            // Add a GeoJSON source with 2 points
            map.addSource("points", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                //
                features:
                  sensorDataList &&
                  sensorDataList.map((item) => ({
                    // feature for Mapbox DC
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [item.location.lon, item.location.lat],
                    },
                    properties: {
                      title: `${item.name}`,
                    },
                  })),
              },
            });

            // Add a symbol layer
            map.addLayer({
              id: "points",
              type: "symbol",
              source: "points",
              layout: {
                "icon-image": "custom-marker",
                // get the title name from the source's "title" property
                "text-field": ["get", "title"],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 1.25],
                "text-anchor": "top",
              },
            });
          }
        );
      });
    }
  }, [sensorDataList]);

  return (
    <div className={`${darkThemeState ? dark["main-div"] : light["main-div"]}`}>
      <div
        className={`${
          darkThemeState ? dark["map-image-div"] : light["map-image-div"]
        }`}
      >
        <div
          className={`row m-0 p-0 ${
            darkThemeState ? dark["Search-div"] : light["Search-div"]
          }`}
        >
          <div
            className={`row p-0 m-0 ${
              darkThemeState ? dark["search-top-div"] : light["search-top-div"]
            }`}
          >
            <SearchBox />
          </div>
          <div
            className={`${
              darkThemeState ? dark["zoom-div"] : light["zoom-div"]
            }`}
          >
            <ZoomButtons setZoom={setZoom} zoom={zoom} />
          </div>
        </div>
        <div
          className={`${
            darkThemeState ? dark["map-container"] : light["map-container"]
          }`}
          ref={mapContainerRef}
        />
      </div>
    </div>
  );
};

MapComp.propTypes = {
  getLocationPoints: PropTypes.func.isRequired,
  getSensorArrayDetails: PropTypes.func.isRequired,
  sensor: PropTypes.object.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
  sensor: state.sensor,
});

export default connect(mapStateToProps, {
  getLocationPoints,
  getSensorArrayDetails,
})(MapComp);
