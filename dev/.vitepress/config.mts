import { defineConfig } from "vitepress";
import {
  commonHead,
  createLocales,
  socialLinks,
  themeConfig,
} from "../../commonConfig.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO Entwickler Docs",
  description: "Die zwoo Entwickler Dokumentation.",
  base: "/docs/de/dev/",
  locales: createLocales("/de/dev/"),
  head: commonHead,
  themeConfig: {
    socialLinks,
    ...themeConfig,

    nav: [{ text: "Startseite", link: "/" }],
    sidebar: [],
  },
});
