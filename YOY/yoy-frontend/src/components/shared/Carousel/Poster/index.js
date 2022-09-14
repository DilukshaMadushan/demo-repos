import React from "react";
import styles from "./index.module.css";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  IoIosArrowDropdownCircle,
  IoIosPlayCircle,
  IoIosHeartEmpty,
} from "react-icons/io";

import { SET_LIKE_MODAL, SET_POPUP_MODAL } from "@actions/types";

const Poster = ({ cardVisible, src, videoId }) => {
  const dispatch = useDispatch();
  const likeModal = useSelector(state => state.site.likeModal);
  const popupModal = useSelector(state => state.site.popupModal);

  const toggleLikeModal = () => {
    dispatch({ type: SET_LIKE_MODAL, payload: !likeModal });
  };

  const togglePopupModal = () => {
    dispatch({
      type: SET_POPUP_MODAL,
      payload: { ...popupModal, visible: !popupModal.visible },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={src} onClick={togglePopupModal} />
        <div className={styles.iconFooter}>
          <div className={styles.iconLeft}>
            <IoIosPlayCircle style={{ color: "#67FD65" }} />
          </div>
          <div className={styles.iconMiddle}>
            <IoIosHeartEmpty onClick={toggleLikeModal} />
          </div>
          <div
            className={styles.iconRight}
            onClick={() => Router.push("/on-demand/shows/" + videoId)}
          >
            <IoIosArrowDropdownCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
