import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { IoIosArrowBack } from "react-icons/io";
import Router from "next/router";
import Poster from "@shared/Carousel/Poster";
import AddCard from "@components/MyList/AddCard";

import { getMyWishList } from "@actions/OnDemand";
import { connect } from "react-redux";

const dummy = [
  {
    id: 1,
    src: "/poster/spiderman.jpg",
  },
  {
    id: 2,
    src: "/poster/prey.jpg",
  },
  {
    id: 3,
    src: "/poster/dr-strange.jpg",
  },
  {
    id: 4,
    src: "/poster/extinction.jpg",
  },
  {
    id: 4,
    src: "/poster/freedom.jpg",
  },
  {
    id: 5,
    src: "/poster/hp.jpg",
  },
];

const MyListPage = ({ getMyWishList, onDemand }) => {
  useEffect(() => {
    getMyWishList();
  }, []);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <div
          onClick={() => Router.push("/on-demand")}
          className={styles.backButton}
        >
          <IoIosArrowBack />
        </div>
        <div className={styles.title}>
          <h6>Mi lista</h6>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.leftContainer}>
          {dummy.map((i) => (
            <Poster src={i.src} key={i} />
          ))}
          <AddCard />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.advertismentContainer}>
            <img
              height={windowSize.height * 0.7}
              className={styles.advertisment}
              src="/add1.png"
              alt="Add"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

MyListPage.propTypes = {
  getMyWishList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  onDemand: state.onDemand,
});

MyListPage.getLayout = function getLayout(MyListPage) {
  return <Layout>{MyListPage}</Layout>;
};

export default connect(mapStateToProps, { getMyWishList })(MyListPage);
