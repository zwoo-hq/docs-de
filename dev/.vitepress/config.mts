import { defineConfig } from "vitepress";
import {
  createCommonHead,
  createCommonNav,
  createLocales,
  socialLinks,
  themeConfig,
} from "../../commonConfig.mts";

const basePath = "/docs/dev/";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO Developer Docs",
  description: "The zwoo api documentation",
  base: basePath,
  locales: createLocales("/dev/"),
  head: createCommonHead(basePath),
  themeConfig: {
    socialLinks,
    ...themeConfig,

    nav: [createCommonNav(basePath)],
    sidebar: [],
  },
});
