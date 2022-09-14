import React, { useEffect } from 'react';
import styles from './index.module.css';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFilteredCryptoNews } from '../../../../actions/CryptoNews';

const NewsNextPrevSection = ({
  handleChange,
  pageState,
  setPageState,
  cryptoNews: { cryptoNewsList, pagination, nextPageCryptoNews },
  ScrollToTop,
  PageScrollToTop,
}) => {
  const PrevPageNoChanger = value => {
    if (pageState > 1) {
      setPageState(pageState - value);
      handleChange(pageState - value, 'pagePag');
    }
  };
  const NextPageNoChanger = value => {
    setPageState(pageState + value);
    handleChange(pageState + value, 'pagePag');
  };

  return (
    <div className={` ${styles.mainDiv}`}>
      <div className={` ${styles.btnSec}`}>
        <div className={` ${styles.prevBtnDiv}`}>
          {pagination.pre ? (
            <button
              onClick={() => {
                PrevPageNoChanger(1);
                ScrollToTop();
                PageScrollToTop();
              }}
              className={` ${styles.btn}`}
            >
              Prev
            </button>
          ) : (
            <div className={` ${styles.disableBtn}`}>Prev</div>
          )}
        </div>
        <div className={` ${styles.pageNoDiv}`}>Page {pageState}</div>
        <div className={` ${styles.nextBtnDiv}`}>
          {cryptoNewsList &&
          pagination.next &&
          cryptoNewsList.length !== 0 &&
          nextPageCryptoNews &&
          nextPageCryptoNews.length !== 0 ? (
            <button
              onClick={() => {
                NextPageNoChanger(1);
                ScrollToTop();
                PageScrollToTop();
              }}
              className={` ${styles.btn}`}
            >
              Next
            </button>
          ) : (
            <div className={` ${styles.disableBtn}`}>Next</div>
          )}
        </div>
      </div>
    </div>
  );
};

NewsNextPrevSection.propTypes = {
  getFilteredCryptoNews: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cryptoNews: state.cryptoNews,
});

export default connect(mapStateToProps, {
  getFilteredCryptoNews,
})(NewsNextPrevSection);
