import { defineConfig } from "vitepress";
import {
  createCommonHead,
  createCommonNav,
  createLocales,
  socialLinks,
  themeConfig,
  ZWOO_DOCS_URL,
  ZWOO_URL,
} from "../../commonConfig.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO Docs",
  description: "The zwoo user documentation",
  base: "/docs/",
  locales: createLocales("/"),
  head: createCommonHead("/docs/"),
  themeConfig: {
    socialLinks,
    ...themeConfig,

    nav: [
      {
        text: "FAQ",
        link: "/faq",
      },
      {
        text: "Games",
        link: "/games/",
      },
      {
        text: "Rules",
        link: "/rules/",
      },
      createCommonNav("/docs/"),
    ],
    sidebar: [
      {
        text: "Overview",
        link: "/overview",
      },
      {
        text: "Getting started",
        link: "/getting-started",
      },
      {
        text: "FAQ",
        link: "/faq",
      },
      {
        text: "ZWOO",
        link: ZWOO_URL,
      },

      {
        text: "Rules",
        collapsed: true,
        base: "/rules/",
        link: "/index",
        items: [{ text: "Basics", link: "/basics" }],
      },
      {
        text: "Guides",
        collapsed: true,
        base: "/guides/",
        items: [
          {
            text: "TODO",
            link: "/todo",
          },
        ],
      },
      {
        text: "Account",
        link: "/account",
      },
      {
        text: "Developers",
        link: ZWOO_DOCS_URL + "dev/",
      },
      {
        text: "API Reference",
        link: ZWOO_DOCS_URL + "api/",
      },
    ],
  },
});
