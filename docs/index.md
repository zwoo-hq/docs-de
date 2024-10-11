---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: ZWOO
  tagline: Kartenspiele der zweiten Generation.
  image:
    light: /zwoo_logo_none_light.svg
    dark: /zwoo_logo_none_dark.svg
    alt: ZWOO logo
  actions:
    - theme: brand
      text: ZWOO spielen!
      link: http://zwoo.igd20.de/
    - theme: alt
      text: Erste Schritte
      link: /getting-started
    - theme: alt
      text: Dokumentation lesen
      link: /overview
    - theme: alt
      text: FAQ
      link: /faq

features:
  - title: Online games
    details: Play with your friends all around the world!
    link: /games/
    linkText: Play games
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m9 15l-2.968 2.968A2.362 2.362 0 0 1 2 16.298V15l1.357-6.784A4 4 0 0 1 7.279 5h9.442a4 4 0 0 1 3.922 3.216L22 15v1.297a2.362 2.362 0 0 1-4.032 1.67L15 15z"/><path d="m9 5l1 2h4l1-2"/></g></svg>
    # akar-icons:game-controller
  - title: Unique Rules
    details: ZWOO offers some unique mechanics, check them out!
    link: /rules/
    linkText: Learn the rules
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path d="M19 3v4m0 14V11m-7-8v12m0 6v-2M5 3v2m0 16V9"/><circle cx="19" cy="9" r="2" transform="rotate(90 19 9)"/><circle cx="12" cy="17" r="2" transform="rotate(90 12 17)"/><circle cx="5" cy="7" r="2" transform="rotate(90 5 7)"/></g></svg>
    # akar-icons:settings-vertical
  - title: Custom Cards
    details: ZWOO has some custom cards with unique abilities, check them out!
    link: /rules/
    linkText: Learn more
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12.5 4v8a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 12V4A1.5 1.5 0 0 1 5 2.5h6A1.5 1.5 0 0 1 12.5 4M11 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3zM5 8.25v-.5A5.56 5.56 0 0 0 7.75 4h.5A5.56 5.56 0 0 0 11 7.75v.5A5.56 5.56 0 0 0 8.25 12h-.5A5.56 5.56 0 0 0 5 8.25" clip-rule="evenodd"/></svg>
  - title: Bots
    details: Got no friends around? Play against our bots!
    link: /games/bots
    linkText: Learn more
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.753 14a2.25 2.25 0 0 1 2.25 2.25v.904A3.75 3.75 0 0 1 18.696 20c-1.565 1.344-3.806 2-6.696 2s-5.128-.656-6.69-2a3.75 3.75 0 0 1-1.306-2.843v-.908A2.25 2.25 0 0 1 6.254 14zm0 1.5h-11.5a.75.75 0 0 0-.75.75v.907c0 .655.287 1.278.784 1.706C7.545 19.945 9.441 20.5 12 20.5s4.458-.557 5.72-1.64a2.25 2.25 0 0 0 .783-1.707v-.905a.75.75 0 0 0-.75-.75M11.9 2.006L12 2a.75.75 0 0 1 .743.648l.007.102l-.001.749h3.5a2.25 2.25 0 0 1 2.25 2.25v4.505a2.25 2.25 0 0 1-2.25 2.25h-8.5a2.25 2.25 0 0 1-2.25-2.25V5.75A2.25 2.25 0 0 1 7.75 3.5l3.5-.001V2.75a.75.75 0 0 1 .649-.743L12 2zM16.25 5h-8.5a.75.75 0 0 0-.75.75v4.504c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75V5.75a.75.75 0 0 0-.75-.75m-6.5 1.5a1.25 1.25 0 1 1 0 2.498a1.25 1.25 0 0 1 0-2.498m4.492 0a1.25 1.25 0 1 1 0 2.498a1.25 1.25 0 0 1 0-2.498" /></svg>
    # fluent:bot-24-regular
  - title: Global leaderboard
    details: Climb to the top of the leaderboard and show off your skills!
    link: /games/leaderboard
    linkText: See the leaderboard
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2c-.9 0-2 1-2 2H8c0-1-1.1-2-2-2H2v9c0 1 1 2 2 2h2.2c.4 2 1.7 3.7 4.8 4v2.08C8 19.54 8 22 8 22h8s0-2.46-3-2.92V17c3.1-.3 4.4-2 4.8-4H20c1 0 2-1 2-2V2zM6 11H4V4h2zm10 .5c0 1.93-.58 3.5-4 3.5c-3.41 0-4-1.57-4-3.5V6h8zm4-.5h-2V4h2z"/></svg>
  # mdi:trophy-outline
  - title: Offline games
    details: Stranded without internet? No problem, play offline against bots!
    link: /games/offline
    linkText: Explore games
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7zm-4 4a9.8 9.8 0 0 0-4.49-2.56l3.53 3.53zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.7 9.7 0 0 0 5 13v.01L6.99 15a7.04 7.04 0 0 1 4.92-2.06L18.98 20l1.27-1.26L3.29 1.79zM9 17l3 3l3-3a4.237 4.237 0 0 0-6 0"/></svg>
  # ic:baseline-wifi-off
  - title: Open source
    details: ZWOO is open source, check out the code on GitHub!
    link: https://github.com/fabiankachlock/zwoo
    external: true
    linkText: View on GitHub
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><g clip-path="url(#akarIconsGithubFill0)"><path fill="currentColor" fill-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12" clip-rule="evenodd"/></g><defs><clipPath id="akarIconsGithubFill0"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></g></svg>
    # akar-icons:github-fill
  - title: In active development
    details: ZWOO is still in active development, check out the roadmap!
    link: https://github.com/fabiankachlock/zwoo/discussions/categories/feature-requests
    linkText: Suggest features
    external: true
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 6L10 18.5m-3.5-10L3 12l3.5 3.5m11-7L21 12l-3.5 3.5"/></svg>
    # iconoir:code
  - title: Show your support
    details: And star the project on GitHub!
    link: https://github.com/fabiankachlock/zwoo
    linkText: Give a star
    external: true
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.074 2.633c.32-.844 1.531-.844 1.852 0l2.07 5.734a.99.99 0 0 0 .926.633h5.087c.94 0 1.35 1.17.611 1.743L18 14a.97.97 0 0 0-.322 1.092L19 20.695c.322.9-.72 1.673-1.508 1.119l-4.917-3.12a1 1 0 0 0-1.15 0l-4.917 3.12c-.787.554-1.83-.22-1.508-1.119l1.322-5.603A.97.97 0 0 0 6 14l-3.62-3.257C1.64 10.17 2.052 9 2.99 9h5.087a.99.99 0 0 0 .926-.633z"/></svg>
    # akar-icons:star
---

<p class="hero-description">
Welcome to ZWOO, the next generation of card games! Whether you're a fan of classic games or looking for a fresh, strategic twist, Zwoo is designed to keep you entertained for hours. With custom cards, innovative mechanics, and exciting multiplayer features, every game feels unique. Play with friends online or test your skills against clever AI bots in solo mode. Get ready to experience card games like never before – Zwoo is simple to learn but challenging to master!
</p>

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

.hero-description {
  margin-top: 3rem !important;
  max-width: 80ch;
}

.VPHomeFeatures .icon {
  color: var(--color-secondary-text-hex);
}
</style>