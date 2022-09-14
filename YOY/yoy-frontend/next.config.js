module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    SITE_LOGO: process.env.SITE_LOGO,
  },
  i18n: {
    locales: ["en-US", "en_GB"],
    defaultLocale: "en-US",
  },
};
