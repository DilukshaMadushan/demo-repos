import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PrimaryButton from "../common/PrimaryButton";
import BackButton from "../UI/BackButton";
import NextButton from "../UI/NextButton";
import CoinLogoCarousel from "./CoinLogoCarousel";
import LoadingComp from "./LoadingComp";
import Link from "next/link";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWelcomeCoinEvents } from "../../../actions/Home";
import EmptyDataHandler from "../../Layout/common/EmptyDataHandler";

const loadingDummyList = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
];

const CoinEventsSlider = ({
  getWelcomeCoinEvents,
  home: { loadingWelcomeCoinEvents, welcomeCoinEventsList },
}) => {
  //Get welcome page coin events
  useEffect(() => {
    getWelcomeCoinEvents();
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.upperDiv}>
        <div className={styles.title}>Coin Events</div>
        <Link href="/coin-events">
          <div className={styles.seeAllBtn}>
            <PrimaryButton>See All</PrimaryButton>
          </div>
        </Link>
      </div>
      <Carousel
        className={styles.carousel}
        additionalTransfrom={0}
        arrows
        customLeftArrow={<BackButton className={styles.backButton} />}
        customRightArrow={<NextButton className={styles.nextButton} />}
        //autoPlay
        //autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={1}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4.5,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 769,
              min: 0,
            },
            items: 1.5,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 769,
            },
            items: 3.5,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {loadingWelcomeCoinEvents
          ? loadingDummyList.map((item, index) => <LoadingComp />)
          : welcomeCoinEventsList.length === 0
          ? loadingDummyList.map((item, index) => (
              <div className={styles.card}>
                <EmptyDataHandler type="CoinsEventsSlider" />
              </div>
            ))
          : welcomeCoinEventsList.map((item, index) => (
              <div className={styles.lowerDiv} key={index}>
                <div className={styles.card}>
                  <a
                    className={styles.cardAnchor}
                    href={item.originalSource}
                    target="_blank"
                  >
                    <div className={styles.cardInsideUpperDiv}>
                      <CoinLogoCarousel coins={item.coins} />
                    </div>
                    <div className={styles.cardInsideLowerDiv}>
                      <div className={styles.infoDiv}>
                        <div className={styles.dateDiv}>
                          <div className={styles.date}>
                            {new Intl.DateTimeFormat("en-GB", {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }).format(new Date(item.dateEvent))}
                          </div>
                        </div>
                        <div className={styles.tag}>
                          <img
                            src="/hot-icon.png"
                            alt=""
                            title="Hot"
                            className={
                              item.isHot === true
                                ? styles.singleStatusIcon
                                : styles.singleStatusIconHide
                            }
                          />
                          <img
                            src="/trending-icon.png"
                            alt=""
                            title="Trending"
                            className={
                              item.isTrending === true
                                ? styles.singleStatusIcon
                                : styles.singleStatusIconHide
                            }
                          />
                          <img
                            src="/significant-icon.png"
                            alt=""
                            title="Significant"
                            className={
                              item.isSignificant === true
                                ? styles.singleStatusIcon
                                : styles.singleStatusIconHide
                            }
                          />
                        </div>
                      </div>
                      <div className={styles.event}>{item.title}</div>
                    </div>
                  </a>
                </div>
              </div>
            ))}
      </Carousel>
    </div>
  );
};

CoinEventsSlider.propTypes = {
  getWelcomeCoinEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  home: state.home,
});

export default connect(mapStateToProps, {
  getWelcomeCoinEvents,
})(CoinEventsSlider);
