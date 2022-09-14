let policy = {
  userAgent: "*",
  disallow: [
    "/terms-of-services/",
    "/privacy-policy/",
    "/terms-of-services",
    "/privacy-policy",
  ],
};

if (process.env.ENVIRONMENT !== "production") {
  policy.disallow = "/";
}

module.exports = {
  siteUrl: process.env.URL || "https://365crypto.com",
  generateRobotsTxt: true,
  sitemapBaseFileName: "page-sitemap",
  robotsTxtOptions: {
    policies: [policy],
    additionalSitemaps: ["https://365crypto.com/review-sitemap.xml"],
  },

  priority: 1.0,
};
