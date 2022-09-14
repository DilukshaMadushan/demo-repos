import React from "react";
import styles from "./index.module.css";
import Skeleton from "@material-ui/lab/Skeleton";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

// SET ENVIRONMENT BASE URL
const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;

const Intro = ({ strapi: { Category_Data, IsLoading } }) => {
  return (
    <div className={`${styles.mainDiv}`}>
      <div className={`${styles.innerDiv}`}>
        <div className={`${styles.leftDiv}`}>
          <div>
            {IsLoading ? (
              <Skeleton
                style={{ background: "#232327" }}
                variant="text"
                width={200}
                height={60}
              />
            ) : (
              <h1 className={`${styles.titleDiv}`}>Exchanges & Deals</h1>
            )}
          </div>

          <div className={`${styles.descriptDiv}`}>
            {IsLoading ? (
              <div>
                <Skeleton
                  style={{ background: "#232327" }}
                  variant="text"
                  width={"100%"}
                  height={30}
                />
                <Skeleton
                  style={{ background: "#232327" }}
                  variant="text"
                  width={"100%"}
                  height={30}
                />
                <Skeleton
                  style={{ background: "#232327" }}
                  variant="text"
                  width={"100%"}
                  height={30}
                />
                <Skeleton
                  style={{ background: "#232327" }}
                  variant="text"
                  width={"100%"}
                  height={30}
                />
                <Skeleton
                  style={{ background: "#232327" }}
                  variant="text"
                  width={"50%"}
                  height={30}
                />
              </div>
            ) : (
              Category_Data && Category_Data.category_description
            )}
          </div>
        </div>
        <div className={`${styles.rightDiv}`}>
          {IsLoading ? (
            <div className={`${styles.loadingImgDiv}`}>
              <div className={`${styles.img}`}>
                <Skeleton
                  style={{ background: "#232327" }}
                  variant="rect"
                  width={"100%"}
                  height={"100%"}
                />{" "}
              </div>
            </div>
          ) : (
            <div className={`${styles.imgDiv}`}>
              <img
                className={`${styles.img}`}
                src={`${STRAPI_BASE_URL}${
                  Category_Data && Category_Data.category_thumbnail[0].url
                }`}
                alt={`${STRAPI_BASE_URL}${
                  Category_Data &&
                  Category_Data.category_thumbnail[0].alternativeText
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Intro.propTypes = {
  strapi: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  strapi: state.strapi,
});
export default connect(mapStateToProps, {})(Intro);
