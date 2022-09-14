import React, { useState } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { SET_LIKE_MODAL } from "@actions/types";

import hp from "@public/poster/hp.jpg";

const Like = ({ title, thumbnail }) => {
  const dispatch = useDispatch();
  const likeModal = useSelector((state) => state.site.likeModal);

  const toggleLikeModal = () => {
    dispatch({
      type: SET_LIKE_MODAL,
      payload: { ...likeModal, visible: !likeModal.visible },
    });
  };

  return (
    <div className={!likeModal.visible ? styles.container : styles.show}>
      <div className={styles.card}>
        <i
          className="fa fa-times-circle"
          aria-hidden="true"
          onClick={toggleLikeModal}
        ></i>
        <h1>Me gusta {likeModal.title}</h1>
        <p>Para dar me gusta es necesario tener una mebresía.</p>
        <img src={likeModal.image} alt="SiteLogo" />
        <button>Iniciar Sesión</button>
      </div>
    </div>
  );
};

Like.propTypes = {};

export default Like;
