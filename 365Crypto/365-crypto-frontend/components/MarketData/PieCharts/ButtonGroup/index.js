import React, { useEffect } from "react";
import styles from "./index.module.css";
import Skeleton from "@material-ui/lab/Skeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCoinData } from "../../../../actions/SpotGraphData";

const BUTTON_LIST = [
  { id: "1", title: "BTC Candle Chart" },
  { id: "2", title: "Market Overview" },
];

const ButtonGroup = ({
  buttonGroupState,
  setButtonGroupState,
  getCoinData,
  spotGraphData: { coinDataList, isLoading },
  coin: { coinId },
}) => {
  //set name in CARD_LIST
  useEffect(() => {
    if (coinId) {
      getCoinData(coinId && coinId[0]);
    }
  }, [coinId]);

  if (coinDataList) {
    BUTTON_LIST[0].title = `${coinDataList.symbol} Candle Chart`;
  }

  return (
    <div className={` ${styles["head-div"]}`}>
      {isLoading ? (
        <div className={` ${styles["candleChartButtongroup"]}`}>
          <Skeleton
            variant="rect"
            width={"100%"}
            height={"100%"}
            style={{ background: "#1b1a20" }}
          />
        </div>
      ) : (
        <div className="row m-0">
          {BUTTON_LIST.map((item, id) => (
            <div
              key={id}
              className={
                buttonGroupState === item.id
                  ? styles.buttonSelected
                  : styles.button
              }
              onClick={() => {
                setButtonGroupState(item.id);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ButtonGroup.propTypes = {
  spotGraphData: PropTypes.object.isRequired,
  coin: PropTypes.object.isRequired,
  getCoinData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  spotGraphData: state.spotGraphData,
  coin: state.coin,
});
export default connect(mapStateToProps, { getCoinData })(ButtonGroup);
