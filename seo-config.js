const CONFIG = require("./config");

export default {
  titleTemplate: `%s | ${CONFIG.TITLE}`,
  defaultTitle: CONFIG.TITLE,
  description: CONFIG.DESCRIPTION,
  url: CONFIG.URL,
  openGraph: {
    title: "Desktop of Samuel 數位筆記",
    description: "UI/UX 設計師，談談科技、Gadget心得。",
    url: CONFIG.URL,
    image: CONFIG.OG_IMAGE,
    type: "website",
    locale: CONFIG.LOCALE,
    site_name: CONFIG.TITLE,
  },
  twitter: {
    handle: "@desktopofsamuel",
    site: "@desktopofsamuel",
    cardType: "summary_large_image",
  },
};
