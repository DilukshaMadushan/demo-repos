import React from "react";
import DropdownBox from "../DropdownBox";
import dark from "./dark.module.css";
import light from "./light.module.css";

//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const index = ({ common: { darkThemeState } }) => {
  return (
    <div className={`${dark["main"]}`}>
      Create User
      <div
        className={
          darkThemeState ? `${dark["mainDiv"]}` : `${light["mainDivLight"]}`
        }
      >
        <div className={`${dark["proPicDiv"]}`}>
          <div className={`${dark["profilePic"]}`}></div>
        </div>
        <div className={`${dark["proTitleDiv"]}`}>
          <text className="proTitle">Profile Picture</text>
        </div>
        <div className={`${dark["nameEmailDiv"]}`}>
          <div className={`${dark["nameDiv"]}`}>
            <div className="title">Name</div>
            <div className={`${dark["inputDiv"]}`}>
              <input
                className={
                  darkThemeState
                    ? `${dark["inputBox"]}`
                    : `${light["inputBoxLight"]}`
                }
              ></input>
            </div>
          </div>

          <div className={`${dark["EmailDiv"]}`}>
            <text className="title">Email</text>
            <div className={`${dark["inputDiv"]}`}>
              <input
                className={
                  darkThemeState
                    ? `${dark["inputBox"]}`
                    : `${light["inputBoxLight"]}`
                }
              ></input>
            </div>
          </div>
        </div>
        <div className={`${dark["passwordMainDiv"]}`}>
          <div className={`${dark["passwordDiv"]}`}>
            <text className="title">Password</text>
            <div className={`${dark["inputDiv"]}`}>
              <input
                className={
                  darkThemeState
                    ? `${dark["inputBox"]}`
                    : `${light["inputBoxLight"]}`
                }
              ></input>
            </div>
          </div>
          <div className={`${dark["confirmPasswordDiv"]}`}>
            <text className="title">Confirm Password</text>
            <div className={`${dark["inputDiv"]}`}>
              <input
                className={
                  darkThemeState
                    ? `${dark["inputBox"]}`
                    : `${light["inputBoxLight"]}`
                }
              ></input>
            </div>
          </div>
        </div>
        <div className={`${dark["siteRoleDiv"]}`}>
          <text className="title">Site Role</text>
          <div className={`${dark["dropBox"]}`}>
            <DropdownBox />
          </div>
        </div>
        <div className={`${dark["saveButtonDiv"]}`}>
          <div className={`${dark["buttonDiv"]}`}>
            <div className={`${dark["button"]}`}>Save</div>
          </div>
        </div>
      </div>
    </div>
  );
};

index.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(index);
