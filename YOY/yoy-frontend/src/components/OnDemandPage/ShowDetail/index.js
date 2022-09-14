import React from "react";
import dynamic from "next/dynamic";
import "react-multi-carousel/lib/styles.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./index.module.css";
import BB from "/public/breakingbad.jpg";
import HP from "@public/poster/hp.jpg";
import HeaderContainer from "./HeaderContainer";
import BottomContainer from "./BottomContainer";
import BackButton from "@shared/Carousel/BackButton";
import NextButton from "@shared/Carousel/NextButton";

import Poster from "@shared/Carousel/Poster";

import SS from "@public/Capture.jpg";

const Carousel = dynamic(() => import("react-multi-carousel"), {
  ssr: false,
});

const dummy = [
  {
    id: 1,
    src: "/poster/spiderman.jpg",
  },
  {
    id: 2,
    src: "/poster/prey.jpg",
  },
  {
    id: 3,
    src: "/poster/dr-strange.jpg",
  },
  {
    id: 4,
    src: "/poster/extinction.jpg",
  },
  {
    id: 4,
    src: "/poster/freedom.jpg",
  },
  {
    id: 5,
    src: "/poster/hp.jpg",
  },
];

const ShowDetail = ({ onDemand: { videoViewState, videoViewSecondState } }) => {
  return (
    <div className={styles.container}>
      {videoViewState && (
        <div
          className={styles.header}
          style={{
            backgroundImage: `linear-gradient(180deg, #09002E00 0%, #07002E 100%),url(${videoViewState.banner_image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className={styles.subContainer}>
            <span>{videoViewState && <HeaderContainer />}</span>
          </div>
        </div>
      )}
      <div className={styles.subContainer} style={{ top: 0 }}>
        <span>
          {videoViewSecondState && videoViewSecondState.is_series === 1 && (
            <BottomContainer />
          )}
        </span>
      </div>
      {videoViewState && (
        <div className={styles.descriptionContainer}>
          <span>
            <div className={styles.subDescriptionContainer}>
              {/* <img src={SS.src} alt="SummaryThumbnail" /> */}
              <div>
                <video controls className={styles.videoStyle}>
                  <source src={videoViewState.trailer_video} />
                </video>
              </div>

              <div className={styles.description}>
                <div className={styles.content}>
                  <p>
                    <b>Resumen:</b>
                  </p>
                  <p>{videoViewState.description}</p>
                </div>
                <div className={styles.content}>
                  <p>
                    <b>Creador:</b>
                  </p>
                  <p>Vince Gilligan</p>
                </div>
                <div className={styles.content}>
                  <p>
                    <b>Reparto:</b>
                  </p>
                  <p>
                    Bryan Cranston , Anna Gunn , Aaron Paul , Dean Norris ,
                    Betsy Brandt , RJ Mitte Bob Odenkirk , Giancarlo Esposito ,
                    Jonathan Banks , Laura Fraser , Jesse Plemons
                  </p>
                </div>
              </div>
            </div>
          </span>
        </div>
      )}

      <div className={styles.carousel}>
        <div className={styles.carouselTitle}>
          <h4>Más títulos similares a este</h4>
        </div>
        <>
          <Carousel
            additionalTransfrom={0}
            arrows={true}
            autoPlay={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            customLeftArrow={<BackButton />}
            customRightArrow={<NextButton />}
            dotListClass=""
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={10}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              superLargeDesktop: {
                breakpoint: {
                  max: 3000,
                  min: 1560,
                },
                items: 6,
                partialVisibilityGutter: 100,
              },
              desktop: {
                breakpoint: {
                  max: 1550,
                  min: 1200,
                },
                items: 5,
                partialVisibilityGutter: 40,
              },
              laptop: {
                breakpoint: {
                  max: 1200,
                  min: 1024,
                },
                items: 5,
                partialVisibilityGutter: 40,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 768,
                },
                items: 3.5,
                partialVisibilityGutter: 30,
              },
              mobile: {
                breakpoint: {
                  max: 768,
                  min: 0,
                },
                items: 2.5,
                partialVisibilityGutter: 50,
              },
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable={true}
            draggable={true}
          >
            {dummy.map((i) => (
              <Poster src={i.src} key={i} />
            ))}
          </Carousel>
        </>
      </div>
    </div>
  );
};

ShowDetail.propTypes = {};

const mapStateToProps = (state) => ({
  onDemand: state.onDemand,
});

export default connect(mapStateToProps, {})(ShowDetail);
