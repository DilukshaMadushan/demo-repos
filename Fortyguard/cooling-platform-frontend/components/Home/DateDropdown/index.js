import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./dark.module.css";
import CustomButton from "./CustonButton/CustomButton";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFilterDate } from "../../../actions/Map";

const DateDropdown = ({ map: { date }, getFilterDate }) => {
  return (
    <div className={styles.mainDiv}>
      <DatePicker
        customInput={<CustomButton />}
        selected={date}
        onChange={(date) => getFilterDate(date)}
        // showTimeSelect
      />
    </div>
  );
};

DateDropdown.propTypes = {
  getFilterDate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps, { getFilterDate })(DateDropdown);
