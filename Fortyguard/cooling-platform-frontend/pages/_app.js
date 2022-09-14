import React, { useEffect, useRef, useState } from "react";
import "../styles/globals.css";
import { useRouter } from "next/router";
import store from "../store";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/logoIcon.png" />
        <title>FORTYGUARD</title>
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}

export default MyApp;
