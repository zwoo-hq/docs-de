import { DefaultTheme, HeadConfig, UserConfig } from "vitepress";

type NonNullable<T> = T extends null | undefined ? never : T;
type ConfigType = NonNullable<UserConfig<DefaultTheme.Config>>;
type ThemeConfig = NonNullable<ConfigType["themeConfig"]>;

export const ZWOO_URL = "https://zwoo.igd20.de/";
export const ZWOO_DOCS_URL = ZWOO_URL + "docs/";

export const createCommonHead = (): HeadConfig[] => [
  ["meta", { name: "theme-color", content: "#0ea5e9" }],
  ["meta", { property: "og:type", content: "website" }],
  ["meta", { property: "og:locale", content: "de" }],
  [
    "meta",
    {
      property: "og:title",
      content: "ZWOO-Dokumentation - die offizielle ZWOO-Dokumentation.",
    },
  ],
  ["meta", { property: "og:site_name", content: "ZWOO-Dokumentation" }],
  // TODO: test once deployed to dev
  // [
  //   "meta",
  //   { property: "og:image", content: "https://zwoo.igd20.de/docs/" },
  // ],
  ["meta", { property: "og:url", content: ZWOO_DOCS_URL }],
  // This intercepts all clicks and avoids the Vitepress router
  // hijack when possible.
  [
    "script",
    {},
    `
      // Add a listener that avoids the Vitepress Router if there is
      // a link attribute
      window.addEventListener(
        'click',
        (e) => {
          const link = e.target.closest('a');
          if (!link) {
            return
          }

          if (link.getAttribute('hijack') == 'false') {
            console.log('no hijack please')
            e.stopImmediatePropagation();
            window.location = link.getAttribute('href')
            return true
          }
        },
        { capture: true }
      )
      `,
  ],
];

export const createCommonNav = (
  base: string
): NonNullable<ThemeConfig["nav"]>[number] => ({
  text: "Wechseln zu",
  items: [
    { text: "ZWOO", link: ZWOO_URL },
    {
      text: "Dokumentation",
      link: ZWOO_DOCS_URL,
    },
    {
      text: "Entwicklerdokumentation",
      link: ZWOO_DOCS_URL + "dev/",
    },
    {
      text: "API-Referenz",
      link: ZWOO_DOCS_URL + "api/",
    },
  ].filter((item) => !item.link.endsWith(base)),
});

export const socialLinks: ThemeConfig["socialLinks"] = [
  { icon: "github", link: "https://github.com/zwoo-hq/docs-de" },
];

export const createLocales = (base: string): ConfigType["locales"] => ({
  root: {
    lang: "en",
    label: "Englisch",
  },
  de: {
    lang: "de",
    label: "Deutsch",
    link: ZWOO_DOCS_URL + "de" + base,
  },
});

export const themeConfig: ThemeConfig = {
  search: {
    provider: "local",
  },
  i18nRouting: false,
  footer: {
    copyright:
      "Copyright © 2021-present IGD 2.0 UG (haftungsbeschränkt) | <a href='https://zwoo.igd20.de/imprint' hijack='false'>Impressum</a> | <a href='https://zwoo.igd20.de/privacy' hijack='false'>Datenschutz</a>",
    message: "Mit <3 gemacht von Fabian Kachlock und dem zwoo-Team.",
  },
};