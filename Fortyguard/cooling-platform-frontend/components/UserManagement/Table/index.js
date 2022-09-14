import React from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { BiReset } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { data } from "./data";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import DropdownBox from "../DropdownBox";
import { DropDownBox } from "devextreme-react";

const Table = ({ common: { darkThemeState } }) => {
  return (
    <div className={darkThemeState ? dark.mainDiv : light.mainDiv}>
      {data.map((item, index) => (
        <div>
          <div className={darkThemeState ? dark.bar : light.bar}>
            <div className={darkThemeState ? dark.tickBox : light.tickBox}>
              <input
                type="checkbox"
                className={darkThemeState ? dark.checkBox : light.checkBox}
              />
            </div>
            <div className={darkThemeState ? dark.infoDiv : light.infoDiv}>
              <div className={darkThemeState ? dark.nameDiv : light.nameDiv}>
                <div className={darkThemeState ? dark.leftDiv : light.leftDiv}>
                  <img
                    className={darkThemeState ? dark.img : light.img}
                    src={item.image}
                    alt=""
                  />
                  <div
                    className={
                      darkThemeState ? dark.detailsDiv : light.detailsDiv
                    }
                  >
                    <div className={darkThemeState ? dark.name : light.name}>
                      {item.name}
                    </div>
                    <div className={darkThemeState ? dark.email : light.email}>
                      {item.email}
                    </div>
                  </div>
                </div>
                <div
                  className={darkThemeState ? dark.rightDiv : light.rightDiv}
                >
                  <div
                    style={{
                      backgroundColor:
                        item.active === "true" ? "#20A500" : "#F03C6E",
                    }}
                    className={
                      darkThemeState ? dark.indecator : light.indecator
                    }
                  ></div>
                </div>
              </div>
              <div
                className={
                  darkThemeState ? dark.siteRoleDiv : light.siteRoleDiv
                }
              >
                {/* <div className={darkThemeState ? dark.roleBtn : light.roleBtn}>
                  {item.role} */}
                <DropdownBox />
                {/* </div> */}

                {/* <TiArrowSortedDown /> */}
              </div>
              <div
                className={darkThemeState ? dark.actionsDiv : light.actionsDiv}
              >
                <div
                  className={
                    darkThemeState ? dark.resetPswrdDiv : light.resetPswrdDiv
                  }
                >
                  <div className={darkThemeState ? dark.icon : light.icon}>
                    <BiReset />
                  </div>
                  Reset Password
                </div>
                <div className={darkThemeState ? dark.dltDiv : light.dltDiv}>
                  <div className={darkThemeState ? dark.icon : light.icon}>
                    <RiDeleteBinLine />
                  </div>
                  Delete
                </div>
              </div>
            </div>
          </div>
          <div
            className={darkThemeState ? dark.hDevider : light.hDevider}
          ></div>
        </div>
      ))}
    </div>
  );
};

Table.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(Table);
