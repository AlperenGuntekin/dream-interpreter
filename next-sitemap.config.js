module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.interpretationdream.com/',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.9,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.interpretationdream.com/my-custom-sitemap-1.xml',
      'https://www.interpretationdream.com/my-custom-sitemap-2.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
