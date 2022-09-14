import React from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import { MdAccountCircle, MdSettings, MdLogout } from "react-icons/md";
import OutsideClickHandler from "react-outside-click-handler";
import Link from "next/link";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setToOppositeTheme } from "../../../../actions/Common/index";
// import { logoutButtonSubmit } from "../../../../actions/Auth/index";

//cookies
import { useCookies } from "react-cookie";

const ProfileDropdown = ({
  dropdownActive,
  setDropdownActive,
  setToOppositeTheme,
  common: { darkThemeState },
  // logoutButtonSubmit,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);

  const List = [
    {
      title: "Profile",
      icon: <MdAccountCircle />,
    },
    {
      title: "Settings",
      icon: <MdSettings />,
    },
    {
      title: "Log Out",
      icon: <MdLogout />,
    },
  ];

  const handleOnClick = () => {
    setDropdownActive(false);
  };

  const logOutButton = () => {
    // logoutButtonSubmit();
    removeCookie("Logintoken", { path: "/" });
  };

  return (
    <div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
      {dropdownActive ? (
        <div className={darkThemeState ? dark.dropdownDiv : light.dropdownDiv}>
          <div
            className={
              darkThemeState ? dark.connectorSquare : light.connectorSquare
            }
          ></div>
          {List.map((item, index) => (
            <div
              key={index}
              className={
                darkThemeState ? dark.dropdownTabDiv : light.dropdownTabDiv
              }
              onClick={() => (item.title === "Log Out" ? logOutButton() : "")}
            >
              <div
                className={
                  darkThemeState ? dark.dropdownIconDiv : light.dropdownIconDiv
                }
              >
                {item.icon}
              </div>
              {item.title}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

ProfileDropdown.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  // logoutButtonSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {
  setToOppositeTheme,
  // logoutButtonSubmit,
})(ProfileDropdown);
