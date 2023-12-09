const SITE_URL = 'https://www.dfdurand.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: [],
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
    policies: [
      {
        allow: '/',
        userAgent: '*',
      },
    ],
  },
  siteUrl: SITE_URL,
};
