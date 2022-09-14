import React from "react";
import styles from "./index.module.css";
import PlayButton from "./PlayButton";
import TrailerButton from "./TrailerButton";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToWishList } from "@actions/OnDemand";

import { SET_LIKE_MODAL, SET_SHARE_MODAL } from "@actions/types";

const PosterDetails = ({ item, addToWishList, onDemand }) => {
  const dispatch = useDispatch();
  const likeModal = useSelector((state) => state.site.likeModal);
  const shareModal = useSelector((state) => state.site.shareModal);

  const toggleShareModal = () => {
    dispatch({
      type: SET_SHARE_MODAL,
      payload: {
        visible: !shareModal.visible,
        title: item.title,
        image: item.default_image,
        videoId: item.admin_video_id,
      },
    });
  };

  const toggleLikeModal = () => {
    dispatch({
      type: SET_LIKE_MODAL,
      payload: {
        visible: !likeModal.visible,
        title: item.title,
        image: item.default_image,
        videoId: item.admin_video_id,
      },
    });
  };

  const convertDuration = (duration) => {
    let timeArray = duration.split(":");
    return timeArray[0] + "h " + timeArray[1] + "m";
  };

  const addRemoveToWishList = (videoId) => {
    addToWishList(videoId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{item.title}</h2>
      </div>

      <div className={styles.description}>
        <h6>{item.description}</h6>
      </div>

      <div className={styles.timeRow}>
        <div className={styles.edge}>
          <h6>{item.publish_time}</h6>
        </div>
        <div className={styles.mid}>
          <h6>{item.age}</h6>
        </div>
        <div className={styles.edge}>
          <h6>{convertDuration(item.duration)}</h6>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <div className={styles.PlayButton}>
          <PlayButton title="Reproducir" />
        </div>
        <div className={styles.TrailerButton}>
          <TrailerButton title="Tráiler" />
        </div>
        <div className={styles.icons} onClick={toggleLikeModal}>
          <img src="/ondemand/like.png" alt="Like"></img>
        </div>
        <div className={styles.icons} onClick={toggleShareModal}>
          <img src="/ondemand/share.png" alt="Share"></img>
        </div>
        <div className={styles.icons}>
          <img
            onClick={() => addRemoveToWishList(item.admin_video_id)}
            src="/ondemand/plus.png"
            alt="Add"
          ></img>
        </div>
      </div>
    </div>
  );
};

PosterDetails.propTypes = {};

const mapStateToProps = (state) => ({
  onDemand: state.onDemand,
});

export default connect(mapStateToProps, {
  addToWishList,
})(PosterDetails);
