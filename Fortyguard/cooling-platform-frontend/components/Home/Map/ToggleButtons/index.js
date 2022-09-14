import React, { useState } from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const BUTTON_LIST = [
  { id: "1", title: "Map", name: "Map" },
  { id: "2", title: "Satellite", name: "Satellite" },
  { id: "3", title: "Base", name: "Base" },
];

const ToggleButtons = ({ common: { darkThemeState } }) => {
  const [buttonGroupState, setButtonGroupState] = useState("1");
  return (
    <div className={`${darkThemeState ? dark["main-div"] : light["main-div"]}`}>
      <div className={`${darkThemeState ? dark["subDiv"] : light["subDiv"]}`}>
        <div className="row p-0 m-0">
          {BUTTON_LIST.map((item, id) => (
            <div
              key={id}
              className={
                darkThemeState
                  ? buttonGroupState === item.id
                    ? dark.buttonSelected
                    : dark.button
                  : buttonGroupState === item.id
                  ? light.buttonSelected
                  : light.button
              }
              onClick={() => setButtonGroupState(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ToggleButtons.propTypes = {
  setToOppositeTheme: PropTypes.func.isRequired,
  common: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  common: state.common,
});

export default connect(mapStateToProps, {})(ToggleButtons);
