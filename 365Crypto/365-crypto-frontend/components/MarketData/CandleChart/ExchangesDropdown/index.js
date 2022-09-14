import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { IoCaretDown } from "react-icons/io5";
import OutsideClickHandler from "react-outside-click-handler";
import Skeleton from "@material-ui/lab/Skeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getExchangeState } from "../../../../actions/SpotGraphData";

// SET ENVIRONMENT BASE URL
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const ExchangesDropdown = ({
  spotGraphData: { pairDataList, exchangeState, isLoading },
  exchange: { exchangeList },
  getExchangeState,
}) => {
  const [isCoinsDropdownActive, setIsCoinsDropdownActive] = useState(false);
  const [graphData, setGraphData] = useState({
    data: [],
  });
  // set graph data
  useEffect(() => {
    if (pairDataList) {
      setGraphData({
        ...graphData,
        data: pairDataList
          .filter((item) => item.symbolCode.slice(-4) === "USDT")
          .reverse(),
      });
    }
  }, [pairDataList]);

  let selected;
  let selectedALT;

  for (let index = 0; index < exchangeList.length; index++) {
    if (exchangeState === exchangeList[index]._id) {
      selected = IMAGE_BASE_URL + exchangeList[index].image;
      selectedALT = exchangeList[index].name;
    }
  }

  return (
    <div className={`${styles.mainDiv}`}>
      {!exchangeState ? (
        <Skeleton
          variant="rect"
          width={"100%"}
          height={"100%"}
          style={{ background: "#1b1a20" }}
        />
      ) : (
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
              <img
                className={styles.imgDiv}
                src={selected}
                alt={`${selectedALT} Exchange`}
              ></img>
              <span className={`${styles.arrowSpan}`}>
                <IoCaretDown />
              </span>
            </div>
            {isCoinsDropdownActive && (
              <div className={`${styles.dropdownContent}`}>
                {graphData.data &&
                  graphData.data.map((item, id) => (
                    <div
                      key={id}
                      onClick={() => {
                        setIsCoinsDropdownActive(false);
                        getExchangeState(item.exchange._id);
                      }}
                      className={`${styles.dropdownItemDiv}`}
                    >
                      <div className={`${styles.dropdownItem}`}>
                        <img
                          className={styles.imgDiv}
                          src={IMAGE_BASE_URL + item.exchange.image}
                        ></img>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </OutsideClickHandler>
        </div>
      )}
    </div>
  );
};

ExchangesDropdown.propTypes = {
  spotGraphData: PropTypes.object.isRequired,
  exchange: PropTypes.object.isRequired,
  getExchangeState: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  spotGraphData: state.spotGraphData,
  exchange: state.exchange,
});
export default connect(mapStateToProps, { getExchangeState })(
  ExchangesDropdown
);
