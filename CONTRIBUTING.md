# Contributing to Apprise Documentation

Thank you for your interest in contributing to the Apprise documentation.

This repository is intentionally **low-friction**. If you can write Markdown,
you can make a meaningful contribution. You do not need to be a developer, and
you do not need to understand how the website is built.

All content here is validated and synced into the official documentation site
automatically.

---

## What You Can Contribute

You are welcome to contribute:

- New guides and tutorials
- Improvements or corrections to existing pages
- Service-specific documentation
- Real-world examples and usage notes
- Translations into other languages

Small improvements are just as valuable as large ones.

## Where Content Belongs

Use these guidelines when adding or editing content:

### Service documentation

```text
locales/<locale>/services/<service>/index.md
```

### Guides and how-to articles

```text
locales/<locale>/guides/
```

### Images

Place images in an `images/` directory beside the page that uses them.

### Shared assets

```text
locales/<locale>/assets/
```

If you are unsure where something belongs, place it under `guides/` and it can
be reorganized later.

## Creating or Updating Pages

1. Choose the appropriate directory
2. Create or edit a Markdown file
3. Ensure required frontmatter is present (see service template below)
4. Write clear, concise documentation
5. Run validation and open a pull request

---

## Service Documentation Template

Each service page uses frontmatter metadata to generate parts of the site
automatically.

A minimal example:

````md
---
title: "Example Notifications"
description: "Send notifications using Example"
sidebar:
  label: "Example"

source: https://example.com
group: general

schemas:
  - example://

sample_urls:
  - example://{token}/
  - example://{token}/{target}
---

<!-- SERVICE:DETAILS -->

## Account Setup

How to get set up with Example

## Syntax

Valid syntax is as follows:

- `example://{token}`
- `example://{token}/{target}`

## Parameter Breakdown

| Variable | Required | Description                                                                                    |
| -------- | -------- | ---------------------------------------------------------------------------------------------- |
| token    | yes      | Token to access the example server                                                             |
| target   | no       | The target you wish to notify. If no target is specified, we send a notification to ourselves. |

<!-- GLOBAL:SERVICE:PARAMS -->

## Example

Send a Example notification:

```bash
apprise -vv -t "My Title" -b "Message Body" \
   "example://my-token/target"
```
````

Markers such as `<!-- SERVICE:DETAILS -->` must be left in place. They are
replaced automatically when documentation is rendered.

## Documentation Markers (Important)

Some pages include special comment markers used by the documentation build
pipeline (for example service listings, counts, or generated sections).

Examples include:

- `<!-- SERVICE:DETAILS -->`
- `<!-- SERVICES:COUNT -->`
- `{/* SERVICES:COUNT */}`
- `{/_ TEMPLATE:NEW_SERVICE _/}`

These markers are **not comments for humans** and must not be modified, reformatted, or removed.

Please note:

- Automated formatters may rewrite marker syntax.
- If this happens, do not "fix" the marker manually.
- Leave the marker exactly as it appears in the file.

If a marker is accidentally altered, it can cause sections of the site to stop
updating without obvious errors.

## Editing Existing Pages

- Keep changes focused and intentional
- Preserve existing structure where possible
- Improve clarity, grammar, and examples freely
- Large rewrites are welcome, but may involve discussion

## Images and Media

- Use local images only (no hot-linking)
- Keep file sizes reasonable
- Use descriptive filenames
- Reference images with relative paths
- Avoid hot-linking images from external sites

### Service Logo Files

Service logos live in `locales/<locale>/services/<slug>/images/` and use a consistent naming scheme that is recognised everywhere on the site (service-details page, URL Builder, banner ads, sponsors page):

| Filename                              | Purpose                                                                                                              |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `logo.svg`                            | Default logo — shown in both light and dark mode unless a variant exists. Preferred format.                          |
| `logo.png` / `logo.jpg` / `logo.jpeg` | Bitmap fallback when an SVG is not available.                                                                        |
| `logo-light.svg` (or `.png`, `.jpg`)  | Explicit light-mode variant. Takes precedence over `logo.*` in light mode.                                           |
| `logo-dark.svg` (or `.png`, `.jpg`)   | Dark-mode variant. When present, `logo.*` / `logo-light.*` is used in light mode and this file is used in dark mode. |

**Recommended:** provide `logo.svg` for most services. Only add `logo-dark.svg` if the default logo is not legible on a dark background (e.g. white logos). Bitmap fallbacks are checked in the order `.png` → `.jpg` → `.jpeg`.

For simple SVG wordmarks, you may embed a small `@media (prefers-color-scheme: dark)` rule inside `logo.svg` to swap fills between light and dark browser/OS themes. Use explicit `logo-light.*` and `logo-dark.*` files when the logo must track the documentation site's manual theme toggle exactly.

Translated service pages do not need to copy logo files. If a locale-specific
service directory has no light/default logo, the site falls back to the
canonical English service logo. Missing `logo-dark.*` files also fall back to
the English dark variant when one exists.

The sync pipeline copies all `images/` files to the public directory automatically. You do not need to reference them manually.

## Internal Links

- Prefer relative links for documentation pages within the same locale
- Avoid root-absolute internal docs links such as `/services/`, `/url-builder/`, `/api/`, `/cli/`, `/guides/`, `/library/`, `/qa/`, `/contributing/`, and `/getting-started/`
- Root-absolute shared assets such as `/assets/...` are acceptable when the asset is intentionally global to the site

Examples:

```md
[Supported Services](../services/)
[URL Builder](../url-builder/)
![Service Logo](./images/logo.svg)
```

This prevents translated pages from accidentally sending visitors back to the
default English route. The site build currently includes a safeguard for
localized content, but contributors should still write locale-safe links in the
source whenever practical.

## Translations

Translations are always welcome, even if incomplete.

Guidelines:

- Mirror the source directory structure
- Translate titles and headings
- Leave technical terms unchanged if unsure
- Keep internal links locale-safe by using relative paths when linking to other docs pages

Example:

```text
locales/fr/guides/getting-started.md
```

## Validation and Linting

This repository uses automated checks to ensure:

- Consistent Markdown formatting
- Supported frontmatter keys
- Predictable rendering on the site

Most issues are formatting-related and easy to fix.

Run locally with:

```bash
pnpm lint
```

Auto-fix common issues with:

```bash
pnpm lint:fix
```

## Review Process

- All contributions are reviewed
- Maintainers may suggest edits
- Small fixes are merged quickly
- Larger changes may involve discussion

## Sponsorship System

The Apprise documentation includes a sponsorship recognition system that gives service providers and companies visibility across the site. Understanding how it works helps you avoid accidentally overwriting sponsor data.

### Service-level sponsorship

A notification service can be marked as sponsored directly in its frontmatter:

```yaml
---
title: "Example Notifications"
sponsorship_level: 50
sponsorship_weight: 1
sponsor_since: "2026-06"
---
```

| Field                | Description                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sponsorship_level`  | Integer 1–100. Controls prominence (see table below).                                                                                                               |
| `sponsorship_weight` | Optional integer 1–5. Maintainer-controlled rotating banner ticket count for level 75+ sponsors. Omit it to derive a conservative default from `sponsorship_level`. |
| `sponsor_since`      | Optional `YYYY-MM` maintainer note for when the service sponsorship started. Currently informational.                                                               |
| `has_sponsorship`    | Shorthand for `sponsorship_level: 1`. If both are set and `sponsorship_level > 0`, the level wins and a build warning is emitted.                                   |

**What each level unlocks:**

| Level | Effect on the site                                                                                             |
| ----: | -------------------------------------------------------------------------------------------------------------- |
|     1 | Sponsors page text listing.                                                                                    |
|    10 | URL Builder search-result heart for service sponsors.                                                          |
|    15 | Service-list heart, highlighted row, bold service title, and sponsored filter visibility for service sponsors. |
|    20 | URL Builder default sponsored dropdown for service sponsors.                                                   |
|    25 | Compact Sponsors page logo card and service-page support notice.                                               |
|    50 | Larger Sponsors page logo placement or placeholder silhouette.                                                 |
|    75 | Rotating banner placement with sponsor message; largest Sponsors page card with message.                       |
|   100 | Highest default rotating-banner weight among featured sponsors.                                                |

Do not add or modify `sponsorship_level` in a service doc unless you are the project maintainer or have been asked to do so. This field has commercial significance.

The docs linter validates sponsor frontmatter when these fields are present:

- `sponsorship_level` must be an integer from 1 to 100.
- `sponsorship_weight` must be an integer from 1 to 5 and must only be used with an active sponsorship.
- `sponsor_since` must use `YYYY-MM`.
- `sponsor_message` may be a string or localized object. An empty string is valid and intentionally disables the banner message.
- Missing translations inside localized objects are allowed; invalid locale keys or non-string values are not.

Sponsor control fields (`has_sponsorship`, `sponsorship_level`, `sponsorship_weight`, and `sponsor_since`) must match across translated service pages. The canonical locale defaults to English and can be changed by setting `APPRISE_DOCS_SPONSOR_LOCALE`. Run `pnpm lint:fix` to copy the canonical sponsor control fields to translated service pages.

### Company-level sponsorship (`sponsorships/` directory)

Organizations that sponsor Apprise as a whole (independent of a specific service) are represented in the root-level `sponsorships/` directory:

```text
sponsorships/
  <company-id>/
    meta.json          # level, name, website, since date
    logo.svg           # primary/default logo
    logo-light.svg     # optional explicit light-mode variant
    logo-dark.svg      # optional dark-mode variant
```

The `meta.json` schema:

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

Company sponsor logos follow the same naming pattern as service logos. The sync pipeline checks `logo-light.*`, then `logo.*`, then `logo-512px.*` for light/default display, and checks `logo-dark.*` for dark mode. Supported extensions are `.svg`, `.png`, `.jpg`, and `.jpeg`.

As with service logos, a single SVG may self-theme with `@media (prefers-color-scheme: dark)` for simple fill changes. Prefer paired `logo-light.*` / `logo-dark.*` assets when exact site-toggle behavior is required.

The sync pipeline automatically reads this directory and generates localized `company-sponsors*.json` files for the sponsors page widget. Company sponsor `description` and `sponsor_message` fields may be localized objects. Company sponsor `weight` is optional and only changes rotating banner frequency for level 75+ sponsors. See [`sponsorships/README.md`](sponsorships/README.md) for the full schema.

The docs linter validates each `sponsorships/<id>/meta.json` file. It requires a non-empty `name`, a valid integer `level` from 1 to 100, optional `weight` from 1 to 5, optional `since` in `YYYY-MM` format, and string or localized-object text fields. Unsupported keys, including old fields such as `github`, fail lint.

Do not add entries to `sponsorships/` unless you are the project maintainer. These entries represent active commercial relationships.

### Documentation markers used by the sponsorship system

The sponsors page uses a special marker that is replaced at build time:

```mdx
<!-- COMPANY_SPONSORS -->
```

This marker is replaced with the `<CompanySponsorsApp>` Vue component by `sync-content.mjs`. Do not remove or relocate this marker in `locales/*/contributing/sponsors.mdx`.

---

## Questions or Uncertainty

If you are unsure where to start or how to proceed:

- Open an issue
- Ask for guidance
- Suggest improvements

We are happy to help.

Thank you for contributing to Apprise.
