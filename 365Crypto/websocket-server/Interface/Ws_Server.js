const WebSocket = require("ws");
//import Models
const Spot = require("../Models/Spot");
const Coin = require("../Models/Coin");
const Exchange = require("../Models/Exchange");
const Future = require("../Models/Future");
const Pair = require("../Models/Pair");
const Perpetual = require("../Models/Perpetual");

const WsServer = async () => {
  const wss = new WebSocket.Server({ port: process.env.PORT_WEBSOCKET });
  const connectedClients = {};
  const clientStates = {};
  const requiredWscoinDataMap = {};
  const requiredWsExchangeDataMap = {};
  const futureDataMap = {};
  const spotDataMap = {};
  const perpetualDataMap = {};
  (async () => {
    const coins = await Coin.find().select("symbol");
    const exchanges = await Exchange.find().select("name");

    coins.map((coin) => (requiredWscoinDataMap[coin.symbol] = 0));
    coins.map((coin) => (spotDataMap[coin.symbol] = null));

    exchanges.map((exchange) => (requiredWsExchangeDataMap[exchange.name] = 0));
    exchanges.map((exchange) => (futureDataMap[exchange.name] = null));
    exchanges.map((exchange) => (perpetualDataMap[exchange.name] = null));
  })();

  wss.on("connection", (ws) => {
    // Here, ws is the newly connected client
    // ws is not just a newly connected client
    // ws can be any (new or existing) client who is sending at the moment

    ws.on("message", function incoming(data) {
      let dataObj = JSON.parse(data);
      let clientID = dataObj.uuid;
      let type = dataObj.type;
      [exchangeRequested, coinTypeReqested] = dataObj.params;
      let status = dataObj.status;

      // newly connected client
      if (!Object.keys(connectedClients).includes(clientID)) {
        console.log("new client connected");

        if (status !== 0) {
          connectedClients[clientID] = ws;
          connectedClients[clientID]["dataType"] = type;
          clientStates[clientID] = [exchangeRequested, coinTypeReqested];

          // Incrementing counts in Maps when a new user connects
          incrementMapCounts(exchangeRequested, coinTypeReqested);
        }
      }

      // already connected client
      else {
        if (status !== 0) {
          [exchangeRequestedPrev, coinTypeReqestedPrev] =
            clientStates[clientID];

          // Decrementing counts in Maps for an existing user
          decrementMapCounts(exchangeRequestedPrev, coinTypeReqestedPrev);
          connectedClients[clientID]["dataType"] = type;

          // set new state
          clientStates[clientID] = [exchangeRequested, coinTypeReqested];

          // Incrementing counts in Maps for an existing user
          incrementMapCounts(exchangeRequested, coinTypeReqested);
        }
      }
    });

    // ws.on('close', () => {
    // });
  });

  // Discarding CLOSED ws connections from the server
  var discardDisconnectedConnections = function () {
    Object.keys(connectedClients).forEach(function each(clientID) {
      if (connectedClients[clientID].readyState === WebSocket.CLOSED) {
        [exchangeRequestedClosed, coinTypeReqestedClosed] =
          clientStates[clientID];

        // Decrementing counts in Maps for an disconnected user
        decrementMapCounts(exchangeRequestedClosed, coinTypeReqestedClosed);

        delete connectedClients[clientID];
        delete clientStates[clientID];
        console.log("CLOSED connection discarded");
      }
    });
  };

  // Increment
  const incrementMapCounts = (exchangeRequested, coinTypeReqested) => {
    if (coinTypeReqested != null) {
      requiredWscoinDataMap[coinTypeReqested]++;
    } else if (exchangeRequested != null) {
      requiredWsExchangeDataMap[exchangeRequested]++;
    }
  };

  // Decrement
  const decrementMapCounts = (exchangeRequestedPrev, coinTypeReqestedPrev) => {
    if (coinTypeReqestedPrev != null) {
      requiredWscoinDataMap[coinTypeReqestedPrev]--;
    } else if (exchangeRequestedPrev != null) {
      requiredWsExchangeDataMap[exchangeRequestedPrev]--;
    }
  };

  // Fetch latest exchange data to hashmaps from the DB
  const updateFutureData = async () => {
    Object.keys(requiredWsExchangeDataMap).forEach(async (exchangeType) => {
      // Making a DB call
      // TODO: Try querying all the data at the same time---------------------------------------------
      if (requiredWsExchangeDataMap[exchangeType] > 0) {
        const result = await Future.find()
          .populate({
            path: "exchange",
            match: { name: { $eq: exchangeType } },
          })
          .populate({ path: "pair", select: "symbolCode -_id" });

        const response = result.filter((i) => i.exchange != null);

        futureDataMap[exchangeType] = response;
      }
    });

    // console.log("future datamap",connectedClients);
  };
  const updatePerpetualData = async () => {
    Object.keys(requiredWsExchangeDataMap).forEach(async (exchangeType) => {
      // Making a DB call
      // TODO: Try querying all the data at the same time---------------------------------------------
      if (requiredWsExchangeDataMap[exchangeType] > 0) {
        const result = await Perpetual.find()
          .populate({
            path: "exchange",
            match: { name: { $eq: exchangeType } },
          })
          .populate({ path: "pair", select: "symbolCode -_id" });

        const response = result.filter((i) => i.exchange != null);

        perpetualDataMap[exchangeType] = response;
      }

      // console.log(`filter exchange data of ${exchangeType}`);

      // Updating the map
      // futureDataMap[exchangeType] = exchangeData;
    });
  };

  // Fetch latest coin data to hashmaps from the DB
  const updateSpotData = async () => {
    Object.keys(requiredWscoinDataMap).forEach(async (coinType) => {
      // Making a DB call
      // TODO: Try querying all the data at the same time---------------------------------------------
      if (requiredWscoinDataMap[coinType] > 0) {
        const result = await Spot.find()
          .populate({
            path: "pair",
            populate: {
              path: "coin",
              match: { symbol: { $eq: coinType } },
            },
            select: "coin symbolCode",
          })
          .populate("exchange");

        const response = result.filter((i) => i.pair.coin != null);

        spotDataMap[coinType] = response;
      }

      // Updating the map
      // spotDataMap[coinType] = coinData;
      // spotDataMap[coinType] = 'dummy coin data';
    });
  };

  // Send latest data through the ws to the clients
  const sendLatestDataThroughWs = () => {
    Object.keys(connectedClients).forEach((clientID) => {
      let [exchangeRequested, coinTypeReqested] = clientStates[clientID];

      // data taken from maps
      let dataLatest;
      // data to be sent through the ws
      let dataBodyWs;

      // check for invalid data configurations
      if (
        // (exchangeRequested && coinTypeReqested) ||
        !exchangeRequested &&
        !coinTypeReqested
      ) {
        console.log("--- invalid data state provided ---");

        dataBodyWs = {
          type: connectedClients[clientID].dataType,
          coin: coinTypeReqested,
          exchange: exchangeRequested,
          data: [],
        };

        connectedClients[clientID].send(JSON.stringify(dataBodyWs));
      } else if (connectedClients[clientID].dataType === "future") {
        // this is a list

        let dataTempFuture = futureDataMap[exchangeRequested];

        // let  dataLatestfilter;
        if (dataTempFuture != null && coinTypeReqested != null) {
          let regexpFuture = new RegExp(coinTypeReqested, "gmis");

          dataLatest = dataTempFuture.filter((data) =>
            regexpFuture.test(data.unicode)
          );
        } else {
          dataLatest = dataTempFuture;
        }

        // let unicode=
        // console.log("filterd data", dataLatestfilter);
      } else if (connectedClients[clientID].dataType === "perpectual") {
        let dataTempPerpectual = perpetualDataMap[exchangeRequested];
        if (dataTempPerpectual != null && coinTypeReqested != null) {
          let regexpPerpectual = new RegExp(coinTypeReqested, "gmis");

          dataLatest = dataTempPerpectual.filter((data) =>
            regexpPerpectual.test(data.unicode)
          );
        } else {
          dataLatest = dataTempPerpectual;
        }
      } else if (connectedClients[clientID].dataType === "spot") {
        // this is a list
        dataLatest = spotDataMap[coinTypeReqested];
      }

      dataBodyWs = {
        type: connectedClients[clientID]["dataType"],
        coin: coinTypeReqested,
        exchange: exchangeRequested,
        data: dataLatest,
      };

      connectedClients[clientID].send(JSON.stringify(dataBodyWs));
      //sending data
    });
  };

  const updateCycle = () => {
    updateFutureData();
    updateSpotData();
    updatePerpetualData();

    sendLatestDataThroughWs();
  };

  setInterval(discardDisconnectedConnections, 10000);

  setInterval(updateCycle, 5000);
};

module.exports = WsServer;
