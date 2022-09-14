import React, { useState, useEffect, useContext } from "react";
import styles from "./index.module.css";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import Link from "next/link";
import Modal from "@material-ui/core/Modal";
import ReportIssue from "./ReportIssue";
import { LoginContext } from "../../Layout/common/LoginContext";
import LoginAndRegisterModal from "../../Layout/LoginAndRegisterModal";
import Image from "next/image";

// cookies
import { useCookies } from "react-cookie";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { subscriptionSubmit } from "../../../actions/Home/index";

const Footer = ({
  subscriptionSubmit,
  home: { subscriptionStatus, subscriptionSuccess },
  setAccountOpen,
  setTitleStyle,
  setSection,
  setMobileSection,
}) => {
  const [subscriptionEmail, setSubscriptionEmail] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);
  const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
    useContext(LoginContext);

  const handleChange = (event) => {
    setSubscriptionEmail(event.target.value);
  };
  const handleSubmit = () => {
    subscriptionSubmit(subscriptionEmail);
  };

  const setOpenHandle = () => {
    if (cookies.Logintoken) {
      setAccountOpen(true);
      setSection("Account_Details");
      setMobileSection("Menu");
      setTitleStyle("Account_Details");
    }
    if (!cookies.Logintoken) {
      setModalShow(true);
      setLogin(true);
    }
  };

  useEffect(() => {
    setSubscriptionEmail("");
  }, [subscriptionSuccess]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={`${styles["main-div"]}`}>
      <div className={`row m-0 p-0 ${styles["sub-div"]}`}>
        <div className={`col-md-4 p-0 ${styles["first-div"]}`}>
          <div className={`${styles["logo-div"]}`}>
            <div className={`${styles["logo-style"]}`}>
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image
                  src={"/main_logo.png"}
                  alt="Main Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          <div className={`${styles["description-div"]}`}>
            Lorem ipsum dolor sit amet, consect incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate
          </div>
          <div className={`${styles["sign-div"]}`}>
            <AiOutlineCopyrightCircle />
            2021 365Crypto All right reserved
          </div>
        </div>
        <div className={`col-md-5 row m-0 p-0 ${styles["middle-div"]}`}>
          <div className={`col-6 row m-0 ${styles["middle-col1"]}`}>
            <div className={`p-0 ${styles["item-div"]}`}>
              <Link href="/">Hub</Link>
            </div>
            <div className={`p-0 ${styles["item-div"]}`}>
              <Link href="/market-data">Market Data</Link>
            </div>
            <div className={`p-0 ${styles["item-div"]}`}>
              <Link href="/coin-events">Coin Events</Link>
            </div>
            <div className={`p-0 ${styles["item-div"]}`}>
              <Link href="/crypto-news">Crypto News</Link>
            </div>
            <div className={`p-0 ${styles["item-div"]}`}>
              <Link href="/social-feeds">Social Feeds</Link>
            </div>
            <div className={`p-0 ${styles["item-div"]}`} href="/">
              <div
                className={`${styles["account-div"]}`}
                onClick={() => {
                  setOpenHandle();
                }}
              >
                My Account
              </div>
              {modalShow && (
                <LoginAndRegisterModal show={modalShow} isLogin={isLogin} />
              )}
            </div>
          </div>
          <div className={`col-6 row m-0 p-0 ${styles["middle-col2"]}`}>
            <div className={`p-0 ${styles["item-div"]}`}>
              <Link href="/exchanges-and-deals">Exchanges & Deals</Link>
            </div>
            <div className={`p-0 ${styles["item-div"]}`}>
              <Link href="/crypto-bots">Crypto Bots</Link>
            </div>
            <div className={`p-0 ${styles["item-div"]}`}>
              <Link href="/crypto-tax">Crypto Tax</Link>
            </div>
            <div className={`p-0 ${styles["item-div"]}`}>
              <Link href="/charting-tools">Charting Tools</Link>
            </div>
            <div className={`p-0 ${styles["item-div"]}`}>
              <a href={process.env.FORUM_URL} target="_blank">
                Forum
              </a>
            </div>
            <div className={`p-0 ${styles["item-div"]}`}>
              <a href="/privacy-policy" target="_blank">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div className={`col-md-3 p-0 ${styles["last-div"]}`}>
          <div className={` ${styles["title-div"]}`}>
            Sign up to 365Crypto Newsletter
          </div>

          <div className={` ${styles["email-div"]}`}>
            <input
              className={`${styles["input-div"]}`}
              placeholder="Enter your email here"
              type="email"
              onChange={(e) => handleChange(e)}
              value={subscriptionEmail}
              name="email"
            />
          </div>
          {/* <div className={styles.emailSent}>
						Verification email sent successfully.
					</div> */}
          <div className={` ${styles["button-div"]}`}>
            <button
              className={`${styles["primaryButton"]}`}
              onClick={() => {
                handleSubmit();
              }}
            >
              Subscribe now
            </button>
          </div>

          <div className={` row m-0 ${styles["sicialIcon-div"]}`}>
            <div className={`col-6 row m-0 p-0 ${styles["icons-div"]}`}>
              <div className={`col-4 p-0 ${styles["icon-div"]}`}>
                <div className={`col-4 p-0 ${styles["image-div"]}`}>
                  <a href="https://twitter.com/365cryptodotcom" target="_blank">
                    <img src="/Twitter_Logo.png" alt="Twitter Logo" />
                  </a>
                </div>
              </div>
              <div className={`col-4 p-0 ${styles["icon-div"]}`}>
                <div className={`col-4 p-0 ${styles["image-div"]}`}>
                  <a href="https://t.me/three65crypto" target="_blank">
                    <img src="/Send_Logo.png" alt="Telegram Logo" />
                  </a>
                </div>
              </div>
              <div className={`col-4 p-0 ${styles["icon-div"]}`}>
                <div className={`col-4 p-0 ${styles["image-div"]}`}>
                  <a href="https://www.facebook.com/365Crypto/" target="_blank">
                    <img src="/Facebook_Logo.png" alt="Facebook Logo" />
                  </a>
                </div>
              </div>
            </div>
            <div className={`col-6 ${styles["link-div"]}`}>
              <text className={`${styles["link"]}`} onClick={handleOpen}>
                Report an issue
              </text>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={styles.modal}
              >
                <div className={`${styles["Report-div"]}`}>
                  <ReportIssue setOpen={setOpen} />
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  subscriptionSubmit: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  home: state.home,
});

export default connect(mapStateToProps, { subscriptionSubmit })(Footer);
