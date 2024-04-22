import { defineConfig } from "vitepress";
import { locales, socialLinks, themeConfig } from "../../commonConfig.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO Developer Docs",
  description: "The zwoo api documentation",
  base: "/dev/",
  locales,
  themeConfig: {
    socialLinks,
    ...themeConfig,

    nav: [{ text: "Home", link: "/" }],
    sidebar: [],
  },
});
