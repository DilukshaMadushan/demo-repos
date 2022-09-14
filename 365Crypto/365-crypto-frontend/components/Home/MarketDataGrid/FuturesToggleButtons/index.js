import React, { useState } from "react";
import styles from "./index.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BackButton from "../BackButton";
import NextButton from "../NextButton";
import Skeleton from "@material-ui/lab/Skeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { webSocketParams1 } from "../../../../actions/Websocket";
import { getFuturesData } from "../../../../actions/MarketDataGraph";

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const skeletonList = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
];

const FuturesToggleButtons = ({
  exchange: { exchangeList, loadingExchange },
  webSocketParams1,
  getFuturesData,
  togglebuttonFutures,
  setTogglebuttonFutures,
}) => {
  return (
    <Carousel
      additionalTransfrom={0}
      // arrows
      // autoPlay
      // autoPlaySpeed={1000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      customLeftArrow={<BackButton />}
      customRightArrow={<NextButton />}
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 5,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 3,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 4,
          partialVisibilityGutter: 30,
        },
      }}
      showDots={false}
      sliderClass={`${styles["sldr-style"]}`}
      slidesToSlide={1}
      swipeable
    >
      {loadingExchange
        ? skeletonList.map((item, id) => (
            <div className={styles.FutureCoin}>
              <Skeleton
                style={{ background: "#232327" }}
                variant="rect"
                width={"100%"}
                height={"100%"}
              />
            </div>
          ))
        : exchangeList !== null &&
          exchangeList.map((item, id) => (
            <div
              key={id}
              className={
                togglebuttonFutures === item.name
                  ? styles.togglebutton
                  : styles.togglebuttonSelected
              }
              onClick={() => {
                setTogglebuttonFutures(item.name);
                webSocketParams1("future", item.name, null);
                getFuturesData(item._id, item.name);
              }}
            >
              <img
                className={`${styles["toggle-img"]}`}
                src={IMAGE_BASE_URL + item.image}
              />
            </div>
          ))}
    </Carousel>
  );
};

FuturesToggleButtons.propTypes = {
  exchange: PropTypes.object.isRequired,
  webSocketParams1: PropTypes.func.isRequired,
  getFuturesData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  exchange: state.exchange,
});
export default connect(mapStateToProps, {
  webSocketParams1,
  getFuturesData,
})(FuturesToggleButtons);
