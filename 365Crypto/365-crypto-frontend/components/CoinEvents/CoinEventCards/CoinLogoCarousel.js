import React from "react";
import styles from "./index.module.css";
import "react-multi-carousel/lib/styles.css";
import dynamic from "next/dynamic";
const Carousel = dynamic(() => import("react-multi-carousel"), {
  ssr: false,
});

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const CoinLogoCarousel = ({ coins }) => {
  return (
    <div className={` ${styles.coinLogoMainDiv}`}>
      {coins.length === 0 ? (
        <div className={` ${styles.logoDiv}`}>
          <img
            className={` ${styles.logo}`}
            src="/no-image-available.jpg"
            alt="Coin"
          />
          <div className={` ${styles.coinNameDiv}`}>
            <div className={` ${styles.coinName}`}>
              <span></span>
            </div>
          </div>
        </div>
      ) : coins.length > 1 ? (
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          autoPlay
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          customLeftArrow={""}
          customRightArrow={""}
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
              items: 1,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 500,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 500,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable={false}
          draggable={false}
        >
          {coins.map((item, index) => (
            <div key={index} className={` ${styles.logoDiv}`}>
              <img
                className={` ${styles.logo}`}
                src={IMAGE_BASE_URL + item.image}
                alt={`${item.name} Coin`}
              />
              <div className={` ${styles.coinNameDiv}`}>
                <div key={index} className={` ${styles.coinName}`}>
                  <span>{item.symbol}</span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        coins.map((item, index) => (
          <div key={index} className={` ${styles.logoDiv}`}>
            <img
              className={` ${styles.logo}`}
              src={IMAGE_BASE_URL + item.image}
              alt={`${item.name} Coin`}
            />
            <div className={` ${styles.coinNameDiv}`}>
              <div key={index} className={` ${styles.coinName}`}>
                <span>{item.symbol}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CoinLogoCarousel;
