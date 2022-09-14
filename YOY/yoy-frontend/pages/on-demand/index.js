import React from "react";
import PropTypes from "prop-types";
import Layout from "@components/Layout";
import Header from "@components/OnDemandPage/Header";
import Content from "@components/OnDemandPage/Content";
import Like from "@components/Like";
import Share from "@components/Share";
import PopupModal from "@shared/PopupModal";

const OnDemandPage = (props) => {
  return (
    <div>
      <Share />
      <Like />
      <Header />
      <Content />
    </div>
  );
};

OnDemandPage.propTypes = {};

export default OnDemandPage;

OnDemandPage.getLayout = function getLayout(OnDemandPage) {
  return <Layout>{OnDemandPage}</Layout>;
};
