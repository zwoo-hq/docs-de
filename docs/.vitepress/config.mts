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
  title: "ZWOO Dokumentation",
  description: "Die zwoo Benutzer Dokumentation.",
  base: "/docs/de/",
  locales: createLocales("/de/"),
  head: [
    ...createCommonHead(),
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/docs/zwoo_logo_simple_dark.svg",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: "/docs/zwoo_logo_simple_dark.png",
      },
    ],
  ],

  themeConfig: {
    socialLinks,
    ...themeConfig,

    logo: {
      dark: "/zwoo_logo_simple_none_dark.svg",
      light: "/zwoo_logo_simple_none_light.svg",
      width: 512,
      height: 512,
    },

    nav: [
      {
        text: "FAQ",m
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
        text: "Account",
        link: "/account",
      },
      {
        text: "FAQ",
        link: "/faq",
      },
      {
        text: "Rules",
        collapsed: true,
        link: "/rules/",
        items: [{ text: "Basics", link: "/rules/basics" }],
      },
      {
        text: "Games",
        collapsed: true,
        link: "/games/",
        items: [
          {
            text: "Online Games",
            link: "/games/online-games",
          },
          {
            text: "Bots",
            link: "/games/bots",
          },
          {
            text: "Leaderboard",
            link: "/games/leaderboard",
          },
          {
            text: "Profiles",
            link: "/games/game-profiles",
          },
          {
            text: "Offline Games",
            link: "/games/offline-games",
          },
          {
            text: "Local Games",
            link: "/games/local-games",
          },
        ],
      },
      {
        text: "Guides",
        collapsed: true,
        items: [
          {
            text: "TODO",
            link: "/guides/todo",
          },
        ],
      },
      {
        text: "ZWOO",
        link: ZWOO_URL,
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
