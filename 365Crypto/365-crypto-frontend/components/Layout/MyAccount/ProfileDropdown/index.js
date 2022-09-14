import React, { useState } from "react";
import styles from "./index.module.css";
import { IoCaretDown } from "react-icons/io5";
import OutsideClickHandler from "react-outside-click-handler";

import { MdPerson } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { MdOutlinePowerSettingsNew } from "react-icons/md";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutButtonSubmit } from "../../../../actions/Auth/index";
import {
  setAccountSection,
  setAccountOpen,
} from "../../../../actions/MyAccount/index";

// cookies
import { useCookies } from "react-cookie";

const ProfileDropdown = ({
  setOpen,
  logoutButtonSubmit,
  // setAccountSection,
  // setAccountOpen,
  setSection,
  setMobileSection,
  setTitleStyle,
  // timeState, setTimeStateFunction
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);
  const [isCoinsDropdownActive, setIsCoinsDropdownActive] = useState(false);

  const logOutButton = () => {
    logoutButtonSubmit();
    removeCookie("Logintoken", { path: "/" });
  };

  return (
    <div className={`${styles.mainDiv}`}>
      <div className={`${styles.dropdown}`}>
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsCoinsDropdownActive(false);
          }}
        >
          <div
            onClick={() => setIsCoinsDropdownActive(!isCoinsDropdownActive)}
            className={`${styles.dropdownBtn}`}
          >
            <span className={`${styles.arrowSpan}`}>
              <IoCaretDown />
            </span>
          </div>
          {isCoinsDropdownActive && (
            <div className={`${styles.dropdownContent}`}>
              <div className={`${styles["titleDiv"]}`}>
                <div
                  className={`${styles["accountDiv"]}`}
                  // onClick={() => setAccountSection("Account_Details")}
                  onClick={() => {
                    setSection("Account_Details");
                    setOpen(true);
                    setMobileSection("Account_Details");
                    setTitleStyle("Account_Details");
                  }}
                >
                  <div className={`${styles["iconDiv"]}`}>
                    <div className={`${styles["icon"]}`}>
                      <MdPerson />
                    </div>
                  </div>
                  <div className={`${styles["titleTextDiv"]}`}>
                    Account Details
                  </div>
                </div>
                <div
                  className={`${styles["securityDiv"]}`}
                  // onClick={() => setAccountSection("Security")}
                  // onClick={() => setAccountOpen(true)}
                  onClick={() => {
                    setSection("Security");
                    setOpen(true);
                    setMobileSection("Security");
                    setTitleStyle("Security");
                  }}
                >
                  <div className={`${styles["iconDiv"]}`}>
                    <div className={`${styles["icon"]}`}>
                      <HiLockClosed />
                    </div>
                  </div>
                  <div className={`${styles["titleTextDiv"]}`}>Security</div>
                </div>
                <div
                  className={`${styles["preferencesDiv"]}`}
                  onClick={() => {
                    setSection("Preferences");
                    setOpen(true);
                    setMobileSection("Preferences");
                    setTitleStyle("Preferences");
                  }}
                >
                  <div className={`${styles["iconDiv"]}`}>
                    <div className={`${styles["icon"]}`}>
                      <AiFillHeart />
                    </div>
                  </div>
                  <div className={`${styles["titleTextDiv"]}`}>Preferences</div>
                </div>
                <div
                  className={`${styles["logOutDiv"]}`}
                  onClick={() => logOutButton()}
                >
                  <div className={`${styles["iconDiv"]}`}>
                    <div className={`${styles["icon"]}`}>
                      <MdOutlinePowerSettingsNew />
                    </div>
                  </div>
                  <div className={`${styles["titleTextDiv"]}`}>Log Out</div>
                </div>
              </div>
            </div>
          )}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

ProfileDropdown.propTypes = {
  logoutButtonSubmit: PropTypes.func.isRequired,
  setAccountSection: PropTypes.func.isRequired,
  setAccountOpen: PropTypes.func.isRequired,
};
// const mapStateToProps = (state) => ({
//   // auth: state.auth,
// });
export default connect(null, {
  logoutButtonSubmit,
  setAccountSection,
  setAccountOpen,
})(ProfileDropdown);
