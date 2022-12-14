import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Home from "../components/Home";

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>FORTYGUARD</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div>
        <Home />
      </div>
    </div>
  );
}
HomePage.getLayout = function getLayout(HomePage) {
  return <Layout>{HomePage}</Layout>;
};
