import React from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import { TiArrowSortedDown } from "react-icons/ti";
import Toolbar from "./Toolbar";
import UpperTitles from "./UpperTitles";
import Table from "./Table";
import Pagination from "./Pagination";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserManagement = ({ common: { darkThemeState } }) => {
  return (
    <div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
      <div className={darkThemeState ? dark.pageTitle : light.pageTitle}>
        User Management
      </div>
      <div className={darkThemeState ? dark.table : light.table}>
        <Toolbar />
        <div className={darkThemeState ? dark.hDevider : light.hDevider}></div>
        <UpperTitles />
        <div className={darkThemeState ? dark.hDevider : light.hDevider}></div>
        <Table />
        <Pagination />
      </div>
    </div>
  );
};

UserManagement.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(UserManagement);
