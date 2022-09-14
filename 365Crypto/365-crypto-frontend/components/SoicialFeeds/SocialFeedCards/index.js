import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import DekstopCard from './DekstopCard';
import MobileCard from './MobileCard';
import DekstopCardLoadingComp from './DekstopCardLoadingComp';
import MobileCardsLoadingComp from './MobileCardsLoadingComp';

// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSocialFeeds } from '../../../actions/SocialFeeds';
import EmptyDataHandler from '../../Layout/common/EmptyDataHandler';

const DummyList = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
  { id: '9' },
];

const SocialFeedCards = ({
  getSocialFeeds,
  socialFeeds: { loadingSocialFeeds, socialFeedsList },
}) => {
  //Gett SocialFeeds
  useEffect(() => {
    getSocialFeeds();
  }, []);

  return (
    <div className={`${styles.mainDiv}`}>
      <div className={` row ${styles.dekstopViewNewsDiv}`}>
        {loadingSocialFeeds ? (
          DummyList.map((item, index) => <DekstopCardLoadingComp />)
        ) : socialFeedsList.length === 0 ? (
          <EmptyDataHandler type="coinEventCards" />
        ) : (
          socialFeedsList !== null &&
          socialFeedsList.map((item, index) => (
            <DekstopCard item={item} index={index} />
          ))
        )}
      </div>
      {/* ------------------------- ForSmallerDisplaySizes ------------------------- */}
      <div className={` row ${styles.tabletViewNewsDiv}`}>
        {loadingSocialFeeds ? (
          DummyList.map((item, index) => <MobileCardsLoadingComp />)
        ) : socialFeedsList.length === 0 ? (
          <EmptyDataHandler type="coinEventCards" />
        ) : (
          socialFeedsList !== null &&
          socialFeedsList.map((item, index) => (
            <MobileCard item={item} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

SocialFeedCards.propTypes = {
  getSocialFeeds: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  socialFeeds: state.socialFeeds,
});

export default connect(mapStateToProps, { getSocialFeeds })(SocialFeedCards);
