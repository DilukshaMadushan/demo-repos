import React, { useState } from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import { IoCaretDown } from "react-icons/io5";
import OutsideClickHandler from "react-outside-click-handler";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const TIME_LIST = [
  { id: "1", title: "Manager" },
  { id: "2", title: "Auditor" },
  { id: "3", title: "Member" },
  { id: "4", title: "Editor" },
];

const DropdownBox = ({ common: { darkThemeState } }) => {
  const [isCoinsDropdownActive, setIsCoinsDropdownActive] = useState(false);
  const [timeState, setTimeState] = useState("Manager");

  return (
    <div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
      <div className={darkThemeState ? dark.dropdown : light.dropdown}>
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsCoinsDropdownActive(false);
          }}
        >
          <div
            onClick={() => setIsCoinsDropdownActive(!isCoinsDropdownActive)}
            className={darkThemeState ? dark.dropdownBtn : light.dropdownBtn}
          >
            <div
              className={darkThemeState ? dark.iconDiv : light.iconDiv}
            ></div>
            <span className={darkThemeState ? dark.titleSpan : light.titleSpan}>
              {timeState}
            </span>
            <span className={darkThemeState ? dark.arrowSpan : light.arrowSpan}>
              <IoCaretDown />
            </span>
          </div>
          {isCoinsDropdownActive && (
            <div
              className={
                darkThemeState ? dark.dropdownContent : light.dropdownContent
              }
            >
              {TIME_LIST.map((item, id) => (
                <div
                  key={id}
                  onClick={() => {
                    setIsCoinsDropdownActive(false);
                    setTimeState(item.title);
                  }}
                  className={
                    darkThemeState
                      ? dark.dropdownItemDiv
                      : light.dropdownItemDiv
                  }
                >
                  <div
                    className={
                      darkThemeState ? dark.dropdownItem : light.dropdownItem
                    }
                  >
                    <span>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </OutsideClickHandler>
      </div>
    </div>
  );
};

DropdownBox.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(DropdownBox);
