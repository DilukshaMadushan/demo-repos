import React, { useContext } from "react";
import styles from "./index.module.css";
import { LoginContext } from "../../Layout/common/LoginContext";
import LoginAndRegisterModal from "../../Layout/LoginAndRegisterModal";
import LearnMoreAbout365Modal from "../../Layout/common/LearnMoreAbout365Modal";
import Image from "next/image";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  showLearnMoreAbout365,
  hideLearnMoreAbout365,
} from "../../../actions/Home/index";

//component for signup call to action
const SignupCTA = ({
  showLearnMoreAbout365,
  hideLearnMoreAbout365,
  home: { learnMoreAbout365PopUpVisibility },
}) => {
  const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
    useContext(LoginContext);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setModalShow(true);
    setLogin(false);
  };

  //Learn more about 365 component
  const handleLearnMoreClick = () => {
    showLearnMoreAbout365();
  };

  return (
    <div className={styles.container}>
      <div className="row align-items-center">
        <div className={`${styles.leftcolumn} col`}>
          <div className={styles.image}>
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <Image
                src="/signup-cta.png"
                alt="365 Crypto Home Page Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        <div className={`${styles.rightcolumn} col-sm`}>
          <h4 className={styles.heading}>
            Sign up to access detailed cryptocurency Analysis!
          </h4>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
            exercitationem ad. Provident nesciunt quo sint unde vero
          </p>
          <button
            type="button"
            className={`${styles.signupbutton} btn `}
            onClick={handleLoginClick}
          >
            Sign Up
          </button>
          {modalShow && (
            <LoginAndRegisterModal show={modalShow} isLogin={isLogin} />
          )}
          <button
            type="button"
            className={`${styles.learnmorebutton} btn btn-outline-light`}
            onClick={handleLearnMoreClick}
          >
            Learn more about 365 crypto
          </button>
          {learnMoreAbout365PopUpVisibility && (
            <LearnMoreAbout365Modal show={learnMoreAbout365PopUpVisibility} />
          )}
        </div>
      </div>
    </div>
  );
};

SignupCTA.propTypes = {
  showLearnMoreAbout365: PropTypes.func.isRequired,
  showLearnMoreAbout365: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  home: state.home,
});

export default connect(mapStateToProps, {
  showLearnMoreAbout365,
  hideLearnMoreAbout365,
})(SignupCTA);
