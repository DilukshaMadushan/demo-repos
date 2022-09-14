import React from 'react';
import styles from './index.module.css';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSelectedSentiment } from '../../../../actions/CryptoNews';
import { checkNextPageCryptoNews } from '../../../../actions/CryptoNews';

const ClearButton = ({
  setCoinsDropdownSelected,
  setSentimentDropdownSelected,
  setDateRange,
  setSentimentDropdownMobileSelected,
  handleChange,
  setIsMaxDate,
  handleDateChangeforSentimentChart,
  setSelectedSentiment,
  checkNextPageCryptoNews,
}) => {
  const handleClearOnClick = () => {
    setDateRange([null, null]);
    setCoinsDropdownSelected('Coins');
    setSentimentDropdownSelected('Sentiment');
    setSentimentDropdownMobileSelected('Sentiment');
    setIsMaxDate('');
    handleDateChangeforSentimentChart('');
    checkNextPageCryptoNews('page=2');
  };
  return (
    <div className={`${styles.mainDiv}`}>
      <div
        className={`${styles.dropdownBtn}`}
        onClick={() => {
          handleClearOnClick();
          handleChange('');
          setSelectedSentiment('');
        }}
      >
        <span className={`${styles.title}`}>Clear</span>
      </div>
    </div>
  );
};

ClearButton.propTypes = {
  setSelectedSentiment: PropTypes.func.isRequired,
  checkNextPageCryptoNews: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cryptoNews: state.cryptoNews,
});

export default connect(mapStateToProps, {
  setSelectedSentiment,
  checkNextPageCryptoNews,
})(ClearButton);
