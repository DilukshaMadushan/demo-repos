import React, { useEffect, useState, useRef } from "react";
import SideNavigation from "./SideNavigation";
import TopNavigation from "./TopNavigation";
import TopNavMob from "./TopNavMob";
import styles from "./index.module.css";
import { v4 as uuidv4 } from "uuid";
import Footer from "./Footer";
import Head from "next/head";
import SubscribeMsgModal from "../Layout/SubscribeMsgModal";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getWebsocketData } from "../../actions/Websocket";
import { getCoins } from "../../actions/Home/Coin";
import { getExchanges } from "../../actions/Home/Exchange";
import Modal from "@material-ui/core/Modal";
import MyAccount from "./MyAccount";
import { getUserAllDetails } from "../../actions/MyAccount/index";

// cookies
import { useCookies } from "react-cookie";

// SET ENVIRONMENT BASE URL
const WS_URL = process.env.WS_URL;

function Layout(props) {
  const [section, setSection] = useState("Account_Details");
  const [mobileSection, setMobileSection] = useState("Menu");
  const [cookies, setCookie, removeCookie] = useCookies(["Logintoken"]);
  const [titleStyle, setTitleStyle] = useState("Account_Details");

  const isBrowser = typeof window !== "undefined";
  var ws = isBrowser ? new WebSocket(`${WS_URL}`) : null;

  const [uniqueID, setUniqueId] = useState("");
  const [wsData, setWsData] = useState([]);

  useEffect(() => {
    if (
      wsData.type === props.websocket.type &&
      wsData.exchange === props.websocket.exchangeData &&
      wsData.coin === props.websocket.coinData &&
      wsData.data !== null
    ) {
      props.getWebsocketData(wsData);
    }
  }, [wsData]);

  useEffect(() => {
    props.getCoins();
    props.getExchanges();

    setUniqueId(uuidv4());
  }, []);

  const initWebsocket = () => {
    ws.onopen = () => {
      const welcomeMsg = {
        type: props.websocket.type,
        params: [props.websocket.exchangeData, props.websocket.coinData],
        uuid: uniqueID,
        status: 1,
      };

      ws.send(JSON.stringify(welcomeMsg));
    };
    ws.onmessage = (event) => {
      const res = event.data;
      const response = JSON.parse(res);
      setWsData(response);
    };
  };

  useEffect(() => {
    initWebsocket();
  }, [
    props.websocket.type,
    props.websocket.exchangeData,
    props.websocket.coinData,
  ]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //getUserAllDetails func run with token
  useEffect(() => {
    if (cookies.Logintoken) {
      props.getUserAllDetails(cookies.Logintoken);
    }
  }, [cookies.Logintoken]);

  return (
    <div className="container-fluid">
      <Head>
        <title>365Crypto</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="row">
        <SubscribeMsgModal />
        <div className="col-xl-2 p-0">
          <div className={`${styles["side-nav"]}`}>
            <SideNavigation />
          </div>
        </div>
        <div className="col-xl-10 p-0">
          <div className={`${styles["bg-container"]}`}>
            <div className={`${styles["top-nav"]}`}>
              <TopNavigation
                setOpen={setOpen}
                setMobileSection={setMobileSection}
                setSection={setSection}
                titleStyle={titleStyle}
                setTitleStyle={setTitleStyle}
              />
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className={styles.modal}
            >
              <div className={`${styles["Report-div"]}`}>
                <MyAccount
                  setOpen={setOpen}
                  section={section}
                  setSection={setSection}
                  setMobileSection={setMobileSection}
                  mobileSection={mobileSection}
                  titleStyle={titleStyle}
                  setTitleStyle={setTitleStyle}
                />
              </div>
            </Modal>
            <div className={`${styles["top-nav-mob"]} sticky-top`}>
              <TopNavMob
                setOpen={setOpen}
                setMobileSection={setMobileSection}
                section={section}
                setSection={setSection}
                titleStyle={titleStyle}
                setTitleStyle={setTitleStyle}
              />
            </div>
            <div className={`${styles["scroll-view"]}`}>
              <main>{props.children}</main>
              <footer className="m-4">
                <Footer
                  setAccountOpen={setOpen}
                  setMobileSection={setMobileSection}
                  section={section}
                  setSection={setSection}
                  setTitleStyle={setTitleStyle}
                />
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  getWebsocketData: PropTypes.func.isRequired,
  websocket: PropTypes.object.isRequired,
  getCoins: PropTypes.func.isRequired,
  getExchanges: PropTypes.func.isRequired,
  getUserAllDetails: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  websocket: state.websocket,
});

export default connect(mapStateToProps, {
  getWebsocketData,
  getCoins,
  getExchanges,
  getUserAllDetails,
})(Layout);
