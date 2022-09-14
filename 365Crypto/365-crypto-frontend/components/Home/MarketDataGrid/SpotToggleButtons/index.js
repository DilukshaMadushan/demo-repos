import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BackButton from "../BackButton";
import NextButton from "../NextButton";
import Skeleton from "@material-ui/lab/Skeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { webSocketParams0 } from "../../../../actions/Websocket";
import { getCoinData } from "../../../../actions/SpotGraphData";

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const skeletonList = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
  { id: "9" },
  { id: "10" },
  { id: "11" },
  { id: "12" },
];

const ToggleButtons = ({
  webSocketParams0,
  getCoinData,
  coin: { loadingCoin, coinList },
  websocket: { coinData },
  spotGraphData: { coin_Id },
}) => {
  const [carousl, setCarousl] = useState(null);

  useEffect(() => {
    if (coin_Id) {
      let windowWidth = window.screen.width;
      const coinIds = coinList && coinList.map((item) => item && item._id);
      const coinIndex = coinIds && coinIds.indexOf(coin_Id);
      //mobile view
      if (windowWidth < 464) {
        if (coinIndex === 0) {
          carousl && carousl.goToSlide(32, true);
        }
        carousl && carousl.goToSlide(coinIndex + 7, true);
      }

      //tablet view
      if (windowWidth <= 1024) {
        if (coinIndex === 0) {
          carousl && carousl.goToSlide(35, true);
        }
        carousl && carousl.goToSlide(coinIndex + 10, true);
      }

      //pc view
      if (windowWidth >= 1024) {
        if (coinIndex === 0) {
          carousl && carousl.goToSlide(24, true);
        }
        carousl && carousl.goToSlide(coinIndex - 1, true);
      }
    }
  }, [coin_Id]);

  return (
    <Carousel
      ref={(el) => setCarousl(el)}
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
      focusOnSelect={true}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={true}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 12,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 3.5,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 5,
          partialVisibilityGutter: 30,
        },
      }}
      showDots={false}
      sliderClass={`${styles["sldr-style"]}`}
      slidesToSlide={1}
      swipeable
    >
      {loadingCoin
        ? skeletonList.map((item, id) => (
            <div className={styles.SpotCoin}>
              <Skeleton
                style={{ background: "#232327" }}
                variant="rect"
                width={"100%"}
                height={"100%"}
              />
            </div>
          ))
        : coinList !== null &&
          coinList.map((item, id) => (
            <div
              key={id}
              className={
                item.symbol === coinData
                  ? styles.togglebutton
                  : styles.togglebuttonSelected
              }
              onClick={() => {
                webSocketParams0("spot", item.symbol);
                getCoinData(item._id);
              }}
            >
              <img
                className={`${styles["toglle-btn"]}`}
                src={IMAGE_BASE_URL + item.image}
                alt={`${item.symbol} Coin`}
              />
              {item.symbol}
            </div>
          ))}
    </Carousel>
  );
};

ToggleButtons.propTypes = {
  coin: PropTypes.object.isRequired,
  webSocketParams0: PropTypes.func.isRequired,
  getCoinData: PropTypes.func.isRequired,
  websocket: PropTypes.object.isRequired,
  spotGraphData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  coin: state.coin,
  websocket: state.websocket,
  spotGraphData: state.spotGraphData,
});
export default connect(mapStateToProps, { webSocketParams0, getCoinData })(
  ToggleButtons
);
