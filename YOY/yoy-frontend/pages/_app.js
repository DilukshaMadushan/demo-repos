import "../styles/globals.css";
import "font-awesome/css/font-awesome.min.css";
import store from "../store";
import { Provider } from "react-redux";
import Head from "next/head";
import Alert from "@shared/Alert";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);

  return (
    <Provider store={store}>
      <Alert />
      <Head>
        <title>YOY</title>
        <meta name="description" content="YOY - Tv, Game, Pod cast" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@100;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="//db.onlinewebfonts.com/c/0252223e8c36008b595f5e379ad5e524?family=Bradley+Hand+ITC"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}

export default MyApp;
