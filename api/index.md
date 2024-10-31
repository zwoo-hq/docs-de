---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: ZWOO API
  tagline: How the zwoo actors are connected.
  image:
    light: /zwoo_api_docs_none_light.svg
    dark: /zwoo_api_docs_none_dark.svg
    alt: ZWOO dev logo
  actions:
    - theme: brand
      text: Play ZWOO!
      link: http://zwoo.igd20.de/
    - theme: alt
      text: Architecture
      link: /concepts/architecture
    - theme: alt
      text: Specifications
      link: /spec-overview
    - theme: alt
      text: ZWOO Docs
      link: /not-ready

features:
  - title: Architecture
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /concepts/architecture
    linkText: Explore
    icon: 🌐
  - title: HTTP API
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /swagger-frame
    linkText: Swagger Docs
    icon: 🔗
  - title: ZRP
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
    link: /zrp
    linkText: Message Reference
    icon: 🚀
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
  border-radius: 50px !important;
  rotate: 0deg;
  transform-origin: 0 0;
  animation: rotate-gradient linear 60s infinite;
}

@keyframes rotate-gradient {
  19% { rotate: 120deg; }
  27% { rotate: 70deg; }
  48% { rotate: 210deg; }
  58% { rotate: 150deg; }
  61% { rotate: 170deg; }
  73% { rotate: 90deg; }
  79% { rotate: 130deg; }
  100% { rotate: 0deg; }
}
</style>