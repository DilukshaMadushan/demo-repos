import Head from "next/head";
import React, { useEffect } from "react";
import styles from "./index.module.css";
import EventCardDekstop from "./EventCardDekstop";
import EventCardMobile from "./EventCardMobile";
import EventCardDekstopLoadingComp from "./EventsCardDekstopLoadingComp";
import EventCardMobileLoadingComp from "./EventsCardMobileLoadingComp";
import { LogoJsonLd } from "next-seo";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCoinEventCards } from "../../../actions/CoinEvents";
import EmptyDataHandler from "../../Layout/common/EmptyDataHandler";

// SET ENVIRONMENT BASE URL
const FORUM_URL = process.env.FORUM_URL;
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const LoadingCompsDummyList = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
];

const CoinEventCards = ({
  coinEvents: { loadingCards, cardsList },
  getCoinEventCards,
}) => {
  //Getting CoinEventCards Data
  useEffect(() => {
    getCoinEventCards();
  }, []);

  return (
    <>
      <Head>
        <link rel="canonical" href={`${IMAGE_BASE_URL}coin-events`} />
        <title>
          Crypto Events: Crypto economic calendar events with proof and source -
          365crypto.com
        </title>
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="365 Crypto" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${IMAGE_BASE_URL}`} />
        <meta
          property="og:title"
          content="Best Crypto Charting Tools & Software: Promotional Deals and Reviews - 365crypto.com"
        />
        <meta
          name="title"
          content="Best Crypto Charting Tools & Software: Promotional Deals and Reviews - 365crypto.com"
        />
        <meta
          property="og:description"
          content="Keep track of all the trending and hot cryptocurrency economic calendar events in one place with reliable sources. "
        />
        <meta
          name="description"
          content="Keep track of all the trending and hot cryptocurrency economic calendar events in one place with reliable sources. "
        />
        <meta property="og:image" content={`${IMAGE_BASE_URL}main_logo.png`} />
        <meta name="thumbnail" content={`${IMAGE_BASE_URL}main_logo.png`} />
      </Head>
      <LogoJsonLd
        logo="https://365crypto.com/main_logo.png"
        url="https://365crypto.com"
      />
      <div className={`${styles.mainDiv}`}>
        <div className={` row ${styles.dekstopEventsDiv}`}>
          {loadingCards ? (
            LoadingCompsDummyList.map(() => <EventCardDekstopLoadingComp />)
          ) : cardsList.length === 0 ? (
            <EmptyDataHandler type="coinEventCards" />
          ) : (
            cardsList !== null &&
            cardsList.map((item, index) => (
              <EventCardDekstop item={item} key={index} />
            ))
          )}
        </div>

        <div className={` row ${styles.tabEventsDiv}`}>
          {loadingCards ? (
            LoadingCompsDummyList.map(() => <EventCardMobileLoadingComp />)
          ) : cardsList.length === 0 ? (
            <EmptyDataHandler type="coinEventCards" />
          ) : (
            cardsList !== null &&
            cardsList.map((item, index) => (
              <EventCardMobile item={item} key={index} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

CoinEventCards.propTypes = {
  getCoinEventCards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  coinEvents: state.coinEvents,
});

export default connect(mapStateToProps, { getCoinEventCards })(CoinEventCards);
