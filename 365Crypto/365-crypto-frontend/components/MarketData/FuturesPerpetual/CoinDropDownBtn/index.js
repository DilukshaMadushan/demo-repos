import React, { useState } from "react";
import styles from "./index.module.css";
import { IoCaretDown } from "react-icons/io5";
import OutsideClickHandler from "react-outside-click-handler";

const CoinDropDownBtn = ({ coinState, coinList, setCoinStateFunction }) => {
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
              <text>Symbol&nbsp;&nbsp;|</text>
            </div>
            <span className={`${styles.titleSpan}`}>{coinState}</span>
            <span className={`${styles.arrowSpan}`}>
              <IoCaretDown />
            </span>
          </div>
          {isCoinsDropdownActive && (
            <div className={`${styles.dropdownContent}`}>
              {coinList &&
                coinList.map((item, id) => (
                  <div
                    key={id}
                    onClick={() => {
                      setIsCoinsDropdownActive(false);
                      setCoinStateFunction(item);
                    }}
                    className={`${styles.dropdownItemDiv}`}
                  >
                    <div className={`${styles.dropdownItem}`}>
                      <span>{item.pair.symbolCode}</span>
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

export default CoinDropDownBtn;
