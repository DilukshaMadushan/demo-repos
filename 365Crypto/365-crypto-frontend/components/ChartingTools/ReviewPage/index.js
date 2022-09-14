import React, { useEffect } from "react";
import styles from "./index.module.css";
import RightSidebar from "./RightSidebar";
import MidContent from "./MidContent";
import MidContentLoadingComp from "./MidContent/MidContentLoadingComp";
import Head from "next/head";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStrapiData } from "../../../actions/Strapi";

// SET ENVIRONMENT BASE URL

const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;
const STRAPI_CHARTING_TOOLS_ID = process.env.STRAPI_CHARTING_TOOLS_ID;
const URL = process.env.URL;

const ReviewPage = ({
  Review_Article,
  getStrapiData,
  strapi: { IsLoading },
}) => {
  useEffect(() => {
    getStrapiData(STRAPI_CHARTING_TOOLS_ID);
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    datePublished: `${
      Review_Article &&
      Review_Article.published_at &&
      Review_Article.published_at
    }`,
    description: `${
      Review_Article &&
      Review_Article.Seo.Meta_Description &&
      Review_Article.Seo.Meta_Description
    }`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${URL}/charting-tools/${
        Review_Article && Review_Article.Slug && Review_Article.Slug
      }`,
    },
    headline: `${
      Review_Article &&
      Review_Article.Seo.Meta_Title &&
      Review_Article.Seo.Meta_Title
    }`,
    image: [
      `${
        Review_Article &&
        Review_Article.article_thumbnail[0] &&
        Review_Article.article_thumbnail[0].url &&
        Review_Article.article_thumbnail[0].url
      }`,
    ],
    dateModified: `${
      Review_Article && Review_Article.updatedAt && Review_Article.updatedAt
    }`,
    author: [
      {
        "@type": "Person",
        name: "365 Crypto Team",
        url: "https://www.facebook.com/365Crypto/",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "365 Crypto",
      logo: {
        "@type": "ImageObject",
        url: "/main_logo.png",
      },
    },
  };
  return (
    <>
      {Review_Article !== null && (
        <Head>
          <link
            rel="canonical"
            href={`${URL}/charting-tools/${
              Review_Article && Review_Article.Slug && Review_Article.Slug
            }`}
          />
          <title>
            {Review_Article &&
              Review_Article.Seo.Meta_Title &&
              Review_Article.Seo.Meta_Title}
          </title>
          <meta name="robots" content="index, follow" />
          <meta
            name="description"
            content={
              Review_Article &&
              Review_Article.Seo.Meta_Description &&
              Review_Article.Seo.Meta_Description
            }
          />
          <meta property="og:site_name" content="365 Crypto" />
          <meta
            property="og:title"
            content={
              Review_Article &&
              Review_Article.Seo.Meta_Title &&
              Review_Article.Seo.Meta_Title
            }
          />
          <meta
            property="og:description"
            content={
              Review_Article &&
              Review_Article.Seo.Meta_Description &&
              Review_Article.Seo.Meta_Description
            }
          />
          <meta
            property="og:image"
            content={`${STRAPI_BASE_URL}${
              Review_Article &&
              Review_Article.article_thumbnail[0].url &&
              Review_Article.article_thumbnail[0].url
            }`}
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${URL}/charting-tools/${
              Review_Article && Review_Article.Slug && Review_Article.Slug
            }`}
          />
          <script type="application/ld+json">
            {JSON.stringify(articleSchema)}
          </script>
        </Head>
      )}
      <div className={` ${styles.mainDiv}`}>
        {console.log(Review_Article)}
        <div className={` ${styles.leftDiv}`}>
          {IsLoading ? <MidContentLoadingComp /> : <MidContent />}
        </div>
        <div className={` ${styles.verticleLine}`}></div>
        <div className={` ${styles.rightDiv}`}>
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

ReviewPage.propTypes = {
  getStrapiData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  strapi: state.strapi,
});
export default connect(mapStateToProps, { getStrapiData })(ReviewPage);
