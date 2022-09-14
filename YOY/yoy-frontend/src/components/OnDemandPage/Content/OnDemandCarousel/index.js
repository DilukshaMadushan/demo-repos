import React from "react";
import "react-multi-carousel/lib/styles.css";
import dynamic from "next/dynamic";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import Router from "next/router";
import NextButton from "@shared/Carousel/NextButton";
import BackButton from "@shared/Carousel/BackButton";
import Poster from "@shared/Carousel/Poster";

//Mock images
import prey from "@public/poster/prey.jpg";
import one from "@public/poster/1.jpg";
import drStrange from "@public/poster/dr-strange.jpg";
import extinction from "@public/poster/extinction.jpg";
import freedom from "@public/poster/freedom.jpg";
import hp from "@public/poster/hp.jpg";
import spiderman from "@public/poster/spiderman.jpg";

const Carousel = dynamic(() => import("react-multi-carousel"), {
  ssr: false,
});

const OnDemandCarousel = ({ setVisible, setData, data }) => {
  return (
    <div className={styles.container}>
      <header>
        <h2>{data.title}</h2>
        <h3
          onClick={() => Router.push("/on-demand/category/" + data.url_page_id)}
        >
          Ver más {`>`}
        </h3>
      </header>

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
            items: 7,
            partialVisibilityGutter: 40,
          },
          desktop: {
            breakpoint: {
              max: 1550,
              min: 1200,
            },
            items: 6,
            partialVisibilityGutter: 40,
          },
          laptop: {
            breakpoint: {
              max: 1200,
              min: 1024,
            },
            items: 6,
            partialVisibilityGutter: 40,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 768,
            },
            items: 5,
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: {
              max: 768,
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
        {data.data &&
          data.data.map((item, i) => (
            <div key={i} onClick={() => setData(item)}>
              <Poster
                src={item.default_image}
                cardVisible={setVisible}
                videoId={item.admin_video_id}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

OnDemandCarousel.propTypes = {};

export default OnDemandCarousel;
