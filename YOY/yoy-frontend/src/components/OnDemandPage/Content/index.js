import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import OnDemandCarousel from "./OnDemandCarousel";
import styles from "./index.module.css";
import { getOnDemandData } from "@actions/OnDemand";
import PopupModal from "@shared/PopupModal";
import store from "store";
import { SET_POPUP_MODAL } from "@actions/types";

const Content = ({ getOnDemandData, onDemand, site: { popupModal } }) => {
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getOnDemandData();
  }, []);

  useEffect(() => {
    if (
      onDemand.homeFirstSectionData.length !== 0 &&
      onDemand.onDemand.length !== 0
    ) {
      setCategoryList(onDemand.homeFirstSectionData.concat(onDemand.onDemand));
    }
  }, [onDemand]);

  // Callback on demand carousel card click.
  const onClickOndDemandCard = visible => {
    setShowDetailCard(visible);
  };

  // Clicked card data.
  const onClickOnDemandCardData = data => {
    store.dispatch({
      type: SET_POPUP_MODAL,
      payload: { visible: !popupModal.visible, data: data },
    });
  };

  return (
    <div>
      <div className={styles.container}>
        {categoryList &&
          categoryList.map((category, i) => (
            <OnDemandCarousel
              setVisible={onClickOndDemandCard}
              setData={onClickOnDemandCardData}
              key={String(i)}
              data={category}
            />
          ))}

        {popupModal.visible && <PopupModal />}
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
  getOnDemandData,
})(Content);
