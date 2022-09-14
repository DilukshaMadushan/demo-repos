import React from "react";
import PropTypes from "prop-types";
import Content from "./Content";
import styles from "./index.module.css";
import Modal from "@material-ui/core/Modal";
import { useDispatch, useSelector } from "react-redux";
import { SET_POPUP_MODAL } from "@actions/types";

const PopupModal = () => {
  const dispatch = useDispatch();
  const popupModal = useSelector(state => state.site.popupModal);

  const togglePopupModal = () => {
    dispatch({
      type: SET_POPUP_MODAL,
      payload: { ...popupModal, visible: !popupModal.visible },
    });
  };

  return (
    <Modal
      open
      onClose={togglePopupModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={styles.modal}
    >
      <div className={styles.modalbody}>
        <Content data={popupModal.data} setVisible={togglePopupModal} />
      </div>
    </Modal>
  );
};

PopupModal.propTypes = {};

export default PopupModal;
