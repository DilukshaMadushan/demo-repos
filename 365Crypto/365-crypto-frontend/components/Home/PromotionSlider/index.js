import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./PromotionSlider.module.css";
import BackButton from "../UI/BackButton";
import NextButton from "../UI/NextButton";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Skeleton from "@material-ui/lab/Skeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStrapiHubBanner } from "../../../actions/Strapi";
// SET ENVIRONMENT BASE URL
const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;

const skeletonList = [{ id: "1" }, { id: "2" }];

const PromotionSlider = ({
  getStrapiHubBanner,
  strapi: { Articles_Hub_Data, IsLoading },
}) => {
  useEffect(() => {
    getStrapiHubBanner();
  }, []);

  return (
    <div className={styles.mainDiv}>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        customLeftArrow={<BackButton className={styles.backButton} />}
        customRightArrow={<NextButton className={styles.nextButton} />}
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
            items: 2,
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
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {IsLoading === true
          ? skeletonList.map((item, index) => (
              <div className={styles.imgDiv}>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={"100%"}
                  style={{ background: "#1b1a20" }}
                />
              </div>
            ))
          : Articles_Hub_Data &&
            Articles_Hub_Data.map((item, index) => (
              <div className={styles.imgDiv}>
                <a href={item.promo_link} target="_blank">
                  <img
                    className={styles.img}
                    src={`${STRAPI_BASE_URL}${item.hub_banner.url}`}
                    alt=""
                  />
                </a>
              </div>
            ))}
      </Carousel>

      <div className={styles.allExchangeBtnDiv}>
        <Link href="/exchanges-and-deals">
          <div>
            <button className={styles.allExchangeBtn}>
              See all exchange deals
              <IoIosArrowForward className={styles.arrowIcon} />
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};
PromotionSlider.propTypes = {
  getStrapiHubBanner: PropTypes.func.isRequired,
  strapi: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  strapi: state.strapi,
});
export default connect(mapStateToProps, { getStrapiHubBanner })(
  PromotionSlider
);
