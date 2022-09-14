//Route Files
const up = require("./Routes/upRoutes");
const auth = require("./Routes/authRoutes");
const users = require("./Routes/usersRoutes");

const exchange = require("./Routes/exchangeRoutes");
const coin = require("./Routes/coinRouters");
const pair = require("./Routes/pairRoutes");

const spot = require("./Routes/spotRoutes");
const future = require("./Routes/futureRoutes");
const perpetual = require("./Routes/perpetualRoutes");

const openInterestVolumeHistory_1min = require("./Routes/OpenInterestVolumeHistory_Routes/openInterestVolumeHistory_1minRoutes");
const openInterestVolumeHistory_5min = require("./Routes/OpenInterestVolumeHistory_Routes/openInterestVolumeHistory_5minRoutes");
const openInterestVolumeHistory_15min = require("./Routes/OpenInterestVolumeHistory_Routes/openInterestVolumeHistory_15minRoutes");
const openInterestVolumeHistory_1hr = require("./Routes/OpenInterestVolumeHistory_Routes/openInterestVolumeHistory_1hrRoutes");
const openInterestVolumeHistory_4hr = require("./Routes/OpenInterestVolumeHistory_Routes/openInterestVolumeHistory_4hrRoutes");
const openInterestVolumeHistory_12hr = require("./Routes/OpenInterestVolumeHistory_Routes/openInterestVolumeHistory_12hrRoutes");
const openInterestVolumeHistory_24hr = require("./Routes/OpenInterestVolumeHistory_Routes/openInterestVolumeHistory_24hrRoutes");

const candleChart_day = require("./Routes/CandleChart_Routes/candleChart_dayRoutes");
const candleChart_week = require("./Routes/CandleChart_Routes/candleChart_weekRoutes");
const candleChart_month = require("./Routes/CandleChart_Routes/candleChart_monthRoutes");
const candleChart_year = require("./Routes/CandleChart_Routes/candleChart_yearRoutes");

const liquidation_1min = require("./Routes/Liquidation_Routes/liquidation_1minRoutes");
const liquidation_5min = require("./Routes/Liquidation_Routes/liquidation_5minRoutes");
const liquidation_15min = require("./Routes/Liquidation_Routes/liquidation_15minRoutes");
const liquidation_1hr = require("./Routes/Liquidation_Routes/liquidation_1hrRoutes");
const liquidation_4hr = require("./Routes/Liquidation_Routes/liquidation_4hrRoutes");
const liquidation_12hr = require("./Routes/Liquidation_Routes/liquidation_12hrRoutes");
const liquidation_24hr = require("./Routes/Liquidation_Routes/liquidation_24hrRoutes");

const coinEvents = require("./Routes/CoinEvents/coinEvents");
const coinEvents_Categories = require("./Routes/CoinEvents/coinEvents_Categories");

const socialFeeds = require("./Routes/socialFeedsRoutes");
const socialFeedTopics = require("./Routes/socialFeedTopicsRoutes");

const cryptoNews = require("./Routes/CryptoNews_Routes/cryptoNews");
const cryptoNews_Sentiment = require("./Routes/CryptoNews_Routes/cryptoNews_Sentiment");

const send_Email = require("./Routes/SendEmail/send_Email");
const subscribe_Email = require("./Routes/SendEmail/subscribe_Email");
const unSubscribe_Email = require("./Routes/SendEmail/unSubscribe_Email");

//Routes Array
const pathRoutes = [
  { path: "/up", route: up },
  { path: "/api/auth", route: auth },
  { path: "/api/users", route: users },
  { path: "/api/exchange", route: exchange },
  { path: "/api/coin", route: coin },
  { path: "/api/pair", route: pair },
  { path: "/api/spot", route: spot },
  { path: "/api/future", route: future },
  { path: "/api/perpetual", route: perpetual },
  {
    path: "/api/open-interest-volume-history/1min",
    route: openInterestVolumeHistory_1min,
  },
  {
    path: "/api/open-interest-volume-history/5min",
    route: openInterestVolumeHistory_5min,
  },
  {
    path: "/api/open-interest-volume-history/15min",
    route: openInterestVolumeHistory_15min,
  },
  {
    path: "/api/open-interest-volume-history/1hr",
    route: openInterestVolumeHistory_1hr,
  },
  {
    path: "/api/open-interest-volume-history/4hr",
    route: openInterestVolumeHistory_4hr,
  },
  {
    path: "/api/open-interest-volume-history/12hr",
    route: openInterestVolumeHistory_12hr,
  },
  {
    path: "/api/open-interest-volume-history/24hr",
    route: openInterestVolumeHistory_24hr,
  },
  { path: "/api/candle-chart/day", route: candleChart_day },
  { path: "/api/candle-chart/week", route: candleChart_week },
  { path: "/api/candle-chart/month", route: candleChart_month },
  { path: "/api/candle-chart/year", route: candleChart_year },
  { path: "/api/liquidation/1min", route: liquidation_1min },
  { path: "/api/liquidation/5min", route: liquidation_5min },
  { path: "/api/liquidation/15min", route: liquidation_15min },
  { path: "/api/liquidation/1hr", route: liquidation_1hr },
  { path: "/api/liquidation/4hr", route: liquidation_4hr },
  { path: "/api/liquidation/12hr", route: liquidation_12hr },
  { path: "/api/liquidation/24hr", route: liquidation_24hr },
  { path: "/api/coin-events", route: coinEvents },
  { path: "/api/coin-events-categories", route: coinEvents_Categories },
  { path: "/api/social-feeds", route: socialFeeds },
  { path: "/api/social-feed-topics", route: socialFeedTopics },
  { path: "/api/crypto-news", route: cryptoNews },
  { path: "/api/crypto-news-sentiment", route: cryptoNews_Sentiment },
  { path: "/api/send-email", route: send_Email },
  { path: "/api/subscribe-email", route: subscribe_Email },
  { path: "/api/unsubscribe-email", route: unSubscribe_Email },
];

module.exports = pathRoutes;
