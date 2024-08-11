import { defineConfig } from "vitepress";
import {
  commonHead,
  createLocales,
  socialLinks,
  themeConfig,
} from "../../commonConfig.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO Docs",
  description: "The zwoo user documentation",
  base: "/docs/",
  locales: createLocales("/"),
  head: commonHead,
  themeConfig: {
    socialLinks,
    ...themeConfig,

    nav: [{ text: "Home", link: "/" }],
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
        text: "Games",
        collapsed: false,
        base: "/games/",
        items: [
          {
            text: "Online Games",
            link: "/online-games",
          },
          {
            text: "Offline Games",
            link: "/offline-games",
          },
          {
            text: "Bots",
            link: "/bots",
          },
          {
            text: "Game Profiles",
            link: "/game-profiles",
          },
          {
            text: "Leaderboard",
            link: "/leaderboard",
          },
          {
            text: "Local Games",
            link: "/local-games",
          },
        ],
      },
      {
        text: "Rules",
        collapsed: true,
        base: "/rules/",
        items: [
          { text: "Rule Overview", link: "/rules" },
          { text: "Basics", link: "/basics" },
        ],
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
        link: "https://zwoo.igd20.de/docs/dev",
      },
      {
        text: "API Reference",
        link: "https://zwoo.igd20.de/docs/api",
      },
    ],
  },
});
