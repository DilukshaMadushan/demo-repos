import React, { useState, useEffect, useContext } from "react";
import styles from "./index.module.css";
import PrimaryButton from "../common/PrimaryButton";
import ButtonGroup from "./ButtonGroup";
import SearchBar from "./SearchBar";
import SearchBarFutures from "./SearchBarFutures";
import SearchBarPerpetual from "./SearchBarPerpetual";
import SpotTable from "./SpotTable";
import FuturesTable from "./FuturesTable";
import PerpetualTable from "./PerpetualTable";
import SpotToggleButtons from "./SpotToggleButtons";
import FuturesToggleButtons from "./FuturesToggleButtons";
import PerpetualToggleButtons from "./PerpetualToggleButtons";
import Link from "next/link";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCoins } from "../../../actions/Home/Coin";
import { getExchanges } from "../../../actions/Home/Exchange";
import {
  webSocketParams0,
  marketDataChanger,
} from "../../../actions/Websocket";
import { getSeeAllButtonState } from "../../../actions/MarketDataGraph";

const MarketDataGrid = ({
  getCoins,
  getExchanges,
  webSocketParams0,
  marketDataChanger,
  getSeeAllButtonState,
  marketDataGraph: { seeAllButtonState },
}) => {
  const [buttonGroupState, setButtonGroupState] = useState("1");

  const [togglebuttonFutures, setTogglebuttonFutures] = useState("Binance");

  const [coinListSelectionFutures, setCoinListSelectionFutures] = useState("");

  const [togglebuttonPerpetual, setTogglebuttonPerpetual] = useState("Binance");

  const [coinListSelectionPerpetual, setCoinListSelectionPerpetual] =
    useState("");

  useEffect(() => {
    getCoins();
    getExchanges();
    webSocketParams0("spot", "BTC");
    marketDataChanger("1");
    getSeeAllButtonState(true);
  }, []);

  const DataTables = () => {
    if (buttonGroupState === "1") {
      return (
        <div>
          <div className={`row mt-3 ${styles["spot-button-div"]}`}>
            <SpotToggleButtons />
          </div>

          <div className={`row ${styles["table-head-div"]}`}>
            <SpotTable />
          </div>
        </div>
      );
    } else if (buttonGroupState === "2") {
      return (
        <div>
          <div className={`row mt-3 ${styles["futures-button-div"]}`}>
            <FuturesToggleButtons
              togglebuttonFutures={togglebuttonFutures}
              setTogglebuttonFutures={setTogglebuttonFutures}
            />
          </div>
          <div className={`row ${styles["table-head-div"]}`}>
            <FuturesTable />
          </div>
        </div>
      );
    } else if (buttonGroupState === "3") {
      return (
        <div>
          <div className={`row mt-3 ${styles["futures-button-div"]}`}>
            <PerpetualToggleButtons
              togglebuttonPerpetual={togglebuttonPerpetual}
              setTogglebuttonPerpetual={setTogglebuttonPerpetual}
            />
          </div>
          <div className={`row ${styles["table-head-div"]}`}>
            <PerpetualTable />
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`${styles["main-div"]}`}>
      <div className={`row ${styles["sub-head-div"]}`}>
        <div className="col-6 p-0">
          <h1 className={styles.marketDataTitle}>Market Data</h1>
        </div>

        <div className={`col-6 p-0 ${styles["seeall-button-div"]}`}>
          <Link href="/market-data">
            <div>
              {seeAllButtonState === false ? (
                ""
              ) : (
                <PrimaryButton>See All</PrimaryButton>
              )}
            </div>
          </Link>
        </div>
      </div>

      <div className={`row ${styles["sub-head-div"]}`}>
        <div className={`col-6 p-0 ${styles[""]}`}>
          <ButtonGroup
            buttonGroupState={buttonGroupState}
            setButtonGroupState={setButtonGroupState}
            setTogglebuttonFutures={setTogglebuttonFutures}
            setTogglebuttonPerpetual={setTogglebuttonPerpetual}
          />
        </div>
        <div className={`col-6 p-0 ${styles["search-button"]}`}>
          <div className="">
            {buttonGroupState === "1" ? (
              <SearchBar />
            ) : buttonGroupState === "2" ? (
              <SearchBarFutures
                coinListSelectionFutures={coinListSelectionFutures}
                setCoinListSelectionFutures={setCoinListSelectionFutures}
                togglebuttonFutures={togglebuttonFutures}
                setTogglebuttonFutures={setTogglebuttonFutures}
              />
            ) : buttonGroupState === "3" ? (
              <SearchBarPerpetual
                coinListSelectionPerpetual={coinListSelectionPerpetual}
                setCoinListSelectionPerpetual={setCoinListSelectionPerpetual}
                togglebuttonPerpetual={togglebuttonPerpetual}
                setTogglebuttonPerpetual={setTogglebuttonPerpetual}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div>
        <DataTables />
      </div>
    </div>
  );
};

MarketDataGrid.propTypes = {
  getCoins: PropTypes.func.isRequired,
  getExchanges: PropTypes.func.isRequired,
  webSocketParams0: PropTypes.func.isRequired,
  marketDataChanger: PropTypes.func.isRequired,
  getSeeAllButtonState: PropTypes.func.isRequired,
  marketDataGraph: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  marketDataGraph: state.marketDataGraph,
});

export default connect(mapStateToProps, {
  getCoins,
  getExchanges,
  webSocketParams0,
  marketDataChanger,
  getSeeAllButtonState,
})(MarketDataGrid);
