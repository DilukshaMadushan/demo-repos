import dark from "./dark.module.css";
import light from "./light.module.css";
import { IoCaretDown } from "react-icons/io5";
import { BiCalendar } from "react-icons/bi";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setToOppositeTheme } from "../../../../actions/Common";

const CustomButton = ({ onClick, value, common: { darkThemeState } }) => {
  return (
    <div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
      <div className={darkThemeState ? dark.dropdown : light.dropdown}>
        <div
          onClick={onClick}
          className={darkThemeState ? dark.dropdownBtn : light.dropdownBtn}
        >
          <span className={darkThemeState ? dark.titleSpan : light.titleSpan}>
            {value === "" ? "Date" : value}
          </span>
          <span className={darkThemeState ? dark.arrowSpan : light.arrowSpan}>
            <IoCaretDown />
          </span>
        </div>
      </div>
    </div>
  );
};

CustomButton.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, { setToOppositeTheme })(CustomButton);
