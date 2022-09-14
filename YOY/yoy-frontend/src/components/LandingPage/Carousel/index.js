import React from "react";
import "react-multi-carousel/lib/styles.css";
import dynamic from "next/dynamic";
import NextButton from "@shared/Carousel/NextButton";
import BackButton from "@shared/Carousel/BackButton";
import styles from "./index.module.css";
import Poster from "@shared/Carousel/Poster";

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
    src: "poster/dr-strange.jpg",
  },
  {
    id: 4,
    src: "poster/extinction.jpg",
  },
  {
    id: 4,
    src: "poster/freedom.jpg",
  },
  {
    id: 5,
    src: "poster/hp.jpg",
  },
];

const Caresel = () => {
  return (
    <div className={styles.container}>
      <h2>Todo lo que amas de la TV</h2>

      <h5>
        Mira temporadas completas de series exclusivas, episodios de la
        temporada actual, películas exitosas, programas para niños y más.
      </h5>
      <div className={styles.carousel}>
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
          {dummy.map(i => (
            <Poster src={i.src} key={i} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Caresel;
