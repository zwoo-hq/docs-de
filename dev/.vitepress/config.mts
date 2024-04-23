import { defineConfig } from "vitepress";
import {
  createLocales,
  socialLinks,
  themeConfig,
} from "../../commonConfig.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO Entwickler",
  description: "Die zwoo Entwickler Dokumentation.",
  base: "/de/dev/",
  locales: createLocales("/de/dev/"),
  themeConfig: {
    socialLinks,
    ...themeConfig,

    nav: [{ text: "Startseite", link: "/" }],
    sidebar: [],
  },
});
