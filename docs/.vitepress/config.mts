import { defineConfig } from "vitepress";
import {
  createCommonHead,
  createCommonNav,
  createLocales,
  socialLinks,
  themeConfig,
  ZWOO_DOCS_URL,
  ZWOO_URL,
} from "../../common/config.mts";

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
        text: "FAQ",
        link: "/faq",
      },
      {
        text: "Spiele",
        link: "/games/",
      },
      {
        text: "Regeln",
        link: "/rules/",
      },
      createCommonNav("/docs/"),
    ],
    sidebar: [
      {
        text: "Übersicht",
        link: "/overview",
      },
      {
        text: "Erste Schritte",
        link: "/getting-started",
      },
      {
        text: "Konto",
        link: "/account",
      },
      {
        text: "FAQ",
        link: "/faq",
      },
      {
        text: "Regeln",
        collapsed: true,
        link: "/rules/",
        items: [
          { text: "Referenz", link: "/rules/#reference" },
          { text: "Grundlagen", link: "/rules/basics" },
          { text: "Spezialregeln", link: "/rules/specials" },
          { text: "Regeln konfigurieren", link: "/rules/configuring-rules" },
          { text: "Kartenstapel anpassen", link: "/rules/pile" },
          { text: "Lobby anpassen", link: "/rules/lobby" },
          { text: "Spielmodi", link: "/rules/game-modes" },
        ],
      },
      {
        text: "Spiele",
        collapsed: true,
        link: "/games/",
        items: [
          { text: "Online-Spiele", link: "/games/online-games" },
          { text: "Bots", link: "/games/bots" },
          { text: "Rangliste", link: "/games/leaderboard" },
          { text: "Profile", link: "/games/game-profiles" },
          { text: "Einstellungen", link: "/games/settings" },
          { text: "Offline-Spiele", link: "/games/offline-games" },
          { text: "Lokale Spiele", link: "/games/local-games" },
        ],
      },
      {
        text: "Anleitungen",
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
        text: "Entwickler",
        link: ZWOO_DOCS_URL + "dev/",
      },
      {
        text: "API-Referenz",
        link: ZWOO_DOCS_URL + "api/",
      },
    ],
  },
});
