import React, { useEffect, useState } from "react";
import Intro from "../../components/ChartingTools/Intro";
import ChartingToolsCards from "../../components/ChartingTools/ChartingToolsCards";
import axios from "axios";

const ChartingTools = ({ Articles_Data, Category_Data, loading }) => {
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
        <ChartingToolsCards
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
  const STRAPI_CHARTING_TOOLS_ID = process.env.STRAPI_CHARTING_TOOLS_ID;
  try {
    const response1 = await axios
      .get(`${STRAPI_BASE_URL}/categories/${STRAPI_CHARTING_TOOLS_ID}`)
      .then((item) => item.data.articles);
    const response2 = await axios.get(
      `${STRAPI_BASE_URL}/categories/${STRAPI_CHARTING_TOOLS_ID}`
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

export default ChartingTools;
