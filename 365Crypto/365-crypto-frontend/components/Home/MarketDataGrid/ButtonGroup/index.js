import React, { useState } from 'react';
import styles from './index.module.css';
// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  webSocketParams0,
  webSocketParams1,
  webSocketParams2,
  marketDataChanger,
  setWebsocketDataListNull,
} from '../../../../actions/Websocket';
import {
  getFuturesData,
  getPerpetualData,
} from '../../../../actions/MarketDataGraph';

const BUTTON_LIST = [
  { id: '1', title: 'Spot', name: 'spot' },
  { id: '2', title: 'Futures', name: 'future' },
  { id: '3', title: 'Perpetual', name: 'perpectual' },
];

const ButtonGroup = ({
  exchange: { exchangeList },
  buttonGroupState,
  setButtonGroupState,
  webSocketParams0,
  webSocketParams1,
  webSocketParams2,
  getFuturesData,
  getPerpetualData,
  marketDataChanger,
  setTogglebuttonFutures,
  setTogglebuttonPerpetual,
  setWebsocketDataListNull,
}) => {
  const onHandle = async (item) => {
    await setButtonGroupState(item.id);
    marketDataChanger(item.id);
    setWebsocketDataListNull();

    if (item.id === '1') {
      return webSocketParams0(item.name, 'BTC');
    }

    if (item.id === '2') {
      webSocketParams1(item.name, exchangeList && exchangeList[0].name, null);
      getFuturesData(
        exchangeList && exchangeList[0]._id,
        exchangeList && exchangeList[0].name
      );
      setTogglebuttonFutures('Binance');
    }

    if (item.id === '3') {
      webSocketParams2(item.name, exchangeList && exchangeList[0].name, null);
      getPerpetualData(
        exchangeList && exchangeList[0]._id,
        exchangeList && exchangeList[0].name
      );
      setTogglebuttonPerpetual('Binance');
    }
  };

  return (
    <div className={`${styles['head-div']}`}>
      <div className="row">
        {BUTTON_LIST.map((item, id) => (
          <div
            key={id}
            className={
              buttonGroupState === item.id
                ? styles.buttonSelected
                : styles.button
            }
            onClick={() => onHandle(item)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

ButtonGroup.propTypes = {
  webSocketParams0: PropTypes.func.isRequired,
  webSocketParams1: PropTypes.func.isRequired,
  webSocketParams2: PropTypes.func.isRequired,
  getFuturesData: PropTypes.func.isRequired,
  getPerpetualData: PropTypes.func.isRequired,
  marketDataChanger: PropTypes.func.isRequired,
  exchange: PropTypes.object.isRequired,
  setWebsocketDataListNull: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  exchange: state.exchange,
});

export default connect(mapStateToProps, {
  webSocketParams0,
  webSocketParams1,
  webSocketParams2,
  getFuturesData,
  getPerpetualData,
  marketDataChanger,
  setWebsocketDataListNull,
})(ButtonGroup);
