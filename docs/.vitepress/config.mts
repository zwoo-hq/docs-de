import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO Dokumentation",
  description: "Die zwoo Benutzer Dokumentation.",
  themeConfig: {
    nav: [{ text: "Startseite", link: "/" }],
    i18nRouting: true,

    sidebar: [],

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
