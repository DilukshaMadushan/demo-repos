import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Layout from "@components/Layout";
import styles from "./index.module.css";
import { IoIosArrowBack } from "react-icons/io";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategoryVideos, getOnDemandData } from "@actions/OnDemand";
import Poster from "@shared/Carousel/Poster";
import PopupModal from "@shared/PopupModal";

const CategoryPage = ({ getCategoryVideos, onDemand, getOnDemandData }) => {
  const router = useRouter();
  const id = router.query.categoryId;

  const [showDetailCard, setShowDetailCard] = useState(false);
  const [detailCardData, setDetailCardData] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      getCategoryVideos(id);
    }
  }, [id, onDemand]);

  useEffect(() => {
    getOnDemandData();
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
          className={styles.backButton}
          onClick={() => Router.push("/on-demand")}
        >
          <IoIosArrowBack />
        </div>
        <div className={styles.title}>
          <h6>Lanzamientos recientes</h6>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.leftContainer}>
          {onDemand.onDemand.length !== 0 &&
            onDemand.onDemand[2].data.map((item, i) => (
              <div key={String(i)} onClick={() => setDetailCardData(item)}>
                <Poster
                  src={item.default_image}
                  cardVisible={setShowDetailCard}
                />
              </div>
            ))}
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.advertismentContainer}>
            <img
              height={windowSize.height * 0.65}
              className={styles.advertisment}
              src="/add1.PNG"
              alt="Add"
            />
          </div>
        </div>
      </div>

      {showDetailCard && (
        <PopupModal data={detailCardData} setVisible={setShowDetailCard} />
      )}
    </div>
  );
};

CategoryPage.propTypes = {
  getOnDemandData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  onDemand: state.onDemand,
});

CategoryPage.getLayout = function getLayout(CategoryPage) {
  return <Layout>{CategoryPage}</Layout>;
};

export default connect(mapStateToProps, {
  getCategoryVideos,
  getOnDemandData,
})(CategoryPage);
