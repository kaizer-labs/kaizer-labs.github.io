# Social preview font notices

`scripts/social-preview.html` embeds unmodified Google Fonts distributions of Space Grotesk (weight 500) and IBM Plex Mono (weight 400). Both are licensed under the SIL Open Font License 1.1. Original copyright and license notices are preserved alongside this file.

Official license sources:

- Space Grotesk: https://github.com/google/fonts/blob/main/ofl/spacegrotesk/OFL.txt
- IBM Plex Mono: https://github.com/google/fonts/blob/main/ofl/ibmplexmono/OFL.txt

Embedded font sources:

- https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7aUUsj.ttf
- https://fonts.gstatic.com/s/ibmplexmono/v23/-F63fjptAgt5VM-kVkqdyU8n5ig.ttf

The renderer uses an existing Playwright installation and Chromium executable. It does not install dependencies. To use different installations:

```sh
SOCIAL_PREVIEW_PLAYWRIGHT=/absolute/path/to/playwright-core \
SOCIAL_PREVIEW_CHROMIUM=/absolute/path/to/chromium \
node scripts/render-social-preview.cjs
```

Without a module override, it tries project-installed `playwright`, then `playwright-core`, then the known local fallback. The Chromium path can be overridden independently.
