import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.css";
import dynamic from "next/dynamic";
import PosterCard from "./PosterCard";
import NextButton from "./NextButton";
import BackButton from "./BackButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHomeFirstSection } from "@actions/OnDemand";

const Carousel = dynamic(() => import("react-multi-carousel"), {
  ssr: false,
});

const Header = ({ getHomeFirstSection, onDemand }) => {
  useEffect(() => {
    getHomeFirstSection();
  }, []);

  return (
    <div className={styles.container}>
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
            items: 1,
            partialVisibilityGutter: 40,
          },
          desktop: {
            breakpoint: {
              max: 1550,
              min: 1200,
            },
            items: 1,
            partialVisibilityGutter: 40,
          },
          laptop: {
            breakpoint: {
              max: 1200,
              min: 1024,
            },
            items: 1,
            partialVisibilityGutter: 40,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 768,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: {
              max: 768,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 50,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable={true}
        draggable={true}
      >
        {onDemand.bannerData &&
          onDemand.bannerData.map((item, i) => (
            <PosterCard image={item.banner_image} item={item} key={String(i)} />
          ))}
      </Carousel>
    </div>
  );
};

Header.propTypes = {
  getOnDemandData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  onDemand: state.onDemand,
});

export default connect(mapStateToProps, {
  getHomeFirstSection,
})(Header);
