import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToWishList } from "@actions/OnDemand";
import PlayButton from "@components/OnDemandPage/Header/PosterCard/PosterDetails/PlayButton";
import { SET_LIKE_MODAL, SET_SHARE_MODAL } from "@actions/types";

const Top = ({
  data,
  closeModal,
  onDemand: { videoViewState, videoViewSecondState },
  addToWishList,
}) => {
  const dispatch = useDispatch();
  const likeModal = useSelector(state => state.site.likeModal);
  const shareModal = useSelector(state => state.site.shareModal);

  const toggleLikeModal = (title, image) => {
    dispatch({
      type: SET_LIKE_MODAL,
      payload: {
        visible: !likeModal.visible,
        title: title,
        image: image,
        videoId: null,
      },
    });
  };

  const togglShareModal = (title, image) => {
    dispatch({
      type: SET_SHARE_MODAL,
      payload: {
        visible: !shareModal.visible,
        title: title,
        image: image,
        videoId: null,
      },
    });
  };

  return (
    <div className={styles.cardTopContainer}>
      <header>
        <header>
          <i
            onClick={() => closeModal()}
            className="fa fa-chevron-circle-left"
            aria-hidden="true"
          ></i>
        </header>
      </header>
      <div className={styles.leftSide}>
        <img src={data.default_image} alt="cardImage" />
      </div>
      <aside className={styles.rightSide}>
        <h2>{data.title}</h2>
        <h4>{videoViewState.is_series === 1 && "Series"}</h4>
        <h5>{videoViewState.ratings}</h5>
        <h6>
          {videoViewState.is_series === 1 &&
            `${videoViewSecondState.genres.length} temporadas - `}{" "}
          {data.publish_time} - EUA
        </h6>
        <p>{data.description}</p>
      </aside>
      <footer>
        <div style={{ marginRight: "10px" }}>
          <PlayButton title="Reproducir" />
        </div>
        <img
          src="ondemand/like.png"
          alt="Like"
          onClick={() => {
            toggleLikeModal(data.title, data.default_image);
            closeModal();
          }}
        ></img>
        <img
          src="ondemand/share.png"
          alt="Share"
          onClick={() => {
            togglShareModal(data.title, data.default_image);
            closeModal();
          }}
        ></img>
        <img
          onClick={() => addToWishList(data.admin_video_id)}
          src="ondemand/plus.png"
          alt="Add"
        ></img>

        <h3>
          <b>Categorias:</b> Suspenso, Drama
        </h3>
      </footer>
    </div>
  );
};

Top.propTypes = {
  getOnDemandData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  onDemand: state.onDemand,
});

export default connect(mapStateToProps, { addToWishList })(Top);
