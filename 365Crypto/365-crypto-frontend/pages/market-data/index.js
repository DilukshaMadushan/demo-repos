import React, { useState, useEffect } from "react";
import Head from "next/head";
import MarketDataGrid from "../../components/Home/MarketDataGrid";
import CandleChart from "../../components/MarketData/CandleChart";
import FuturesPerpetual from "../../components/MarketData/FuturesPerpetual";
import ButtonGroup from "../../components/MarketData/PieCharts/ButtonGroup";
import PieChart from "../../components/MarketData/PieCharts/PieChart";
import DataCards from "../../components/MarketData/PieCharts/DataCards";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSeeAllButtonState } from "../../actions/MarketDataGraph";

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const MarketData = ({ websocket: { changeId }, getSeeAllButtonState }) => {
  const [buttonGroupState, setButtonGroupState] = useState("1");

  useEffect(() => {
    getSeeAllButtonState(false);
  }, []);

  return (
    <div>
      <Head>
        <link rel="canonical" href={`${IMAGE_BASE_URL}market-data`} />
        <title>
          Crypto Market Data: Cryptocurrency Derivatives and Spot Real Time Data
          and Analytics - 365crypto.com
        </title>
        <meta name="robots" content="index, follow" />
        <meta
          name="title"
          content="Crypto Market Data: Cryptocurrency Derivatives and Spot Real Time Data and Analytics  - 365crypto.com"
        />
        <meta property="og:site_name" content="365 Crypto" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${IMAGE_BASE_URL}market-data`} />
        <meta
          property="og:title"
          content="Crypto Market Data: Cryptocurrency Derivatives and Spot Real Time Data and Analytics  - 365crypto.com"
        />
        <meta
          property="og:description"
          content="Cryptocurrency spot, futures, and perpetual real time data and analytics on various exchanges including liquidations, open interest and more. "
        />
        <meta
          name="description"
          content="Cryptocurrency spot, futures, and perpetual real time data and analytics on various exchanges including liquidations, open interest and more. "
        />
        <meta name="thumbnail" content={`${IMAGE_BASE_URL}main_logo.png`} />
        <meta property="og:image" content={`${IMAGE_BASE_URL}main_logo.png`} />
      </Head>
      <div className="container-fluid" style={{ backgroundColor: "#15141b" }}>
        <div>
          <MarketDataGrid />
        </div>

        <div>
          {changeId === "1" ? (
            <div>
              <div
                className="row p-0"
                style={{
                  backgroundColor: "#15141b",
                }}
              >
                <ButtonGroup
                  buttonGroupState={buttonGroupState}
                  setButtonGroupState={setButtonGroupState}
                />
              </div>

              <div>
                {buttonGroupState === "2" ? (
                  <div
                    className="row"
                    style={{
                      backgroundColor: "#15141b",
                    }}
                  >
                    <div className="col-sm-8 ">
                      <DataCards />
                    </div>
                    <div
                      className="col-sm-4 p-0"
                      style={{
                        backgroundColor: "#15141b",
                      }}
                    >
                      <PieChart />
                    </div>
                  </div>
                ) : (
                  <div>
                    <CandleChart />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <FuturesPerpetual />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MarketData.propTypes = {
  websocket: PropTypes.object.isRequired,
  getSeeAllButtonState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  websocket: state.websocket,
});
export default connect(mapStateToProps, { getSeeAllButtonState })(MarketData);
