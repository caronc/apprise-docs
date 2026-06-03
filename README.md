# Apprise Documentation

This repository contains the **community-maintained documentation** for  
[Apprise](https://github.com/caronc/apprise) and [Apprise-API](https://github.com/caronc/apprise-api)

All content here is validated and synced into the [official site](https://appriseit.com/) automatically.

## How This Content Is Used

Content from this repository is **synced into the official Apprise documentation website**:

👉 <https://appriseit.com/>

In addition to this, a **development hosting of the same site** (live copy of the `master` branch) allowing a staging preview of the next release.

👉 <https://dev.appriseit.com/>

This repository exists so that **anyone who can write Markdown** can help improve Apprise’s
documentation, while providing a **single, authoritative source** for all
Apprise and Apprise-API documentation.

## Repository Layout

The repository is organised into a few top-level areas:

```text
apprise-docs/
  locales/                   # All localised documentation
    <locale>/
      index.mdx
      getting-started/
      guides/
      services/
        <service>/
          index.md
          images/
      api/
      cli/
      library/
      tools/
      qa/
      contributing/
      assets/
      _partials/             # Reusable MDX snippets injected into pages
      _templates/            # Locale-specific auto-generated content tables
  scripts/                   # Build and lint helper scripts
  shared_templates/          # Shared Markdown partials (e.g. service-params.md)
  templates/                 # Contributor starter templates for new pages
```

### Locale Directories (`locales/<locale>/`)

Each locale mirrors the same structure so navigation remains predictable
across languages. English (`en`) is the canonical locale; all other
locales may be partial.

When linking between documentation pages inside a locale, prefer relative
paths instead of root-absolute links. For example, use `../services/` instead
of `/services/`, and `../url-builder/` instead of `/url-builder/`, from
translated content. This helps localized pages stay inside their own locale
instead of falling back to the default English route.

- **Getting Started** (`getting-started/`)
  Introductory material for new users

- **Troubleshooting** (`qa/`)
  Troubleshooting, diagnostics, and FAQs

- **Apprise API** (`api/`)
  Documentation for the web-based API (Sidecar) wrapper for Apprise

- **Apprise CLI** (`cli/`)
  Command-line interface documentation

- **Apprise (Python) Library** (`library/`)
  Developer-focused documentation and internals

- **Guides** (`guides/`)
  How-to articles, workflows, best practices, and troubleshooting patterns

- **Tools** (`tools/`)
  Source content and locale strings for companion tooling. The URL Builder is
  authored here, but published on the website at `/url-builder/`.

- **Contributing** (`contributing/`)
  How to help improve Apprise and its ecosystem

- **Services** (`services/`)
  Documentation specific to a notification service, including URL syntax,
  configuration options, and examples

- **Partials** (`_partials/`)
  Reusable MDX snippets that are injected into rendered pages at build time
  (e.g. the _"Notice a typo?"_ help panel). These files are not standalone
  pages and should not be edited unless you know where they are referenced.

- **Templates** (`_templates/`)
  Locale-specific Markdown fragments used to auto-generate content during
  the documentation sync (e.g. the plugin memory-eviction table). Like
  `_partials/`, these are not standalone pages.

### Root-Level Directories

- **`scripts/`**
  Node.js helper scripts used by `pnpm lint` and related tasks
  (e.g. `lint-docs.mjs` validates frontmatter and service metadata).

- **`shared_templates/`**
  Shared Markdown partials that are injected into service pages via markers
  such as `<!-- GLOBAL:SERVICE:PARAMS -->`. For example,
  `service-params.md` documents the parameters that apply to every service.

- **`templates/`**
  Starter templates for contributors creating new content.
  Copy `templates/new_service.md` as the starting point for a new service
  page and fill in the placeholders.

- **`sponsorships/`**
  Company-level sponsorship entries for organizations that sponsor Apprise as a whole (independent of any specific notification service). Each subdirectory represents one sponsor:

  ```text
  sponsorships/
    <company-id>/
      meta.json        # level (1–100), optional weight (1–5), name, website, since date
      logo.svg         # primary/default logo
      logo-light.svg   # optional explicit light-mode variant
      logo-dark.svg    # optional dark-mode variant
  ```

  The sync pipeline reads this directory and generates localized `apps/docs/public/company-sponsors*.json` files, which power the sponsors page widget. `level` controls visibility features; optional `weight` only tunes rotating banner frequency for level 75+ sponsors. Company logos follow the same light/default/dark naming convention as service logos, including `.svg`, `.png`, `.jpg`, and `.jpeg` variants. See [`sponsorships/README.md`](sponsorships/README.md) for the full field reference and level definitions.

  For **service-specific** sponsorships (a company sponsoring a notification plugin that Apprise already supports), use `sponsorship_level:` in that service's own `locales/<locale>/services/<slug>/index.md` frontmatter instead. Both types of sponsorship appear on the [Sponsors page](locales/en/contributing/sponsors.mdx) and are documented for contributors in [CONTRIBUTING.md](CONTRIBUTING.md#sponsorship-system).

## Getting Started as a Contributor

### Prerequisites

- Node.js (LTS recommended)
- `pnpm` (version pinned in `package.json`)
- Git

### Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Make your documentation changes  
   Add, edit, or improve any Markdown file.

3. Run validation:

   ```bash
   pnpm lint
   ```

   Most formatting issues can be fixed automatically with:

   ```bash
   pnpm lint:fix
   ```

4. Open a pull request 🎉

> If linting fails, it will tell you exactly what needs attention.

Before writing new content, skim [`STYLE_GUIDE.md`](STYLE_GUIDE.md) — it
covers heading conventions, frontmatter requirements, and Markdown formatting
rules used across the project.

## Adding or Improving a Service

Each service lives at:

```text
locales/<locale>/services/<service>/index.md
```

To add a new service, copy `templates/new_service.md` to the appropriate path
and fill in the placeholders.

Optionally, a service may include an `images/` directory for logos or diagrams.

```text
services/<service>/
├── index.md
└── images/
    └── logo.svg
```

### Service Logos

Service logos are optional, but encouraged when an official logo is available.

- Supported formats: `.svg`, `.png`, `.jpg`, `.jpeg`
- Raster images should not exceed:
  - **200px height**
  - **440px width**

If present, logos are automatically rendered on the service page.

## Assets

This repository supports two types of assets:

### Global Assets

Global assets live under:

```text
locales/<locale>/assets/
```

These assets are shared across documentation pages within the same locale
and are automatically published to the documentation site during sync.

Examples include:

- Shared diagrams
- Project logos
- Screenshots without language-specific text

In Markdown, global assets should be referenced using absolute paths:

```md
![Apprise Logo](/assets/apprise-logo.png)
```

### Service-Specific Assets

Service-specific assets belong alongside the service documentation:

```text
services/<service>/
├── index.md
└── images/
    └── logo.svg
```

These assets should be referenced using relative paths:

```md
![Service Logo](images/logo.svg)
```

For internal documentation links, the same rule applies: prefer relative paths
for locale-specific content. Root-absolute shared assets like `/assets/...`
remain appropriate when the asset is intentionally global.

Only include assets that are directly relevant to the service.

## Service Page Template

Each service page starts with a frontmatter block that describes its capabilities.

This metadata is **used to generate the Overview section automatically** on the site.

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

> The markers such as `<!-- SERVICE:DETAILS -->` are intentional and must be left in place.  
> They are replaced automatically when the documentation is rendered.

### Documentation Markers

Some pages contain special comment markers such as:

- `<!-- SERVICE:DETAILS -->`
- `<!-- SERVICES:COUNT -->`
- `<!-- SERVICES:BEGIN -->` / `<!-- SERVICES:END -->`

These markers are **intentional**. They are replaced automatically during the
documentation sync process and must be left in place.

**Important notes for contributors:**

- Do not remove or rename markers.
- Markers may appear as HTML comments or MDX-style comments.
- If a marker looks unusual, leave it as-is. It will be resolved during site generation.

If you are unsure whether something is a marker, it probably is.

## Localization and Translations

- Each language lives under `locales/<locale>/`
- English (`en`) is the default
- Translations may be partial and incremental

Even partial translations are welcome.

## Linting and Validation

This repository uses automated checks to ensure:

- Consistent Markdown formatting
- Supported frontmatter keys and structure
- Predictable rendering on the website

Linting exists to **help contributors**, not to block them. Most failures are
formatting or unsupported metadata issues and are easy to fix.

### URL Builder Popular Services

The URL Builder can show a small curated list of commonly used, non-sponsored
services before a visitor starts typing. That list is maintained per locale in:

- `locales/en/popular-services.json`
- `locales/<locale>/popular-services.json` for localized popularity lists

The file is optional. If it is missing, the site treats it as an empty popular
list and shows only sponsored entries, if any. Sponsored services always appear
first; if a service appears in both the sponsored data and the popular list, the
sponsored entry wins and is not duplicated.

Schema:

```json
{
  "services": ["telegram", "discord"],
  "max_items": 12
}
```

- `services` is required and must be an array of service directory IDs from
  `locales/en/services/<id>/`. Use stable IDs such as `telegram`, `discord`, or
  `msteams`, not translated display titles.
- `max_items` is optional. When provided, it limits how many popular entries
  are used after invalid or unavailable services are skipped.
- Invalid JSON, unsupported keys, duplicate entries, and invalid optional fields
  are checked by `pnpm lint:docs`.
- Unknown service IDs are warned about by `pnpm lint:docs` and ignored during
  site sync instead of failing the build. This keeps the public site resilient
  while still making stale entries easy to fix.

## How You Can Help

- Improve documentation for a service you use
- Clarify confusing sections
- Add examples
- Fix typos or formatting issues
- Translate content into another language

If you are unsure where something belongs, open an issue and ask.

## License

All documentation in this repository is licensed under  
**Creative Commons Attribution 4.0 International (CC BY 4.0)**.

By contributing, you agree that your work will be licensed under CC BY 4.0 unless stated otherwise.
