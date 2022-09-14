import styles from "./index.module.css";
import React, { useContext, useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { MdPerson } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import AccountComp from "./AccountComp";
import PreferencesComp from "./PreferencesComp";
import SecurityComp from "./SecurityComp";
import { ImCross } from "react-icons/im";
import { HiArrowLeft } from "react-icons/hi";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutButtonSubmit } from "../../../actions/Auth/index";
import { setAccountSection } from "../../../actions/MyAccount/index";

// cookies
import { useCookies } from "react-cookie";

const MyAccount = ({
  setOpen,
  logoutButtonSubmit,
  section,
  setSection,
  mobileSection,
  setMobileSection,
  titleStyle,
  setTitleStyle,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);

  const logOutButton = () => {
    logoutButtonSubmit();
    removeCookie("Logintoken", { path: "/" });
    setOpen(false);
  };

  return (
    <div className={styles.modalbody}>
      <div className={`${styles["crossDiv"]}`}>
        <div
          className={`${styles["mobileArrow"]}`}
          onClick={() => setMobileSection("Menu")}
        >
          <HiArrowLeft />
        </div>
        <div className={`${styles["cross"]}`} onClick={() => setOpen(false)}>
          <ImCross />
        </div>
      </div>
      <div className={`${styles["desktopDiv"]}`}>
        <div className={`${styles["mainDiv"]}`}>
          <div className={`${styles["titleDiv"]}`}>
            <div
              className={`${styles["accountDiv"]}`}
              onClick={() => {
                setSection("Account_Details");
                setTitleStyle("Account_Details");
              }}
            >
              <div className={`${styles["iconDiv"]}`}>
                {titleStyle === "Account_Details" ? (
                  <div className={`${styles["iconSelected"]}`}>
                    <MdPerson />
                  </div>
                ) : (
                  <div className={`${styles["icon"]}`}>
                    <MdPerson />
                  </div>
                )}
              </div>
              {titleStyle === "Account_Details" ? (
                <div className={`${styles["titleTextDivSelected"]}`}>
                  Account Details
                </div>
              ) : (
                <div className={`${styles["titleTextDiv"]}`}>
                  Account Details
                </div>
              )}

              <div className={`${styles["arrowDiv"]}`}>
                <AiOutlineRight />
              </div>
            </div>
            <div
              className={`${styles["securityDiv"]}`}
              onClick={() => {
                setSection("Security");
                setTitleStyle("Security");
              }}
            >
              <div className={`${styles["iconDiv"]}`}>
                {titleStyle === "Security" ? (
                  <div className={`${styles["iconSelected"]}`}>
                    <HiLockClosed />
                  </div>
                ) : (
                  <div className={`${styles["icon"]}`}>
                    <HiLockClosed />
                  </div>
                )}
              </div>
              {titleStyle === "Security" ? (
                <div className={`${styles["titleTextDivSelected"]}`}>
                  Security
                </div>
              ) : (
                <div className={`${styles["titleTextDiv"]}`}>Security</div>
              )}
              <div className={`${styles["arrowDiv"]}`}>
                <AiOutlineRight />
              </div>
            </div>
            <div
              className={`${styles["preferencesDiv"]}`}
              onClick={() => {
                setSection("Preferences");
                setTitleStyle("Preferences");
              }}
            >
              <div className={`${styles["iconDiv"]}`}>
                {titleStyle === "Preferences" ? (
                  <div className={`${styles["iconSelected"]}`}>
                    <AiFillHeart />
                  </div>
                ) : (
                  <div className={`${styles["icon"]}`}>
                    <AiFillHeart />
                  </div>
                )}
              </div>
              {titleStyle === "Preferences" ? (
                <div className={`${styles["titleTextDivSelected"]}`}>
                  Preferences
                </div>
              ) : (
                <div className={`${styles["titleTextDiv"]}`}>Preferences</div>
              )}
              <div className={`${styles["arrowDiv"]}`}>
                <AiOutlineRight />
              </div>
            </div>
            <div
              className={`${styles["logOutDiv"]}`}
              // onClick={() => setSection("Log_Out")}
              onClick={() => {
                logOutButton();
                setSection("Log_Out");
              }}
            >
              <div className={`${styles["iconDiv"]}`}>
                <div className={`${styles["icon"]}`}>
                  <MdOutlinePowerSettingsNew />
                </div>
              </div>
              <div className={`${styles["titleTextDiv"]}`}>Log Out</div>
              <div className={`${styles["arrowDiv"]}`}>
                <AiOutlineRight />
              </div>
            </div>
          </div>
          <div className={`${styles["contentDiv"]}`}>
            {section === "Account_Details" ? (
              <AccountComp />
            ) : section === "Security" ? (
              <SecurityComp />
            ) : section === "Preferences" ? (
              <PreferencesComp />
            ) : (
              <AccountComp />
            )}
          </div>
        </div>
      </div>
      <div className={`${styles["mobileDiv"]}`}>
        <div className={`${styles["mainDiv"]}`}>
          {mobileSection === "Menu" ? (
            <div className={`${styles["titleDiv"]}`}>
              <div
                className={`${styles["accountDiv"]}`}
                onClick={() => setMobileSection("Account_Details")}
              >
                <div className={`${styles["iconDiv"]}`}>
                  <div className={`${styles["icon"]}`}>
                    <MdPerson />
                  </div>
                </div>
                <div className={`${styles["titleTextDiv"]}`}>
                  Account Details
                </div>
                <div className={`${styles["arrowDiv"]}`}>
                  <AiOutlineRight />
                </div>
              </div>
              <div
                className={`${styles["securityDiv"]}`}
                onClick={() => setMobileSection("Security")}
              >
                <div className={`${styles["iconDiv"]}`}>
                  <div className={`${styles["icon"]}`}>
                    <HiLockClosed />
                  </div>
                </div>
                <div className={`${styles["titleTextDiv"]}`}>Security</div>
                <div className={`${styles["arrowDiv"]}`}>
                  <AiOutlineRight />
                </div>
              </div>
              <div
                className={`${styles["preferencesDiv"]}`}
                onClick={() => setMobileSection("Preferences")}
              >
                <div className={`${styles["iconDiv"]}`}>
                  <div className={`${styles["icon"]}`}>
                    <AiFillHeart />
                  </div>
                </div>
                <div className={`${styles["titleTextDiv"]}`}>Preferences</div>
                <div className={`${styles["arrowDiv"]}`}>
                  <AiOutlineRight />
                </div>
              </div>
              <div
                className={`${styles["logOutDiv"]}`}
                onClick={() => setMobileSection("Account_Details")}
              >
                <div className={`${styles["iconDiv"]}`}>
                  <div className={`${styles["icon"]}`}>
                    <MdOutlinePowerSettingsNew />
                  </div>
                </div>
                <div
                  className={`${styles["titleTextDiv"]}`}
                  onClick={() => logOutButton()}
                >
                  Log Out
                </div>
                <div className={`${styles["arrowDiv"]}`}>
                  <AiOutlineRight />
                </div>
              </div>
            </div>
          ) : mobileSection === "Account_Details" ? (
            <AccountComp />
          ) : mobileSection === "Security" ? (
            <SecurityComp />
          ) : mobileSection === "Preferences" ? (
            <PreferencesComp />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

// export default MyAccount;
MyAccount.propTypes = {
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
})(MyAccount);
