import { DefaultTheme, UserConfig } from "vitepress";

type NonNullable<T> = T extends null | undefined ? never : T;
type ConfigType = NonNullable<UserConfig<DefaultTheme.Config>>;
type ThemeConfig = NonNullable<ConfigType["themeConfig"]>;

export const socialLinks: ThemeConfig["socialLinks"] = [
  { icon: "github", link: "https://github.com/zwoo-hq/docs" },
];

export const createLocales = (base: string): ConfigType["locales"] => ({
  root: {
    lang: "en",
    label: "English",
  },
  de: {
    lang: "de",
    label: "Deutsch",
    link: "https://zwoo.igd20.de/docs/de" + base,
  },
});

export const themeConfig: ThemeConfig = {
  search: {
    provider: "local",
  },
  i18nRouting: false,
  footer: {
    copyright: "Copyright © 2021-present Fabian Kachlock",
  },
};
