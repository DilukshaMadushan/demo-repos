import React, { useState, useEffect } from 'react';
import SingleNews from './SingleNews';
import styles from './index.module.css';
import PrimaryButton from '../common/PrimaryButton';
import LoadingComp from './LoadingComp';
import Link from 'next/link';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWelcomeCryptoNews } from '../../../actions/Home';
import EmptyDataHandler from '../../Layout/common/EmptyDataHandler';

const loadingDummyList = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
];

const CryptoNews = ({
  getWelcomeCryptoNews,
  home: { loadingWelcomeCryptoNews, welcomeCryptoNewsList },
}) => {
  //Get welcome page crypto newa
  useEffect(() => {
    getWelcomeCryptoNews();
  }, []);

  return (
    <div className={styles.trendingposts}>
      <div className={styles.titleAndBtn}>
        <div className={styles.title}>Crypto News</div>
        <div className={styles.btn}>
          <Link href="/crypto-news">
            <div>
              <PrimaryButton>See All</PrimaryButton>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.postcontainer}>
        {loadingWelcomeCryptoNews ? (
          loadingDummyList.map((item, index) => <LoadingComp key={index} />)
        ) : welcomeCryptoNewsList.length === 0 ? (
          <EmptyDataHandler type="TrendingPosts" />
        ) : (
          welcomeCryptoNewsList !== null &&
          welcomeCryptoNewsList.map((item, index) => (
            <SingleNews key={index} item={item} />
          ))
        )}
      </div>
    </div>
  );
};
CryptoNews.propTypes = {
  getWelcomeCryptoNews: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  home: state.home,
});

export default connect(mapStateToProps, {
  getWelcomeCryptoNews,
})(CryptoNews);
