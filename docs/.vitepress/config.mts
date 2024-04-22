import { defineConfig } from "vitepress";
import { locales, socialLinks, themeConfig } from "../../commonConfig.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO Dokumentation",
  description: "Die zwoo Benutzer Dokumentation.",
  base: "/de/",
  locales,
  themeConfig: {
    socialLinks,
    ...themeConfig,

    nav: [{ text: "Home", link: "/" }],
    sidebar: [],
  },
});
