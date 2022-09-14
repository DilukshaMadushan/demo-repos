import Layout from "@components/Layout";
import ShowDetail from "@components/OnDemandPage/ShowDetail";
import Share from "@components/Share";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVideoView, getVideoViewSecond } from "@actions/OnDemand";
import Like from "@components/Like";

const ShowDetailPage = ({ getVideoView, getVideoViewSecond }) => {
  const router = useRouter();
  const id = router.query.showId;

  useEffect(() => {
    if (id !== undefined) {
      getVideoView(id);
      getVideoViewSecond(id);
    }
  }, [id]);

  return (
    <div>
      <Like />
      <Share />
      <ShowDetail />
    </div>
  );
};

const mapStateToProps = (state) => ({
  onDemand: state.onDemand,
});

ShowDetailPage.propTypes = {};

ShowDetailPage.getLayout = function getLayout(ShowDetailPage) {
  return <Layout>{ShowDetailPage}</Layout>;
};

export default connect(mapStateToProps, {
  getVideoView,
  getVideoViewSecond,
})(ShowDetailPage);
