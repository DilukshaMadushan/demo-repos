import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Carousel from "./Carousel";
import FrequestQuestion from "./FrequentQuestion";
import BannerBottom from "./BannerBottom";

import Introduction from "./Introduction";
import BannerTop from "./BannerTop";
import TopNavBar from "./TopNavBar";
import Footer from "@shared/Footer";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getLandingData } from "@actions/Landing";
import Login from "@components/Login";

const LandingPage = ({ landing, getLandingData }) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [backgroundImage, setBackgroundImage] = useState("");
  const [bannerTopVideo, setBannerTopVideo] = useState("");

  useEffect(() => {
    getLandingData();
  }, []);

  useEffect(() => {
    if (landing.landingData != null) {
      console.log(landing.landingData.data.home_section_1_video);
      setBackgroundImage(landing.landingData.data.home_page_bg_image);
      setBannerTopVideo(landing.landingData.data.home_section_1_video);
    }
  }, [landing.landingData]);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: `linear-gradient(180deg, #09002E00 0%, #07002E 100%),url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height:
            windowSize.height < windowSize.width
              ? windowSize.height * 0.9
              : windowSize.height * 0.32,
        }}
      >
        <TopNavBar />

        <div
          className={styles.introContainer}
          style={{
            paddingTop:
              windowSize.height < windowSize.width
                ? windowSize.height * 0.4
                : 120,
          }}
        >
          <Introduction />
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.bannerContainer}>
          <BannerTop videoUrl={bannerTopVideo} />
        </div>

        <Carousel />

        <h2>Mira en cualquier dispositivo</h2>

        <h5>
          YOY está disponible para todos los tamaños de dispositivos. Mira tu
          contenido en dispositivos tan pequeños como teléfonos móviles, así
          como en pantallas grandes.
        </h5>

        <div className={styles.bottomTv}>
          <img src="/bottom-tv.png" alt="bottom-tv" />
        </div>

        <FrequestQuestion />

        <BannerBottom />
        <Footer />
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  getLandingData: PropTypes.func.isRequired,
  landing: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  landing: state.landing,
});

export default connect(mapStateToProps, {
  getLandingData,
})(LandingPage);
