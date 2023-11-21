import { defineConfig } from "vitepress";

const sites = [
  {
    text: "Concepts",
    items: [
      {
        text: "Overview",
        link: "/concepts/architecture",
      },
      {
        text: "Master Server",
        link: "/concepts/master",
      },
      {
        text: "Local Server",
        link: "/concepts/local-server",
      },
      {
        text: "Game Server",
        link: "/concepts/game-server",
      },
    ],
    activeMatch: `^/concepts/`,
  },
  {
    text: "Specs",
    items: [
      {
        text: "HTTP API",
        link: "/swagger-frame",
      },
      {
        text: "ZRP",
        link: "/zrp",
      },
    ],
  },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO API Docs",
  description: "The zwoo api documentation",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }, ...sites],
    i18nRouting: true,

    sidebar: [
      ...sites,
      {
        text: "Zwoo Docs",
        link: "/not-ready",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/zwoo-hq/docs" }],

    search: {
      provider: "local",
    },

    footer: {
      // message: "",
      copyright: "Copyright © 2021-present Fabian Kachlock",
    },
  },
});
