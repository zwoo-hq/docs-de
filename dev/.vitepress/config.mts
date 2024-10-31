import { defineConfig } from "vitepress";
import {
  createCommonHead,
  createCommonNav,
  createLocales,
  socialLinks,
  themeConfig,
} from "../../common/config.mts";

const basePath = "/docs/de/dev/";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZWOO Entwickler Docs",
  description: "Die zwoo Entwickler Dokumentation.",
  base: basePath,
  locales: createLocales("/de/dev/"),
  head: [
    ...createCommonHead(),
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: basePath + "zwoo_dev_docs_simple_none_dark.svg",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: basePath + "zwoo_dev_docs_simple_none_dark.png",
      },
    ],
  ],
  themeConfig: {
    socialLinks,
    ...themeConfig,

    logo: {
      dark: "/zwoo_dev_docs_simple_none_dark.svg",
      light: "/zwoo_dev_docs_simple_none_light.svg",
      width: 512,
      height: 512,
    },

    nav: [createCommonNav(basePath)],
    sidebar: [],
  },
});
