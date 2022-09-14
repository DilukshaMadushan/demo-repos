import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { BsCheck } from "react-icons/bs";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  changeUserSubscription,
  getUserAllDetails,
  getPromotionTickState,
} from "../../../../actions/MyAccount/index";
import {
  subscriptionSubmit,
  unSubscriptionSubmit,
} from "../../../../actions/Home";

// cookies
import { useCookies } from "react-cookie";

const PreferencesComp = ({
  changeUserSubscription,
  getUserAllDetails,
  myAccount: { subscriptionState, prevSubscriptionState, userEmail },
  getPromotionTickState,
  subscriptionSubmit,
  unSubscriptionSubmit,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);

  //getUserAllDetails fonc run with token
  useEffect(() => {
    getUserAllDetails(cookies.Logintoken);
  }, [cookies.Logintoken]);

  // Handle submit events in register form
  const handleSubmit = () => {
    if (prevSubscriptionState === false && subscriptionState === true) {
      subscriptionSubmit(userEmail);
      changeUserSubscription(subscriptionState, cookies.Logintoken);
      getUserAllDetails(cookies.Logintoken);
    }
    if (prevSubscriptionState === true && subscriptionState === false) {
      unSubscriptionSubmit(userEmail);
      changeUserSubscription(subscriptionState, cookies.Logintoken);
      getUserAllDetails(cookies.Logintoken);
    }
  };

  return (
    <div className={`${styles["mainDiv"]}`}>
      <div className={`${styles["titleDiv"]}`}>Promotions and Offers</div>
      <div className={`${styles["tikBoxDiv"]}`}>
        <div className={`row p-0 m-0 ${styles.checkbox2}`}>
          <div
            className={`col-1 m-0 p-0 ${styles.tickBox}`}
            onClick={() => {
              getPromotionTickState(!subscriptionState);
            }}
          >
            {subscriptionState === false ? (
              <div className={styles.icon}>
                <BsCheck />
              </div>
            ) : (
              <div className={styles.iconSelected}>
                <BsCheck />
              </div>
            )}
          </div>

          <p className={`col-11 m-0 p-0 ${styles.para}`}>
            I agree to recieve Promotions and Deals about crypto trading
          </p>
        </div>
      </div>
      <div className={`${styles["buttonDiv"]}`}>
        <button
          className={`${styles["button"]}`}
          onClick={() => handleSubmit()}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

PreferencesComp.propTypes = {
  changeUserSubscription: PropTypes.func.isRequired,
  getUserAllDetails: PropTypes.func.isRequired,
  getPromotionTickState: PropTypes.func.isRequired,
  subscriptionSubmit: PropTypes.func.isRequired,
  unSubscriptionSubmit: PropTypes.func.isRequired,
  myAccount: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  myAccount: state.myAccount,
});
export default connect(mapStateToProps, {
  changeUserSubscription,
  getUserAllDetails,
  getPromotionTickState,
  subscriptionSubmit,
  unSubscriptionSubmit,
})(PreferencesComp);
