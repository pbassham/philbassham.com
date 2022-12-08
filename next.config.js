/** @type {import('next').NextConfig} */
const NextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  experimental: {
    appDir: false,
  },
}
module.exports = NextConfig
