import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.css";

import LandingPage from "@components/LandingPage";
import Login from "@components/Login";
import { useState } from "react";
import Register from "@components/Register";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>YOY</title>
        <meta name="description" content="YOY - Tv, Game, Pod cast" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Login />
        <Register />
        <LandingPage />
      </div>
    </div>
  );
}
