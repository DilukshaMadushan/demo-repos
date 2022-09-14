import React, { useState, useEffect } from "react";
import SinglePost from "./SinglePost";
import styles from "./index.module.css";
import PrimaryButton from "../common/PrimaryButton";
import LoadingComp from "./LoadingComp";
import Link from "next/link";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWelcomeSocialFeeds } from "../../../actions/Home";
import EmptyDataHandler from "../../Layout/common/EmptyDataHandler";

const loadingDummyList = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
];

const TrendingPosts = ({
  getWelcomeSocialFeeds,
  home: { loadingWelcomeSocialFeeds, welcomeSocialFeedsList },
}) => {
  //Get welcome page social feeds
  useEffect(() => {
    getWelcomeSocialFeeds();
  }, []);

  return (
    <div className={styles.trendingposts}>
      <div className={styles.titleAndBtn}>
        <div>
          <h1 className={styles.title}>Social Feeds</h1>
        </div>

        <div className={styles.btn}>
          <Link href="/social-feeds">
            <div>
              <PrimaryButton>See All</PrimaryButton>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.postcontainer}>
        {loadingWelcomeSocialFeeds ? (
          loadingDummyList.map((item, index) => <LoadingComp key={index} />)
        ) : welcomeSocialFeedsList.length === 0 ? (
          <EmptyDataHandler type="TrendingPosts" />
        ) : (
          welcomeSocialFeedsList !== null &&
          welcomeSocialFeedsList.map((item, index) => (
            <SinglePost
              key={index}
              item={item}
              icon="reddit.png"
              image="cryptonews.png"
            />
          ))
        )}
      </div>
    </div>
  );
};
TrendingPosts.propTypes = {
  getWelcomeSocialFeeds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  home: state.home,
});

export default connect(mapStateToProps, {
  getWelcomeSocialFeeds,
})(TrendingPosts);
