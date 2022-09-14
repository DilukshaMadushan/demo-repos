import styles from "./index.module.css";
import Search from "../common/Search";
import { LoginContext } from "../common/LoginContext";
import { HiOutlineMail } from "react-icons/hi";
import React, { useContext, useState } from "react";
// import SubscribeMsgModal from "../SubscribeMsgModal";

import { logoutButtonSubmit } from "../../../actions/Auth";
import { FaRegUserCircle } from "react-icons/fa";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAccountSection } from "../../../actions/MyAccount";

// cookies
import { useCookies } from "react-cookie";
import ProfileDropdown from "../MyAccount/ProfileDropdown";

const TopNavigation = ({
  logoutButtonSubmit,
  setOpen,
  setSection,
  setMobileSection,
  setTitleStyle,
  // myAccount: { sectionState },
  // setAccountSection,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);

  const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
    useContext(LoginContext);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setModalShow(true);
    setLogin(true);
  };

  const logOutButton = () => {
    logoutButtonSubmit();
    removeCookie("Logintoken", { path: "/" });
  };

  return (
    <nav className={`${styles["top-nav"]}`}>
      {/* <SubscribeMsgModal/> */}
      <div className={`${styles["nav-link"]}`}>
        <Search />
      </div>
      <div className={`${styles["nav-right-div"]}`}>
        <div className={`${styles["btn-notify"]}`}>
          <HiOutlineMail size="25px" />
        </div>
        {!cookies.Logintoken ? (
          <button
            className={`${styles["primaryButton"]}`}
            onClick={handleLoginClick}
          >
            Login
          </button>
        ) : (
          <div className={`${styles["btn-profile"]}`}>
            <div
              className={`${styles["profileButton"]}`}
              onClick={() => {
                setOpen(true);
                setSection("Account_Details");
                setTitleStyle("Account_Details");
              }}
            >
              <FaRegUserCircle />
            </div>
            <div className={`${styles["arrowIcon"]}`}>
              <ProfileDropdown
                setSection={setSection}
                setOpen={setOpen}
                setMobileSection={setMobileSection}
                setTitleStyle={setTitleStyle}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// export default TopNavigation;

TopNavigation.propTypes = {
  logoutButtonSubmit: PropTypes.func.isRequired,
  setAccountSection: PropTypes.func.isRequired,
  myAccount: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  myAccount: state.myAccount,
});
export default connect(mapStateToProps, {
  logoutButtonSubmit,
  setAccountSection,
})(TopNavigation);
