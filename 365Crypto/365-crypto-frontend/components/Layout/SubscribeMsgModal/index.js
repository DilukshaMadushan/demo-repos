import styles from "./index.module.css";
import React, { useContext, useEffect } from "react";

import { CgClose } from "react-icons/cg";

import Modal from "@material-ui/core/Modal";
//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setSubscribeMsgModal } from "../../../actions/MyAccount";
const SubscribeMsgModal = ({
  myAccount: { showSubscribeMsgModal },
  setSubscribeMsgModal,
}) => {
  const handleClose = () => {
    setSubscribeMsgModal(false);
  };

  return (
    <Modal
      open={showSubscribeMsgModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={styles.modal}
    >
      <div className={styles.modalbody}>
        <button className={styles.closebtn} onClick={() => handleClose()}>
          <CgClose color="white" />
        </button>

        <div className={styles.container}>
          <h5 className={styles.message}>You have successfully subscribed.</h5>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  myAccount: state.myAccount,
});
export default connect(mapStateToProps, {
  setSubscribeMsgModal,
})(SubscribeMsgModal);
