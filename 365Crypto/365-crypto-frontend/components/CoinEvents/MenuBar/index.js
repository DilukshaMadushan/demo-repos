import React, { useState } from "react";
import styles from "./index.module.css";
import SearchBar from "./SearchBar";
import DateRangeDropdown from "./DateRangeDropdown";
// import Keywords from './Keywords';
import CoinsDropdown from "./CoinsDropdown";
import SortByDropdown from "./SortByDropdown";
import ClearButton from "./ClearButton";
import CategoryDropdown from "./CategoryDrodown";
import CategoryDropdownMobile from "./CategoryDropdownMobile";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFilteredEvents } from "../../../actions/CoinEvents";

const MenuBar = ({
  getFilteredEvents,
  //props
  isCoinsDropdownActive,
  setIsCoinsDropdownActive,
  coinsDropdownSelected,
  setCoinsDropdownSelected,
  dateRange,
  setDateRange,
  startDate,
  endDate,
  isSortByDropdownActive,
  setIsSortByDropdownActive,
  sortByDropdownSelected,
  setSortByDropdownSelected,
  isCategoryDropdownActive,
  setIsCategoryDropdownActive,
  categoryDropdownSelected,
  setCategoryDropdownSelected,
  isCategoryDropdownMobileActive,
  setIsCategoryDropdownMobileActive,
  categoryDropdownMobileSelected,
  setCategoryDropdownMobileSelected,
  dropdownsSelectionsData,
  setDropdownSelectionsData,
  handleChange,
}) => {
  return (
    <div className={`${styles.mainDiv}`}>
      <div className={`${styles.TitleDiv}`}>
        <div>
          <h1 className={`${styles.title}`}>Coin Events</h1>
        </div>
        <div className={` ${styles.searchInTitleBarDiv}`}>
          <SearchBar
            searchSelection={dropdownsSelectionsData.searchSelection}
            handleSearchInputChange={(searchInput) =>
              handleChange(searchInput, "searchInput")
            }
          />
        </div>
      </div>
      <div className={`${styles.menuBarDiv}`}>
        <div className={`row ${styles.menuBar}`}>
          <div className={`col-md-8  ${styles.leftDiv}`}>
            <div className={`   ${styles.leftStDiv}`}>
              <DateRangeDropdown
                dateRange={dateRange}
                setDateRange={setDateRange}
                startDate={startDate}
                endDate={endDate}
                handleChange={(selectedDateRange) =>
                  handleChange(selectedDateRange, "selectedDateRange")
                }
              />
            </div>
            <div className={`  ${styles.leftNdDiv}`}>
              <CoinsDropdown
                isCoinsDropdownActive={isCoinsDropdownActive}
                setIsCoinsDropdownActive={setIsCoinsDropdownActive}
                coinsDropdownSelected={coinsDropdownSelected}
                setCoinsDropdownSelected={setCoinsDropdownSelected}
                handleChange={(selectedCoinId) =>
                  handleChange(selectedCoinId, "selectedCoinId")
                }
              />
            </div>
            <div className={`  ${styles.leftRdDiv}`}>
              <SortByDropdown
                isSortByDropdownActive={isSortByDropdownActive}
                setIsSortByDropdownActive={setIsSortByDropdownActive}
                sortByDropdownSelected={sortByDropdownSelected}
                setSortByDropdownSelected={setSortByDropdownSelected}
                handleChange={(selectedSortOption) =>
                  handleChange(selectedSortOption, "selectedSortOption")
                }
              />
            </div>
            <div className={`  ${styles.leftThDiv}`}>
              <CategoryDropdown
                isCategoryDropdownActive={isCategoryDropdownActive}
                setIsCategoryDropdownActive={setIsCategoryDropdownActive}
                categoryDropdownSelected={categoryDropdownSelected}
                setCategoryDropdownSelected={setCategoryDropdownSelected}
                handleChange={(selectedCategoryId) =>
                  handleChange(selectedCategoryId, "selectedCategoryId")
                }
              />
            </div>
          </div>
          <div className={`col-md-4 m-0    ${styles.rightDiv}`}>
            <div className={` ${styles.rightStDiv}`}>
              <CategoryDropdownMobile
                isCategoryDropdownMobileActive={isCategoryDropdownMobileActive}
                setIsCategoryDropdownMobileActive={
                  setIsCategoryDropdownMobileActive
                }
                categoryDropdownSelected={categoryDropdownSelected}
                setCategoryDropdownSelected={setCategoryDropdownSelected}
                handleChange={(selectedMobileCategoryId) =>
                  handleChange(
                    selectedMobileCategoryId,
                    "selectedMobileCategoryId"
                  )
                }
              />
            </div>
            <div className={` ${styles.rightNdDiv}`}>
              <ClearButton
                setDateRange={setDateRange}
                setCoinsDropdownSelected={setCoinsDropdownSelected}
                setSortByDropdownSelected={setSortByDropdownSelected}
                setCategoryDropdownSelected={setCategoryDropdownSelected}
                handleChange={(clearAll) => handleChange(clearAll, "clearAll")}
              />
            </div>
            <div className={` ${styles.verticalLine}`}></div>
            <div className={` ${styles.rightRdDiv}`}>
              <SearchBar
                searchSelection={dropdownsSelectionsData.searchSelection}
                handleSearchInputChange={(searchInput) =>
                  handleChange(searchInput, "searchInput")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  getFilteredEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  coinEvents: state.coinEvents,
});

export default connect(mapStateToProps, {
  getFilteredEvents,
})(MenuBar);
