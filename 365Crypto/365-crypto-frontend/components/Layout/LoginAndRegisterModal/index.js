import styles from "./index.module.css";
import React, { useContext, useEffect } from "react";
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";
import ForgotPasswordBox from "./LoginBox/ForgotPasswordBox";
import ResetPasswordBox from "./LoginBox/ResetPasswordBox";
import { HiArrowLeft } from "react-icons/hi";
import { LoginContext } from "../common/LoginContext";
import Modal from "@material-ui/core/Modal";
//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setShowForgotPasswordModal,setShowResetPasswordModal} from "../../../actions/Auth";
const LoginAndRegisterModal = ({
  auth: { showForgotPasswordModal,showResetPasswordModal },
  setShowForgotPasswordModal,
  setShowResetPasswordModal
}) => {
  const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
    useContext(LoginContext);
  const handleClose = () => {
 
    setModalShow(false);
    setShowForgotPasswordModal(false);
    setShowResetPasswordModal(false,"");

  };

  return (
    <Modal
      open={modalShow}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={styles.modal}
    >
      <div className={styles.modalbody}>

        <div className={(showForgotPasswordModal || showResetPasswordModal) ? styles.hzlinerp : styles.hzline}></div>
      
        <button
          className={styles.backarrow}
          onClick={() => handleClose()}
        >
          <HiArrowLeft color="white" />
        </button>
        {!(showForgotPasswordModal || showResetPasswordModal) ? <div className={styles.controller}>
          <button
            className={!isLogin ? styles.selectsu : styles.signup}
            onClick={() => setLogin(false)}
          > 
            SIGN UP
          </button>
          <button
            className={isLogin ? styles.selectsi : styles.signin}
            onClick={() => setLogin(true)}
          >
            SIGN IN
          </button>
          <hr classnames={styles.hr} />
        </div>:null}

       
        {showForgotPasswordModal ? <div className={styles.rpcontroller}>
          <p
            className={styles.selectrp}
          
          >
            FORGOT PASSWORD ?
          </p>
         
          <hr classnames={styles.hr} />
        </div>:null}
        {showResetPasswordModal ? <div className={styles.rpcontroller}>
          <p
            className={styles.selectrp}
          
          >
            PASSWORD RECOVERY
          </p>
         
          <hr classnames={styles.hr} />
        </div>:null}
        
        <div className={styles.container}>
          {isLogin && !showForgotPasswordModal ? <LoginBox /> : null}
          {!isLogin && !showForgotPasswordModal && !showResetPasswordModal? <RegisterBox /> : null}
          {showForgotPasswordModal ? <ForgotPasswordBox /> : null}
          {showResetPasswordModal ? <ResetPasswordBox /> : null}
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {setShowForgotPasswordModal,setShowResetPasswordModal})(LoginAndRegisterModal);
