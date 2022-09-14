import React, { useEffect } from "react";
import styles from "./index.module.css";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoCheckbox } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRealoadReviewArticle } from "../../../../actions/Strapi";

// SET ENVIRONMENT BASE URL
const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;
const BASE_URL = process.env.BASE_URL;

const MidContent = ({
  strapi: {
    Review_Article,
    Review_Article_Description,
    Review_Article_Key_Features,
  },
  getRealoadReviewArticle,
}) => {
  const router = useRouter();
  const { reviewId } = router.query;

  useEffect(() => {
    getRealoadReviewArticle(reviewId);
  }, [reviewId]);

  return (
    <div>
      {Review_Article !== null && (
        <div className={` ${styles.mainDiv}`}>
          <div className={` ${styles.introDiv}`}>
            <div className={` ${styles.titleDiv}`}>
              <Link href="/crypto-bots">
                <div className={` ${styles.iconDiv}`}>
                  <HiArrowNarrowLeft />
                </div>
              </Link>
              <div className={` ${styles.title}`}>
                <span>
                  <h1 className={` ${styles.mainPageTitle}`}>Crypto Bots</h1>
                </span>
                <span className={` ${styles.symbol}`}>{" > "}</span>
                <span className={` ${styles.subPageTitle}`}>
                  {Review_Article.deal_name}
                  &nbsp;Review
                </span>
              </div>
            </div>
            <div className={` ${styles.introDescript}`}>
              {Review_Article.deal_summary}
            </div>
          </div>
          <div className={` ${styles.contentDiv}`}>
            {/* <div className={` ${styles.date}`}>
              {new Intl.DateTimeFormat("en-GB", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }).format(new Date(Review_Article.created_at))}
            </div> */}
            <div className={` ${styles.titleAndBtnDiv}`}>
              <div className={` ${styles.descriptiontitle}`}>
                {Review_Article.deal_name}
              </div>
              <a href={Review_Article.promo_link} target="_blank">
                <button className={` ${styles.dealBtn}`}>Get the deal</button>
              </a>
            </div>
            <div className={` ${styles.boldtext}`}>
              {Review_Article.deal_title}
            </div>
            <div>
              <img
                className={` ${styles.mainThumbnail}`}
                src={`${STRAPI_BASE_URL}${Review_Article.article_thumbnail[0].url}`}
                alt={`${STRAPI_BASE_URL}${Review_Article.article_thumbnail[0].alternativeText}`}
              />
            </div>
            <div className={` ${styles.description}`}>
              {Review_Article_Description &&
                Review_Article_Description.map((item, i) =>
                  item.type === "description" ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  ) : !item.caption &&
                    Review_Article_Description.length !== i + 1 &&
                    item.type === "image" &&
                    item.position !== "center" ? (
                    <img
                      className={`${styles[item.position]}`}
                      src={item.src}
                      alt="Crypto Bots Image"
                    ></img>
                  ) : !item.caption &&
                    item.type === "image" &&
                    item.position === "center" ? (
                    <div className={` ${styles.centerSecondaryImagesDiv}`}>
                      <img
                        className={` ${styles[item.position]}`}
                        src={item.src}
                        alt="Crypto Bots Image"
                      />
                    </div>
                  ) : !item.caption &&
                    Review_Article_Description.length === i + 1 &&
                    item.type !== "description" ? (
                    <div className={` ${styles.centerSecondaryImagesDiv}`}>
                      <img
                        className={`${styles.center}`}
                        src={item.src}
                        alt="Crypto Bots Image"
                      />
                    </div>
                  ) : item.type === "image" && item.caption ? (
                    <div>
                      <figure>
                        <img
                          className={`${styles.captionImage}`}
                          src={item.src}
                          alt="Crypto Bots Image"
                        />
                        <figcaption
                          className={`${styles.captionText}`}
                          dangerouslySetInnerHTML={{ __html: item.caption }}
                        ></figcaption>
                      </figure>
                    </div>
                  ) : (
                    ""
                  )
                )}
            </div>
            <div className={` ${styles.footerdDiv}`}>
              <div className={` ${styles.footerLeftDiv}`}>
                <div className={` ${styles.footerTitleDiv}`}>
                  Key Features :
                </div>
                <div className={` ${styles.featuresListDiv}`}>
                  {Review_Article_Key_Features &&
                    Review_Article_Key_Features.map((item, index) => (
                      <div className={` ${styles.featuresListItem}`}>
                        <div className={` ${styles.featuresListItemIcon}`}>
                          <IoCheckbox />
                        </div>
                        <div className={` ${styles.featuresListItemDescript}`}>
                          {item.description}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={` ${styles.footerRightDiv}`}>
                <a
                  className={` ${styles.ctaImage}`}
                  href={Review_Article.promo_link}
                  target="_blank"
                >
                  <img
                    className={` ${styles.ctaImage}`}
                    src={`${STRAPI_BASE_URL}${Review_Article.deal_cta[0].url}`}
                    alt={`${STRAPI_BASE_URL}${Review_Article.deal_cta[0].alternativeText}`}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MidContent.propTypes = {
  strapi: PropTypes.object.isRequired,
  getRealoadReviewArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  strapi: state.strapi,
});
export default connect(mapStateToProps, { getRealoadReviewArticle })(
  MidContent
);
