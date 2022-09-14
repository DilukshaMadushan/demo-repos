import React from "react";
import styles from "./index.module.css";
import BB from "/public/breakingbad.jpg";
import HP from "@public/poster/hp.jpg";
import PropTypes from "prop-types";
import { addToWishList } from "@actions/OnDemand";
import { useDispatch, useSelector, connect } from "react-redux";
import Router from "next/router";

import { SET_LIKE_MODAL, SET_SHARE_MODAL } from "@actions/types";
import PlayButton from "@components/OnDemandPage/Header/PosterCard/PosterDetails/PlayButton";

const HeaderContainer = ({
  onDemand: { videoViewState, videoViewSecondState },
  addToWishList,
}) => {
  const dispatch = useDispatch();
  const likeModal = useSelector((state) => state.site.likeModal);
  const shareModal = useSelector((state) => state.site.shareModal);

  const toggleShareModal = () => {
    dispatch({
      type: SET_SHARE_MODAL,
      payload: {
        visible: !shareModal.visible,
        title: videoViewState.title,
        image: videoViewState.default_image,
        videoId: videoViewState.admin_video_id,
      },
    });
  };

  const toggleLikeModal = () => {
    dispatch({
      type: SET_LIKE_MODAL,
      payload: {
        visible: !likeModal.visible,
        title: videoViewState.title,
        image: videoViewState.default_image,
        videoId: videoViewState.admin_video_id,
      },
    });
  };

  return (
    <div className={styles.container}>
      <header>
        <i
          onClick={() => Router.push("/on-demand")}
          className="fa fa-chevron-circle-left"
          aria-hidden="true"
          style={{ cursor: "pointer" }}
        ></i>

        <img src={process.env.SITE_LOGO} alt="SiteLogo" />
      </header>
      <div className={styles.leftSide}>
        <img src={videoViewState.default_image} alt="cardImage" />
      </div>
      <div className={styles.rightSide}>
        <h2>{videoViewState.title}</h2>
        <h4>{videoViewState.is_Series === 1 ? "Series" : "Movie"}</h4>
        <h6>
          5 temporadas - {videoViewState.publish_time.substring(0, 4)} - EUA
        </h6>
        <h5>
          <b>Categories:</b> Action, Horror
        </h5>
        <p>{videoViewState.description}</p>
      </div>
      <footer>
        {/* <button>
          <i className="fa fa-play" aria-hidden="true"></i>
          Reproducir
        </button> */}
        <PlayButton title="Reproducir" />

        <div className={styles.icons} onClick={toggleLikeModal}>
          <img src="/ondemand/like.png" alt="Like"></img>
        </div>
        <div className={styles.icons} onClick={toggleShareModal}>
          <img src="/ondemand/share.png" alt="Share"></img>
        </div>
        <div className={styles.icons}>
          <img
            onClick={() => addToWishList(videoViewState.admin_video_id)}
            src="/ondemand/plus.png"
            alt="Add"
          ></img>
        </div>

        {/* <i
          style={{ color: "white", fontSize: "30px" }}
          className="fa fa-heart-o"
          aria-hidden="true"
        ></i>
        <div className={styles.iconContainer} onClick={toggleShareModal}>
          <i className="fa fa-share-alt" aria-hidden="true"></i>
        </div>
        <div className={styles.iconContainer}>
          <i
            onClick={() => addToWishList(videoViewState.admin_video_id)}
            className="fa fa-plus"
            aria-hidden="true"
          ></i>
        </div> */}
      </footer>
    </div>
  );
};

HeaderContainer.propTypes = {};

const mapStateToProps = (state) => ({
  onDemand: state.onDemand,
});

export default connect(mapStateToProps, { addToWishList })(HeaderContainer);
