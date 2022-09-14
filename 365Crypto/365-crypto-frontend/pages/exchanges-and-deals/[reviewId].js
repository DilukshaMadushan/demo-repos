import React from "react";
import Page from "../../components/ExchangesAndDeals/ReviewPage";
import axios from "axios";

const ReviewPage = ({ Review_Article }) => {
  return (
    <div>
      <Page Review_Article={Review_Article} />
    </div>
  );
};

export const getServerSideProps = async (path) => {
  const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;
  const STRAPI_EXCHANGES_AND_DEALS_ID =
    process.env.STRAPI_EXCHANGES_AND_DEALS_ID;
  console.log(path.params["reviewId"]);
  if (String(path.params["reviewId"]).includes("review")) {
    try {
      const response = await axios.get(
        `${STRAPI_BASE_URL}/articles?Slug=${path.params["reviewId"]}`
      );
      let responseDate;
      response.data.map((data) => (responseDate = data));

      //end of features json region
      return {
        props: {
          Review_Article: responseDate,
        },
      };
    } catch (error) {
      console.log("Fail");
      return { props: { errorCode: 403, message: "broken" } };
    }
  }
};

export default ReviewPage;
