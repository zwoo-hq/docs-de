import { defineConfig } from "vitepress";
import { locales, socialLinks, themeConfig } from "../../commonConfig.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO Docs",
  description: "The zwoo user documentation",
  locales,
  themeConfig: {
    socialLinks,
    ...themeConfig,

    nav: [{ text: "Home", link: "/" }],
    sidebar: [],
  },
});
