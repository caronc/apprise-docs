---
title: "Apprise Docs"
description: "Contributing to the Apprise Documentation"
sidebar:
  order: 4
---

## Contributing to Apprise Documentation

We welcome documentation improvements! Please follow the guidelines below to help us review and
merge your contributions smoothly.

## Retrieve from GitHub

```bash
# Acquire the documentation source from its official resting spot on GitHub
git clone git@github.com:caronc/apprise-docs.git

```

## Repository Layout

All documentation lives under the `locales/` directory.

Each locale mirrors the same structure so navigation remains predictable across languages.

```text
locales/
  <locale>/
    index.md
    getting-started/
    guides/
    services/
      <service>/
        index.md
        images/       # optional logos — logo.svg, logo-dark.svg, etc.
    config/
    qa/
    dev/
    contributing/
    assets/
sponsorships/
  <id>/               # company-level sponsor entries (maintainer-managed)
    meta.json
    logo.svg
```

### Directory Guide

- **Getting Started** (`getting-started/`)
  Introductory material for new users

- **Guides** (`guides/`)
  How-to articles, workflows, best practices, and troubleshooting patterns

- **Config** (`config/`)
  Configuration syntax and reference material

- **QA** (`qa/`)
  Troubleshooting, diagnostics, and FAQs

- **Dev** (`dev/`)
  Developer-focused documentation and internals

- **Contributing** (`contributing/`)
  How to help improve Apprise and its ecosystem

- **Services** (`services/`)
  Documentation specific to a notification service, including URL syntax,
  configuration options, and examples

- **Sponsorships** (`sponsorships/`)
  Company-level sponsor entries, each containing a `meta.json` and optional logo
  files. This directory is **maintainer-managed** — do not add or modify entries
  unless you have been asked to do so. See `sponsorships/README.md` for the full
  schema and logo naming conventions.

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

## Adding or Improving a Service

Each service lives at:

```text
locales/<locale>/services/<service>/index.md
```

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

---

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

<!-- TEMPLATE:SERVICE-PARAMS -->

## Example

Send a Example notification:

```bash
apprise -vv -t "My Title" -b "Message Body" \
   "example://my-token/target"
```
````

> The markers such as `<!-- SERVICE:DETAILS -->` are intentional and must be left in place.
> They are replaced automatically when the documentation is rendered.

If you created an `mdx` file instead, you can use `{/* SERVICE:DETAILS */}` instead.

### Full Frontmatter Reference

The example above shows the common fields. A service page may also carry the following
optional fields:

```md
---
# Capability flags — set to true when the service supports the feature
has_attachments: false
has_image: false
has_sms: false
has_selfhosted: false

# Message length limits (remove the block entirely if the service has no known limits)
limits:
  - name: "Title"
    max_chars: 250
  - name: "Body"
    max_chars: 2000

# Retired services — set to the date the service stopped being available
# ended: YYYY-MM-DD

# -----------------------------------------------------------------------
# Sponsorship fields — MAINTAINER USE ONLY. Do not add or change these.
# -----------------------------------------------------------------------
# sponsorship_level: 50   # Integer 1–100; controls site visibility tier
# sponsorship_weight: 1   # Optional 1–5; banner rotation weight for level 75+
# sponsor_since: "2026-06"
# sponsor_message: ""     # Empty string intentionally suppresses the banner message
---
```

> **Do not add or modify sponsorship fields** unless you are the project maintainer
> or have been explicitly asked to do so. These fields have commercial significance.
> An empty `sponsor_message: ""` is intentional — it suppresses the banner message
> without removing the sponsor's banner slot. See [CONTRIBUTING.md](../../../CONTRIBUTING.md)
> for the full sponsorship level table and validation rules.

## Localization and Translations

- Each language lives under `locales/<locale>/`
- English (`en`) is the default
- Translations may be partial and incremental
- Prefer relative links between docs pages inside a locale
- Avoid root-absolute internal docs links such as `/services/` or `/url-builder/` in translated content
- Root-absolute shared assets such as `/assets/...` are fine when they are intentionally global

Examples:

```md
[Supported Services](../services/)
[URL Builder](../url-builder/)
![Service Logo](./images/logo.svg)
```

The site build includes a safeguard that rewrites locale-local internal links
for non-default locales during sync, but contributors should still author
locale-safe links in source content whenever practical.

Even partial translations are welcome.

## Linting and Validation

This repository uses automated checks to ensure:

- Consistent Markdown formatting
- Supported frontmatter keys and structure
- Predictable rendering on the website

Linting exists to **help contributors**, not to block them. Most failures are
formatting or unsupported metadata issues and are easy to fix.

## How You Can Help

- Improve documentation for a service you use
- Clarify confusing sections
- Add examples
- Fix typos or formatting issues
- Translate content into another language

If you are unsure where something belongs, open an issue and ask.
