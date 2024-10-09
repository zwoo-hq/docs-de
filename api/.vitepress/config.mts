import { defineConfig } from "vitepress";
import {
  createCommonHead,
  createCommonNav,
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

const basePath = "/docs/api/";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO API Docs",
  description: "The zwoo api documentation",
  base: basePath,
  locales: createLocales("/api/"),
  head: [
    ...createCommonHead(),
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: basePath + "zwoo_api_docs_simple_none_dark.svg",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: basePath + "zwoo_api_docs_simple_none_dark.png",
      },
    ],
  ],
  themeConfig: {
    socialLinks,
    ...themeConfig,

    logo: {
      dark: "/zwoo_api_docs_simple_none_dark.svg",
      light: "/zwoo_api_docs_simple_none_light.svg",
      width: 512,
      height: 512,
    },

    nav: [
      { text: "Home", link: "/" },
      ...concepts,
      {
        text: "Specs",
        items: [...specs],
      },
      createCommonNav(basePath),
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
