import React, { useEffect } from "react";
import styles from "./index.module.css";
import BB from "/public/breakingbad.jpg";
import Top from "./Top";
import Bottom from "./Bottom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideoView, getVideoViewSecond } from "@actions/OnDemand";

const Content = ({
  setVisible,
  data,
  getVideoView,
  getVideoViewSecond,
  onDemand: { videoViewState, videoViewSecondState },
  site: { popupModal },
}) => {
  useEffect(() => {
    if (data !== null) {
      getVideoView(data.admin_video_id);
      getVideoViewSecond(data.admin_video_id);
    }
  }, [popupModal]);

  return (
    <div className={styles.container}>
      <div
        className={styles.cardTop}
        style={{
          backgroundImage: `linear-gradient(180deg, #09002E00 0%, #07002E 100%),url(${data.banner_image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {videoViewState && <Top data={data} closeModal={setVisible} />}
      </div>
      <div className={styles.cardBottom}>
        {videoViewSecondState && <Bottom data={data} />}
      </div>
    </div>
  );
};
Content.propTypes = {
  getOnDemandData: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  onDemand: state.onDemand,
  site: state.site,
});

export default connect(mapStateToProps, {
  getVideoView,
  getVideoViewSecond,
})(Content);
