import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";
import SearchBar from "./SearchBar";
import CoinsDropdown from "./CoinsDropdown";
import ClearButton from "./ClearButton";
import DateRangeDropdown from "./DateRangeDropdown";
import PlatformsDropdown from "./PlatformsDropdown";
import PlatformsDropdownMobile from "./PlatformDropdownMobile";
import { LogoJsonLd } from "next-seo";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFilteredSocialFeeds } from "../../../actions/SocialFeeds";

// SET ENVIRONMENT BASE URL
const FORUM_URL = process.env.FORUM_URL;
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const MenuBar = ({
  getFilteredSocialFeeds,
  isCoinsDropdownActive,
  setIsCoinsDropdownActive,
  coinsDropdownSelected,
  setCoinsDropdownSelected,
  isPlatformsDropdownActive,
  setIsPlatformsDropdownActive,
  platformsDropdownSelected,
  setPlatformsDropdownSelected,
  isPlatformsDropdownMobileActive,
  setIsPlatformsDropdownMobileActive,
  platformsDropdownMobileSelected,
  setPlatformsDropdownMobileSelected,
  dateRange,
  setDateRange,
  startDate,
  endDate,
  dropdownsSelectionsData,
  setDropdownSelectionsData,
  handleChange,
}) => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${IMAGE_BASE_URL}social-feeds`} />
        <title>
          Cryptocurrency Social Media Feed and intelligence - 365crypto.com
        </title>
        <meta
          name="title"
          content="Cryptocurrency Social Media Feed and intelligence - 365crypto.com"
        />

        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="365 Crypto" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${IMAGE_BASE_URL}social-feeds`} />
        <meta property="og:image" content={`${IMAGE_BASE_URL}main_logo.png`} />
        <meta
          property="og:description"
          content="Track all cryptocurrency social media trends from Twitter, Facebook, Reddit, and Youtube all in one place and never miss an opportunity to detect the latest trends."
        />
        <meta
          name="og:title"
          content="Cryptocurrency Social Media Feed and intelligence - 365crypto.com"
        />
        <meta
          name="description"
          content="Track all cryptocurrency social media trends from Twitter, Facebook, Reddit, and Youtube all in one place and never miss an opportunity to detect the latest trends."
        />
        <meta name="thumbnail" content={`${IMAGE_BASE_URL}main_logo.png`} />
      </Head>
      <LogoJsonLd
        logo="https://365crypto.com/main_logo.png"
        url="https://365crypto.com"
      />
      <div className={`${styles.mainDiv}`}>
        <div className={`${styles.TitleDiv}`}>
          <div>
            <h1 className={`${styles.title}`}>Social Feeds</h1>
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
            <div className={`col-md m-0 p-0 ${styles.leftDiv}`}>
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
              <div className={`   ${styles.leftNdDiv}`}>
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
                <PlatformsDropdown
                  isPlatformsDropdownActive={isPlatformsDropdownActive}
                  setIsPlatformsDropdownActive={setIsPlatformsDropdownActive}
                  platformsDropdownSelected={platformsDropdownSelected}
                  setPlatformsDropdownSelected={setPlatformsDropdownSelected}
                  handleChange={(selectedPlatform) =>
                    handleChange(selectedPlatform, "selectedPlatform")
                  }
                />
              </div>
            </div>
            <div className={`col-md m-0 p-0 ${styles.rightDiv}`}>
              <div className={` ${styles.rightStDiv}`}>
                <PlatformsDropdownMobile
                  isPlatformsDropdownMobileActive={
                    isPlatformsDropdownMobileActive
                  }
                  setIsPlatformsDropdownMobileActive={
                    setIsPlatformsDropdownMobileActive
                  }
                  platformsDropdownSelected={platformsDropdownSelected}
                  setPlatformsDropdownSelected={setPlatformsDropdownSelected}
                  handleChange={(selectedMobilePlatform) =>
                    handleChange(
                      selectedMobilePlatform,
                      "selectedMobilePlatform"
                    )
                  }
                />
              </div>
              <div className={` ${styles.rightNdDiv}`}>
                <ClearButton
                  setDateRange={setDateRange}
                  setCoinsDropdownSelected={setCoinsDropdownSelected}
                  setPlatformsDropdownSelected={setPlatformsDropdownSelected}
                  setPlatformsDropdownSelected={setPlatformsDropdownSelected}
                  handleChange={(clearAll) =>
                    handleChange(clearAll, "clearAll")
                  }
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
    </>
  );
};

MenuBar.propTypes = {
  getFilteredSocialFeeds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  socialFeeds: state.socialFeeds,
});

export default connect(mapStateToProps, {
  getFilteredSocialFeeds,
})(MenuBar);
