import styles from "./index.module.css";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Legend from "./Legend";

//Hardcoded data array list
import { objArr } from "./dataPoints";
import SearchBox from "./SearchBox";
import ToggleButtons from "./ToggleButtons";
import ZoomButtons from "./ZoomButtons";
import { useRouter } from "next/router";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getHeatPoints } from "../../../actions/Map";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5kcmVsaXZ5IiwiYSI6ImNrdmtqMmh4dTBxeGwycW4xbWNhemJlNWsifQ.1MNWkNAY7IE32ZDYt7b5sw";

const Map = ({
  map: { searchedCity, heatPoints, loading, type, date },
  getHeatPoints,
}) => {
  const mapContainerRef = useRef(null);
  const canvasRef = useRef(null);

  const [zoom, setZoom] = useState(14);
  const [points, setPoints] = useState([]);
  const { pathname } = useRouter();

  useEffect(() => {
    getHeatPoints(date);
  }, [date]);

  useEffect(() => {
    if (heatPoints.length > 0) {
      const pointArr = heatPoints.map((item) => {
        if (item.lat !== null && item.lon !== null)
          return [item.lon, item.lat, item[type]];
      });

      setPoints(pointArr);
    } else {
      setPoints([]);
    }
  }, [searchedCity, heatPoints, type]);

  //@desc                       Initialize map
  //@desc                       Initialize canvas
  //@desc                       Initialize greadient point
  //@desc                       When component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      canvas.style.display = "none";
    }
    //Converted gradient points list array
    var arr = []; //Canvas width & height by initialized div width & height
    const resX = 400;
    const resY = 400;

    ctx.fillRect(0, 0, resX, resY);
    //Get canvas image data
    var imageData = ctx.getImageData(0, 0, resX, resY);
    var rawData = imageData.data;

    //@desc                     Points distance calculator
    //@x1                       p.x
    //@y1                       p.y
    //@x2                       arr[i].x
    //@y2                       arr[i].y
    function metric(x1, y1, x2, y2) {
      var f = resX / resY;

      var x = x2 - x1;
      var y = y2 - y1;

      x = x * x * f;

      y = (y * y) / f;

      return 1 / (x + y);
    }
    //@desc               Canvas gredient points calculator
    //@desc               Getting Mapbox Canvas and turn into image rawdata by pixels
    //@desc               Adding gredient ponits data(r,g,b,a) as extra data for rawData
    //@sumDist            Gradient point visualizing distance area value
    function drawGradient() {
      var p = { x: 0, y: 0 };

      function calculateDist(p) {
        //Gradient point distance area value
        var sumDist = 50000;

        // var maxDist = 10000;

        for (var i = 0; i < arr.length; i++) {
          var d = metric(p.x, p.y, arr[i].x, arr[i].y);
          d += 0.001;
          arr[i].dist = d;
        }

        for (i = 0; i < arr.length; i++) {
          sumDist += arr[i].dist;
        }

        for (i = 0; i < arr.length; i++) {
          arr[i].weight = arr[i].dist / sumDist;
        }
      }
      //Calculating r,g,b,a
      for (var y = 0; y < resY; y++) {
        for (var x = 0; x < resX; x++) {
          p.x = x / resX;
          p.y = y / resY;

          calculateDist(p);

          var r = 0;
          var g = 0;
          var b = 0;
          var a = 0; //Transaperence  Value

          for (var i = 0; i < arr.length; i++) {
            r += arr[i].v[0] * arr[i].weight;
            g += arr[i].v[1] * arr[i].weight;
            b += arr[i].v[2] * arr[i].weight;
            a += arr[i].v[3] * arr[i].weight;
          }

          r = Math.floor(Math.min(255, r));
          g = Math.floor(Math.min(255, g));
          b = Math.floor(Math.min(255, b));
          a = Math.floor(Math.min(255, a));

          var index = (x + y * resX) * 4;

          rawData[index] = r;
          rawData[index + 1] = g;
          rawData[index + 2] = b;
          rawData[index + 3] = a;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }

    drawGradient();
    //MapBox intial data adding
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      // center: [54.61591, 24.42729],
      center: [searchedCity.lg, searchedCity.lat],
      zoom: zoom,
      attributionControl: false,
    });
    //Canvas Initial points converting to x&y

    const point1 = map.project([54.6, 24.445]);
    const point2 = map.project([54.644, 24.445]);
    const point3 = map.project([54.644, 24.405]);
    const point4 = map.project([54.6, 24.405]);
    //Canvas width calculating
    const width = Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
    );
    //Canvas height calculating
    const height = Math.sqrt(
      Math.pow(point1.x - point4.x, 2) + Math.pow(point1.y - point4.y, 2)
    );

    //Points array converting to canvas points
    points.map((item) => {
      //Lat&Lon converting to x&y length
      const pointProject = map.project(item);
      //Lat&Lon converting to canvas values
      const xx = (pointProject.x - point1.x) / width;
      const yy = (pointProject.y - point1.y) / height;
      //Set coloer specific to the temperature values
      let temperatureValue = item[2];
      let v;

      if (temperatureValue <= 15) {
        v = [29, 9, 187, 255];
      } else if (temperatureValue <= 20) {
        v = [15, 39, 239, 255];
      } else if (temperatureValue <= 25) {
        v = [22, 104, 175, 255];
      }else if (temperatureValue <= 32) {
        v = [0, 145, 208, 255];
      }else if (temperatureValue <= 35) {
        v = [160, 221, 208, 255];
      } else if (temperatureValue <= 40) {
        v = [255, 218, 0, 255];
      } else if (temperatureValue <= 41) {
        v = [237, 49, 49, 255];
      } else if (temperatureValue <= 44) {
        v = [255, 129, 32, 255];
      } else if (temperatureValue <= 46) {
        v = [240, 60, 110, 255];
      } else {
        v = [240, 60, 110, 255];
      }

      //Heat points adding to arr (array)
      arr.push({
        x: xx,
        y: yy,
        v: v,
        dist: 0,
        weight: 0,
      });
    });

    drawGradient();

    map.on("load", () => {
      map.addSource("canvas-source", {
        type: "canvas",
        canvas: canvas,
        coordinates: [
          [54.6, 24.445], //top left(lng,lat)
          [54.644, 24.445], //top right(lng,lat)
          [54.644, 24.405], //bottom left(lng,lat)
          [54.6, 24.405], //bottom right(lng,lat)
        ],
      });

      map.addLayer({
        id: "canvas-layer",
        type: "raster",
        source: "canvas-source",
      });
    });

    map.on("click", (e) => {
      console.log(e);
    });

    // Clean up on unmount
    return () => map.remove();
  }, [points, zoom]);

  return (
    <div className={`${styles["main-div"]}`}>
      {/* <text>
        {date.toString()}
        {type && type.toString()}
      </text> */}
      <div className={`${styles["map-image-div"]}`}>
        <div className={`row m-0 p-0 ${styles["Search-div"]}`}>
          <div className={`row p-0 m-0 ${styles["search-top-div"]}`}>
            <SearchBox />
            {pathname === "/" && <ToggleButtons />}
          </div>
          <div className={`${styles["zoom-div"]}`}>
            <ZoomButtons setZoom={setZoom} zoom={zoom} />
          </div>
        </div>

        {/* <div className="sidebarStyle">
              <div>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
              </div>
            </div> */}
        <canvas
          className={`${styles["canvas"]}`}
          ref={canvasRef}
          width="400"
          height="400"
          color="#404040"
        />
        <div className={`${styles["legend-div"]}`}>
          {pathname === "/" && <Legend />}
        </div>
        <div className={`${styles["map-container"]}`} ref={mapContainerRef} />
      </div>
    </div>
  );
};

Map.propTypes = {
  getHeatPoints: PropTypes.func.isRequired,
  map: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps, { getHeatPoints })(Map);
