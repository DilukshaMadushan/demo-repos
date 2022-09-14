import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";
import SearchBar from "./SearchBar";
import CoinsDropdown from "./CoinsDropdown";
import ClearButton from "./ClearButton";
import SentimentDropdown from "./SentimentDropdown";
import DateRangeDropdown from "./DateRangeDropdown";
import SentimentDropdownMobile from "./SentimentDropdownMobile";
import { LogoJsonLd } from "next-seo";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getFilteredCryptoNews,
  getSentimentChartData,
  getFilteredSentimentChartData,
} from "../../../actions/CryptoNews";

// SET ENVIRONMENT BASE URL
const FORUM_URL = process.env.FORUM_URL;
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const MenuBar = ({
  getFilteredCryptoNews,
  getSentimentChartData,
  getFilteredSentimentChartData,
  sentimentGraphState,
  setSentimentGraphState,
  cryptoNews: { sentimentChartDataList, loadingSentimentChart },
  isCoinsDropdownActive,
  setIsCoinsDropdownActive,
  coinsDropdownSelected,
  setCoinsDropdownSelected,
  isSentimentDropdownActive,
  setIsSentimentDropdownActive,
  sentimentDropdownSelected,
  setSentimentDropdownSelected,
  isSentimentDropdownMobileActive,
  setIsSentimentDropdownMobileActive,
  sentimentDropdownMobileSelected,
  setSentimentDropdownMobileSelected,
  dateRange,
  setDateRange,
  startDate,
  endDate,
  isMaxDate,
  setIsMaxDate,
  dropdownsSelectionsData,
  setDropdownSelectionsData,
  handleChange,
}) => {
  //------------------Sentiment chart state ----------------------
  const [chartFilteringData, setChartFilteringData] = useState({
    chartDateRange: "",
    chartCoinId: "",
    sentimentString: "",
    sentimentMobileString: "",
  });

  const handleDateChangeforSentimentChart = (value, type) => {
    if (type === "selectedDateRangeForChart") {
      setChartFilteringData({
        ...chartFilteringData,
        chartDateRange: value,
      });
      filterSentimentChart(
        value,
        chartFilteringData.chartCoinId,
        chartFilteringData.sentimentString,
        chartFilteringData.sentimentMobileString
      );
    }

    if (type === "selectedCoinIdForChart") {
      setChartFilteringData({
        ...chartFilteringData,
        chartCoinId: value,
      });
      filterSentimentChart(
        chartFilteringData.chartDateRange,
        value,
        chartFilteringData.sentimentString,
        chartFilteringData.sentimentMobileString
      );
    }

    if (type === "selectedSentimentForChart") {
      setChartFilteringData({
        ...chartFilteringData,
        sentimentString: value,
      });
      filterSentimentChart(
        chartFilteringData.chartDateRange,
        chartFilteringData.chartCoinId,
        value,
        chartFilteringData.sentimentMobileString
      );
    }
    if (type === "selectedMobileSentimentForChart") {
      setChartFilteringData({
        ...chartFilteringData,
        sentimentMobileString: value,
      });
      filterSentimentChart(
        chartFilteringData.chartDateRange,
        chartFilteringData.chartCoinId,
        chartFilteringData.sentimentString,
        value
      );
    }

    if (type === "clear") {
      setChartFilteringData({
        ...chartFilteringData,
        chartDateRange: value,
        chartCoinId: value,
        sentimentString: value,
        sentimentMobileString: value,
      });
      filterSentimentChart(value, value, value, value);
      getSentimentChartData();
    }
  };

  //------------------Get filtered Sentiment chart data   ----------------------
  const filterSentimentChart = (
    dateRange,
    coinId,
    sentimentForURL,
    sentimentForURLMobile
  ) => {
    let chartFilterURL = "";

    if (dateRange !== "" && dateRange[1] !== null) {
      chartFilterURL =
        chartFilterURL +
        "date[gte]=" +
        dateRange[0].toString() +
        "&" +
        "date[lte]=" +
        dateRange[1].toString() +
        "&";
    }
    if (coinId !== "") {
      chartFilterURL = chartFilterURL + "coin=" + coinId + "&";
    }

    if (coinId !== "" && dateRange === "") {
      chartFilterURL = chartFilterURL + "limit=7&";
    }

    if (sentimentForURL !== "") {
      chartFilterURL = chartFilterURL + sentimentForURL + "&";
    }

    if (sentimentForURL !== "" && dateRange === "") {
      chartFilterURL = chartFilterURL + "limit=7&";
    }

    if (sentimentForURLMobile !== "") {
      chartFilterURL = chartFilterURL + sentimentForURLMobile + "&";
    }

    if (sentimentForURLMobile !== "" && dateRange === "") {
      chartFilterURL = chartFilterURL + "limit=7&";
    }

    if (dateRange !== "" && dateRange[1] !== null) {
      getFilteredSentimentChartData(chartFilterURL);
    }
    if (coinId !== "" && dateRange[1] !== null) {
      getFilteredSentimentChartData(chartFilterURL);
    }
    if (sentimentForURL !== "" && dateRange[1] !== null) {
      getFilteredSentimentChartData(chartFilterURL);
    }
    if (sentimentForURLMobile !== "" && dateRange[1] !== null) {
      getFilteredSentimentChartData(chartFilterURL);
    }
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={`${IMAGE_BASE_URL}crypto-news`} />
        <title>
          Crypto News: Latest Cryptocurrency News feed - 365crypto.com
        </title>
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Latest and hottest breaking cryptocurrency news feed with positive and negative sentiment data analytics."
        />
        <meta
          name="title"
          content="Crypto News: Latest Cryptocurrency News feed - 365crypto.com"
        />
        <meta property="og:site_name" content="365 Crypto" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${IMAGE_BASE_URL}crypto-news`} />
        <meta
          property="og:title"
          content="Crypto News: Latest Cryptocurrency News feed - 365crypto.com"
        />
        <meta
          property="og:description"
          content="Latest and hottest breaking cryptocurrency news feed with positive and negative sentiment data analytics."
        />
        <meta property="og:image" content={`${IMAGE_BASE_URL}main_logo.png`} />
        <meta name="thumbnail" content={`${IMAGE_BASE_URL}main_logo.png`} />
      </Head>
      <LogoJsonLd
        logo="https://365crypto.com/main_logo.png"
        url="https://365crypto.com"
      />
      <div className={`${styles.mainDiv}`}>
        <div className={`${styles.TitleDiv}`}>
          <div>
            <h1 className={`${styles.title}`}>Crypto News</h1>
          </div>
          <div className={` ${styles.searchInTitleBarDiv}`}>
            <SearchBar
              searchSelection={dropdownsSelectionsData.searchSelection}
              handleSearchInputChange={(searchInput) =>
                handleChange(searchInput, "searchInput")
              }
            />
          </div>
        </div>
        <div className={`${styles.menuBarDiv}`}>
          <div className={`row ${styles.menuBar}`}>
            <div className={`col-md m-0 p-0 ${styles.leftDiv}`}>
              <div className={`   ${styles.leftStDiv}`}>
                <DateRangeDropdown
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  startDate={startDate}
                  endDate={endDate}
                  isMaxDate={isMaxDate}
                  setIsMaxDate={setIsMaxDate}
                  handleChange={(selectedDateRange) =>
                    handleChange(selectedDateRange, "selectedDateRange")
                  }
                  handleDateChangeforSentimentChart={(
                    selectedDateRangeForChart
                  ) =>
                    handleDateChangeforSentimentChart(
                      selectedDateRangeForChart,
                      "selectedDateRangeForChart"
                    )
                  }
                />
              </div>
              <div className={`   ${styles.leftNdDiv}`}>
                <CoinsDropdown
                  isCoinsDropdownActive={isCoinsDropdownActive}
                  setIsCoinsDropdownActive={setIsCoinsDropdownActive}
                  coinsDropdownSelected={coinsDropdownSelected}
                  setCoinsDropdownSelected={setCoinsDropdownSelected}
                  handleChange={(selectedCoinId) =>
                    handleChange(selectedCoinId, "selectedCoinId")
                  }
                  handleDateChangeforSentimentChart={(selectedCoinIdForChart) =>
                    handleDateChangeforSentimentChart(
                      selectedCoinIdForChart,
                      "selectedCoinIdForChart"
                    )
                  }
                />
              </div>
              <div className={`  ${styles.leftRdDiv}`}>
                <SentimentDropdown
                  isSentimentDropdownActive={isSentimentDropdownActive}
                  setIsSentimentDropdownActive={setIsSentimentDropdownActive}
                  sentimentDropdownSelected={sentimentDropdownSelected}
                  setSentimentDropdownSelected={setSentimentDropdownSelected}
                  handleChange={(selectedSentimentOption) =>
                    handleChange(
                      selectedSentimentOption,
                      "selectedSentimentOption"
                    )
                  }
                  sentimentGraphState={sentimentGraphState}
                  setSentimentGraphState={setSentimentGraphState}
                  handleDateChangeforSentimentChart={(
                    selectedSentimentForChart
                  ) =>
                    handleDateChangeforSentimentChart(
                      selectedSentimentForChart,
                      "selectedSentimentForChart"
                    )
                  }
                />
              </div>
            </div>
            <div className={`col-md m-0 p-0 ${styles.rightDiv}`}>
              <div className={` ${styles.rightStDiv}`}>
                <SentimentDropdownMobile
                  isSentimentDropdownMobileActive={
                    isSentimentDropdownMobileActive
                  }
                  setIsSentimentDropdownMobileActive={
                    setIsSentimentDropdownMobileActive
                  }
                  sentimentDropdownSelected={sentimentDropdownSelected}
                  setSentimentDropdownSelected={setSentimentDropdownSelected}
                  handleChange={(selectedMobileSentimentOption) =>
                    handleChange(
                      selectedMobileSentimentOption,
                      "selectedMobileSentimentOption"
                    )
                  }
                  sentimentGraphState={sentimentGraphState}
                  setSentimentGraphState={setSentimentGraphState}
                  handleDateChangeforSentimentChart={(
                    selectedMobileSentimentForChart
                  ) =>
                    handleDateChangeforSentimentChart(
                      selectedMobileSentimentForChart,
                      "selectedMobileSentimentForChart"
                    )
                  }
                />
              </div>
              <div className={` ${styles.rightNdDiv}`}>
                <ClearButton
                  setDateRange={setDateRange}
                  setCoinsDropdownSelected={setCoinsDropdownSelected}
                  setSentimentDropdownSelected={setSentimentDropdownSelected}
                  setSentimentDropdownMobileSelected={
                    setSentimentDropdownMobileSelected
                  }
                  setIsMaxDate={setIsMaxDate}
                  handleChange={(clearAll) =>
                    handleChange(clearAll, "clearAll")
                  }
                  handleDateChangeforSentimentChart={(clear) =>
                    handleDateChangeforSentimentChart(clear, "clear")
                  }
                />
              </div>
              <div className={` ${styles.verticalLine}`}></div>
              <div className={` ${styles.rightRdDiv}`}>
                <SearchBar
                  searchSelection={dropdownsSelectionsData.searchSelection}
                  handleSearchInputChange={(searchInput) =>
                    handleChange(searchInput, "searchInput")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

MenuBar.propTypes = {
  getFilteredCryptoNews: PropTypes.func.isRequired,
  getSentimentChartData: PropTypes.func.isRequired,
  getFilteredSentimentChartData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cryptoNews: state.cryptoNews,
});

export default connect(mapStateToProps, {
  getFilteredCryptoNews,
  getSentimentChartData,
  getFilteredSentimentChartData,
})(MenuBar);
