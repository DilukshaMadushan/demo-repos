import React, { useState } from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import { HiOutlineSearch } from "react-icons/hi";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchCities } from "../../../../actions/Map";

const SearchBox = ({ common: { darkThemeState }, searchCities }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [palcelongLat, setLongLat] = useState({ lg: '', lat: '' });

  function handleenter(e) {
    if (e.key === "Enter") {
      searchCities(e.target.value);
    }
  }
  return (
    <div className={`${darkThemeState ? dark["main-div"] : light["main-div"]}`}>
      <div className={`${darkThemeState ? dark["subDiv"] : light["subDiv"]}`}>
        <div
          className={`${darkThemeState ? dark["icon-div"] : light["icon-div"]}`}
        >
          <HiOutlineSearch size="14px" />
        </div>
        <input
          className={`${
            darkThemeState ? dark["input-div"] : light["input-div"]
          }`}
          placeholder="Search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleenter}
        />
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  searchCities: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
  searchedCity: state.searchedCity,
});

export default connect(mapStateToProps, { searchCities })(SearchBox);
