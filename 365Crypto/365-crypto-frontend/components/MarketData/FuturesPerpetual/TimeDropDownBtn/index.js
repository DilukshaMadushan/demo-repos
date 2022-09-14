import React, { useState } from "react";
import styles from "./index.module.css";
import { IoCaretDown } from "react-icons/io5";
import OutsideClickHandler from "react-outside-click-handler";

const TIME_LIST = [
  { id: "1", title: "1min" },
  { id: "2", title: "5min" },
  { id: "3", title: "15min" },
  { id: "4", title: "1hr" },
  { id: "5", title: "4hr" },
  { id: "6", title: "12hr" },
  { id: "7", title: "24hr" },
];

const TimeDropDownBtn = ({ timeState, setTimeStateFunction }) => {
  const [isCoinsDropdownActive, setIsCoinsDropdownActive] = useState(false);

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
            <div className={`${styles.iconDiv}`}>
              <text>Time&nbsp;&nbsp;|</text>
            </div>
            <span className={`${styles.titleSpan}`}>{timeState}</span>
            <span className={`${styles.arrowSpan}`}>
              <IoCaretDown />
            </span>
          </div>
          {isCoinsDropdownActive && (
            <div className={`${styles.dropdownContent}`}>
              {TIME_LIST.map((item, id) => (
                <div
                  key={id}
                  onClick={() => {
                    setIsCoinsDropdownActive(false);
                    setTimeStateFunction(item);
                  }}
                  className={`${styles.dropdownItemDiv}`}
                >
                  <div className={`${styles.dropdownItem}`}>
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

export default TimeDropDownBtn;
