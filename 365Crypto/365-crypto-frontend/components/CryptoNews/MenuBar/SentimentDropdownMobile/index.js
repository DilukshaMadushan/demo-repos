import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { IoCaretDown } from "react-icons/io5";
import OutsideClickHandler from "react-outside-click-handler";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setSelectedSentiment } from "../../../../actions/CryptoNews/index";

const SentimentDropdownMobile = ({
  isSentimentDropdownMobileActive,
  setIsSentimentDropdownMobileActive,
  sentimentDropdownSelected,
  setSentimentDropdownSelected,
  handleChange,
  sentimentGraphState,
  setSentimentGraphState,
  cryptoNews: { sentimentChartDataList, loadingSentimentChart },
  handleDateChangeforSentimentChart,
  setSelectedSentiment,
}) => {
  const DROPDOWN_OPTIONS = [
    {
      id: "1",
      title: "Positive",
      urlString: "sentiment=Positive",
      urlStringChart: "select=positive,date",
    },
    {
      id: "2",
      title: "Negative",
      urlString: "sentiment=Negative",
      urlStringChart: "select=negative,date",
    },
    {
      id: "3",
      title: "Neutral",
      urlString: "sentiment=Neutral",
      urlStringChart: "select=neutral,date",
    },
  ];

  return (
    <div className={`${styles.mainDiv}`}>
      <div className={`${styles.dropdown}`}>
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsSentimentDropdownMobileActive(false);
          }}
        >
          <div
            onClick={() =>
              setIsSentimentDropdownMobileActive(
                !isSentimentDropdownMobileActive
              )
            }
            className={`${styles.dropdownBtn}`}
          >
            <span className={`${styles.titleSpan}`}>
              {sentimentDropdownSelected}
            </span>
            <span className={`${styles.arrowSpan}`}>
              <IoCaretDown />
            </span>
          </div>
          {isSentimentDropdownMobileActive && (
            <div className={`${styles.dropdownContent}`}>
              {DROPDOWN_OPTIONS.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSentimentDropdownSelected(item.title);
                    setIsSentimentDropdownMobileActive(false);
                    handleChange(item.urlString);
                    handleDateChangeforSentimentChart(item.urlStringChart);
                    setSelectedSentiment(item.title);
                  }}
                  className={`${styles.dropdownItemDiv}`}
                >
                  <div className={`${styles.dropdownItem}`}>
                    <span>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

SentimentDropdownMobile.propTypes = {
  setSelectedSentiment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cryptoNews: state.cryptoNews,
});

export default connect(mapStateToProps, {
  setSelectedSentiment,
})(SentimentDropdownMobile);
