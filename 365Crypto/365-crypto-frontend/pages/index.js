import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import PromotionSlider from "../components/Home/PromotionSlider";
import CoinEventsSlider from "../components/Home/CoinEventsSlider";
import SignupCTA from "../components/Home/SingupCTA";
import MarketDataGrid from "../components/Home/MarketDataGrid";
import TrendingPosts from "../components/Home/TrendingPosts";
import TradingTools from "../components/Home/TradingTools";
import StartTradingNow from "../components/Home/StartTradingNow";
import CryptoNewsFeed from "../components/Home/CryptoNewsFeed";
import { useRouter } from "next/router";
import { LoginContext } from "../components/Layout/common/LoginContext";
import Footer from "../components/Layout/Footer";
import { LogoJsonLd } from "next-seo";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setShowVerificationModal,
  setShowResetPasswordModal,
  verificationSubmitViaLink,
} from "../actions/Auth/index";
import { setSubscribeMsgModal } from "../actions/MyAccount";

// SET ENVIRONMENT BASE URL
const FORUM_URL = process.env.FORUM_URL;
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

function Home({
  query,
  setShowVerificationModal,
  setShowResetPasswordModal,
  verificationSubmitViaLink,
  setSubscribeMsgModal,
  auth: { verificationLoading },
}) {
  const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
    useContext(LoginContext);
  useEffect(() => {
    if (query.type === "register") {
      setModalShow(true);
      setLogin(false);
    } else if (query.type === "login") {
      setModalShow(true);
      setLogin(true);
    } else if (query.type === "reset-password") {
      setShowResetPasswordModal(true, query.token);
      setModalShow(true);
    } else if (query.type === "subscribe-success") {
      setSubscribeMsgModal(true);
    }

    if (query.redirect === "forum") {
      setRedirect({ status: true, redirectTo: "forum", url: `${FORUM_URL}` });
      console.log("redirects forum", redirect);
    }
  }, []);

  useEffect(() => {
    if (query.type === "verify") {
      setModalShow(true);
      setLogin(false);
      setShowVerificationModal(true);
      verificationSubmitViaLink(query.vcode, query.userid);
    }
  }, []);

  return (
    <div>
      <Head>
        <link rel="canonical" href={`${IMAGE_BASE_URL}`} />
        <title>
          Cryptocurrency Derivatives and Spot Data Analytics, Coin events,
          Crypto News, Social Trends, and more
        </title>
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="365 Crypto" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${IMAGE_BASE_URL}`} />
        <meta property="og:image" content={`${IMAGE_BASE_URL}main_logo.png`} />
        <meta
          property="og:description"
          content="Track cryptocurrency derivatives and spot data, coin events, crypto social media trends, cryptocurrency news feeds, as well as reviews of crypto trading tools and exchanges with 365crypto.com."
        />
        <meta
          name="og:title"
          content="Cryptocurrency Derivatives and Spot Data Analytics, Coin events, Crypto News, Social Trends, and more"
        />
        <meta
          name="description"
          content="Track cryptocurrency derivatives and spot data, coin events, crypto social media trends, cryptocurrency news feeds, as well as reviews of crypto trading tools and exchanges with 365crypto.com."
        />
        <meta
          name="title"
          content="Cryptocurrency Derivatives and Spot Data Analytics, Coin events, Crypto News, Social Trends, and more"
        />
        <meta name="thumbnail" content={`${IMAGE_BASE_URL}main_logo.png`} />
      </Head>
      <LogoJsonLd
        logo="https://365crypto.com/main_logo.png"
        url="https://365crypto.com"
      />

      <div className="container-fluid" style={{ backgroundColor: "#15141b" }}>
        <div className="row mt-3">
          <PromotionSlider />
        </div>

        <div className="row mt-3">
          <SignupCTA />
        </div>

        <div className="row mt-3" style={{ backgroundColor: "#15141B" }}>
          <MarketDataGrid />
        </div>

        <div className="row mt-3">
          <CoinEventsSlider />
        </div>

        <div className="row mt-3">
          <div className="col-md-6" style={{ paddingLeft: 0 }}>
            <div style={{ backgroundColor: "#15141B" }}>
              <TrendingPosts />
            </div>
          </div>
          <div className="col-md-6" style={{ paddingLeft: 0 }}>
            <div>
              <CryptoNewsFeed />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <TradingTools />
        </div>
        <div className="row mt-3">
          <StartTradingNow />
        </div>
      </div>
    </div>
  );
}
Home.getInitialProps = ({ query }) => {
  return { query };
};
Home.propTypes = {
  setShowVerificationModal: PropTypes.func.isRequired,
  verificationSubmitViaLink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setShowVerificationModal,
  verificationSubmitViaLink,
  setShowResetPasswordModal,
  setSubscribeMsgModal,
})(Home);
