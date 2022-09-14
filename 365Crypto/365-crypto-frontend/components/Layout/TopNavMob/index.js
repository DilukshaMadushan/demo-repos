import React, { useState, useContext, useEffect } from "react";
import { LoginContext } from "../common/LoginContext";
import * as FaIcons from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { MdForum } from "react-icons/md";
import { tabData } from "../common/TabData";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import { logoutButtonSubmit } from "../../../actions/Auth";
import { FaRegUserCircle } from "react-icons/fa";
import Modal from "@material-ui/core/Modal";
import MyAccount from "../MyAccount";
import Link from "next/link";
import Image from "next/image";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

// cookies
import { useCookies } from "react-cookie";
import ProfileDropdown from "../MyAccount/ProfileDropdown";

const Navbar = ({
  logoutButtonSubmit,
  mobileSection,
  setMobileSection,
  section,
  setSection,
  setOpen,
  setTitleStyle,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);
  const [modalShow, isLogin, redirect, setLogin, setModalShow, setRedirect] =
    useContext(LoginContext);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setModalShow(true);
    setLogin(true);
  };
  const handleRegisterClick = (e) => {
    e.preventDefault();
    setModalShow(true);
    setLogin(false);
  };
  const [sidebar, setSidebar] = useState(false);
  const { pathname } = useRouter();
  const router = useRouter();
  const [tabState, setTabState] = useState(pathname);

  useEffect(() => {
    setTabState(pathname);
  }, [pathname]);

  const showSidebar = () => setSidebar(!sidebar);
  const logOutButton = () => {
    logoutButtonSubmit();
    removeCookie("Logintoken", { path: "/" });
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={`${styles["navbar"]}`}>
        <div to="#" className={`${styles["menu-btn"]}`} onClick={showSidebar}>
          {sidebar ? <IoClose size={"20px"} /> : <FaIcons.FaBars />}
        </div>
        <div className={`${styles["main-logo"]}`}>
          <Link href="/">
            <div className={`${styles["logo"]}`}>
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image
                  src={"/main_logo.png"}
                  alt="365 Crypto Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </Link>
        </div>
        <div className={`${styles["notify-btn"]}`}>
          <HiOutlineMail size="25px" />
        </div>
        {cookies.Logintoken ? (
          <div className={`${styles["btn-profile"]}`}>
            <div
              className={`${styles["profileButton"]}`}
              onClick={() => {
                setOpen(true);
                setMobileSection("Menu");
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
        ) : (
          ""
        )}
      </div>
      <nav
        className={
          sidebar
            ? `${styles["nav-menu"]}  ${styles.active}`
            : `${styles["nav-menu"]}`
        }
      >
        <div className={`${styles["ul"]}`} onClick={showSidebar}>
          {tabData.map((item) => (
            <div
              key={item.id}
              className={`${styles["tabs"]}`}
              onClick={() => {
                setTabState(item.path);
                router.push(`${item.path}`, null, { shallow: true });
              }}
            >
              <div
                className={
                  tabState === item.path
                    ? `${styles["tab-icon-selected"]}`
                    : `${styles["tab-icon"]}`
                }
              >
                {item.icon}
              </div>
              <div className={`${styles["txt-div"]}`}>
                <text
                  className={
                    tabState === item.path
                      ? `${styles["tab-text-selected"]}`
                      : `${styles["tab-text"]}`
                  }
                >
                  {item.title}
                </text>
              </div>
            </div>
          ))}
          <a href={process.env.FORUM_URL} target="_blank">
            <div
              className={`${styles["tabs"]}`}
              onClick={() => {
                // setTabState("/forums");
                // router.push("/forums", null, { shallow: true });
              }}
            >
              <div
                className={
                  tabState === "/forums"
                    ? `${styles["tab-icon-selected"]}`
                    : `${styles["tab-icon"]}`
                }
              >
                <MdForum size={"17px"} />
              </div>
              <div className={`${styles["txt-div]"]}`}>
                <text
                  className={
                    tabState === "/forums"
                      ? `${styles["tab-text-selected"]}`
                      : `${styles["tab-text"]}`
                  }
                >
                  Forums
                </text>
              </div>
            </div>
          </a>
          {cookies.Logintoken ? (
            <div className={`${styles["label-login"]}`}>
              <label>
                <text
                  className={`${styles["link-auth"]} mr-2`}
                  onClick={logOutButton}
                >
                  Log Out
                </text>
              </label>
            </div>
          ) : (
            <div className={`${styles["label-login"]}`}>
              <label>
                <text
                  className={`${styles["link-auth"]} mr-2`}
                  onClick={handleLoginClick}
                >
                  Sign In &nbsp;
                </text>
                or &nbsp;
                <text
                  className={`${styles["link-auth"]} ml-2`}
                  onClick={handleRegisterClick}
                >
                  Register
                </text>
              </label>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

// export default Navbar;
Navbar.propTypes = {
  logoutButtonSubmit: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  // auth: state.auth,
});
export default connect(mapStateToProps, {
  logoutButtonSubmit,
})(Navbar);
