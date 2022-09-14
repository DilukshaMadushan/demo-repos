import React, { useEffect } from "react";
import styles from "./index.module.css";
import dynamic from "next/dynamic";
import BackButton from "@shared/Carousel/BackButton";
import NextButton from "@shared/Carousel/NextButton";
import Poster from "@shared/Carousel/Poster";
import "react-multi-carousel/lib/styles.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideoViewSecond } from "@actions/OnDemand";
import Router from "next/router";
import store from "store";
import { SET_POPUP_MODAL } from "@actions/types";

const Carousel = dynamic(() => import("react-multi-carousel"), {
  ssr: false,
});

const Bottom = ({
  data,
  onDemand: { videoViewSecondState, homeFirstSectionData },
}) => {
  // Clicked card data.
  const onClickModalPopupCarousel = (data) => {
    store.dispatch({
      type: SET_POPUP_MODAL,
      payload: { visible: true, data: data },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {videoViewSecondState.is_series === 1 && (
          <header>
            <h3>Episodios</h3>
            <div className={styles.pagination}>
              Temporada 1
              <div className={styles.scroll}>
                <i className="fa fa-caret-up" aria-hidden="true"></i>
                <i className="fa fa-caret-down" aria-hidden="true"></i>
              </div>
            </div>
          </header>
        )}
        {videoViewSecondState.trailer_section &&
          videoViewSecondState.is_series === 1 &&
          videoViewSecondState.trailer_section.map((item, i) => (
            <main key={String(i)}>
              <div>
                <div className={styles.number}>{i + 1}</div>
                <div className={styles.mainCard}>
                  <div className={styles.mainCardLeft}>
                    {/* <img src={SS.src} alt="capture" /> */}
                    <video controls className={styles.videoStyle}>
                      <source src={item.resolutions.original} />
                    </video>
                  </div>

                  <div className={styles.mainCardRight}>
                    <h2>{item.name}</h2>
                    <div>
                      Walter White, un profesor de química de 50 años, comienza
                      a fabricar metanfetamina cristalizada en secreto para
                      mantener a su familia después de enterarse de que tiene
                      cáncer de pulmón terminal.
                    </div>
                  </div>
                </div>
                <div className={styles.duration}>54 min</div>
                <div className={styles.mainCardMobile}>
                  <div className={styles.mainCardMobileContainer}>
                    <div className={styles.number}>{i + 1}</div>
                    <div className={styles.mainCardLeft}>
                      {/* <img src={SS.src} alt="capture" /> */}
                      <video controls className={styles.videoStyle}>
                        <source src={item.resolutions.original} />
                      </video>
                    </div>
                    <div className={styles.mainCardRight}>
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                  <div className={styles.description}>
                    Walter White, un profesor de química de 50 años, comienza a
                    fabricar metanfetamina cristalizada en secreto para mantener
                    a su familia después de enterarse de que tiene cáncer de
                    pulmón terminal.
                  </div>
                  <div className={styles.duration}>54 min</div>
                </div>
              </div>

              <div className={styles.bottomDivider}>
                <div className={styles.divider} />
                <div>
                  <i
                    onClick={() =>
                      Router.push("/on-demand/shows/" + data.admin_video_id)
                    }
                    className="fa fa-chevron-down"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </main>
          ))}

        <footer>
          <h3>Más títulos similares a este</h3>
          <div className={styles.carousel}>
            <div>
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
                      min: 1550,
                    },
                    items: 3.5,
                    partialVisibilityGutter: 100,
                  },
                  desktop: {
                    breakpoint: {
                      max: 1550,
                      min: 1200,
                    },
                    items: 3.5,
                    partialVisibilityGutter: 40,
                  },
                  laptop: {
                    breakpoint: {
                      max: 1200,
                      min: 1024,
                    },
                    items: 3.5,
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
                      max: 767,
                      min: 0,
                    },
                    items: 2,
                    partialVisibilityGutter: 50,
                  },
                }}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable={true}
                draggable={true}
              >
                {homeFirstSectionData[1].data.map((i) => (
                  <div onClick={() => onClickModalPopupCarousel(i)} key={i}>
                    <Poster src={i.default_image} />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

Bottom.propTypes = {
  getOnDemandData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  onDemand: state.onDemand,
});

export default connect(mapStateToProps, { getVideoViewSecond })(Bottom);
