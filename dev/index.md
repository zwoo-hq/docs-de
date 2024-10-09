---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: ZWOO DEV
  tagline: Zwoo developer documentation.
  image:
    light: /zwoo_dev_docs_none_light.svg
    dark: /zwoo_dev_docs_none_dark.svg
    alt: ZWOO dev logo
  actions:
    - theme: brand
      text: Play ZWOO!
      link: http://zwoo.igd20.de/
    - theme: alt
      text: Contributing
      link: /contributing
    - theme: alt
      text: Bots
      link: /bots
    - theme: alt
      text: ZWOO Docs
      link: /not-ready

features:
  - title: Create a bot
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /bots
    linkText: Let's go!
    icon: 🤖
---

<style>
:root {
  --vp-home-hero-image-background-image: linear-gradient(120deg, #E50402 10%, #FE8C01 27.6%, #F9E803 36.4%, #12B90F 49.2%, #02772D 61.2%, #034DFC 73.2%, #78078B 90%);
  --vp-home-hero-image-filter: blur(44px);

  --color-secondary-text-hex: #7732e6
}

.dark {
  --color-secondary-text-hex: #b77fff
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}

.image-bg {
  border-radius: 30px !important;
}
</style>