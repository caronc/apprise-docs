# Sponsorships Directory

This directory holds **company-level sponsorship entries** — organizations that sponsor Apprise as a whole, independent of any specific notification service.

For **service-level sponsorships** (a company sponsoring a specific notification plugin), use `sponsorship_level:` in that service's `locales/en/services/<slug>/index.md` frontmatter instead.

## Directory Structure

```text
sponsorships/
  <id>/                    # Stable identifier (lowercase, no spaces, e.g. "acme-corp")
    meta.json              # Required: level, name, website
    logo.svg               # Preferred: default logo — shown in light and dark mode
    logo.png               # Bitmap fallback when SVG unavailable (.jpg / .jpeg also accepted)
    logo-512px.png         # Optional legacy-style bitmap fallback (.jpg / .jpeg also accepted)
    logo-light.svg         # Optional explicit light-mode variant
    logo-light.png         # Optional bitmap light-mode variant (.jpg / .jpeg also accepted)
    logo-dark.svg          # Optional dark-mode variant (e.g. for white logos on dark backgrounds)
    logo-dark.png          # Optional bitmap dark-mode variant (.jpg / .jpeg also accepted)
```

Logo resolution mirrors service-page logos. Light/default mode uses `logo-light.*` first, then `logo.*`, then `logo-512px.*`. Dark mode uses `logo-dark.*` only when it exists; otherwise the light/default asset remains visible. Formats are checked in the order `.svg` → `.png` → `.jpg` → `.jpeg` for themed logos, with `logo-512px.png` → `.jpg` → `.jpeg` as the final default fallback.

SVG logos may also self-theme with an embedded `@media (prefers-color-scheme: dark)` rule, which is useful for simple wordmarks that only need a different text fill. This follows the browser/OS color scheme. If the logo must match the site theme toggle exactly, provide explicit `logo-light.*` and `logo-dark.*` files instead.

The `<id>` is a stable slug you choose. It never changes after creation.

The docs linter validates this directory. It fails on missing `meta.json`,
unsupported fields, invalid JSON, out-of-range `level`/`weight` values, invalid
URLs, and malformed localized text. Missing translations are allowed; provide
only the locales you have reviewed.

## `meta.json` Schema

```json
{
  "name": "Acme Corp",
  "website": "https://acme.com",
  "since": "2026-06",
  "level": 50,
  "weight": 1,
  "description": {
    "en": "Optional short blurb shown on the sponsors page.",
    "fr": "Courte description affichée sur la page des sponsors."
  },
  "sponsor_message": {
    "en": "Proudly supporting Apprise open source development.",
    "fr": "Fier de soutenir le développement open source d'Apprise."
  }
}
```

| Field             | Type                       | Required | Description                                                                                                                                                           |
| ----------------- | -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`            | string                     | Yes      | Display name of the company or individual                                                                                                                             |
| `website`         | string                     | No       | Primary website URL                                                                                                                                                   |
| `since`           | string                     | No       | Optional sponsorship start date as `YYYY-MM`; shown as a small note on sponsor cards                                                                                  |
| `level`           | integer 1–100              | Yes      | Visibility level — see below                                                                                                                                          |
| `weight`          | integer 1–5                | No       | Optional maintainer-controlled rotating banner ticket count. Omit it to derive the weight from `level`.                                                               |
| `description`     | string or localized object | No       | Short sentence shown on the sponsors page                                                                                                                             |
| `sponsor_message` | string or localized object | No       | Short sponsor message shown in level 75+ banners; falls back to English, then a default support message when omitted. Set to an empty string to suppress the message. |

## Sponsorship Levels

The `level` value controls how prominently the sponsor appears across the site:

| Level | Effect                                                                                                                  |
| ----: | ----------------------------------------------------------------------------------------------------------------------- |
|     1 | Name listed on the Sponsors page.                                                                                       |
|    25 | Compact Sponsors page logo card when a logo is provided.                                                                |
|    50 | Larger Sponsors page logo placement or placeholder silhouette.                                                          |
|    75 | Prominent Sponsors page placement, logo displayed or silhouetted, and rotating banner eligibility with sponsor message. |
|   100 | Highest default rotating-banner weight among featured sponsors.                                                         |

`level` controls which visibility features are unlocked. `weight` only affects
how often a level 75+ sponsor appears in the rotating banner. Every eligible
banner sponsor receives at least one display ticket per cycle; higher weights
add more tickets. If `weight` is omitted, the site derives a conservative
default from the level.

## Locale-Specific Text

Prefer localized objects directly in `meta.json` for short sponsor text:

```json
"sponsor_message": {
  "en": "Proudly supporting Apprise open source development.",
  "fr": "Fier de soutenir le développement open source d'Apprise."
}
```

If a locale is missing, the sync pipeline falls back to English. If `sponsor_message` is missing entirely, the site uses a localized default support message. If `sponsor_message` is set to an empty string, no sponsor message is shown.

## How the Site Uses This Data

The site build scans this directory and generates localized sponsor metadata automatically. You do not need to edit `sponsors.mdx` manually when adding a sponsor — just create the entry here and submit the pull request.
