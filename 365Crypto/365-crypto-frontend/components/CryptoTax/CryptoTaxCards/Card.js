import React from "react";
import Link from "next/link";
import styles from "./index.module.css";
// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getReviewArticle } from "../../../actions/Strapi";

// SET ENVIRONMENT BASE URL
const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;

const Card = ({ item, getReviewArticle }) => {
  return (
    <div className={`col-md-6 m-0 p-0 ${styles.cardDiv}`}>
      <div className={`${styles.card}`}>
        <div className={`${styles.upperDiv}`}>
          <div className={`${styles.upperLeftDiv}`}>
            <div className={`${styles.logoDiv}`}>
              <img
                className={`${styles.logo}`}
                src={`${STRAPI_BASE_URL}${item.deal_thumbnail[0].url}`}
                alt={`${STRAPI_BASE_URL}${item.deal_thumbnail[0].alternativeText}`}
              />
            </div>
            <div className={`${styles.detailsDiv}`}>
              {/* <div className={`${styles.dateDiv}`}>
                {new Intl.DateTimeFormat("en-GB", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(item.created_at))}
              </div> */}
              <div className={`${styles.titleDiv}`}>{item.deal_name}</div>
            </div>
          </div>
          <div className={`${styles.upperRightDiv}`}>
            <a href={item.promo_link} target="_blank">
              <button className={`${styles.promoBtn}`}>Check out promo!</button>
            </a>
          </div>
        </div>
        <div className={`${styles.lowerDiv}`}>
          <div className={`${styles.descriptDiv}`}>
            <div className={`${styles.descript}`}>
              <span className={`${styles.descriptTitle}`}>
                {item.deal_title}
              </span>
              <br />
              {item.deal_summary}
            </div>
          </div>
          <div className={`${styles.linkDiv}`}>
            <Link href={`/crypto-tax/${item.Slug}`}>
              <a
                className={`${styles.link}`}
                href=""
                onClick={() => {
                  getReviewArticle(item.id);
                }}
              >
                Check out our review
              </a>
            </Link>
            <div className={`${styles.footerRightDiv}`}>
              <a href={item.promo_link} target="_blank">
                <button className={`${styles.promoBtn}`}>
                  Check out promo!
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  getReviewArticle: PropTypes.func.isRequired,
};

export default connect(null, { getReviewArticle })(Card);
