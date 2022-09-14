import { combineReducers } from "redux";

import alert from "./Alert";
import auth from "./Auth";
import coin from "./Home/Coin";
import exchange from "./Home/Exchange";
import websocket from "./Websocket";
import marketDataGraph from "./MarketDataGraph";
import spotGraphData from "./SpotGraphData";
import coinEvents from "./CoinEvents";
import home from "./Home";
import strapi from "./Strapi";
import cryptoNews from "./CryptoNews";
import socialFeeds from "./SocialFeeds";
import ReportIssue from "./ReportIssue";
import myAccount from "./MyAccount";

export default combineReducers({
  home,
  alert,
  auth,
  coin,
  exchange,
  websocket,
  marketDataGraph,
  spotGraphData,
  coinEvents,
  strapi,
  cryptoNews,
  socialFeeds,
  ReportIssue,
  myAccount,
});
