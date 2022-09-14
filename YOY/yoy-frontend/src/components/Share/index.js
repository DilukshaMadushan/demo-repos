import React, { useState } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { SET_SHARE_MODAL } from "@actions/types";

import hp from "@public/poster/hp.jpg";

const Share = ({ title, thumbnail }) => {
  const dispatch = useDispatch();
  const shareModal = useSelector((state) => state.site.shareModal);

  const toggleShareModal = () => {
    dispatch({
      type: SET_SHARE_MODAL,
      payload: { ...shareModal, visible: !shareModal.visible },
    });
  };

  return (
    <div className={!shareModal.visible ? styles.container : styles.show}>
      <div className={styles.card}>
        <i
          className="fa fa-times-circle"
          aria-hidden="true"
          onClick={toggleShareModal}
        ></i>
        <h1>Compartir {shareModal.title}</h1>
        <p>Conecta tus redes y comparte lo que estás viendo.</p>
        <img src={shareModal.image} alt="SiteLogo" />
        <button>
          <div className={styles.spanFacebbok}>Facebook</div>
        </button>
        <button>
          <div className={styles.spanTwitter}>Twitter</div>
        </button>
      </div>
    </div>
  );
};

Share.propTypes = {};

export default Share;
