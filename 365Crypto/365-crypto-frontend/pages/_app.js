import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { DivProvider } from "../components/Home/MarketDataGrid/DivContext";
import { LoginProvider } from "../components/Layout/common/LoginContext";
import { Provider } from "react-redux";
import store from "../store";
import Alert from "../components/Layout/common/Alert";
import { Router } from "@material-ui/icons";
import { useRouter } from "next/router";
import ScrollToTop from "../components/Layout/common/ScrollToTop";
import Script from "next/script";
import * as gtag from "../components/Layout/common/lib/gtag";

//LogRocket
import LogRocket from "logrocket";

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const router = useRouter();

  //LogRocket
  useEffect(() => {
    LogRocket.init(
      "jstlbv/365-crypto"

      // { shouldCaptureIP: false }
    );
  }, []);

  const myRef = useRef(null);
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    (() => {
      myRef.current.scrollIntoView();
    })();
  }, [pathname]);

  return (
    <Provider store={store}>
      <LoginProvider>
        <DivProvider>
          <Alert />
          <Layout>
            <div ref={myRef}></div>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
            <Component {...pageProps} />
          </Layout>
        </DivProvider>
      </LoginProvider>
    </Provider>
  );
}

export default MyApp;
