import React, { useEffect, useState } from "react";
import Intro from "../../components/ExchangesAndDeals/Intro";
import ExchangesAndDealsCards from "../../components/ExchangesAndDeals/ExchangesAndDealsCards";
import axios from "axios";

const STRAPI_EXCHANGES_AND_DEALS_ID = process.env.STRAPI_EXCHANGES_AND_DEALS_ID;

const ExchangesAndDeals = ({ Articles_Data, Category_Data, loading }) => {
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(loading);
  }, [IsLoading]);
  return (
    <div className="mainDiv">
      <div>
        <Intro />
      </div>
      <div>
        <ExchangesAndDealsCards
          IsLoading={IsLoading}
          Category_Data={Category_Data}
          Articles_Data={Articles_Data}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = async (path) => {
  const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;
  const STRAPI_EXCHANGES_AND_DEALS_ID =
    process.env.STRAPI_EXCHANGES_AND_DEALS_ID;
  try {
    const response1 = await axios
      .get(`${STRAPI_BASE_URL}/categories/${STRAPI_EXCHANGES_AND_DEALS_ID}`)
      .then((item) => item.data.articles);
    const response2 = await axios.get(
      `${STRAPI_BASE_URL}/categories/${STRAPI_EXCHANGES_AND_DEALS_ID}`
    );

    return {
      props: {
        Articles_Data: response1,
        Category_Data: response2.data,
        loading: false,
      },
    };
  } catch (error) {
    return { props: { errorCode: 403, message: "broken" } };
  }
};

export default ExchangesAndDeals;
