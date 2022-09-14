import { getServerSideSitemap } from "next-sitemap";

// SET ENVIRONMENT BASE URL
const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;
const URL = process.env.URL;

export async function getServerSideProps(context) {
  const responseCryptoBot = await fetch(
    `${STRAPI_BASE_URL}/categories/${process.env.STRAPI_CRYPTO_BOTS_ID}`
  );
  const responseCryptoTax = await fetch(
    `${STRAPI_BASE_URL}/categories/${process.env.STRAPI_CRYPTO_TAX_ID}`
  );
  const responseChartingTool = await fetch(
    `${STRAPI_BASE_URL}/categories/${process.env.STRAPI_CHARTING_TOOLS_ID}`
  );
  const responseExchangesAndDeals = await fetch(
    `${STRAPI_BASE_URL}/categories/${process.env.STRAPI_EXCHANGES_AND_DEALS_ID}`
  );

  const cryptoBotReviews = await responseCryptoBot.json();
  const cryptoTaxReviews = await responseCryptoTax.json();
  const chartingToolReviews = await responseChartingTool.json();
  const exchangesAndDealsReviews = await responseExchangesAndDeals.json();

  const cryptoBotReviewsArticles = cryptoBotReviews["articles"];
  const cryptoTaxReviewsArticles = cryptoTaxReviews["articles"];
  const chartingToolReviewsArticles = chartingToolReviews["articles"];
  const exchangesAndDealsReviewsArticles = exchangesAndDealsReviews["articles"];

  const fieldsCryptoBot = cryptoBotReviewsArticles.map((cryptoBotReview) => ({
    loc: `${URL}/crypto-bots/${cryptoBotReview.Slug}`,

    changefreq: "daily",

    priority: 1,

    lastmod: new Date().toISOString(),
  }));
  const fieldsCryptoTax = cryptoTaxReviewsArticles.map((cryptoBotReview) => ({
    loc: `${URL}/crypto-tax/${cryptoBotReview.Slug}`,

    changefreq: "daily",

    priority: 1,

    lastmod: new Date().toISOString(),
  }));
  const fieldsChartingTool = chartingToolReviewsArticles.map(
    (cryptoBotReview) => ({
      loc: `${URL}/charting-tools/${cryptoBotReview.Slug}`,

      changefreq: "daily",

      priority: 1,

      lastmod: new Date().toISOString(),
    })
  );
  const fieldsExchangesAndDeals = exchangesAndDealsReviewsArticles.map(
    (cryptoBotReview) => ({
      loc: `${URL}/charting-tools/${cryptoBotReview.Slug}`,

      changefreq: "daily",

      priority: 1,

      lastmod: new Date().toISOString(),
    })
  );

  const fields = fieldsCryptoBot.concat(
    fieldsCryptoTax,
    fieldsChartingTool,
    fieldsExchangesAndDeals
  );

  return getServerSideSitemap(context, fields);
}

export default () => {};
