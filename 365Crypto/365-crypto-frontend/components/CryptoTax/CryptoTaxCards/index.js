import Head from "next/head";
import React, { useEffect } from "react";
import styles from "./index.module.css";
import Card from "./Card";
import CardLoadingComp from "./CardLoadingComp";
import { LogoJsonLd } from "next-seo";

// redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStrapiData } from "../../../actions/Strapi";
import EmptyDataHandler from "../../Layout/common/EmptyDataHandler";

// SET ENVIRONMENT BASE URL
const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;
const STRAPI_CRYPTO_TAX_ID = process.env.STRAPI_CRYPTO_TAX_ID;
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;
const BASE_URL = process.env.BASE_URL;

const DummyList = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
];

const CryptoTaxCards = ({
  Articles_Data,
  Category_Data,
  IsLoading,
  getStrapiData,
  strapi: {},
}) => {
  useEffect(() => {
    getStrapiData(STRAPI_CRYPTO_TAX_ID);
  }, []);
  return (
    <div>
      {Category_Data && (
        <>
          <Head>
            <link rel="canonical" href={`${IMAGE_BASE_URL}crypto-tax `} />
            <title>
              Best Crypto Tax and Accounting Software: Promotional Deals and
              Reviews - 365crypto.com
            </title>
            <meta name="robots" content="index, follow" />
            <meta
              name="description"
              content="Read professional reviews on the best crypto tax and accounting software and save money using our industry leading promotional deals."
            />
            <meta
              name="title"
              content="Best Crypto Tax and Accounting Software: Promotional Deals and Reviews - 365crypto.com"
            />
            <meta property="og:site_name" content="365 Crypto" />
            <meta
              property="og:description"
              content="Read professional reviews on the best crypto tax and accounting software and save money using our industry leading promotional deals."
            />
            <meta
              property="og:title"
              content=" Best Crypto Tax and Accounting Software: Promotional Deals and Reviews - 365crypto.com"
            />
            <meta
              property="og:image"
              content={`${STRAPI_BASE_URL}${
                Category_Data &&
                Category_Data.category_thumbnail[0] &&
                Category_Data.category_thumbnail[0].url &&
                Category_Data.category_thumbnail[0].url
              }`}
            />
            <meta
              name="thumbnail"
              content={`${STRAPI_BASE_URL}${
                Category_Data &&
                Category_Data.category_thumbnail[0] &&
                Category_Data.category_thumbnail[0].url &&
                Category_Data.category_thumbnail[0].url
              }`}
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${IMAGE_BASE_URL}crypto-tax `} />
          </Head>
          <LogoJsonLd
            logo="https://365crypto.com/main_logo.png"
            url="https://365crypto.com"
          />
        </>
      )}
      <div className={` ${styles.mainDiv}`}>
        <div className={`row m-0 p-0 ${styles.innerDiv}`}>
          {IsLoading ? (
            DummyList.map((item, index) => <CardLoadingComp key={index} />)
          ) : Articles_Data.length === 0 ? (
            <EmptyDataHandler type="articles" />
          ) : (
            Articles_Data &&
            Articles_Data.map((item, index) => <Card key={index} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
};

CryptoTaxCards.propTypes = {
  getStrapiData: PropTypes.func.isRequired,
  strapi: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  strapi: state.strapi,
});
export default connect(mapStateToProps, { getStrapiData })(CryptoTaxCards);
