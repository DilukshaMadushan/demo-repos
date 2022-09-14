import React, { useEffect, useRef } from 'react';
import styles from './index.module.css';
import CryptoNewsCard from './CryptoNewsCard';
import CryptoNewsLoadingComp from './CryptoNewsLoadingComp';
import NewsNextPrevSection from './NewsNextPrevSection';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCryptoNews } from '../../../actions/CryptoNews';
import EmptyDataHandler from '../../Layout/common/EmptyDataHandler';

const NewsFeed = ({
  cryptoNews: { loadingCryptoNews, cryptoNewsList },
  getCryptoNews,
  pageState,
  setPageState,
  handleChange,
  PageScrollToTop,
}) => {
  //Scroll to top
  const cryptoNewsRef = useRef(null);
  const ScrollToTop = () => {
    (() => {
      cryptoNewsRef.current.scrollIntoView();
    })();
  };

  const LoadingCompsDummyList = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];

  //Getting CoinEventCards Data
  useEffect(() => {
    getCryptoNews();
  }, []);

  return (
    <div>
      {loadingCryptoNews ? (
        <div className={`${styles.mainDiv}`}>
          <div className={`${styles.newsFeedDiv}`}>
            {LoadingCompsDummyList.map(() => (
              <CryptoNewsLoadingComp />
            ))}
          </div>
        </div>
      ) : cryptoNewsList.length === 0 ? (
        <div className={`${styles.mainDiv}`}>
          <div className={`${styles.newsFeedDiv}`}>
            <EmptyDataHandler type="newsList" />
          </div>
        </div>
      ) : (
        <div className={`${styles.mainDiv}`}>
          <div className={`${styles.newsFeedDiv}`}>
            <div ref={cryptoNewsRef}></div>
            {cryptoNewsList !== null &&
              cryptoNewsList.map((item, index) => (
                <a href={item.news_url} target="_blank">
                  <CryptoNewsCard key={index} item={item} />
                </a>
              ))}
          </div>
        </div>
      )}
      <div className={`${styles.nextPrevBtnDiv}`}>
        <NewsNextPrevSection
          pageState={pageState}
          setPageState={setPageState}
          handleChange={handleChange}
          ScrollToTop={ScrollToTop}
          PageScrollToTop={PageScrollToTop}
        />
      </div>
    </div>
  );
};

NewsFeed.propTypes = {
  getCryptoNews: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cryptoNews: state.cryptoNews,
});

export default connect(mapStateToProps, { getCryptoNews })(NewsFeed);
