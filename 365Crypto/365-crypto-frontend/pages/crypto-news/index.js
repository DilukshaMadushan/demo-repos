import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import MenuBar from '../../components/CryptoNews/MenuBar';
import NewsFeed from '../../components/CryptoNews/NewsFeed';
import Chart from '../../components/CryptoNews/Chart';

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getFilteredCryptoNews,
  checkNextPageCryptoNews,
} from '../../actions/CryptoNews';
import Footer from '../../components/Layout/Footer';

const CryptoNews = ({ getFilteredCryptoNews, checkNextPageCryptoNews }) => {
  //SentimentChart Data States
  const [sentimentGraphState, setSentimentGraphState] = useState({
    positiveData: [],
    negativeData: [],
    neutralData: [],
    datesData: [],
  });

  //Next Prev Btns States
  const [pageState, setPageState] = useState(1);

  //CoinsDropdownStates
  const [isCoinsDropdownActive, setIsCoinsDropdownActive] = useState(false);
  const [coinsDropdownSelected, setCoinsDropdownSelected] = useState('Coins');

  //SentimentDropdownStates
  const [isSentimentDropdownActive, setIsSentimentDropdownActive] =
    useState(false);
  const [sentimentDropdownSelected, setSentimentDropdownSelected] =
    useState('Sentiment');

  //SentimentDropdownmobileStates
  const [isSentimentDropdownMobileActive, setIsSentimentDropdownMobileActive] =
    useState(false);
  const [sentimentDropdownMobileSelected, setSentimentDropdownMobileSelected] =
    useState('Sentiment');

  //DateRangeDropdownStates
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  //DateRangeDropdown set date range limit States
  const [isMaxDate, setIsMaxDate] = useState('');

  //dropdownsSelectionsStates
  const [dropdownsSelectionsData, setDropdownSelectionsData] = useState({
    dateRangeSelection: '',
    coinSelection: '',
    sentimentSelection: '',
    sentimentSelectionMobile: '',
    searchSelection: '',
  });

  const handleChange = (value, type) => {
    if (type === 'selectedDateRange') {
      setPageState(1);
      setDropdownSelectionsData({
        ...dropdownsSelectionsData,
        dateRangeSelection: value,
      });
      filterEvents(
        value,
        dropdownsSelectionsData.coinSelection,
        dropdownsSelectionsData.sentimentSelection,
        dropdownsSelectionsData.sentimentSelectionMobile,
        dropdownsSelectionsData.searchSelection,
        1
      );
    }
    if (type === 'selectedCoinId') {
      setPageState(1);
      setDropdownSelectionsData({
        ...dropdownsSelectionsData,
        coinSelection: value,
      });

      filterEvents(
        dropdownsSelectionsData.dateRangeSelection,
        value,
        dropdownsSelectionsData.sentimentSelection,
        dropdownsSelectionsData.sentimentSelectionMobile,
        dropdownsSelectionsData.searchSelection,
        1
      );
    }

    if (type === 'selectedSentimentOption') {
      setPageState(1);
      setDropdownSelectionsData({
        ...dropdownsSelectionsData,
        sentimentSelection: value,
      });
      filterEvents(
        dropdownsSelectionsData.dateRangeSelection,
        dropdownsSelectionsData.coinSelection,
        value,
        dropdownsSelectionsData.sentimentSelectionMobile,
        dropdownsSelectionsData.searchSelection,
        1
      );
    }

    if (type === 'selectedMobileSentimentOption') {
      setPageState(1);
      setDropdownSelectionsData({
        ...dropdownsSelectionsData,
        sentimentSelectionMobile: value,
      });
      filterEvents(
        dropdownsSelectionsData.dateRangeSelection,
        dropdownsSelectionsData.coinSelection,
        dropdownsSelectionsData.sentimentSelection,
        value,
        dropdownsSelectionsData.searchSelection,
        1
      );
    }

    if (type === 'searchInput') {
      setPageState(1);
      setDropdownSelectionsData({
        ...dropdownsSelectionsData,
        searchSelection: value,
      });
      filterEvents(
        dropdownsSelectionsData.dateRangeSelection,
        dropdownsSelectionsData.coinSelection,
        dropdownsSelectionsData.sentimentSelection,
        dropdownsSelectionsData.sentimentSelectionMobile,
        value,
        1
      );
    }
    if (type === 'pagePag') {
      filterEvents(
        dropdownsSelectionsData.dateRangeSelection,
        dropdownsSelectionsData.coinSelection,
        dropdownsSelectionsData.sentimentSelection,
        dropdownsSelectionsData.sentimentSelectionMobile,
        dropdownsSelectionsData.searchSelection,
        value
      );
    }
    if (type === 'clearAll') {
      setPageState(1);
      setDropdownSelectionsData({
        ...dropdownsSelectionsData,
        dateRangeSelection: value,
        coinSelection: value,
        sentimentSelection: value,
        sentimentSelectionMobile: value,
        searchSelection: value,
      });

      filterEvents(value, value, value, value, value, value);
    }
  };

  const filterEvents = (
    dateRange,
    coinId,
    sentimentBy,
    sentimentByMobile,
    searchBy,
    pageNo
  ) => {
    let filterURL = '';
    let nextPageFilterURL = '';

    if (dateRange !== '' && dateRange[1] !== null) {
      filterURL =
        filterURL +
        'date[gte]=' +
        dateRange[0].toISOString() +
        '&' +
        'date[lte]=' +
        dateRange[1].toISOString() +
        '&';
      //nextPage
      nextPageFilterURL =
        nextPageFilterURL +
        'dateEvent[gte]=' +
        dateRange[0].toString() +
        '&' +
        'dateEvent[lte]=' +
        dateRange[1].toString() +
        '&';
    }
    if (coinId !== '') {
      filterURL = filterURL + 'tickers=' + coinId + '&';
      //nextPage
      nextPageFilterURL = nextPageFilterURL + 'tickers=' + coinId + '&';
    }
    if (sentimentBy !== '') {
      filterURL = filterURL + sentimentBy + '&';
      //nextPage
      nextPageFilterURL = nextPageFilterURL + sentimentBy + '&';
    }
    if (sentimentByMobile !== '') {
      filterURL = filterURL + sentimentByMobile + '&';
      //nextPage
      nextPageFilterURL = nextPageFilterURL + sentimentByMobile + '&';
    }
    if (searchBy !== '') {
      filterURL = filterURL + 'search=' + searchBy + '&';
      //nextPage
      nextPageFilterURL = nextPageFilterURL + 'search=' + searchBy + '&';
    }
    if (pageNo > 0) {
      filterURL = filterURL + 'page=' + pageNo + '&';
      //nextPage
      nextPageFilterURL =
        nextPageFilterURL + 'page=' + parseFloat(pageNo + 1) + '&';
    }
    if (dateRange[1] !== null && searchBy === '') {
      getFilteredCryptoNews(filterURL);
      checkNextPageCryptoNews(nextPageFilterURL);
    }
    if (dateRange[1] !== null && searchBy.length >= 3) {
      getFilteredCryptoNews(filterURL);
      checkNextPageCryptoNews(nextPageFilterURL);
    }
  };

  //Scroll to top
  const newsPageRef = useRef(null);
  const PageScrollToTop = () => {
    (() => {
      newsPageRef.current.scrollIntoView();
    })();
  };

  //Next page data checking when loading first time
  useEffect(() => {
    checkNextPageCryptoNews('page=2');
  }, []);

  return (
    <div ref={newsPageRef}>
      <div className="container-fluid m-0 p-0">
        <div className="row mt-3 m-0 p-0">
          <MenuBar
            sentimentGraphState={sentimentGraphState}
            setSentimentGraphState={setSentimentGraphState}
            isCoinsDropdownActive={isCoinsDropdownActive}
            setIsCoinsDropdownActive={setIsCoinsDropdownActive}
            coinsDropdownSelected={coinsDropdownSelected}
            setCoinsDropdownSelected={setCoinsDropdownSelected}
            isSentimentDropdownActive={isSentimentDropdownActive}
            sentimentDropdownSelected={sentimentDropdownSelected}
            setSentimentDropdownSelected={setSentimentDropdownSelected}
            setIsSentimentDropdownActive={setIsSentimentDropdownActive}
            isSentimentDropdownMobileActive={isSentimentDropdownMobileActive}
            setIsSentimentDropdownMobileActive={
              setIsSentimentDropdownMobileActive
            }
            sentimentDropdownMobileSelected={sentimentDropdownMobileSelected}
            setSentimentDropdownMobileSelected={
              setSentimentDropdownMobileSelected
            }
            dateRange={dateRange}
            setDateRange={setDateRange}
            startDate={startDate}
            endDate={endDate}
            isMaxDate={isMaxDate}
            setIsMaxDate={setIsMaxDate}
            dropdownsSelectionsData={dropdownsSelectionsData}
            setDropdownSelectionsData={setDropdownSelectionsData}
            handleChange={handleChange}
          />
        </div>
        <div className="row m-0 p-0">
          <div className="col-md-7 m-0 p-0">
            <NewsFeed
              pageState={pageState}
              setPageState={setPageState}
              handleChange={handleChange}
              PageScrollToTop={PageScrollToTop}
            />
          </div>
          <div className="col-md-5 m-0 p-0">
            <Chart
              sentimentGraphState={sentimentGraphState}
              setSentimentGraphState={setSentimentGraphState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

CryptoNews.propTypes = {
  getFilteredCryptoNews: PropTypes.func.isRequired,
  checkNextPageCryptoNews: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cryptoNews: state.cryptoNews,
});

export default connect(mapStateToProps, {
  getFilteredCryptoNews,
  checkNextPageCryptoNews,
})(CryptoNews);
