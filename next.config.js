// next.config.js
module.exports = {
  webpack: (config, { dev }) => {
    if (!dev) {
      const MiniCssExtractPlugin = require('mini-css-extract-plugin');
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash].css',
          chunkFilename: 'static/css/[name].[contenthash].css',
        })
      );
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_BREVO_SMTP_HOST: process.env.NEXT_PUBLIC_BREVO_SMTP_HOST,
    NEXT_PUBLIC_BREVO_SMTP_PORT: process.env.NEXT_PUBLIC_BREVO_SMTP_PORT,
    NEXT_PUBLIC_BREVO_SMTP_SECURE: process.env.NEXT_PUBLIC_BREVO_SMTP_SECURE,
    NEXT_PUBLIC_BREVO_SMTP_USER: process.env.NEXT_PUBLIC_BREVO_SMTP_USER,
    NEXT_PUBLIC_BREVO_SMTP_PASS: process.env.NEXT_PUBLIC_BREVO_SMTP_PASS,
    NEXT_PUBLIC_BREVO_EMAIL_SEND_TO:
      process.env.NEXT_PUBLIC_BREVO_EMAIL_SEND_TO,
    NEXT_PUBLIC_EMAIL_FROM: process.env.NEXT_PUBLIC_EMAIL_FROM,
    NEXT_PUBLIC_MONGODB_URI: process.env.NEXT_PUBLIC_MONGODB_URI,
  },
};
