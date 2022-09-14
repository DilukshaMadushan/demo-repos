import React from "react";
import "react-multi-carousel/lib/styles.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./index.module.css";
import SS from "@public/Capture.jpg";

const BottomContainer = ({ onDemand: { videoViewSecondState } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h4>Episodios</h4>
          <div className={styles.pagination}>
            Temporada 1
            <div className={styles.scroll}>
              <i className="fa fa-caret-up" aria-hidden="true"></i>
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        {videoViewSecondState.trailer_section &&
          videoViewSecondState.trailer_section.map((item, i) => (
            <div className={styles.episodeRow} key={String(i)}>
              <div className={styles.episodeContainer}>
                <div className={styles.number}>{i + 1}</div>
                <div className={styles.mainCardLeft}>
                  {/* <img style={{ width: "100%" }} src={SS.src} alt="capture" /> */}
                  <video controls className={styles.videoStyle}>
                    <source src={item.resolutions.original} />
                  </video>
                </div>
                <div className={styles.mainCardRight}>
                  <h2>{item.name}</h2>
                  <h4>
                    Walter White, un profesor de química de 50 años, comienza a
                    fabricar metanfetamina cristalizada en secreto para mantener
                    a su familia después de enterarse de que tiene cáncer de
                    pulmón terminal.
                  </h4>
                </div>
                {/* <div className={styles.mainCardMobile}>
                <div className={styles.mainCardMobileContainer}>
                  <div className={styles.mainCardLeft}>
                    <video controls className={styles.videoStyle}>
                      <source src={item.resolutions.original} />
                    </video>
                  </div>
                  <div className={styles.mainCardRight}>
                    <h2>{item.name}</h2>
                    <div>54 min</div>
                  </div>
                </div>
                <div className={styles.description}>
                  Walter White, un profesor de química de 50 años, comienza a
                    fabricar metanfetamina cristalizada en secreto para mantener
                    a su familia después de enterarse de que tiene cáncer de
                    pulmón terminal.
                </div>
              </div> */}
              </div>

              <div className={styles.mobileDescription}>
                <h4>
                  Walter White, un profesor de química de 50 años, comienza a
                  fabricar metanfetamina cristalizada en secreto para mantener a
                  su familia después de enterarse de que tiene cáncer de pulmón
                  terminal.
                </h4>
              </div>

              <div className={styles.divider} />
            </div>
          ))}
      </div>
    </div>
  );
};

BottomContainer.propTypes = {
  getOnDemandData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  onDemand: state.onDemand,
});

export default connect(mapStateToProps, {})(BottomContainer);
