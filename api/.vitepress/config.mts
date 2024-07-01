import { defineConfig } from "vitepress";
import {
  commonHead,
  createLocales,
  socialLinks,
  themeConfig,
} from "../../commonConfig.mts";

const concepts = [
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
];

const specs = [
  {
    text: "HTTP API",
    link: "/swagger-frame",
  },
  {
    text: "ZRP",
    link: "/zrp",
  },
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO API Docs",
  description: "The zwoo api documentation",
  base: "/docs/de/api/",
  locales: createLocales("/de/api/"),
  head: commonHead,
  themeConfig: {
    socialLinks,
    ...themeConfig,

    nav: [
      { text: "Home", link: "/" },
      ...concepts,
      {
        text: "Specs",
        items: [...specs],
      },
    ],

    sidebar: [
      ...concepts,
      {
        text: "Specs",
        items: [
          {
            text: "Overview",
            link: "/spec-overview",
          },
          ...specs,
        ],
      },
      {
        text: "Zwoo Docs",
        link: "/not-ready",
      },
    ],
  },
});
