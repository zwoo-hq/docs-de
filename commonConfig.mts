import { DefaultTheme, UserConfig } from "vitepress";

type NonNullable<T> = T extends null | undefined ? never : T;
type ConfigType = NonNullable<UserConfig<DefaultTheme.Config>>;
type ThemeConfig = NonNullable<ConfigType["themeConfig"]>;

export const socialLinks: ThemeConfig["socialLinks"] = [
  { icon: "github", link: "https://github.com/zwoo-hq/docs" },
];

export const locales: ConfigType["locales"] = {
  root: {
    lang: "en",
    label: "English",
    link: "/",
  },
  de: {
    lang: "de",
    label: "Deutsch",
    link: "/de/",
  },
};

export const themeConfig: ThemeConfig = {
  search: {
    provider: "local",
  },
  i18nRouting: true,
  footer: {
    copyright: "Copyright © 2021-present Fabian Kachlock",
  },
};
